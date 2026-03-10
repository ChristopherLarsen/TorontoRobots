CREATE TABLE "activations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"license_id" uuid NOT NULL,
	"machine_id" varchar(255) NOT NULL,
	"machine_name" varchar(255),
	"activated_at" timestamp with time zone DEFAULT now(),
	"last_validated_at" timestamp with time zone DEFAULT now(),
	"status" varchar(50) DEFAULT 'active'
);
--> statement-breakpoint
CREATE TABLE "licenses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"lemon_squeezy_license_key" varchar(255) NOT NULL,
	"lemon_squeezy_order_id" bigint NOT NULL,
	"lemon_squeezy_customer_id" bigint NOT NULL,
	"customer_email" varchar(255) NOT NULL,
	"customer_name" varchar(255),
	"activated" boolean DEFAULT false,
	"activation_limit" integer DEFAULT 3,
	"current_activations" integer DEFAULT 0,
	"created_at" timestamp with time zone DEFAULT now(),
	"expires_at" timestamp with time zone,
	"revoked_at" timestamp with time zone,
	"status" varchar(50) DEFAULT 'active',
	"metadata" jsonb DEFAULT '{}'::jsonb,
	CONSTRAINT "licenses_lemon_squeezy_license_key_unique" UNIQUE("lemon_squeezy_license_key")
);
--> statement-breakpoint
CREATE TABLE "validation_logs" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"license_id" uuid,
	"machine_id" varchar(255),
	"validation_type" varchar(50),
	"success" boolean NOT NULL,
	"result_code" varchar(50),
	"error_message" text,
	"validated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "webhook_events" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"event_type" varchar(100) NOT NULL,
	"lemon_squeezy_event_id" varchar(255),
	"payload" jsonb NOT NULL,
	"processed" boolean DEFAULT false,
	"error_message" text,
	"received_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "webhook_events_lemon_squeezy_event_id_unique" UNIQUE("lemon_squeezy_event_id")
);
--> statement-breakpoint
ALTER TABLE "activations" ADD CONSTRAINT "activations_license_id_licenses_id_fk" FOREIGN KEY ("license_id") REFERENCES "public"."licenses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "idx_activations_license_machine" ON "activations" USING btree ("license_id","machine_id");--> statement-breakpoint
CREATE INDEX "idx_activations_license_id" ON "activations" USING btree ("license_id");--> statement-breakpoint
CREATE INDEX "idx_licenses_license_key" ON "licenses" USING btree ("lemon_squeezy_license_key");--> statement-breakpoint
CREATE INDEX "idx_licenses_status" ON "licenses" USING btree ("status");--> statement-breakpoint
CREATE INDEX "idx_validation_logs_license_id" ON "validation_logs" USING btree ("license_id");--> statement-breakpoint
CREATE INDEX "idx_validation_logs_validated_at" ON "validation_logs" USING btree ("validated_at");--> statement-breakpoint
CREATE INDEX "idx_webhook_events_event_type" ON "webhook_events" USING btree ("event_type");