CREATE TABLE IF NOT EXISTS public.format
(
    id BIGSERIAL PRIMARY KEY,
    format TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS public.position
(
    id BIGSERIAL PRIMARY KEY,
    position TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS public.role
(
    id BIGSERIAL PRIMARY KEY,
    role TEXT NOT NULL
);


CREATE TABLE IF NOT EXISTS public.task_priority
(
    id BIGSERIAL PRIMARY KEY,
    task_priority TEXT
);

CREATE TABLE IF NOT EXISTS public.task_status
(
    id BIGSERIAL PRIMARY KEY,
    task_status TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS public.user_status
(
    id BIGSERIAL PRIMARY KEY,
    user_status TEXT NOT NULL
);


CREATE TABLE IF NOT EXISTS public.users
(
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    surname TEXT NOT NULL,
    otchestvo TEXT,
    phone TEXT,
    mail TEXT,
    position_id BIGINT REFERENCES position,
    contract TEXT NOT NULL,
    login TEXT NOT NULL,
    password TEXT NOT NULL,
    role_id BIGINT REFERENCES role,
    status_id BIGINT REFERENCES user_status,
    birthday TIMESTAMPTZ
);


CREATE TABLE IF NOT EXISTS public.task
(
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    report TEXT,
    client TEXT,
    manager_id BIGINT REFERENCES users,
    task_status_id BIGINT REFERENCES task_status,
    task_priority_id BIGINT REFERENCES task_priority,
    format_id BIGINT REFERENCES format,
    deadline TIMESTAMPTZ
);


CREATE TABLE IF NOT EXISTS public.comments
(
    id BIGSERIAL PRIMARY KEY,
    task_id BIGINT REFERENCES task,
    user_id BIGINT REFERENCES users,
    text TEXT NOT NULL,
    files TEXT,
    time TIMESTAMPTZ
);


CREATE TABLE IF NOT EXISTS public.distribution
(
    id BIGSERIAL PRIMARY KEY,
    task_id BIGINT REFERENCES task,
    user_id BIGINT REFERENCES users,
    users_task_role TEXT
);