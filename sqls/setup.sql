DROP DATABASE IF EXISTS crm;
CREATE DATABASE crm;
use crm;

DROP TABLE IF EXISTS credentials;
CREATE TABLE credentials(
);

DROP TABLE IF EXISTS customers;
CREATE TABLE customers(
id int not null AUTO_INCREMENT,
name varchar(70) not null,
city varchar(30),
contact varchar(10) not null,
type char(1),
email varchar(70),
created_at timestamp default CURRENT_TIMESTAMP,
updated_at timestamp default CURRENT_TIMESTAMP,
PRIMARY KEY(id)
);

insert into customers(name, contact, type, email) values('Admin', '1234567890', 'A', 'admin@admin.com');

DROP TABLE IF EXISTS meetings;
CREATE TABLE meetings(
id int not null AUTO_INCREMENT,
mn varchar(15) not null,
nos int not null,
created_at timestamp default CURRENT_TIMESTAMP,
updated_at timestamp default CURRENT_TIMESTAMP,
PRIMARY KEY(id)
);

insert into meetings(mn, nos) values('January', 0);
insert into meetings(mn, nos) values('February', 0);
insert into meetings(mn, nos) values('March', 0);
insert into meetings(mn, nos) values('April', 0);
insert into meetings(mn, nos) values('May', 0);
insert into meetings(mn, nos) values('June', 0);
insert into meetings(mn, nos) values('July', 0);
insert into meetings(mn, nos) values('August', 0);
insert into meetings(mn, nos) values('September', 0);
insert into meetings(mn, nos) values('October', 0);
insert into meetings(mn, nos) values('November', 0);
insert into meetings(mn, nos) values('December', 0);

DROP TABLE IF EXISTS queries;
CREATE TABLE queries(
id int not null AUTO_INCREMENT,
q_date timestamp,
customer_id int,
q_details varchar(500),
q_solved_date timestamp,
q_gap_reason varchar(5000),
q_type varchar(20),
created_at timestamp default CURRENT_TIMESTAMP,
updated_at timestamp default CURRENT_TIMESTAMP,
PRIMARY KEY(id),
FOREIGN KEY(customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS reviews;
CREATE TABLE reviews(
id int not null AUTO_INCREMENT,
r_date timestamp,
customer_id int,
suggestions varchar(5000),
followup_date timestamp,
created_at timestamp default CURRENT_TIMESTAMP,
updated_at timestamp default CURRENT_TIMESTAMP,
PRIMARY KEY(id),
FOREIGN KEY(customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS followups;
CREATE TABLE followups(
id int not null AUTO_INCREMENT,
customer_id int,
m_date timestamp,
m_details varchar(5000),
m_next_date timestamp,
created_at timestamp default CURRENT_TIMESTAMP,
updated_at timestamp default CURRENT_TIMESTAMP,
PRIMARY KEY(id),
FOREIGN KEY(customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS transactions;
CREATE TABLE transactions(
id int not null AUTO_INCREMENT,
customer_id int,
t_date timestamp,
scheme_name varchar(200),
investment_type varchar(20),
t_amount int,
kyc_status varchar(5),
next_t_date timestamp,
courier_done varchar(5),
created_at timestamp default CURRENT_TIMESTAMP,
updated_at timestamp default CURRENT_TIMESTAMP,
PRIMARY KEY(id),
FOREIGN KEY(customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS tasks;
CREATE TABLE tasks(
id int not null AUTO_INCREMENT,
t_brief varchar(200),
t_details varchar(5000),
t_deadline int,
t_status varchar(20),
t_start_date varchar(50),
created_at timestamp default CURRENT_TIMESTAMP,
updated_at timestamp default CURRENT_TIMESTAMP,
PRIMARY KEY(id)
);