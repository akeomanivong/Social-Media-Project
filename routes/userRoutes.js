const router = require("express").Router(),
    usersController = require("../controllers/usersController");

router.get("/signup", usersController.getUsersPage);
router.get("/", usersController.index, usersController.indexView);
router.get("/new", usersController.new);
router.post("/user",  usersController.create, usersController.redirectView);

router.get("/login", usersController.login);
router.post("/login", usersController.authenticate);
router.get("/logout", usersController.logout, usersController.redirectView);


router.get("/:id", usersController.show, usersController.showView);
router.get("/:id/edit", usersController.edit);
router.put("/:id/update" ,usersController.update, usersController.redirectView);
router.delete("/:id/delete", usersController.delete, usersController.redirectView);


module.exports=router;