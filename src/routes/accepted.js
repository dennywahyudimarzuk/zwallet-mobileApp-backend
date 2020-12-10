const acceptedController = require("../controllers/accepted");
const router = require("express").Router();

router
    .get("/", acceptedController.accepted)
    .get("/success", acceptedController.success)
    .get("/failed", acceptedController.failed)

module.exports = router;