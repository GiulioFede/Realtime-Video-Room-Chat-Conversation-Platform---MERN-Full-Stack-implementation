const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { handleSendFriendInvitation } = require("../controllers/friends_controllers");
const { verifyToken } = require("../middleware/auth_middleware");
const validator = require("express-joi-validation").createValidator({});


const postFriendInvitationSchema = Joi.object({
    targetEmailAddress: Joi.string().email(),

});


router.post("/invite", verifyToken, validator.body(postFriendInvitationSchema), handleSendFriendInvitation );

module.exports = router;