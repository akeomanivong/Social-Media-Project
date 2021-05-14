const router = require("express").Router(),
    homeController = require("../controllers/homeController"),
    postsController = require("../controllers/postsController");

router.get("/", homeController.index);


router.get("/", homeController.index, homeController.showIndex);

router.get("/friends",homeController.showFriends);
router.get("/homepage", postsController.index, homeController.showHomepage ,postsController.redirectView, homeController.getFriends);
router.get("/notifications", postsController.index, homeController.showNotifications ,postsController.redirectView, homeController.getFriends);
router.get("/login",homeController.getLogin);


module.exports=router;