import mongoose from 'mongoose';

const articleSchema = mongoose.Schema(
    {
        languages: {
            type: Map,
            of: {
                title: { type: String, required: true },
                date: { type: Date, required: true },
                content: { type: String, required: true },
            },
            required: true,
        },
        isPublished: { type: Boolean, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    },
    { timestamps: true }
);

const Article = mongoose.model('Article', articleSchema);

export default Article;
