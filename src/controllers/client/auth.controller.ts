import { Request, Response } from "express";

const getRegisterPage = async (req: Request, res: Response): Promise<void> => {
    return res.render('client/auth/register.ejs');
}
const getLoginPage = async (req: Request, res: Response): Promise<void> => {
    return res.render('client/auth/login.ejs');
}

export { getLoginPage, getRegisterPage };