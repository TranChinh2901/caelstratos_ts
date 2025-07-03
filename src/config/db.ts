
import mysql from 'mysql2/promise';
const getConnection = async () => {
    const connection = await mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '123456',
            database: 'ts_node',
        })
   return connection;
}
export default getConnection;