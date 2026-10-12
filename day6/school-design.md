# School Database Design

## Tables

- **Students:** Stores each student's ID, name, and email address. The student ID is the primary key, and each email address must be unique.
- **Courses:** Stores each course's ID and name. The course ID is the primary key.
- **Enrolments:** Records which student takes which course, including the student's grade. It has its own primary key and foreign keys referencing students and courses. A unique constraint prevents duplicate enrolments for the same student and course.

## Relationships

Students and enrolments have a one-to-many relationship because one student can have several enrolments, while each enrolment belongs to one student. Courses and enrolments also have a one-to-many relationship because one course can have several enrolments, while each enrolment refers to one course.

Students and courses have a many-to-many relationship. A student can take several courses, and each course can have several students. The enrolments table acts as a join table between students and courses. It also stores the grade for each student in each course.

## Index

I would add an index on `enrolments(course_id)` to speed up queries that retrieve students on a particular course or count enrolments by course. This is useful as the database grows. The unique student email constraint already provides an index for email lookups in SQLite.

## SQL or NoSQL?

I would choose SQL for this school database because students, courses, and enrolments have clear relationships and require reliable data integrity. Primary keys, foreign keys, unique constraints, and joins help maintain accurate records and prevent duplicate enrolments. SQL also makes it straightforward to calculate student counts and retrieve grades. A relational database such as SQLite is a suitable choice for this small school system.
