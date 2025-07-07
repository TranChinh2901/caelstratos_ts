import express, { Request, Response } from 'express';
import path from 'path';
import 'dotenv/config';
import webRoutes from './routes/web';
import getConnection from './config/db';


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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // console.log(`Database connection established successfully. ${getConnection}`);
  
});
