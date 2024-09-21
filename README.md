
![Med-Api CI](https://github.com/MasterTechHn/med-api/workflows/Med-Api%20CI/badge.svg)
![Med-Api CD](https://github.com/MasterTechHn/med-api/workflows/Med-Api%20CD/badge.svg)

# med-api
Web REST API with Auth middleware for Doctors' requests in Model-Routes-Controller structure based on an ODM database. 

## Development Resources
* Dennis Anariba
* Grawille Zacapa

## Main Stack
#### NodeJS - Express - Mongo
---

|  | Development | Production |
|----------|------------ |------------ |
| Windows               |  ✔  |   |
| MacOS                 |  ✔  |   |
| Node JS               |  ✔  |   |
| Mongo DB Cluster      |  ✔  |   |
| AWS                   |  ✔  |   |

## Environment dependencies
* require node js
* install npm packages
* set own global environment

## Init

### 1.Repository
```
mkdir med-api
cd med-api/
git init
git remote add origin https://github.com/MasterTechHn/med-api.git
git pull origin main
```

### 2.Local bundle Install 
should check your node version with `node -v`
```
npm install bcrypt body-parser dotenv express express-session mongoose passport passport-local morgan cors --save

npm install --save-dev nodemon jest supertest
```

### 3.Environment variables
* should be in the root directory and create a new file 
 * `mkdir .env`
* touch the new env file and set your variables using the reference on the configuration file `config.js` [GitHub](https://github.com/MasterTechHn/med-api/blob/main/auth/config.js)

### 4.Run
should use `npm run start-dev` to trigger nodemon

## Running with Docker
You must have installed Docker Desktop deamond on your system.
```
//root directory
docker compose up
```
---
```
//stop services
docker compose stop
```
---
```
//stop virtualization
docker compose down
```
