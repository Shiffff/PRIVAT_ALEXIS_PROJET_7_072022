const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        posterId: { type: String, require: true },
        message: { type: String, trim: true, maxlength: 500 },
        picture: { type: String},
        likers: {
            type: [String],
        },
        comments: {
            type: [{ commenterId: String,
                 commenterName: String,
                 commenterFirstName: String,
                  text: String,
                   timestamp: Number }],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('post', PostSchema)