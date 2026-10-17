// import { test, expect } from "@playwright/test"
import { test, expect } from "./booking.fixture"
import * as z from "zod";

// Create(POST) Retrieve(GET) Update(PUT/PATCH) Delete(DELETE)

test("get all booking", async ({ request }) => {
    const reps = await request.get('https://restful-booker.herokuapp.com/booking');

    expect(reps.status()).toBe(200);
    const responseBody = await reps.json()
    const bookingSchema = z.object({
        bookingid: z.number(),
    })
    const bookingsSchema = z.array(bookingSchema)

    expect(bookingsSchema.parse(responseBody)).toBeTruthy()
})

test("get booking by id", async ({ request,randomBookingId }) => {

    const reps = await request.get(`https://restful-booker.herokuapp.com/booking/${randomBookingId}`)
    expect(reps.status()).toBe(200);
    const responseBody = await reps.json()
    const bookingInfoSchema = z.object({
        firstname: z.string(),
        lastname: z.string(),
        totalprice: z.number(),
        depositpaid: z.boolean(),
        bookingdates: z.object({
            checkin: z.string(),
            checkout: z.string()
        })

    })
    expect(bookingInfoSchema.parse(responseBody)).toBeTruthy()

    //extract json object
    const { firstname, lastname } = responseBody
    console.log(`${firstname} ${lastname}`)
})

test("create new booking", async ({ createBooking }) => {
    const bookingData = {
        firstname: "Ha",
        lastname: "Do",
        totalprice: 5000,
        depositpaid: true,
        bookingdates: {
            checkin: "2026-11-01",
            checkout: "2026-11-05"
        },
        additionalneeds: "Breakfast"
    };

    const responseBody = await createBooking(bookingData);
    const { booking } = responseBody;
    expect(booking).toEqual(bookingData);
    expect(responseBody).toHaveProperty("bookingid");
});

test("update booking", async ({ request, authToken, createBooking }) => {
    // create new booking using fixture with defaults
    const { bookingid, booking } = await createBooking();

    // update booking info
    const updatedData = {
        ...booking,
        additionalneeds: "Vegan Food"
    };

    const updateReps = await request.put(`https://restful-booker.herokuapp.com/booking/${bookingid}`, {
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `token=${authToken}`
        },
        data: updatedData
    });
    expect(updateReps.status()).toBe(200);
    const updateResponseBody = await updateReps.json();
    expect(updateResponseBody).toEqual(updatedData);
});

test("delete a booking", async ({ request, authToken, createBooking }) => {
    // create new booking using fixture with defaults
    const { bookingid } = await createBooking();

    // delete booking
    const reps = await request.delete(`https://restful-booker.herokuapp.com/booking/${bookingid}`, {
        headers: {
            'Cookie': `token=${authToken}`
        }
    });
    expect(reps.status()).toBe(201);

    // verify booking is deleted
    const verifyReps = await request.get(`https://restful-booker.herokuapp.com/booking/${bookingid}`);
    expect(verifyReps.status()).toBe(404);
});