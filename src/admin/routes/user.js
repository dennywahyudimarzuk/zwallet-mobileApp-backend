const router = require("express").Router();
const adminController = require("../controllers/user");
const { authentication, authorization } = require("../../middlewares/auth");
const upload = require("../../middlewares/multer");

router
  .get(
    "/search/query",
    authentication,
    authorization,
    adminController.searchByName
  )
  .get("/", authentication, authorization, adminController.getAllUser)
  .patch(
    "/:id",
    upload,
    authentication,
    authorization,
    adminController.editUser
  )
  .delete("/:id", authentication, authorization, adminController.deleteUser);
module.exports = router;
