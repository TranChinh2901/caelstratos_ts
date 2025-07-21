import express from 'express';
import { createUser, deleteUser, getHomePage, getUpdateUserForm, updateUser, viewUser } from '../controllers/user.controller';
import { getAdminOrderPage, getAdminProductPage, getAdminUserPage, getDashboardPage } from 'controllers/admin/admin.controller';

const router = express.Router();

router.get('/', getHomePage);
router.get('/create-user', (req, res) => {
    res.render('create-user', { message: 'Tạo mới người dùng' });
});
router.post('/create-user', createUser);
router.post('/handle-delete-user/:id', deleteUser);
router.get('/handle-view-user/:id', viewUser);
router.get('/handle-update-user/:id', getUpdateUserForm);
router.post('/handle-update-user/:id', updateUser); 

//dashboard
router.get('/admin', getDashboardPage);
router.get('/admin/user', getAdminUserPage); 
router.get('/admin/product', getAdminProductPage); 
router.get('/admin/order', getAdminOrderPage); 
export default router;