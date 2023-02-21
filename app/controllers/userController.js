const userModel = require("../models/userModel");
exports.getUserController = (req, res, next) => {
    const user = userModel.getUser();
};