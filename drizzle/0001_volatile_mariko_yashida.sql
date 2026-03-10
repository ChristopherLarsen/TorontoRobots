CREATE TABLE "refund_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"order_id" varchar(255) NOT NULL,
	"reason" text,
	"status" varchar(50) DEFAULT 'pending' NOT NULL,
	"lemon_squeezy_refund_id" varchar(255),
	"error_message" text,
	"request_ip" varchar(45),
	"created_at" timestamp with time zone DEFAULT now(),
	"processed_at" timestamp with time zone
);
--> statement-breakpoint
CREATE INDEX "idx_refund_requests_email" ON "refund_requests" USING btree ("email");--> statement-breakpoint
CREATE INDEX "idx_refund_requests_order_id" ON "refund_requests" USING btree ("order_id");--> statement-breakpoint
CREATE INDEX "idx_refund_requests_created_at" ON "refund_requests" USING btree ("created_at");