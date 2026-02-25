ALTER TABLE `landing_pages` ADD `externalUrl` varchar(500);--> statement-breakpoint
ALTER TABLE `landing_pages` ADD `isExternal` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `practice_areas` ADD `landingPageId` int;--> statement-breakpoint
ALTER TABLE `practice_areas` ADD `externalLandingUrl` varchar(500);