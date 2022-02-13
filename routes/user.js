const express = require("express");
const router = express.Router();

const {campaignList,activeCampaign,closedCampaign} = require("../controller/user")



router.get("/campaignList", campaignList);
router.get("/activeCampaign", activeCampaign);
router.get("/closedCampaign", closedCampaign);

module.exports = router;
