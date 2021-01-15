const config = {
    serverConfig: {
        port: process.env.APP_PORT || process.env.PORT,
        host: process.env.APP_HOST
    },
    dbConfig: {
        db: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    }
}

module.exports = config;
