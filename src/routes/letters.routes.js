const express = require('express');
const router = express.Router();
const { LetterController } = require('../controller/letterController');
const {validationHandler} = require("../utils/middleware/validationHandler");
const {
    consultantIdSchema,
    createConsultantSchema,
    updateConsultantSchema
} = require("../utils/schemas/consultant");



function apiLetters(app) {
    app.use("/api/letters", router);
    const letterController = new LetterController();

    //Rutas de Consultas
    router.get( "/letter/:letterId" , letterController.getLetterById);
    router.get( "/user/:userId", letterController.getLettersByUserId);


    router.post(""
                                                     ,letterController.createLetter);

    router.put("/:letterId"     , validationHandler({consultantId: consultantIdSchema},'params')
                                                     , validationHandler(updateConsultantSchema)
                                                     , letterController.updateLetterById);

    router.delete("/:letterId"   , validationHandler({consultantId: consultantIdSchema},'params')
                                                     , letterController.deleteLetterById);

    router.delete("/user/:idUser"   , letterController.deleteLettersByUser);
}

module.exports = {
    apiConsultants: apiLetters
};
