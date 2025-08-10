import { Request, Response } from 'express';
import { getAllRoles, getAllUsers, getUserById, handleDeleteUser, handleUpdateUser, handleUser } from '../services/user.service';
import { getProducts } from 'services/client/item.service';


const getHomePage = async (req: Request, res: Response): Promise<void> => {
    const products = await getProducts();
    const user = req.user;
    res.render('client/home/show.ejs', {
        message: 'Trang chủ',
        products
    });
}
const getCreateUserPage = async (req: Request, res: Response): Promise<void> => {
     const roles = await getAllRoles();
    //  console.log(roles);
     res.render('admin/user/create.ejs', { 
        message: 'Tạo mới người dùng',
        roles: roles
     });
}
const createUser = async (req: Request, res: Response): Promise<void> => {
    const {fullname, username, phone, role, address} = req.body;
    const file = req.file;
    const avatar = file?.filename ?? '';
    await handleUser(fullname, username, address, avatar, phone, role); 
    res.redirect('/admin/user'); 
}   
const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const {id} = req.params;
    await handleDeleteUser(id);
    res.redirect('/admin/user');
    // console.log('Delete user with id:', id);
} 
const viewUser = async (req: Request, res: Response): Promise<void> => {
    const {id} = req.params;
    const user = await getUserById(id);
     const roles = await getAllRoles();

    // console.log('User details:', user);
    
    if (!user) {    
        res.status(404).send('Không tìm thấy người dùng');
        return;
    }

    res.render('admin/user/detail.ejs', {
        id: id,
        user: user,
        roles
    });
}


const updateUser = async (req: Request, res: Response): Promise<void> => {
    const {id} = req.params;
    const {fullname, username, phone, role, address} = req.body;
    const file = req.file;
    const avatar = file?.filename ?? '';

    await handleUpdateUser(id, fullname, username, address, avatar, phone, role);
    res.redirect('/admin/user');
}

const getUpdateUserForm = async (req: Request, res: Response): Promise<void> => {
    const {id} = req.params;
    const user = await getUserById(id);
    console.log('User for update:', user);
    
    if (!user) {
        res.status(404).send('Không tìm thấy người dùng');
        return;
    }

    res.render('update-user', {
        user: user
    });
}

export {
    getHomePage,
    createUser,
    deleteUser,
    viewUser,
    updateUser,
    getUpdateUserForm,
    getCreateUserPage
}