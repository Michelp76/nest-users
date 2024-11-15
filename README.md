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
docker compose -f docker-compose.yaml up
```

<del>## Lancer les migrations Drizzle (pour créer la base de données à partir du script SQL)</del>  

La restauration de la base à partir du dump (ci-dessous) devrait suffire

## Insérer les données dans les tables depuis le dump inclus dans le sous-dossier ./db

/!\ Non testé  
Cf. https://stackoverflow.com/a/24049420
```bash
docker exec -i nest-users-postgres-1 pg_restore -Fc -j 8  db/my_db_dump_20241115.sql --dbname=postgres://postgres:local@localhost:5432/
```

## Vérifier la base de données avec PgAdmin

Se connecter à http://localhost:8080/browser/  
Login & mdp PgAdmin trouvables dans le fichier config "docker-compose-yml"  
"Enregistrer" un nouveau serveur tel que : 

![image](https://github.com/user-attachments/assets/e05e8b2c-04f7-4aee-9fde-bdfab0f0ffa5)


## Lancer le serveur

```bash
npm run start:dev
```

## Tester les API avec "Insomnia"

/!\ Installer avant "Insomnia"

Importer les requêtes HTTP suivantes dans Insomnia (format Json)

```json
{"_type":"export","__export_format":4,"__export_date":"2024-11-15T14:14:10.768Z","__export_source":"insomnia.desktop.app:v10.1.1","resources":[{"_id":"req_7681b8b4720841f3a42abf1cae294502","parentId":"wrk_3322a2956942472c9aa1d28ec985af0e","modified":1730211556265,"created":1730211448596,"url":"http://localhost:3000/airports_data/","name":"Airports_data - Insert","description":"","method":"POST","body":{"mimeType":"application/json","text":"{\n\t\"airportCode\" : \"DIY\",\t\n\t\"airportName\" : \"DisneyAirport\",\n\t\"city\" : \"Orlando\",\n\t\"coordinates\" : {\"x\":48.0063018799,\"y\":46.2832984924},\n\t\"timezone\" : \"Paris/London\"\n}"},"parameters":[],"headers":[{"name":"Content-Type","value":"application/json"},{"name":"User-Agent","value":"insomnia/10.1.1"}],"authentication":{},"metaSortKey":-1730211448596,"isPrivate":false,"pathParameters":[],"settingStoreCookies":true,"settingSendCookies":true,"settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingRebuildPath":true,"settingFollowRedirects":"global","_type":"request"},{"_id":"wrk_3322a2956942472c9aa1d28ec985af0e","parentId":null,"modified":1730110611928,"created":1730110611928,"name":"NestJs-Airports","description":"","scope":"collection","_type":"workspace"},{"_id":"req_f61cbf73c4ec46599af09381668b5051","parentId":"wrk_3322a2956942472c9aa1d28ec985af0e","modified":1730211813230,"created":1730193791110,"url":"http://localhost:3000/airports_data/GRV","name":"Airports_data - Update","description":"","method":"PATCH","body":{"mimeType":"application/json","text":"{\n\t\"airportName\" : \"DisneyAirport\",\n\t\"city\" : \"Orlando\",\n\t\"coordinates\" : {\"x\":48.0063018799,\"y\":46.2832984924},\n\t\"timezone\" : \"Paris/Londoz\"\n}"},"parameters":[],"headers":[{"name":"Content-Type","value":"application/json"},{"name":"User-Agent","value":"insomnia/10.1.1"}],"authentication":{},"metaSortKey":-1730193791110,"isPrivate":false,"pathParameters":[],"settingStoreCookies":true,"settingSendCookies":true,"settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingRebuildPath":true,"settingFollowRedirects":"global","_type":"request"},{"_id":"req_45df4a4b8d074ca3a9066a37a797e069","parentId":"wrk_3322a2956942472c9aa1d28ec985af0e","modified":1731677734622,"created":1730130051148,"url":"http://localhost:3000/airports_data/DIY","name":"Airports_data - Delete","description":"","method":"DELETE","body":{},"parameters":[],"headers":[{"name":"User-Agent","value":"insomnia/10.1.1"}],"authentication":{},"metaSortKey":-1730130051148,"isPrivate":false,"pathParameters":[],"settingStoreCookies":true,"settingSendCookies":true,"settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingRebuildPath":true,"settingFollowRedirects":"global","_type":"request"},{"_id":"req_bfd34aaad81c4e28b906153147522dfb","parentId":"wrk_3322a2956942472c9aa1d28ec985af0e","modified":1730193945275,"created":1730126989192,"url":"http://localhost:3000/airports_data/","name":"Airports_data - Find All","description":"","method":"GET","body":{},"parameters":[],"headers":[{"name":"User-Agent","value":"insomnia/10.1.1"}],"authentication":{},"metaSortKey":-1730126989192,"isPrivate":false,"pathParameters":[],"settingStoreCookies":true,"settingSendCookies":true,"settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingRebuildPath":true,"settingFollowRedirects":"global","_type":"request"},{"_id":"req_82d7c566014e4354bdde525cdcf67793","parentId":"wrk_3322a2956942472c9aa1d28ec985af0e","modified":1731677741889,"created":1730110877561,"url":"http://localhost:3000/airports_data/DIY","name":"Airports_data - Get By Id","description":"","method":"GET","body":{},"parameters":[],"headers":[{"name":"User-Agent","value":"insomnia/10.1.1"}],"authentication":{},"metaSortKey":-1730110877561,"isPrivate":false,"pathParameters":[],"settingStoreCookies":true,"settingSendCookies":true,"settingDisableRenderRequestBody":false,"settingEncodeUrl":true,"settingRebuildPath":true,"settingFollowRedirects":"global","_type":"request"},{"_id":"env_b6c46a6f4ecdc5f55ab6d534ace1222315e99546","parentId":"wrk_3322a2956942472c9aa1d28ec985af0e","modified":1730110611930,"created":1730110611930,"name":"Base Environment","data":{},"dataPropertyOrder":null,"color":null,"isPrivate":false,"metaSortKey":1730110611930,"_type":"environment"},{"_id":"jar_b6c46a6f4ecdc5f55ab6d534ace1222315e99546","parentId":"wrk_3322a2956942472c9aa1d28ec985af0e","modified":1730110611933,"created":1730110611933,"name":"Default Jar","cookies":[],"_type":"cookie_jar"}]}
```

![image](https://github.com/user-attachments/assets/1eb9a7ce-4cfd-4010-b21f-10fdd28f7efc)

Correspondant respectivement aux méthodes (ici dans le Controller) :

![image](https://github.com/user-attachments/assets/86f4dd7a-92dc-4131-9316-c3df0db1de88)

