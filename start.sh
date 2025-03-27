#!/bin/sh

echo "🔄 Génération des variables d'environnement Angular..."
cd /var/www/html/7-Familles-Front
node ./src/environments/replace_environment_variables.js

echo "🚀 Lancement du backend Symfony..."
cd /var/www/html/7-Familles-Back
symfony serve --allow-all-ip &

echo "🌐 Lancement du frontend Angular..."
cd /var/www/html/7-Familles-Front
ng serve --host 0.0.0.0

wait
