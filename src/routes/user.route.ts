import express from 'express';
const user_router = express.Router();
user_router.get('/user', (req, res) => {
  res.send('User route is working');
});
export default user_router;