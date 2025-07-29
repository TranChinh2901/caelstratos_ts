import express from 'express';
import { createUser, deleteUser, getCreateUserPage, getHomePage, getUpdateUserForm, updateUser, viewUser } from '../controllers/user.controller';
import { getAdminOrderPage, getAdminProductPage, getAdminUserPage, getDashboardPage } from 'controllers/admin/admin.controller';
import multer from 'multer';
import fileUploadMiddleware from 'src/middleware/multer';
const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.get('/', getHomePage);


//dashboard
router.get('/admin', getDashboardPage);
router.get('/admin/user', getAdminUserPage); 
router.get('/admin/create-user', getCreateUserPage)
router.post('/admin/delete-user/:id', deleteUser);
router.post('/admin/handle-create-user', fileUploadMiddleware("avatar"), createUser);
router.get('/admin/view-user/:id', viewUser);
router.get('/admin/update-user/:id', viewUser); // Sử dụng viewUser cho cả view và update form
router.post('/admin/update-user/:id',fileUploadMiddleware("avatar"), updateUser);

router.get('/admin/product', getAdminProductPage); 
router.get('/admin/order', getAdminOrderPage); 
export default router;