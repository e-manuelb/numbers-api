module.exports = () => {

    const numbers = require('../data/numbers.json');
    const controller = {};

    controller.listNumbers = (req, res) => res.status(200).json(numbers);

    return controller;
}