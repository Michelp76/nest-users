CRUD basique avec [Nestjs](https://nestjs.com/), branché à Drizzle ORM
Sur une base Postgresql "réelle" (libre de droits) :
https://postgrespro.com/community/demodb

## Installation des modules

```bash
npm install
```

## Installation des images (Postgres + PgAdmin) Docker

/!\ Installer avant "Docker Desktop" (pour Windows)

![image](https://github.com/user-attachments/assets/13fe9ec6-edaf-485f-b03f-4d2c2267a24c)

Puis dans un terminal :
```bash
docker compose -f docker-compose-yml up
```

## Lancer les migrations Drizzle (pour créer la base de données à partir du script SQL)

```bash
npm run db:migrate
```

## Insérer les données dans les tables depuis le dump .sql inclus dans le sous-dossier ./db/

```bash
docker exec -i nest-users-postgres-1 psql -h host.docker.internal -f /home/db/airports_db.sql -U postgres
```

## Vérifier la base de données avec PgAdmin

Se connecter à http://localhost:8080/browser/  
Login & mdp PgAdmin trouvables dans le fichier config "docker-compose-yml"  

"Enregistrer" un nouveau serveur tel que : 

![image](https://github.com/user-attachments/assets/e05e8b2c-04f7-4aee-9fde-bdfab0f0ffa5)

Vérifier que les tables sont bien créées et alimentées : 

![image](https://github.com/user-attachments/assets/fe0ea7d0-1eb1-40fe-aa54-c3b8df8b91cb)


## Lancer le serveur Nestjs (applicatif)

```bash
npm run start:dev
```

## Tester les API avec "Insomnia"

/!\ Installer avant "Insomnia"

Importer les requêtes HTTP suivantes dans Insomnia (format Json).  
Copier le code Json suivant :

```json
{"_type":"export","__export_format":4,"__export_date":"2024-12-04T15:25:10.055Z","__export_source":"insomnia.desktop.app:v10.2.0","resources":[{"_id":"req_7681b8b4720841f3a42abf1cae294502","parentId":"wrk_3322a2956942472c9aa1d28ec985af0e","modified":1732877569653,"created":1730211448596,"url":"http://localhost:3000/airports_data/","name":"Airports_data - Insert","description":"","method":"POST","body":{"mimeType":"application/json","text":"{\n  \"airportCode\" : \"ZMI\",\t\n\t\"airportName\" : \"SEDR Airport 3\",\n\t\"city\" : \"Saint Etienne\",\n\t\"coordinates\" : {\"x\":48.0063018799,\"y\":46.2832984924},\n\t\"timezone\" : \"Beijing/Bangkok\"\n}"},"parameters":[],"headers":[{"name":"Content-Type","value":"application/json"},{"name":"User-Agent","value":"insomnia/10.1.1"}],"authentication":{},"metaSortKey":-1730211448596,"isPrivate":false,"pathParameters":[],"settingStoreCookies":true,"settingSendCookies":true,"settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingRebuildPath":true,"settingFollowRedirects":"global","_type":"request"},{"_id":"wrk_3322a2956942472c9aa1d28ec985af0e","parentId":null,"modified":1730110611928,"created":1730110611928,"name":"NestJs-Airports","description":"","scope":"collection","_type":"workspace"},{"_id":"req_660c8f2dfcca41b090ed1006d40cd290","parentId":"wrk_3322a2956942472c9aa1d28ec985af0e","modified":1733325620247,"created":1732875615194,"url":"http://localhost:3000/flights/","name":"Flights - Insert","description":"","method":"POST","body":{"mimeType":"application/json","text":"{\n\t\"flightId\": 99999,\n\t\"flightNo\": \"PG9999\",\n\t\"scheduledDeparture\": \"2017-08-19 06:35:00+00\",\n\t\"scheduledArrival\": \"2017-08-19 09:00:00+00\",\n\t\"departureAirport\": \"KRO\",\n\t\"arrivalAirport\": \"KJA\",\n\t\"status\": \"Scheduled\",\n\t\"aircraftCode\": \"CR2\",\n\t\"actualDeparture\": null,\n\t\"actualArrival\": null\n}"},"parameters":[],"headers":[{"name":"Content-Type","value":"application/json"},{"name":"User-Agent","value":"insomnia/10.1.1"}],"authentication":{},"metaSortKey":-1730202619853,"isPrivate":false,"pathParameters":[],"settingStoreCookies":true,"settingSendCookies":true,"settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingRebuildPath":true,"settingFollowRedirects":"global","_type":"request"},{"_id":"req_f61cbf73c4ec46599af09381668b5051","parentId":"wrk_3322a2956942472c9aa1d28ec985af0e","modified":1732718261020,"created":1730193791110,"url":"http://localhost:3000/airports_data/MQF","name":"Airports_data - Update","description":"","method":"PATCH","body":{"mimeType":"application/json","text":"{\n\t\"airportName\": \"SEDR Airport\",\n\t\"city\": \"Saint Etienne city two\",\n\t\"coordinates\": {\n\t\t\"x\": 48.0063018799,\n\t\t\"y\": 46.2832984924\n\t},\n\t\"timezone\": \"Beijing/Bangkok\"\n}\n"},"parameters":[],"headers":[{"name":"Content-Type","value":"application/json"},{"name":"User-Agent","value":"insomnia/10.1.1"}],"authentication":{},"metaSortKey":-1730193791110,"isPrivate":false,"pathParameters":[],"settingStoreCookies":true,"settingSendCookies":true,"settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingRebuildPath":true,"settingFollowRedirects":"global","_type":"request"},{"_id":"req_6673f51cd0884ba58bff2aab60b5963a","parentId":"wrk_3322a2956942472c9aa1d28ec985af0e","modified":1733325737286,"created":1732875628804,"url":"http://localhost:3000/flights/99999","name":"Flights - Update","description":"","method":"PATCH","body":{"mimeType":"application/json","text":"{\n\t\"flightNo\": \"PG9998\",\n\t\"scheduledDeparture\": \"2017-08-19 06:35:00+00\",\n\t\"scheduledArrival\": \"2017-08-19 09:00:00+00\",\n\t\"departureAirport\": \"KRO\",\n\t\"arrivalAirport\": \"KJA\",\n\t\"status\": \"Scheduled\",\n\t\"aircraftCode\": \"CR2\",\n\t\"actualDeparture\": null,\n\t\"actualArrival\": null\n}"},"parameters":[],"headers":[{"name":"Content-Type","value":"application/json"},{"name":"User-Agent","value":"insomnia/10.1.1"}],"authentication":{},"metaSortKey":-1730161921129,"isPrivate":false,"pathParameters":[],"settingStoreCookies":true,"settingSendCookies":true,"settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingRebuildPath":true,"settingFollowRedirects":"global","_type":"request"},{"_id":"req_45df4a4b8d074ca3a9066a37a797e069","parentId":"wrk_3322a2956942472c9aa1d28ec985af0e","modified":1732635456208,"created":1730130051148,"url":"http://localhost:3000/airports_data/VOZ","name":"Airports_data - Delete","description":"","method":"DELETE","body":{},"parameters":[],"headers":[{"name":"User-Agent","value":"insomnia/10.1.1"}],"authentication":{},"metaSortKey":-1730130051148,"isPrivate":false,"pathParameters":[],"settingStoreCookies":true,"settingSendCookies":true,"settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingRebuildPath":true,"settingFollowRedirects":"global","_type":"request"},{"_id":"req_1cbf7fcf0d494fa0a33f8824f5d3c45e","parentId":"wrk_3322a2956942472c9aa1d28ec985af0e","modified":1733325798568,"created":1732875635542,"url":"http://localhost:3000/flights/99999","name":"Flights - Delete","description":"","method":"DELETE","body":{},"parameters":[],"headers":[{"name":"User-Agent","value":"insomnia/10.1.1"}],"authentication":{},"metaSortKey":-1730128520170,"isPrivate":false,"pathParameters":[],"settingStoreCookies":true,"settingSendCookies":true,"settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingRebuildPath":true,"settingFollowRedirects":"global","_type":"request"},{"_id":"req_bfd34aaad81c4e28b906153147522dfb","parentId":"wrk_3322a2956942472c9aa1d28ec985af0e","modified":1730193945275,"created":1730126989192,"url":"http://localhost:3000/airports_data/","name":"Airports_data - Find All","description":"","method":"GET","body":{},"parameters":[],"headers":[{"name":"User-Agent","value":"insomnia/10.1.1"}],"authentication":{},"metaSortKey":-1730126989192,"isPrivate":false,"pathParameters":[],"settingStoreCookies":true,"settingSendCookies":true,"settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingRebuildPath":true,"settingFollowRedirects":"global","_type":"request"},{"_id":"req_f98d4f9ea195477dbff4e7fc6e34d13a","parentId":"wrk_3322a2956942472c9aa1d28ec985af0e","modified":1732876545172,"created":1732875646889,"url":"http://localhost:3000/flights/","name":"Flights - Find All","description":"","method":"GET","body":{},"parameters":[],"headers":[{"name":"User-Agent","value":"insomnia/10.1.1"}],"authentication":{},"metaSortKey":-1730118933376.5,"isPrivate":false,"pathParameters":[],"settingStoreCookies":true,"settingSendCookies":true,"settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingRebuildPath":true,"settingFollowRedirects":"global","_type":"request"},{"_id":"req_82d7c566014e4354bdde525cdcf67793","parentId":"wrk_3322a2956942472c9aa1d28ec985af0e","modified":1732718256866,"created":1730110877561,"url":"http://localhost:3000/airports_data/MQF","name":"Airports_data - Get By Id","description":"","method":"GET","body":{},"parameters":[],"headers":[{"name":"User-Agent","value":"insomnia/10.1.1"}],"authentication":{},"metaSortKey":-1730110877561,"isPrivate":false,"pathParameters":[],"settingStoreCookies":true,"settingSendCookies":true,"settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingRebuildPath":true,"settingFollowRedirects":"global","_type":"request"},{"_id":"req_6bb762929c664bb6b13ce4b763f47f28","parentId":"wrk_3322a2956942472c9aa1d28ec985af0e","modified":1733325806839,"created":1732875653662,"url":"http://localhost:3000/flights/99999","name":"Flights - Get By Id","description":"","method":"GET","body":{},"parameters":[],"headers":[{"name":"User-Agent","value":"insomnia/10.1.1"}],"authentication":{},"metaSortKey":-1730110877511,"isPrivate":false,"pathParameters":[],"settingStoreCookies":true,"settingSendCookies":true,"settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingRebuildPath":true,"settingFollowRedirects":"global","_type":"request"},{"_id":"env_b6c46a6f4ecdc5f55ab6d534ace1222315e99546","parentId":"wrk_3322a2956942472c9aa1d28ec985af0e","modified":1730110611930,"created":1730110611930,"name":"Base Environment","data":{},"dataPropertyOrder":null,"color":null,"isPrivate":false,"metaSortKey":1730110611930,"_type":"environment"},{"_id":"jar_b6c46a6f4ecdc5f55ab6d534ace1222315e99546","parentId":"wrk_3322a2956942472c9aa1d28ec985af0e","modified":1730110611933,"created":1730110611933,"name":"Default Jar","cookies":[],"_type":"cookie_jar"}]}
```

Et importer le dans Insomnia de la manière suivante : 

![image](https://github.com/user-attachments/assets/025f1db7-aeae-443b-bec1-e26483e02166)

![image](https://github.com/user-attachments/assets/400461a1-a473-4f43-ba9a-a353f85e855c)



![image](https://github.com/user-attachments/assets/1eb9a7ce-4cfd-4010-b21f-10fdd28f7efc)

Correspondant respectivement aux méthodes (ici dans le Controller) :

![image](https://github.com/user-attachments/assets/86f4dd7a-92dc-4131-9316-c3df0db1de88)

## Consulter les logs (générés par Winston) sur l'interface "Seq"

![image](https://github.com/user-attachments/assets/5d2d997d-3d80-4b67-b16b-0a98658eb093)

Ouvrir http://localhost:5341

(Je n'ai pas réussi à intégrer "morgan" pour avoir les logs Express, pas vraiment bien expliqué dans la doc "nest-winston")
