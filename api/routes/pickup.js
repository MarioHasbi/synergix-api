const express = require("express");
const responses = require("../helpers/response");
const pickupController = require("../controller/pickup");
const userController = require("../controller/users");
const callsController = require("../controller/calls");
const router = express.Router();

router.post("/", async (req, res) => {
  const dataParam = {
    channel: req.body.channel,
    destination: req.body.destination,
    phone_number: req.body.phone_number,
    username: req.cookies.username,
  };

  const pickupResponse = await pickupController.pickup(dataParam);

  if (pickupResponse[0].response !== "Error") {
    const updated = await userController.updateData(
      { user_activity_id: 9 },
      { id: req.cookies.user_id }
    );

    if (updated) {
      const call_id = req.body.call_id;

      const update_call = await callsController.updateData(
        { pickup_date: "NOW()" },
        { id: call_id }
      );
      console.log(update_call);
    }
    let data = {
      total_data: 1,
      data: pickupResponse,
    };
    return responses.sendSuccessData(res, data);
  } else {
    let respon = {
      channel: pickupResponse[0].channel,
      destination: pickupResponse[0].destination,
      phone_number: pickupResponse[0].phone_number,
      username: pickupResponse[0].username,
      actionid: pickupResponse[0].actionid,
      response: pickupResponse[0].response,
      message: "Call Was Ended",
    };

    let data = {
      total_data: 1,
      data: [respon],
    };
    return responses.sendSuccessData(res, data);
  }
});

module.exports = router;
