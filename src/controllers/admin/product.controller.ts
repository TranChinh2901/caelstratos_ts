
import { Request, Response } from "express";
import { createProduct, getProductById, handleDeleteProduct } from "services/admin/product.service";
import { handleDeleteUser } from "services/user.service";
import { ProductSchema, TProductSchema } from "src/validation/product.schema";

const getAdminCreateProductPage = async (req: Request, res: Response): Promise<void> => {
    const oldData = {
        name: "",
        price: "",
        detailDesc: "",
        shortDesc: "",
        quantity: "",
        factory: "",
        target: ""
    }
    return res.render('admin/product/create.ejs', {
        errors: [],
        oldData
    });
}

const postAdminCreateProduct = async (req: Request, res: Response): Promise<void>  => {
    const { name, price, detailDesc, shortDesc, quantity, factory, target } = req.body as TProductSchema;
    const validate = ProductSchema.safeParse(req.body);
    if (!validate.success) {
        const errorsZod = validate.error.issues;
        const errors = errorsZod.map(item => ` ${item.message} (${item.path.join('.')})`);
        const oldData = {
            name,
            price,
            detailDesc,
            shortDesc,
            quantity,
            factory,
            target
        };
        return res.render('admin/product/create.ejs', {
            errors,
            oldData
        });
    }
    
    //success, create a new product
    const image = req?.file?.filename || "";
    await createProduct(
        name,
        +price,
        detailDesc,
        shortDesc,
        +quantity,
        factory,
        target,
        image
    )
    return res.redirect('/admin/product');
} 

const postDeleteProduct = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  await handleDeleteProduct(+id);
  return res.redirect('/admin/product');
}

const getViewProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const product = await getProductById(+id);

    if (!product) {
        // Có thể trả về trang lỗi, hoặc redirect lại với thông báo
        return res.status(404).render("admin/product/notfound.ejs", {
            message: "Không tìm thấy sản phẩm"
        });
    }

    const factoryOptions = [
        { name: "Apple (MacBook)", value: "APPLE" },
        { name: "Asus", value: "ASUS" },
        { name: "Lenovo", value: "LENOVO" },
        { name: "Dell", value: "DELL" },
        { name: "LG", value: "LG" },
        { name: "Acer", value: "ACER" },
    ];

    const targetOptions = [
        { name: "Gaming", value: "GAMING" },
        { name: "Sinh viên - Văn phòng", value: "SINHVIEN-VANPHONG" },
        { name: "Thiết kế đồ họa", value: "THIET-KE-DO-HOA" },
        { name: "Mỏng nhẹ", value: "MONG-NHE" },
        { name: "Doanh nhân", value: "DOANH-NHAN" },
    ];

    return res.render("admin/product/detail.ejs", {
        product,
        factoryOptions,
        targetOptions,
        errors: [],
        oldData: {
            name: product.name,
            price: product.price,
            detailDesc: product.detailDesc,
            shortDesc: product.shortDesc,
            quantity: product.quantity,
            factory: product.factory,
            target: product.target
        }
    });
};


export {
    getAdminCreateProductPage,
    postAdminCreateProduct,
    postDeleteProduct,
    getViewProduct
}
