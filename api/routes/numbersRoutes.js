module.exports = app => {

    const controller = require('../controllers/numbersController')();

    app.route('/api/numbers').get(controller.listNumbers);
}