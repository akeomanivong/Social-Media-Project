const router = require("express").Router(),
    errorController = require("../controllers/errorController");

router.use(errorController.pageNotFoundError);
router.use(errorController.interalServerError);


module.exports=router;