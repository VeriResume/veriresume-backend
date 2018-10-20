const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var verifiable_elementSchema = new Schema({
    tag : {
        type: String,
        required: true,
        unique: false
    },
    public : {
        type: Boolean,
        required: true,
        unique: false
    },
    verified: {
        type: Boolean,
        required: true,
        unique: false
    }
}, {
    timestamps: true
});

var experienceSchema = new Schema({
    place : {
        type: String,
        required: true,
        unique: false
    },
    verifiable_elements:[verifiable_elementSchema]
}, {
    timestamps: true
});

var sectionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    experiences:[experienceSchema]
}, {
    timestamps: true
});
var Sections = mongoose.model('Section', sectionSchema);

module.exports = Sections;