# med-api
web rest api to take over doctors backend

## Development Resources
* Dennis Anariba
* Grawille Zacapa

## Stack
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

### 2.Bundle Install
should check your node version with `node -v`
```
npm install bcrypt body-parser dotenv express express-session mongoose passport passport-local morgan cors --save
```

### 3.Environment variables
* should be in the root directory and create a new file 
 * `mkdir .env`
* touch the new env file and set your variables using the reference on the configuration file `config.js` [GitHub](https://github.com/MasterTechHn/med-api/blob/main/auth/config.js)

### 4.Run
should use `npm run start-dev` to trigger nodemon
