export const development = {
  dialect: 'mssql',
  host: 'localhost',
  port: 1433,
  username: 'sa',
  password: 'root',
  database: 'test',
  models: [Field, Grid, Record, RecordValue],
  synchronize: true, // Only for development otherwise set to false
};
