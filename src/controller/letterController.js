const { LetterService } = require("../services/lettersService");
const _encryptor = require('simple-encryptor')('secret_server_key');

class LetterController {
    constructor() {
        this.letterService = new LetterService();
        this.getLetterById = this.getLetterById.bind(this);
        this.getLettersByUserId = this.getLettersByUserId.bind(this);
        this.createLetter = this.createLetter.bind(this);
        this.updateLetterById = this.updateLetterById.bind(this);
        this.deleteLetterById = this.deleteLetterById.bind(this);
    }

    getLetterById = async (req, res, next) => {
        const { letterId } = req.params;
        const letter = this.letterService.getLetterById(letterId)
            .then(row => {
                    res.status(200).json({
                        message: row.length >= 1 ? "Letter gets successfully":`letter with id: ${letterId} not found` ,
                        data: row,
                    })


            })
            .catch(err => next(err));
    }
    getLettersByUserId = async (req, res, next) => {
        const { userId } = req.params;
        const letters = this.letterService.getLettersByUserId(userId)
            .then(row => {
                res.status(200).json({
                    message: row.length >= 1 ? "Letter gets successfully":`User with id: ${userId} not found` ,
                    data: row,
                })
            })
            .catch(err => next(err));
    }

    createLetter = async (req, res, next) => {
        const { body: letter } = req;

        const createdLetter = this.letterService.createLetter({letter})
            .then(row => {
                res.send(letter)
            } )
            .catch(err => next(err));
    }

    updateLetterById = async (req, res, next) => {
        const { letterId } = req.params;
        const { body: letter } = req;

        const updatedLetter = this.letterService.updateLetter(letterId, { letter })
            .then(row => res.status(202).json({
                message: "Letter updated successfully",
                data: row
            }) )
            .catch(err => next(err));

    }

    deleteLetterById = async (req,res,next) => {
        const { letterId } = req.params;

        const deletedLetter = this.letterService.deleteLetter(letterId)
            .then(value => res.status(200).json({
                message: "Letter deleted successfully",
                data: value
            }))
            .catch(err => next(err));
    }
}
module.exports = {
    LetterController: LetterController
}
