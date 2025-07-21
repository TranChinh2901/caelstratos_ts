import { Request, Response } from "express";
import { getAllUsers } from "services/user.service";

const getDashboardPage = async (req: Request, res: Response): Promise<void> => {
   return res.render('admin/dashboard/dashboard.ejs');
}

const getAdminUserPage = async (req: Request, res: Response): Promise<void> => {
     const users = await getAllUsers();
    return res.render('admin/user/index.ejs', {
        users: users
    });
}
const getAdminProductPage = async (req: Request, res: Response): Promise<void> => {
    return res.render('admin/product/index.ejs');
}
const getAdminOrderPage = async (req: Request, res: Response): Promise<void> => {
    return res.render('admin/order/index.ejs');
}
export { getDashboardPage, getAdminUserPage, getAdminProductPage, getAdminOrderPage };