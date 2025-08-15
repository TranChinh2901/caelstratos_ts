/// <reference path="./types/index.d.ts" />
import express, { Request, Response } from 'express';
import path from 'path';
import 'dotenv/config';
import webRoutes from './routes/web';
import getConnection from './config/db';
import initDatabase from './config/seed';
import passport from 'passport';
import configPassportLocal from './middleware/passport.local';
import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';



const app = express();
const PORT = process.env.PORT || 3001;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  cookie: {
     maxAge: 7 * 24 * 60 * 60 * 1000 // ms
    },
    secret: 'a santa at nasa',
    //resave: true, nếu muốn lưu vào database
    resave: false,
    //save unmodified session 
    saveUninitialized: false,
    store: new PrismaSessionStore(
      new PrismaClient(),
      {
        checkPeriod: 2 * 60 * 1000,  //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }
    )
}))
app.use(passport.initialize());
app.use(passport.authenticate('session'));

configPassportLocal()
//config global 
app.use((req, res, next) => {
    res.locals.user = req.user || null; // Pass user object to all views
    next();
});
// Sử dụng router
// app.use('/', webRoutes);
webRoutes(app);
getConnection()

initDatabase()

app.use((req, res) => {
  res.render("status/404")
})
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
