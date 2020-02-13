CREATE TABLE "tasks" (
    "id" SERIAL PRIMARY KEY,
    "taskName" VARCHAR (80) NOT NULL,
    "priority" VARCHAR (20) NOT NULL,
    "status" VARCHAR (15) DEFAULT 'Not Started',
    "notes" VARCHAR (250),
    "archive_date" DATE
);

INSERT INTO "tasks" ("taskName", "priority", "status", "notes")
    VALUES ('Do Laundry', 'Medium', 'Not Started', 'Planning on doing on Sunday, after the Packers win!');

INSERT INTO "tasks" ("taskName", "priority", "status", "notes")
    VALUES ('Finish Weekend Assignment', 'High', 'In Progress', 'Work on throughout the weekend, and finish by Sunday before bed.');

INSERT INTO "tasks" ("taskName", "priority", "status", "notes")
    VALUES ('Feed Humphrey', 'High', 'Completed', 'Cat needs to eat, and that he did.');