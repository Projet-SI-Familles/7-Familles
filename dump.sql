--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2025-03-04 18:59:08

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 219 (class 1259 OID 16998)
-- Name: Family; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE Family (
    idfamily integer NOT NULL,
    name character varying(50),
    description text
);


ALTER TABLE Family OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16986)
-- Name: Game; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE Game (
    codepartie integer NOT NULL,
    iswin boolean,
    start_date timestamp without time zone,
    end_date timestamp without time zone
);


ALTER TABLE Game OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 17005)
-- Name: RawMaterial; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE RawMaterial (
    idRawMaterial integer NOT NULL,
    name character varying(50),
    description text,
    image character varying(200),
    idfamily integer NOT NULL
);


ALTER TABLE RawMaterial OWNER TO postgres;

--
-- TOC entry 4856 (class 0 OID 16998)
-- Dependencies: 219
-- Data for Name: Family; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY Family (idfamily, name, description) FROM stdin;
1	Actifs	Donne les propriétés bénéfiques au produit cosmétique : hydratant, nourrissant, amincissant\n
2	Texturants	Donne la texture particulière au produit : léger, visqueux, épais, mousse
3	Colorants	Colorant = colore le produit / pigment = colore la peau, les cheveux…
4	Conservateur	Protège le produit des microbes
5	Emulsifiant	Permet de lier les phases grasse et aqueuse entre elles
6	Phase aqueuse	Constituée essentiellement d’eau. Entrant dans la composition d’un produit cosmétique afin d’hydrater la peau
7	Phase grasse	Constituée essentiellement de composés huileux. Entrant dans la composition d’un produit cosmétique afin de protéger la peau des agressions extérieures
\.


--
-- TOC entry 4855 (class 0 OID 16986)
-- Dependencies: 218
-- Data for Name: Game; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY Game (codepartie, iswin, start_date, end_date) FROM stdin;
1	f	\N	2025-01-04 12:04:11.438264
\.


--
-- TOC entry 4857 (class 0 OID 17005)
-- Dependencies: 220
-- Data for Name: RawMaterial; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY RawMaterial (idRawMaterial, name, description, image, idfamily) FROM stdin;
3	Huile végétale 	Corps gras extrait d’une plante oléagineuse (dont les graines, noix ou fruits contiennent des lipides)	\N	7
4	Beurre de karité	Corps gras extrait des fruits de Karité (noix) qui protège des rayons du soleil	\N	7
6	Caféine	Permet de raffermir la peau	\N	1
7	Vitamine E	Agit contre le vieillissement de la peau	\N	1
8	Allantoïne 	Permet de réparer la peau et de la rendre plus douce	\N	1
9	Glycérine 	Agent hydratant	\N	7
10	Eau minérale	Eau d’origine souterraine	\N	7
11	Hydrolat 	Produit aqueux	\N	7
12	Lécithine 	Permet de mélanger eau et huile à froid	\N	5
13	Cosgard 	Évite le développement des bactéries	\N	4
14	Extrait de pépins de pamplemousse	Évite le développement des bactéries	\N	4
15	Poudre de Mica	Apporte de la couleur à un produit	\N	3
16	Oxyde noir	Fonce la teinte d’un produit	\N	3
1	Cire d'abeille	Epaississant	\N	2
2	Gomme xanthane	Permet d’épaissir et gélifier un produit\n	\N	2
5	Gomme guar	Permet de gélifier un produit	\N	2
\.


--
-- TOC entry 4708 (class 2606 OID 17011)
-- Name: RawMaterial component_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY RawMaterial
    ADD CONSTRAINT component_pkey PRIMARY KEY (idRawMaterial);


--
-- TOC entry 4706 (class 2606 OID 17004)
-- Name: Family family_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY Family
    ADD CONSTRAINT family_pkey PRIMARY KEY (idfamily);


--
-- TOC entry 4704 (class 2606 OID 16990)
-- Name: Game game_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY Game
    ADD CONSTRAINT game_pkey PRIMARY KEY (codepartie);


--
-- TOC entry 4709 (class 2606 OID 17012)
-- Name: RawMaterial component_idfamily_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY RawMaterial
    ADD CONSTRAINT component_idfamily_fkey FOREIGN KEY (idfamily) REFERENCES Family(idfamily);


-- Completed on 2025-03-04 18:59:08

--
-- PostgreSQL database dump complete
--

