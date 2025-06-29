const Reading = require('../models/Reading');

exports.create = data => Reading.create(data);

exports.list = async (page = 1, limit = 20) => {
    const skip = (page - 1) * limit;
    const docs = await Reading.find()
                              .sort({ timestamp: -1 })
                              .skip(skip)
                              .limit(limit)
    const total = await Reading.countDocuments();
    return { docs, total, page, pages: Math.ceil(total/limit) };
};

exports.latest = () => Reading.findOne().sort({ timestamp: -1 });