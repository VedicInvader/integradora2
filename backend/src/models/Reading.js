const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Reading = sequelize.define('Reading', {
    id_lectura: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    hfp01_avg: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    dv_sd1_wvt: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    dv_d1_wvt: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    vv_s_wvt: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    vv_avg: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    rsmj_tot: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    radiacion_solar_prom: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    ptemp_c_avg: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
},
    {
        tableName: 'datos_meteo',
        timestamps: false
    }
);

module.exports = Reading;