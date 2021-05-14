const router = require("express").Router(),
    postsController = require("../controllers/postsController");

//Posts
router.get("/", postsController.index, postsController.indexView)
router.post("/post", postsController.create, postsController.redirectView, postsController.index);
router.get("/new", postsController.new);
router.get("/:id", postsController.show, postsController.showView);
router.get("/:id/edit", postsController.edit);
router.put("/post/:id/update", postsController.update, postsController.redirectView);
router.delete("/:id/delete", postsController.delete, postsController.redirectView);

module.exports = router;