import { Request, Response } from "express";

const getProductPage = async (req: Request, res: Response): Promise<void> => {
    return res.render('client/product/detail.ejs')
}

export { getProductPage };