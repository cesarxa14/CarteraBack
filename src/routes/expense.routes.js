const express = require('express');
const router = express.Router();

function apiExpense(app){
    app.use('/api/expense', router);

    const {ExpenseController} = require('../controller/expenseController');
    const expenseController = new ExpenseController();

    router.get('/:expenseId', expenseController.getExpenseById);
    router.get('/letter/:expenseId/:condition', expenseController.getExpenseById);
    router.post('/', expenseController.createExpense);
    router.put('/:expenseId', expenseController.updateExpense);
    router.delete('/:expenseId', expenseController.deletedExpense);
}

module.exports = { apiExpense }
