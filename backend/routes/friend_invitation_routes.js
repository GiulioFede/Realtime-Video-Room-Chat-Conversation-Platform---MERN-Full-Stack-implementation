const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { handleSendFriendInvitation, handleAcceptFriendInvitation, handleRejectFriendInvitation } = require("../controllers/friends_controllers");
const { verifyToken } = require("../middleware/auth_middleware");
const validator = require("express-joi-validation").createValidator({});


const postFriendInvitationSchema = Joi.object({
    targetEmailAddress: Joi.string().email(),

});

const inviteDecisionSchema = Joi.object({
    id: Joi.string().required(),

});


router.post("/invite", verifyToken, validator.body(postFriendInvitationSchema), handleSendFriendInvitation );

router.post("/accept",verifyToken, validator.body(inviteDecisionSchema), handleAcceptFriendInvitation );

router.post("/reject",verifyToken, validator.body(inviteDecisionSchema), handleRejectFriendInvitation );

module.exports = router;