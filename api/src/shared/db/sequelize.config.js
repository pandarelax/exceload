export const development = {
  dialect: 'mssql',
  host: 'localhost',
  port: 1433,
  username: 'sa',
  password: 'root',
  database: 'test',
  synchronize: true, // Only for development otherwise set to false
  autoLoadModels: true,
};
