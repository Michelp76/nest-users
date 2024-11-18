ALTER TABLE "bookings"."aircrafts_data" ADD COLUMN "created_at" timestamp with time zone DEFAULT (now() AT TIME ZONE 'utc'::text) NOT NULL;--> statement-breakpoint
ALTER TABLE "bookings"."aircrafts_data" ADD COLUMN "updated_at" timestamp with time zone DEFAULT (now() AT TIME ZONE 'utc'::text) NOT NULL;--> statement-breakpoint
ALTER TABLE "bookings"."boarding_passes" ADD COLUMN "created_at" timestamp with time zone DEFAULT (now() AT TIME ZONE 'utc'::text) NOT NULL;--> statement-breakpoint
ALTER TABLE "bookings"."boarding_passes" ADD COLUMN "updated_at" timestamp with time zone DEFAULT (now() AT TIME ZONE 'utc'::text) NOT NULL;--> statement-breakpoint
ALTER TABLE "bookings"."bookings" ADD COLUMN "created_at" timestamp with time zone DEFAULT (now() AT TIME ZONE 'utc'::text) NOT NULL;--> statement-breakpoint
ALTER TABLE "bookings"."bookings" ADD COLUMN "updated_at" timestamp with time zone DEFAULT (now() AT TIME ZONE 'utc'::text) NOT NULL;--> statement-breakpoint
ALTER TABLE "bookings"."flights" ADD COLUMN "created_at" timestamp with time zone DEFAULT (now() AT TIME ZONE 'utc'::text) NOT NULL;--> statement-breakpoint
ALTER TABLE "bookings"."flights" ADD COLUMN "updated_at" timestamp with time zone DEFAULT (now() AT TIME ZONE 'utc'::text) NOT NULL;--> statement-breakpoint
ALTER TABLE "bookings"."seats" ADD COLUMN "created_at" timestamp with time zone DEFAULT (now() AT TIME ZONE 'utc'::text) NOT NULL;--> statement-breakpoint
ALTER TABLE "bookings"."seats" ADD COLUMN "updated_at" timestamp with time zone DEFAULT (now() AT TIME ZONE 'utc'::text) NOT NULL;--> statement-breakpoint
ALTER TABLE "bookings"."ticket_flights" ADD COLUMN "created_at" timestamp with time zone DEFAULT (now() AT TIME ZONE 'utc'::text) NOT NULL;--> statement-breakpoint
ALTER TABLE "bookings"."ticket_flights" ADD COLUMN "updated_at" timestamp with time zone DEFAULT (now() AT TIME ZONE 'utc'::text) NOT NULL;--> statement-breakpoint
ALTER TABLE "bookings"."tickets" ADD COLUMN "created_at" timestamp with time zone DEFAULT (now() AT TIME ZONE 'utc'::text) NOT NULL;--> statement-breakpoint
ALTER TABLE "bookings"."tickets" ADD COLUMN "updated_at" timestamp with time zone DEFAULT (now() AT TIME ZONE 'utc'::text) NOT NULL;