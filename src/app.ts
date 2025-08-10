import express, { Request, Response } from 'express';
import path from 'path';
import 'dotenv/config';
import webRoutes from './routes/web';
import getConnection from './config/db';
import initDatabase from './config/seed';
import passport from 'passport';
import configPassportLocal from './middleware/passport.local';
import session from 'express-session';



const app = express();
const PORT = process.env.PORT || 3001;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.authenticate('session'));

configPassportLocal()
// Sử dụng router
app.use('/', webRoutes);
getConnection()

initDatabase()

app.use((req, res) => {
  res.send('404 Not Found');
})
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
