# Projet de SI CreaCosm

## Build le docker
```bash
docker-compose build
```

## Lancer le docker
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

## Lancer le serveur symfony
```bash
symfony serve --allow-all-ip
```

## Lancer le serveur front
```bash
ng serve --host 0.0.0.0 &
```

## Accéder à l'application
```bash
http://localhost:8020
```

## En cas de problème avec le dump de la bd postegres, nous avons aussi créé une fixture dans symfony il suffit donc de la load pour initaliser les données.

```bash
symfony console doctrine:fixtures:load
```

## ATTENTION! l'application ne marchera qu'en présence du BAAS de gestion des epreuves (groupe de Nicolas)