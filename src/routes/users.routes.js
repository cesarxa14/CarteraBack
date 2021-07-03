const express = require('express');
const router = express.Router();
const { AuthController } = require('../controller/authController');
const {validationHandler} = require("../utils/middleware/validationHandler");
const {
    consultantIdSchema,
    createConsultantSchema,
    updateConsultantSchema
} = require("../utils/schemas/consultant");

function apiUser(app) {
    app.use("/api/users", router);
    const authController = new AuthController();

    //Rutas de Users
    router.get( "/:userId", authController.getUserByID);
    router.delete("/:userId", authController.deleteUserById);

}

module.exports = {
    apiUser
};