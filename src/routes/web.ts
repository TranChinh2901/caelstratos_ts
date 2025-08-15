import express, { Express } from "express";
import {
  createUser,
  deleteUser,
  getCreateUserPage,
  getHomePage,
  getUpdateUserForm,
  updateUser,
  viewUser,
} from "../controllers/user.controller";
import {
  getAdminOrderPage,
  getAdminProductPage,
  getAdminUserPage,
  getDashboardPage,
} from "controllers/admin/admin.controller";
import multer from "multer";
import fileUploadMiddleware from "src/middleware/multer";
import { getCartPage, getProductPage, postAddProductToCart } from "controllers/client/product.controller";
import {
  getAdminCreateProductPage,
  getViewProduct,
  postAdminCreateProduct,
  postDeleteProduct,
  postUpdateProduct,
} from "controllers/admin/product.controller";
import {
  getLoginPage,
  getRegisterPage,
  getSuccessRedirectPage,
  postLogout,
  postRegister,
} from "controllers/client/auth.controller";
import passport from "passport";
import { isAdmin, isLogin } from "src/middleware/auth";
const upload = multer({ dest: "uploads/" });
const router = express.Router();

const webRoutes = (app: Express) => {
  router.get("/", getHomePage);
  router.get("/success-redirect", getSuccessRedirectPage);
  router.get("/product/:id", getProductPage);
  router.get("/login", getLoginPage);
  router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/success-redirect",
      failureRedirect: "/login",
      failureMessage: true,
    })
  );
  router.post("/logout", postLogout);

  router.get("/register", getRegisterPage);
  router.post("/register", postRegister);
  router.get("/cart", getCartPage)
  router.post("/add-product-to-cart/:id", postAddProductToCart);

  //dashboard
  router.get("/admin", getDashboardPage);
  router.get("/admin/user", getAdminUserPage);
  router.get("/admin/create-user", getCreateUserPage);
  router.post("/admin/delete-user/:id", deleteUser);
  router.post(
    "/admin/handle-create-user",
    fileUploadMiddleware("avatar"),
    createUser
  );
  router.get("/admin/view-user/:id", viewUser);
  router.get("/admin/update-user/:id", viewUser); // Sử dụng viewUser cho cả view và update form
  router.post(
    "/admin/update-user/:id",
    fileUploadMiddleware("avatar"),
    updateUser
  );

  router.get("/admin/product", getAdminProductPage);
  router.get("/admin/create-product", getAdminCreateProductPage);
  router.post(
    "/admin/create-product",
    fileUploadMiddleware("image", "images/product"),
    postAdminCreateProduct
  );

  router.post("/admin/delete-product/:id", postDeleteProduct);
  router.get("/admin/view-product/:id", getViewProduct);
  router.post(
    "/admin/update-product",
    fileUploadMiddleware("image", "images/product"),
    postUpdateProduct
  );

  router.get("/admin/order", getAdminOrderPage);
  app.use("/", isAdmin, router);
};
export default webRoutes;
