const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const QRCode = require('qrcode');

const Patient = sequelize.define('Patient', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    mrn: { type: DataTypes.STRING, unique: true },
    name: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false },
    gender: { type: DataTypes.ENUM('Male', 'Female', 'Other'), allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    cnic: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING },
    qr_code: { type: DataTypes.TEXT }
}, {
    timestamps: true
});

// Auto-generate MRN & QR Code before save
Patient.beforeCreate(async (patient) => {
    // Auto MRN format: ALPHA-YYYYMMDD-XXXX
    const today = new Date();
    const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
    patient.mrn = `ALPHA-${dateStr}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Generate QR Code for patient MRN
    const qrData = `${patient.mrn} | ${patient.name}`;
    patient.qr_code = await QRCode.toDataURL(qrData);
});

module.exports = Patient;
