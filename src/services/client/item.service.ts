import { prisma } from "../../config/client";

const getProducts = async () => {
    const products = await prisma.product.findMany();
    return products;
}
const getProductById = async (id: number) => {
    const product = await prisma.product.findUnique({
        where: {
            id: id
        }
    });
    return product;
}
const addProductToCart = async (quantity: number, productId: number, user: Express.User) => {
const cart = await prisma.cart.findUnique({
    where: {
        userId: user.id
    }
})
const product = await prisma.product.findUnique({
    where: {
        id: productId
    }
})
if(cart) {

} else {
    await prisma.cart.create({
        data: {
            sum: quantity,
            userId: user.id,
            cartDetails: {
                create: [ 
                 {
                    price: product?.price || 0,
                    quantity: quantity,
                    productId: productId
                 }
                ]
            }
        }
    })
}
}

const getProductInCart = async (userId: number) => {
    const cart = await prisma.cart.findUnique({
        where: {
            userId
        }
    })
    if(cart) {
        const currentCartDetail = await prisma.cartDetail.findMany({
            where: {
                cartId: cart.id
            },
            include: {
                product: true
            }
        })
        return currentCartDetail;
    }
    return [];
}
export {
    getProducts,
    getProductById,
    addProductToCart,
    getProductInCart
}