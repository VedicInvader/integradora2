const Reading = require("../models/Reading");

exports.create = data => {
    return Reading.create(data);
};

exports.list = async (page = 1, limit = 20) => {
    const offset = (page - 1) * limit;

    const { rows: docs, count: total } = await Reading.findAndCountAll({
        order: [['timestamp', 'DESC']],
        limit,
        offset
    });

    const pages = Math.ceil(total / limit);
    return { docs, total, page, pages };
};

exports.latest = () => {
    return Reading.findOne({ order: [['timestamp', 'DESC']] });
};

exports.getById = id => {
    return Reading.findByPk(id);
};

exports.update = async (id, data) => {
    const reading = await Reading.findByPk(id);
    if (!reading) return null;
    return reading.update(data);
};

exports.remove = id => {
    return Reading.destroy({ where: { id_lectura: id }});
};