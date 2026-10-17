import { test, expect, BookingData } from "./booking.fixture";
import { z } from "zod";

// API Endpoints
const BOOKING_API_URL = "https://restful-booker.herokuapp.com/booking";

/**
 * Zod Schemas for Response Validation
 * Defined at module level to avoid re-creation per test execution
 */
const BookingItemSchema = z.object({
  bookingid: z.number().int().positive(),
});

const BookingDatesSchema = z.object({
  checkin: z.string().min(1),
  checkout: z.string().min(1),
});

const BookingDetailsSchema = z.object({
  firstname: z.string().min(1),
  lastname: z.string().min(1),
  totalprice: z.number().nonnegative(),
  depositpaid: z.boolean(),
  bookingdates: BookingDatesSchema,
  additionalneeds: z.string().optional(),
});

const CreateBookingResponseSchema = z.object({
  bookingid: z.number().int().positive(),
  booking: BookingDetailsSchema,
});

test.describe("Booking API - Integration Tests", { tag: ["@api", "@booking", "@crud"] }, () => {
  test("should retrieve all bookings successfully", async ({ request }) => {
    const response = await request.get(BOOKING_API_URL);

    // Assert status and headers
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("application/json");

    const responseBody = await response.json();

    // Verify response structure is a non-empty array
    expect(Array.isArray(responseBody)).toBe(true);
    expect(responseBody.length).toBeGreaterThan(0);

    // Validate schema contract with Zod
    const parseResult = z.array(BookingItemSchema).safeParse(responseBody);
    expect(
      parseResult.success,
      parseResult.error ? JSON.stringify(parseResult.error.format()) : undefined
    ).toBe(true);
  });

  test("should retrieve booking details by ID", async ({ request, randomBookingId }) => {
    const response = await request.get(`${BOOKING_API_URL}/${randomBookingId}`);

    // Assert status and headers
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
    expect(response.headers()["content-type"]).toContain("application/json");

    const responseBody = await response.json();

    // Validate schema contract with Zod
    const parseResult = BookingDetailsSchema.safeParse(responseBody);
    expect(
      parseResult.success,
      parseResult.error ? JSON.stringify(parseResult.error.format()) : undefined
    ).toBe(true);

    // Assert presence of mandatory fields
    expect(responseBody).toMatchObject({
      firstname: expect.any(String),
      lastname: expect.any(String),
      totalprice: expect.any(Number),
      depositpaid: expect.any(Boolean),
      bookingdates: {
        checkin: expect.any(String),
        checkout: expect.any(String),
      },
    });
  });

  test("should create a new booking with custom data", async ({ createBooking }) => {
    const customBookingData: BookingData = {
      firstname: "Ha",
      lastname: "Do",
      totalprice: 5000,
      depositpaid: true,
      bookingdates: {
        checkin: "2026-11-01",
        checkout: "2026-11-05",
      },
      additionalneeds: "Breakfast",
    };

    const responseBody = await createBooking(customBookingData);

    // Validate schema contract
    const parseResult = CreateBookingResponseSchema.safeParse(responseBody);
    expect(
      parseResult.success,
      parseResult.error ? JSON.stringify(parseResult.error.format()) : undefined
    ).toBe(true);

    // Verify payload integrity
    expect(responseBody.booking).toEqual(customBookingData);
    expect(responseBody.bookingid).toBeGreaterThan(0);
  });

  test("should update an existing booking using PUT", async ({ request, authToken, createBooking }) => {
    // Arrange: create an isolated booking for this test
    const { bookingid, booking } = await createBooking();

    const updatedData: BookingData = {
      ...booking,
      additionalneeds: "Vegan Food",
    };

    // Act: update booking
    const updateResponse = await request.put(`${BOOKING_API_URL}/${bookingid}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: `token=${authToken}`,
      },
      data: updatedData,
    });

    // Assert: verify status and response payload
    expect(updateResponse.status()).toBe(200);
    expect(updateResponse.ok()).toBeTruthy();
    expect(updateResponse.headers()["content-type"]).toContain("application/json");

    const updateResponseBody = await updateResponse.json();

    const parseResult = BookingDetailsSchema.safeParse(updateResponseBody);
    expect(
      parseResult.success,
      parseResult.error ? JSON.stringify(parseResult.error.format()) : undefined
    ).toBe(true);

    expect(updateResponseBody).toMatchObject(updatedData);
  });

  test("should delete a booking and return 404 on subsequent retrieval", async ({
    request,
    authToken,
    createBooking,
  }) => {
    // Arrange: create an isolated booking to delete
    const { bookingid } = await createBooking();

    // Act: delete booking
    const deleteResponse = await request.delete(`${BOOKING_API_URL}/${bookingid}`, {
      headers: {
        Cookie: `token=${authToken}`,
      },
    });

    // Assert: restful-booker returns 201 Created on DELETE
    expect(deleteResponse.status()).toBe(201);
    expect(deleteResponse.ok()).toBeTruthy();

    // Verify: subsequent GET returns 404 Not Found
    const verifyResponse = await request.get(`${BOOKING_API_URL}/${bookingid}`);
    expect(verifyResponse.status()).toBe(404);
  });
});