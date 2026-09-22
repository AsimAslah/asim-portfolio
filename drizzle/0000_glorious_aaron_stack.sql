CREATE TABLE `portfolio_feedback` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`rating` integer NOT NULL,
	`feedback` text,
	`browser_hash` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "portfolio_feedback_rating_check" CHECK("portfolio_feedback"."rating" BETWEEN 1 AND 5),
	CONSTRAINT "portfolio_feedback_length_check" CHECK("portfolio_feedback"."feedback" IS NULL OR length("portfolio_feedback"."feedback") <= 300)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `portfolio_feedback_browser_hash_unique` ON `portfolio_feedback` (`browser_hash`);--> statement-breakpoint
CREATE TABLE `portfolio_feedback_rate_limits` (
	`rate_key` text PRIMARY KEY NOT NULL,
	`window_started_at` integer NOT NULL,
	`request_count` integer DEFAULT 1 NOT NULL,
	`expires_at` integer NOT NULL
);
