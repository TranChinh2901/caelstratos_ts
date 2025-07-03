import { Request, Response } from 'express';
import { getAllUsers, getUserById, handleDeleteUser, handleUpdateUser, handleUser } from 'services/user.service';


const getHomePage = async (req: Request, res: Response) => {
    const users = await getAllUsers();
    console.log('check users:', users);
    res.render('home', { 
        users: users
    });
    }

const createUser = async (req: Request, res: Response) => {
    const {name, email, address} = req.body;
    console.log('Data from form:', req.body);   
   await handleUser(name, email, address);
    res.redirect('/'); 
}
const deleteUser = async (req: Request, res: Response) => {
    const {id} = req.params;
    await handleDeleteUser(id);
    res.redirect('/');
    console.log('Delete user with id:', id);
}
const viewUser = async (req: Request, res: Response) => {
    const {id} = req.params;
    const user = await getUserById(id);
    console.log('User details:', user);
    return res.render('view-user.ejs', {
        user: user
    })
}
const updateUser = async (req: Request, res: Response) => {
    const {id, name, email, address} = req.body;
    await handleUpdateUser(id, name, email, address);
    return res.redirect('/');
}
export {
    getHomePage,
    createUser,
    deleteUser,
    viewUser,
    updateUser
}