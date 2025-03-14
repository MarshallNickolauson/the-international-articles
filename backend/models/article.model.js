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
        published: { type: Boolean, required: true },
    },
    { timestamps: true }
);

const Article = mongoose.model('Article', articleSchema);

export default Article;
