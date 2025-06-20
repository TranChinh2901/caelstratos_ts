import express from 'express';
import user_router from './routes/user.route';
const app = express();

app.use('/', user_router)
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});