const service = require('../services/readingService');

exports.postReading = async (req, res, next) => {
    try {
        const r = await service.create(req.body);
        res.status(201).json(r);
    } catch (err){ next(err) }
}

exports.getReadings = async (req, res, next) => {
    try {
        const { page, limit } = req.query;
        const data = await service.list(+page, +limit);
        res.json(data);
    } catch (err) { next(err) }
}

exports.getLatest = async (req, res, next) => {
    try {
        const r = await service.latest();
        res.json(r);
    } catch (err) { next(err) }
}