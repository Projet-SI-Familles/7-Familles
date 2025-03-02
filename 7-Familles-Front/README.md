# CardsMemo
Front en Angular pour l'escape game de creacosm.

## Version des stacks
Angular cli version : 19.1.5
nodeJS version : 10.8.2


## Comment faire fonctionner cette application
C'est la partie front de l'application nous devons la placer dans un dossier /front à la racine du dossier contenant le dockerfile correspondant.

Dans le repertoire du docker file executer les commandes suivantes :

Build le conteneur :
```
docker build -t memocosm-front .
```

Run le conteneur : 
```
docker run -it -p 4200:4200 -v "$(pwd)/front:/app" memocosm-front /bin/sh
```

Vous serez directement dans le repertoire front. Vous pouvez maintenant cloner le repos et executer la commande suivant pour installer les dépendances :

```
npm install
```
