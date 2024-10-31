import { pgTable, pgSchema, foreignKey, char, varchar, text, jsonb, primaryKey, unique, integer, serial, timestamp, numeric, customType, point } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const bookingsSchema = pgSchema("bookings");



export const tickets = bookingsSchema.table("tickets", {
	ticketNo: char("ticket_no", { length: 13 }).primaryKey().notNull(),
	bookRef: char("book_ref", { length: 6 }).notNull().references(() => bookings.bookRef),
	passengerId: varchar("passenger_id", { length: 20 }).notNull(),
	passengerName: text("passenger_name").notNull(),
	contactData: jsonb("contact_data"),
});

export const boardingPasses = bookingsSchema.table("boarding_passes", {
	ticketNo: char("ticket_no", { length: 13 }).primaryKey().notNull(),
	flightId: integer("flight_id").primaryKey().notNull().references(() => ticketFlights.flightId),
	boardingNo: integer("boarding_no").notNull(),
	seatNo: varchar("seat_no", { length: 4 }).notNull(),
},
(table) => {
	return {
		boardingPassesPkey: primaryKey({ columns: [table.ticketNo, table.flightId], name: "boarding_passes_pkey"}),
		boardingPassesFlightIdBoardingNoKey: unique("boarding_passes_flight_id_boarding_no_key").on(table.flightId, table.boardingNo),
		boardingPassesFlightIdSeatNoKey: unique("boarding_passes_flight_id_seat_no_key").on(table.flightId, table.seatNo),
	}
});

export const flights = bookingsSchema.table("flights", {
	flightId: serial("flight_id").primaryKey().notNull(),
	flightNo: char("flight_no", { length: 6 }).notNull(),
	scheduledDeparture: timestamp("scheduled_departure", { withTimezone: true, mode: 'string' }).notNull(),
	scheduledArrival: timestamp("scheduled_arrival", { withTimezone: true, mode: 'string' }).notNull(),
	departureAirport: char("departure_airport", { length: 3 }).notNull().references(() => airportsData.airportCode, { onDelete: "cascade" }),
	arrivalAirport: char("arrival_airport", { length: 3 }).notNull().references(() => airportsData.airportCode, { onDelete: "cascade" }),
	status: varchar("status", { length: 20 }).notNull(),
	aircraftCode: char("aircraft_code", { length: 3 }).notNull().references(() => aircraftsData.aircraftCode),
	actualDeparture: timestamp("actual_departure", { withTimezone: true, mode: 'string' }),
	actualArrival: timestamp("actual_arrival", { withTimezone: true, mode: 'string' }),
},
(table) => {
	return {
		flightsFlightNoScheduledDepartureKey: unique("flights_flight_no_scheduled_departure_key").on(table.flightNo, table.scheduledDeparture),
	}
});

export const aircraftsData = bookingsSchema.table("aircrafts_data", {
	aircraftCode: char("aircraft_code", { length: 3 }).primaryKey().notNull(),
	model: jsonb("model").notNull(),
	range: integer("range").notNull(),
});

export const ticketFlights = bookingsSchema.table("ticket_flights", {
	ticketNo: char("ticket_no", { length: 13 }).primaryKey().notNull().references(() => tickets.ticketNo),
	flightId: integer("flight_id").primaryKey().notNull().references(() => flights.flightId),
	fareConditions: varchar("fare_conditions", { length: 10 }).notNull(),
	amount: numeric("amount", { precision: 10, scale:  2 }).notNull(),
},
(table) => {
	return {
		ticketFlightsPkey: primaryKey({ columns: [table.ticketNo, table.flightId], name: "ticket_flights_pkey"}),
	}
});

export const bookings = bookingsSchema.table("bookings", {
	bookRef: char("book_ref", { length: 6 }).primaryKey().notNull(),
	bookDate: timestamp("book_date", { withTimezone: true, mode: 'string' }).notNull(),
	totalAmount: numeric("total_amount", { precision: 10, scale:  2 }).notNull(),
});

export const seats = bookingsSchema.table("seats", {
	aircraftCode: char("aircraft_code", { length: 3 }).primaryKey().notNull().references(() => aircraftsData.aircraftCode, { onDelete: "cascade" } ),
	seatNo: varchar("seat_no", { length: 4 }).primaryKey().notNull(),
	fareConditions: varchar("fare_conditions", { length: 10 }).notNull(),
},
(table) => {
	return {
		seatsPkey: primaryKey({ columns: [table.aircraftCode, table.seatNo], name: "seats_pkey"}),
	}
});

export const airportsData = bookingsSchema.table("airports_data", {
	airportCode: char("airport_code", { length: 3 }).primaryKey().notNull(),
	airportName: jsonb("airport_name").notNull(),
	city: jsonb("city").notNull(),
	coordinates: point("coordinates", { mode: 'xy' }).notNull(),
	timezone: text("timezone").notNull(),
});