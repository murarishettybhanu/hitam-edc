const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const ApplicationSchema = new mongoose.Schema({
    AppID: {
        type: String,
        required: true,
        unique: true
    },
    appliedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
    },
    category: {
        type: String,
    },
    state: {
        type: String,
    },
    district: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    ideaTitle: {
        type: String,
    },
    properties: {
        type: String,
    },
    newNess: {
        type: String,
    },
    team: {
        type: String,
    },
    mentorName: {
        type: String
    },
    mentorNumber: {
        type: String,
    },
    mentorMail: {
        type: String,
    },
    ideaStatus: {
        type: String,
    },
    expectedTime: {
        type: Date,
    },
    budgetRequired: {
        type: String,
    },
    resourcesRequired: {
        type: Array,
    },
    aadharCard: {
        type: String,
    },
    studentId: {
        type: String,
    },
    noc: {
        type: String,
    },
    status: {
        type: String,
        default: "Pending"
    },
    comment: {
        type: String,
    },
})


module.exports = mongoose.model('Application', ApplicationSchema)
