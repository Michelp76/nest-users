CREATE SCHEMA "bookings";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookings"."aircrafts_data" (
	"aircraft_code" char(3) PRIMARY KEY NOT NULL,
	"model" jsonb NOT NULL,
	"range" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookings"."airports_data" (
	"airport_code" char(3) PRIMARY KEY NOT NULL,
	"airport_name" jsonb NOT NULL,
	"city" jsonb NOT NULL,
	"coordinates" "point" NOT NULL,
	"timezone" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookings"."boarding_passes" (
	"ticket_no" char(13) NOT NULL,
	"flight_id" integer NOT NULL,
	"boarding_no" integer NOT NULL,
	"seat_no" varchar(4) NOT NULL,
	CONSTRAINT "boarding_passes_pkey" PRIMARY KEY("ticket_no","flight_id"),
	CONSTRAINT "boarding_passes_flight_id_boarding_no_key" UNIQUE("flight_id","boarding_no"),
	CONSTRAINT "boarding_passes_flight_id_seat_no_key" UNIQUE("flight_id","seat_no")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookings"."bookings" (
	"book_ref" char(6) PRIMARY KEY NOT NULL,
	"book_date" timestamp with time zone NOT NULL,
	"total_amount" numeric(10, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookings"."flights" (
	"flight_id" serial PRIMARY KEY NOT NULL,
	"flight_no" char(6) NOT NULL,
	"scheduled_departure" timestamp with time zone NOT NULL,
	"scheduled_arrival" timestamp with time zone NOT NULL,
	"departure_airport" char(3) NOT NULL,
	"arrival_airport" char(3) NOT NULL,
	"status" varchar(20) NOT NULL,
	"aircraft_code" char(3) NOT NULL,
	"actual_departure" timestamp with time zone,
	"actual_arrival" timestamp with time zone,
	CONSTRAINT "flights_flight_no_scheduled_departure_key" UNIQUE("flight_no","scheduled_departure")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookings"."seats" (
	"aircraft_code" char(3) NOT NULL,
	"seat_no" varchar(4) NOT NULL,
	"fare_conditions" varchar(10) NOT NULL,
	CONSTRAINT "seats_pkey" PRIMARY KEY("aircraft_code","seat_no")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookings"."ticket_flights" (
	"ticket_no" char(13) NOT NULL,
	"flight_id" integer NOT NULL,
	"fare_conditions" varchar(10) NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	CONSTRAINT "ticket_flights_pkey" PRIMARY KEY("ticket_no","flight_id"),
	CONSTRAINT "ticket_flights_flight_id_unique" UNIQUE("flight_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookings"."tickets" (
	"ticket_no" char(13) PRIMARY KEY NOT NULL,
	"book_ref" char(6) NOT NULL,
	"passenger_id" varchar(20) NOT NULL,
	"passenger_name" text NOT NULL,
	"contact_data" jsonb
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookings"."boarding_passes" ADD CONSTRAINT "boarding_passes_flight_id_ticket_flights_flight_id_fk" FOREIGN KEY ("flight_id") REFERENCES "bookings"."ticket_flights"("flight_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookings"."flights" ADD CONSTRAINT "flights_departure_airport_airports_data_airport_code_fk" FOREIGN KEY ("departure_airport") REFERENCES "bookings"."airports_data"("airport_code") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookings"."flights" ADD CONSTRAINT "flights_arrival_airport_airports_data_airport_code_fk" FOREIGN KEY ("arrival_airport") REFERENCES "bookings"."airports_data"("airport_code") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookings"."flights" ADD CONSTRAINT "flights_aircraft_code_aircrafts_data_aircraft_code_fk" FOREIGN KEY ("aircraft_code") REFERENCES "bookings"."aircrafts_data"("aircraft_code") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookings"."seats" ADD CONSTRAINT "seats_aircraft_code_aircrafts_data_aircraft_code_fk" FOREIGN KEY ("aircraft_code") REFERENCES "bookings"."aircrafts_data"("aircraft_code") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookings"."ticket_flights" ADD CONSTRAINT "ticket_flights_ticket_no_tickets_ticket_no_fk" FOREIGN KEY ("ticket_no") REFERENCES "bookings"."tickets"("ticket_no") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookings"."ticket_flights" ADD CONSTRAINT "ticket_flights_flight_id_flights_flight_id_fk" FOREIGN KEY ("flight_id") REFERENCES "bookings"."flights"("flight_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookings"."tickets" ADD CONSTRAINT "tickets_book_ref_bookings_book_ref_fk" FOREIGN KEY ("book_ref") REFERENCES "bookings"."bookings"("book_ref") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
