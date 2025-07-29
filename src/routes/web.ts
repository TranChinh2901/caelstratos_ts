import express from 'express';
import { createUser, deleteUser, getCreateUserPage, getHomePage, getUpdateUserForm, updateUser, viewUser } from '../controllers/user.controller';
import { getAdminOrderPage, getAdminProductPage, getAdminUserPage, getDashboardPage } from 'controllers/admin/admin.controller';
import multer from 'multer';
import fileUploadMiddleware from 'src/middleware/multer';
const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.get('/', getHomePage);
router.post('/handle-delete-user/:id', deleteUser);
router.get('/handle-view-user/:id', viewUser);
router.get('/handle-update-user/:id', getUpdateUserForm);
router.post('/handle-update-user/:id', updateUser); 

//dashboard
router.get('/admin/create-user', getCreateUserPage)
router.post('/admin/handle-create-user', fileUploadMiddleware("avatar"), createUser);

router.get('/admin', getDashboardPage);
router.get('/admin/user', getAdminUserPage); 
router.get('/admin/product', getAdminProductPage); 
router.get('/admin/order', getAdminOrderPage); 
export default router;