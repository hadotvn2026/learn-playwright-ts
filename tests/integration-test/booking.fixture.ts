import { test as base } from '@playwright/test';

export type BookingDates = {
    checkin: string;
    checkout: string;
};

export type BookingData = {
    firstname: string;
    lastname: string;
    totalprice: number;
    depositpaid: boolean;
    bookingdates: BookingDates;
    additionalneeds?: string;
};

export type CreateBookingResult = {
    bookingid: number;
    booking: BookingData;
};

type BookingFixture = {
    authToken: string;
    randomBookingId: number;
    createBooking: (customData?: Partial<BookingData>) => Promise<CreateBookingResult>;
};

const defaultBookingData: BookingData = {
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

export const test = base.extend<BookingFixture>({
    authToken: async ({ request }, use) => {
        const authData = {
            "username": "admin",
            "password": "password123"
        };
        const authReps = await request.post('https://restful-booker.herokuapp.com/auth', {
            headers: {
                'Content-Type': 'application/json'
            },
            data: authData
        });
        const responseBody = await authReps.json();
        const { token } = responseBody;
        await use(token);
    },

    randomBookingId: async ({ request }, use) => {
        const allBookingRes = await request.get('https://restful-booker.herokuapp.com/booking');
        const allBookingIds = await allBookingRes.json();
        const bookingID = allBookingIds[Math.floor(Math.random() * allBookingIds.length)].bookingid;
        await use(bookingID);
    },

    createBooking: async ({ request }, use) => {
        await use(async (customData?: Partial<BookingData>) => {
            const payload: BookingData = {
                ...defaultBookingData,
                ...customData,
                bookingdates: {
                    ...defaultBookingData.bookingdates,
                    ...customData?.bookingdates
                }
            };
            const reps = await request.post('https://restful-booker.herokuapp.com/booking', {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: payload
            });
            return (await reps.json()) as CreateBookingResult;
        });
    }
});

export { expect } from '@playwright/test';