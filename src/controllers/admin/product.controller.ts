import { Request, Response } from "express";

const getAdminCreateProductPage = async (req: Request, res: Response): Promise<void> => {
    return res.render('admin/product/create.ejs');
}
export{
    getAdminCreateProductPage
}