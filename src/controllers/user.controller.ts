import { Request, Response } from 'express';
import { getAllUsers, getUserById, handleDeleteUser, handleUpdateUser, handleUser } from '../services/user.service';


const getHomePage = async (req: Request, res: Response): Promise<void> => {
    const users = await getAllUsers();
    // console.log('check users:', users);
    res.render('home', { 
        users: users
    });
}

const createUser = async (req: Request, res: Response): Promise<void> => {
    const {name, email, address} = req.body;
    console.log('Data from form:', req.body);   
   await handleUser(name, email, address);
    res.redirect('/'); 
}
const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const {id} = req.params;
    await handleDeleteUser(id);
    res.redirect('/');
    console.log('Delete user with id:', id);
}
const viewUser = async (req: Request, res: Response): Promise<void> => {
    const {id} = req.params;
    const user = await getUserById(id);
    console.log('User details:', user);
    
    if (!user) {
        res.status(404).send('Không tìm thấy người dùng');
        return;
    }
    
    res.render('view-user', {
        user: user
    });
}


const updateUser = async (req: Request, res: Response): Promise<void> => {
    const {id, name, email, address} = req.body;
    await handleUpdateUser(id, name, email, address);
    res.redirect('/');
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
    getUpdateUserForm
}