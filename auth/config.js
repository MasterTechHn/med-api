const config = {
    serverConfig: {
        port: process.env.APP_PORT || process.env.PORT,
        host: process.env.APP_HOST
    },
    dbConfig: {
        db: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
}

module.exports = config;
