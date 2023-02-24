--
-- PostgreSQL database dump
--

-- Dumped from database version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.12 (Ubuntu 12.12-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    visits bigint DEFAULT 0 NOT NULL,
    user_id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    token text,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (8, 'https://...', '-OLynzqN1SoCnMrg-9GUS', 0, 2, '2022-12-21 10:04:56.98453');
INSERT INTO public.urls VALUES (9, 'https://...', 'jZCsGWh-QUCEjRg-4bbcr', 0, 2, '2022-12-21 10:04:57.816312');
INSERT INTO public.urls VALUES (10, 'https://...', 'RB5lS_qSOO_3lCjpv3buP', 0, 2, '2022-12-21 10:04:58.270771');
INSERT INTO public.urls VALUES (11, 'https://...', 'Gv4iQsEcogplQrMvvao4B', 0, 2, '2022-12-21 10:04:58.712883');
INSERT INTO public.urls VALUES (12, 'https://...', 'FW13eDKLNxBEVY_2FCf6S', 0, 2, '2022-12-21 10:04:59.126415');
INSERT INTO public.urls VALUES (13, 'https://...', 'Nz3PQhVzAsKRH-4OdlsLd', 0, 2, '2022-12-21 10:04:59.537127');
INSERT INTO public.urls VALUES (14, 'https://...', 'smPf9pUFAYn43uHwb0q3g', 0, 1, '2022-12-21 10:11:45.22473');
INSERT INTO public.urls VALUES (15, 'https://...', 'H5Yiq1byZ0uOq_-R9s20O', 0, 1, '2022-12-21 10:11:46.711521');
INSERT INTO public.urls VALUES (7, 'https://...', '33nh2HdkSdBUe4yiC9M3F', 5, 2, '2022-12-21 10:04:55.252157');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (2, 'Maria', 'luci@ail.com', '$2b$10$2WvBVDW/JGoEHZhY7q0Rs.QiK.IsRtazEkD1Oh4p.X0cnqOsGQENW', '9ee3b7f5-dd7e-44d7-a38d-ff1f7dc0928b', '2022-12-19 13:32:03.189942');
INSERT INTO public.users VALUES (1, 'João', 'joao@driven.com.br', '$2b$10$MZnqwPZYVmcD1dFbUJYjFeMjtRw41twZMJ0oaQYUQBfsre7hUZ9yS', 'f075ab41-7769-485e-a908-141189ee6b4d', '2022-12-19 09:09:53.18999');


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 15, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_name_key UNIQUE (name);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

