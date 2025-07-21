import { Request, Response } from "express";

const getDashboardPage = async (req: Request, res: Response): Promise<void> => {
   return res.render('admin/dashboard/dashboard.ejs');
}
export { getDashboardPage };