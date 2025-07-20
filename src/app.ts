import express, { Request, Response } from 'express';
import path from 'path';
import 'dotenv/config';
import webRoutes from './routes/web';
import getConnection from './config/db';
import initDatabase from './config/seed';



const app = express();
const PORT = process.env.PORT || 3001;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Sử dụng router
app.use('/', webRoutes);
getConnection()

initDatabase()
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
