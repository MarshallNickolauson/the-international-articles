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
                    credentials: 'include',
                };
            },
        }),
        deleteImage: builder.mutation({
            query: (imageFile) => {
                return {
                    url: `${IMAGE_URL}/${imageFile}`,
                    method: "DELETE",
                    credentials: 'include',
                };
            },
        }),
    }),
});

export const { useUploadImageMutation, useDeleteImageMutation } = imageApiSlice;