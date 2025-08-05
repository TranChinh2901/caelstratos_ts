import { Request, Response } from "express";
import { ProductSchema, TProductSchema } from "src/validation/product.schema";

const getAdminCreateProductPage = async (req: Request, res: Response): Promise<void> => {
    return res.render('admin/product/create.ejs');
}
const postAdminCreateProduct = async (req: Request, res: Response): Promise<void> => {
    const { name,  } = req.body as TProductSchema;
    const validate = ProductSchema.safeParse(req.body);
    if (!validate.success) {
         const errorsZod = validate.error.issues
    }
    return res.redirect('/admin/product');
} 
export{
    getAdminCreateProductPage,
    postAdminCreateProduct
}