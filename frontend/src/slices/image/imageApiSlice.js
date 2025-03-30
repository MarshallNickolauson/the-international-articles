import { apiSlice } from "../apiSlice";
import { IMAGE_URL } from "../../constants";

export const imageApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        uploadImage: builder.mutation({
            query: (imageFile) => {
                return {
                    url: IMAGE_URL,
                    method: "POST",
                    body: imageFile,
                };
            },
        }),
        deleteImage: builder.mutation({
            query: (imageFile) => {
                return {
                    url: `${IMAGE_URL}/${imageFile}`,
                    method: "DELETE",
                };
            },
        }),
    }),
});

export const { useUploadImageMutation, useDeleteImageMutation } = imageApiSlice;