ALTER TABLE "bookings"."flights" DROP CONSTRAINT "flights_departure_airport_airports_data_airport_code_fk";
--> statement-breakpoint
ALTER TABLE "bookings"."flights" DROP CONSTRAINT "flights_arrival_airport_airports_data_airport_code_fk";
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
