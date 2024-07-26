# EQ_04_00 - Thomas AMBROISE, Tadéo PLAZA--BÉVAN, Félix HENNEQUIN, Anton ROBINEAU
Site internet proposant des scéances et exercices de sport et des recettes pour bien manger.

# Présentation du projet
Dumbhealth est une plateforme en ligne qui offre des séances d'exercices physiques basées sur l'API Exercises de [api-ninjas.com](https://api-ninjas.com/), ainsi que des recettes pour une alimentation saine et équilibrée provenant d'une base de données que nous avons constituée. Notre API dispose d'un accès restreint via un système de clés API, stockées dans notre propre base de données. Le backend repose sur une architecture de microservices, comprenant trois services distincts : le premier pour les exercices, le deuxième pour la nutrition, et enfin le service de gestion des clés API.

## ExerciseService
Ce service agit comme une passerelle simple entre le client et le serveur, récupérant les données directement depuis l'API [api-ninjas.com/api/exercises](https://api-ninjas.com/api/exercises).

## NutritionService
Le service de nutrition permet la manipulation des recettes, incluant leur création, suppression et modification, grâce à une base de données MongoDB.

## KeyService
Les clés API sont utilisées pour sécuriser l'accès à notre API. Elles sont générées à l'aide de la bibliothèque crypto de NodeJS et stockées dans une base de données MongoDB. Chaque clé possède des autorisations administratives et une date d'expiration. Ce service joue un rôle crucial dans la vérification des clés API.

## Serveur principal
Le serveur principal, basé sur ExpressJS, utilise http-proxy-middleware pour rediriger toutes les requêtes vers les microservices correspondants. Chaque service est identifié par un code spécifique dans les requêtes, par exemple "exe" pour ExerciseService et "nut" pour NutritionService. Le service de gestion des clés API n'est pas accessible directement depuis un client externe, son adresse est donc configurée dans le fichier .env, tandis que les configurations des microservices sont définies dans le fichier config.json du serveur.

## Client Web
Le client web est entièrement développé avec le framework Vite et React en JavaScript. Les appels à l'API sont effectués à l'aide d'Axios, un client HTTP reposant sur les promesses.

## Déploiement
Le déploiement se déroule en trois étapes. Pour les microservices, nous utilisons Podman pour les conteneurs et pm2 pour les exécuter en arrière-plan sur le conteneur, chacun étant associé à un port spécifique. Le serveur est exécuté localement à l'aide de forever (similaire à pm2). Chaque dossier de microservice contient un fichier Podmanfile pour configurer l'image et un fichier deploy.sh pour créer l'image à partir du Podmanfile et démarrer le conteneur. Pour le serveur, il suffit de lancer la commande npm run start et le serveur démarre automatiquement en tant que démon géré par forever. La partie client web, Vite nous permet de faire la commande `vite build` ou directement configuré dans le package.json

## Précision
En raison de contraintes de temps, les microservices suivants ne seront pas intégrés dans la SAE : UserService, NutritionService.
