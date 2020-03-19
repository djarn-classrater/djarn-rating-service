create schema if not exists rating collate utf8mb4_0900_ai_ci;

create table if not exists rating.Rate
(
	id int auto_increment
		primary key,
	studentId varchar(255) null,
	courseId varchar(255) null,
	rating float null,
	constraint rate_studentId_courseId_uindex
		unique (studentId, courseId)
);
