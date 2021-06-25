const {ExpenseService} = require("../services/expenseService");
const _encryptor = require('simple-encryptor')('secret_server_key');

class ExpenseController {
    constructor(){
        this.expenseService = new ExpenseService();
        this.getExpenseById = this.getExpenseById.bind(this);
        this.getExpensesByConditionAndLetterId = this.getExpensesByConditionAndLetterId.bind(this);
        this.createExpense = this.createExpense.bind(this);
        this.updateExpense = this.updateExpense.bind(this);
        this.deletedExpense = this.deletedExpense.bind(this);
    }

    getExpenseById = async (req, res, next) => {
        const {expenseId} = req.params;
        const expense = this.expenseService.getExpenseById(expenseId);
        expense.then(data => {
            res.status(200).json({
                message: data >= 1 ?  'Expenses gets successfully':` Expense by id:${expenseId} not found`,
                body:data
            })
        }).catch(err => next(err));
    }
    getExpensesByConditionAndLetterId = async (req, res,next) => {
        const { condition , letterId } = req.params;
        const expense = this.expenseService.getExpensesByConditionAndLetterId(condition,letterId);
        expense.then(data =>{
            res.status(200).json({
                message: data >= 1 ?  'Expenses gets successfully':` Letter by id:${letterId} not found`,
                data:data
            })
        }).catch(err => next(err));
    }
    createExpense = async (req,res,next) => {
        const { body: expense } = req;
        const createdExpense = this.expenseService.createExpense(expense);
        createdExpense.then(data =>{
            res.status(200).json({
                message: data >= 1 ?  'Expenses created successfully':` Letter by id:${expense.idLetter} not found`,
                data:data
            })
        }).catch(err => next(err));
    }
    updateExpense = async (req,res,next) => {
        const { expenseId } = req.params;
        const { body: expense } = req;
        const updatedExpense = this.expenseService.updateExpense(expense,expenseId);
        updatedExpense.then(data =>{
            res.status(200).json({
                message: data >= 1 ?  'Expenses update successfully':` Letter by id:${expense.idLetter} not found`,
                data:data
            })
        }).catch(err => next(err));
    }
    deletedExpense = async (req,res,next) => {
        const { expenseId } = req.params;
        const deletedExpense = this.expenseService.deletedExpense(expenseId);
        deletedExpense.then(data =>{
            res.status(200).json({
                message:'Expenses deleted successfully',
                data:data
            })
        }).catch(err => next(err));
    }
}

module.exports = {ExpenseController: ExpenseController}
