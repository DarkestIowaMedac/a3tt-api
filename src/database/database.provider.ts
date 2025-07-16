import * as oracledb from 'oracledb';

export const databaseProvider = {
  provide: 'ORACLE_CONNECTION',
  useFactory: async () => {
    try {
      const connection = await oracledb.getConnection({
        user: process.env.ORACLE_USER,
        password: process.env.ORACLE_PASSWORD,
        connectString: process.env.ORACLE_CONN_STRING 
      });
      console.log('Conexión a Oracle establecida');
      return connection;
    } catch (err) {
      console.error('Error al conectar a Oracle:', err);
      throw err;
    }
  }
};