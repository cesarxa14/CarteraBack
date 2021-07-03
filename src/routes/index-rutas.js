const {apiConsultants} = require('./letters.routes');
const {apiAuth} = require('./auth.routes')
const {apiExpense} = require('./expense.routes')
const {apiUser} = require('./users.routes')

function indexRoutes(app) {
    apiConsultants(app);
    apiAuth(app);
    apiExpense(app);
    apiUser(app);
}

module.exports = {
    indexRoutes
};
