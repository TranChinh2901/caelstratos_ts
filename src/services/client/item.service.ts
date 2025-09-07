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
     await prisma.cart.update({
        where: {
            id: cart.id
        },
        data: {
            sum: {
                increment: quantity
            }
        }
     })
     const currentCartDetail = await prisma.cartDetail.findFirst({
        where: {
            productId: productId,
            cartId: cart.id
        }
     })
     //upsert = update + insert
     await prisma.cartDetail.upsert ({
        where: {
            id: currentCartDetail?.id || 0
        },
        update: {
            quantity: {
                increment: quantity
            }
        },
        create: {
            price: product?.price || 0,
            quantity: quantity,
            productId: productId,
            cartId: cart.id
        }
     })
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