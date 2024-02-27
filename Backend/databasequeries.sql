CREATE TABLE volunteers (
	volunteer_code INT NOT NULL,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	times_volunteered INT DEFAULT 0,
	is_admin BOOLEAN DEFAULT FALSE,
	CONSTRAINT volunteers_pk PRIMARY KEY (volunteer_code)
)

CREATE TABLE worksessions (
	session_id SERIAL NOT NULL,
	volunteer_code INT NOT NULL,
	work_location VARCHAR(100) NOT NULL,
	work_role VARCHAR(50) NOT NULL,
	clock_in_time TIMESTAMP NOT NULL,
	clock_out_time TIMESTAMP,
	CONSTRAINT worksessions_pk PRIMARY KEY (session_id),
	CONSTRAINT worksessions_fk_volunteers FOREIGN KEY (volunteer_code) REFERENCES volunteers (volunteer_code)
	
)

CREATE TABLE roles (
	role_id SERIAL NOT NULL,
	role_name VARCHAR(100) UNIQUE NOT NULL,
	CONSTRAINT roles_pk PRIMARY KEY (role_id)
)

CREATE TABLE volunteer_roles (
	volunteer_code INT NOT NULL,
	role_id INT NOT NULL,
	CONSTRAINT volunteer_roles_pk PRIMARY KEY (volunteer_code, role_id),
	CONSTRAINT volunteer_roles_fk_volunteers FOREIGN KEY (volunteer_code) REFERENCES volunteers(volunteer_code),
	CONSTRAINT volunteer_roles_fk_roles FOREIGN KEY (role_id) REFERENCES roles (role_id)
)