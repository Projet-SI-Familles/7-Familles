# Projet de SI CreaCosm

## Build le docker
```bash
docker-compose build
```

## Lancer le docker (Ajout d'un script lançant directement le projet avec cette commande, attention, il faut build le front et le back avant de pouvoir utiliser l'application)
```bash
docker-compose up
```

## Aller dans le front et installer les dépendances
```bash
npm install
```

## Aller dans le back et installer les dépendances
```bash
symfony composer install
```

## Lancer le serveur symfony (en cas de bug du script de lancement)
```bash
symfony serve --allow-all-ip
```

## Lancer le serveur front (en cas de bug du script de lancement)
```bash
ng serve --host 0.0.0.0 &
```

## Accéder à l'application
```bash
http://localhost:8020
```

## En cas de problème avec le dump de la bd postegres (le dump qui bug parfois), je conseil de se connecter à postegres et executer le script dump.sql

### Lien : DATABASE_URL=postgresql://postgres:postgres@postgres_db:5432/projetsi


## ATTENTION! l'application ne marchera qu'en présence du BAAS de gestion des epreuves (groupe de Nicolas)