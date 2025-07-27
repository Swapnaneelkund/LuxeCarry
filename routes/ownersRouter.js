import express from "express";
import {
  renderLogin,
  renderRegister,
  registerOwner,
  loginOwner,
  renderAdminDashboard,
  renderCreateProduct,
  logoutOwner
} from "../controllers/ownersController.js";

const router = express.Router();

router.get("/", renderLogin);
router.get("/register", renderRegister);

if (process.env.NODE_ENV === "development") {
  router.post("/register/create", registerOwner);
  router.post("/login", loginOwner);
}

router.get("/admin", renderAdminDashboard);
router.get("/admin/createproduct", renderCreateProduct);
router.post("/logout", logoutOwner);

export default router;
