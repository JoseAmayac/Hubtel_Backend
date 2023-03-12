
export const dbConfig = {
    dialect: process.env.DATABASE_DIALEC || 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    user: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || 'password',
    port: process.env.DATABASE_PORT || 5432,
    name: process.env.DATABASE_NAME || 'databasename'
}