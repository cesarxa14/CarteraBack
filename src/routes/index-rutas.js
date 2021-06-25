const {apiConsultants} = require('./letters.routes');
const {apiAuth} = require('./auth.routes')
const {apiExpense} = require('./expense.routes')

function indexRoutes(app) {
    apiConsultants(app);
    apiAuth(app);
    apiExpense(app);
}

module.exports = {
    indexRoutes
};
