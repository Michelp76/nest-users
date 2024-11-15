ALTER TABLE "bookings"."ticket_flights" DROP CONSTRAINT "ticket_flights_flight_id_flights_flight_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bookings"."ticket_flights" ADD CONSTRAINT "ticket_flights_flight_id_flights_flight_id_fk" FOREIGN KEY ("flight_id") REFERENCES "bookings"."flights"("flight_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
