import mongoose from "mongoose";

const articleSchema = mongoose.Schema(
    {
        languages: {
            type: Map,
            of: {
                title: { type: String },
                date: { type: Date },
                content: { type: String },
            },
            required: true,
        },
        isPublished: { type: Boolean, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        imageUrl: { type: String },
    },
    { timestamps: true }
);

const Article = mongoose.model("Article", articleSchema);

export default Article;
