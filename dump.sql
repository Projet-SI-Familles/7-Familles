-- Force PostgreSQL à ne pas exécuter tout dans une seule transaction
set ON_ERROR_STOP on
SET client_min_messages TO WARNING;

-- Drop tables in proper order
DROP TABLE IF EXISTS public.RawMaterial CASCADE;
DROP TABLE IF EXISTS public.Game CASCADE;
DROP TABLE IF EXISTS public.Family CASCADE;

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2025-03-06 14:08:36

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



CREATE TABLE public.Family (
                               idfamily integer NOT NULL,
                               name character varying(50),
                               description text
);


ALTER TABLE public.Family OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16986)
-- Name: Game; Type: TABLE; Schema: public; Owner: postgres
--

DROP TABLE IF EXISTS Game CASCADE;

CREATE TABLE public.Game (
                               idgame SERIAL PRIMARY KEY,
                               codepartie VARCHAR(255) NOT NULL,
                               iswin BOOLEAN,
                               start_date TIMESTAMP,
                               end_date TIMESTAMP
);



ALTER TABLE public.Game OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 17005)
-- Name: RawMaterial; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.RawMaterial (
                                    idRawMaterial integer NOT NULL,
                                    name character varying(50),
                                    description text,
                                    image character varying(200),
                                    idfamily integer NOT NULL
);


ALTER TABLE public.RawMaterial OWNER TO postgres;

--
-- TOC entry 4853 (class 0 OID 16998)
-- Dependencies: 219
-- Data for Name: Family; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.Family (idfamily, name, description) VALUES (1, 'Actifs', 'Donne les propriétés bénéfiques au produit cosmétique : hydratant, nourrissant, amincissant
');
INSERT INTO public.Family (idfamily, name, description) VALUES (2, 'Texturants', 'Donne la texture particulière au produit : léger, visqueux, épais, mousse');
INSERT INTO public.Family (idfamily, name, description) VALUES (3, 'Colorants', 'Colorant = colore le produit / pigment = colore la peau, les cheveux…');
INSERT INTO public.Family (idfamily, name, description) VALUES (4, 'Conservateur', 'Protège le produit des microbes');
INSERT INTO public.Family (idfamily, name, description) VALUES (5, 'Emulsifiant', 'Permet de lier les phases grasse et aqueuse entre elles');
INSERT INTO public.Family (idfamily, name, description) VALUES (6, 'Phase aqueuse', 'Constituée essentiellement d’eau. Entrant dans la composition d’un produit cosmétique afin d’hydrater la peau');
INSERT INTO public.Family (idfamily, name, description) VALUES (7, 'Phase grasse', 'Constituée essentiellement de composés huileux. Entrant dans la composition d’un produit cosmétique afin de protéger la peau des agressions extérieures');


--
-- TOC entry 4854 (class 0 OID 17005)
-- Dependencies: 220
-- Data for Name: RawMaterial; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.RawMaterial (idRawMaterial, name, description, image, idfamily) VALUES (3, 'Huile végétale ', 'Corps gras extrait d’une plante oléagineuse (dont les graines, noix ou fruits contiennent des lipides)', '/img/composants/huile-vegetale.webp', 7);
INSERT INTO public.RawMaterial (idRawMaterial, name, description, image, idfamily) VALUES (4, 'Beurre de karité', 'Corps gras extrait des fruits de Karité (noix) qui protège des rayons du soleil', '/img/composants/beurre-karité.png', 7);
INSERT INTO public.RawMaterial (idRawMaterial, name, description, image, idfamily) VALUES (6, 'Caféine', 'Permet de raffermir la peau', '/img/composants/cafeine.png', 1);
INSERT INTO public.RawMaterial (idRawMaterial, name, description, image, idfamily) VALUES (7, 'Vitamine E', 'Agit contre le vieillissement de la peau', '/img/composants/vitamine-e.webp', 1);
INSERT INTO public.RawMaterial (idRawMaterial, name, description, image, idfamily) VALUES (8, 'Allantoïne ', 'Permet de réparer la peau et de la rendre plus douce', '/img/composants/allantoïne.png', 1);
INSERT INTO public.RawMaterial (idRawMaterial, name, description, image, idfamily) VALUES (9, 'Glycérine ', 'Agent hydratant', '/img/composants/glycérine.webp', 6);
INSERT INTO public.RawMaterial (idRawMaterial, name, description, image, idfamily) VALUES (10, 'Eau minérale', 'Eau d’origine souterraine', '/img/composants/eau-minérale.png', 6);
INSERT INTO public.RawMaterial (idRawMaterial, name, description, image, idfamily) VALUES (11, 'Hydrolat ', 'Produit aqueux', '/img/composants/hydrolat.png', 6);
INSERT INTO public.RawMaterial (idRawMaterial, name, description, image, idfamily) VALUES (12, 'Lécithine ', 'Permet de mélanger eau et huile à froid', '/img/composants/lécithine.png', 5);
INSERT INTO public.RawMaterial (idRawMaterial, name, description, image, idfamily) VALUES (13, 'Cosgard ', 'Évite le développement des bactéries', '/img/composants/cosgard.webp', 4);
INSERT INTO public.RawMaterial (idRawMaterial, name, description, image, idfamily) VALUES (14, 'Extrait de pépins de pamplemousse', 'Évite le développement des bactéries', '/img/composants/extrait-de-pépins-de-pamplemousse.png', 4);
INSERT INTO public.RawMaterial (idRawMaterial, name, description, image, idfamily) VALUES (15, 'Poudre de Mica', 'Apporte de la couleur à un produit', '/img/composants/poudre-de-mica.jpg', 3);
INSERT INTO public.RawMaterial (idRawMaterial, name, description, image, idfamily) VALUES (16, 'Oxyde noir', 'Fonce la teinte d’un produit', '/img/composants/oxyde-noir.png', 3);
INSERT INTO public.RawMaterial (idRawMaterial, name, description, image, idfamily) VALUES (1, 'Cire d''abeille', 'Epaississant', '/img/composants/cire-abeille.png', 2);
INSERT INTO public.RawMaterial (idRawMaterial, name, description, image, idfamily) VALUES (2, 'Gomme xanthane', 'Permet d’épaissir et gélifier un produit', '/img/composants/gomme-xanthane.png', 2);
INSERT INTO public.RawMaterial (idRawMaterial, name, description, image, idfamily) VALUES (5, 'Gomme guar', 'Permet de gélifier un produit', '/img/composants/gomme-guar.png', 2);


--
-- TOC entry 4705 (class 2606 OID 17011)
-- Name: RawMaterial component_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.RawMaterial
    ADD CONSTRAINT component_pkey PRIMARY KEY (idRawMaterial);


--
-- TOC entry 4703 (class 2606 OID 17004)
-- Name: Family family_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.Family
    ADD CONSTRAINT family_pkey PRIMARY KEY (idfamily);


--
-- TOC entry 4701 (class 2606 OID 16990)
-- Name: Game game_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--




--
-- TOC entry 4706 (class 2606 OID 17012)
-- Name: RawMaterial component_idfamily_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.RawMaterial
    ADD CONSTRAINT component_idfamily_fkey FOREIGN KEY (idfamily) REFERENCES public.Family(idfamily);


-- Completed on 2025-03-06 14:08:36

--
-- PostgreSQL database dump complete
--

