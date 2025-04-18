import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import axios from 'axios';
import mongoose from 'mongoose';
import FormData from 'form-data';

import User from './user.model.js';
import Article from './article.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BACKEND_URL = 'http://backend:5000';
const UPLOAD_URL = `${BACKEND_URL}/api/upload/image`;
const IMAGE_DIR = path.resolve(__dirname, 'images');
const ARTICLE_JSON_FILE = path.resolve(__dirname, 'article-seeds.json');

const waitForMongo = async (timeout = 30000) => {
    const start = Date.now();
    let conn = null;
    while (Date.now() - start < timeout) {
        try {
            conn = await mongoose.connect(process.env.MONGO_URI);
            console.log('[Seeder] MongoDB is ready!'.cyan);
            break;
        } catch (err) {
            console.log('[Seeder] Waiting for MongoDB to be ready...');
            await new Promise((resolve) => setTimeout(resolve, 2000));
        }
    }
    if (!conn) {
        throw new Error('[Seeder] MongoDB did not become ready within the timeout period.');
    }
};

const waitForBackend = async (timeout = 300000) => {
    const start = Date.now();
    let backendReady = false;
    while (Date.now() - start < timeout) {
        try {
            await axios.get(BACKEND_URL);
            backendReady = true;
            console.log('[Seeder] Backend is ready!');
            break;
        } catch (err) {
            console.log('[Seeder] Waiting for backend to be ready...');
            await new Promise((resolve) => setTimeout(resolve, 2000));
        }
    }
    if (!backendReady) {
        throw new Error('[Seeder] Backend did not become ready within the timeout period.');
    }
};

const uploadImage = async (imagePath) => {
    try {
        if (!fs.existsSync(imagePath)) {
            console.error(`[Seeder] Image file not found at path: ${imagePath}`);
            return null;
        }

        const imageData = fs.createReadStream(imagePath);

        const formData = new FormData();
        formData.append('image', imageData);

        const response = await axios.post(UPLOAD_URL, formData, {
            headers: formData.getHeaders(),
        });

        console.log('[Seeder] Image uploaded successfully.');

        return response.data.file.path;
    } catch (err) {
        // Log the error in detail
        console.error(`[Seeder] Failed to upload ${imagePath}: ${err.message}`);
        if (err.response) {
            console.error('[Seeder] Response error:', err.response.data);
        } else if (err.request) {
            console.error('[Seeder] No response received:', err.request);
        } else {
            console.error('[Seeder] Error in setting up request:', err.message);
        }
        return null;
    }
};

const populateAdminUser = async () => {
    console.log('[Seeder] Populating database with default admin user...');

    const formData = {
        name: 'admin',
        email: 'admin@email.com',
        password: 'password',
    };

    const adminUserExists = await User.findOne({ email: 'admin@email.com' });

    if (!adminUserExists) {
        await axios.post(`${BACKEND_URL}/api/users/register`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    const adminUser = await User.findOne({ email: 'admin@email.com' });

    if (adminUser) {
        adminUser.isAdmin = true;
        const updatedUser = await adminUser.save();
        console.log(updatedUser);
    }

    console.log('[Seeder] Admin User Populated');
};

const populateArticles = async () => {
    const articleData = JSON.parse(fs.readFileSync(ARTICLE_JSON_FILE, 'utf-8'));

    for (const item of articleData) {
        const existing = await Article.findOne({ 'languages.en.title': item.languages.en.title });

        if (existing) {
            console.log(`[Seeder] Skipping: ${item.languages.en.title} (already exists)`);
            continue;
        }

        const imagePath = path.join(IMAGE_DIR, item.image_file);

        if (!fs.existsSync(imagePath)) {
            console.error(`[Seeder] Image file not found: ${imagePath}`);
            continue;
        }

        console.log(`[Seeder] Uploading image: ${item.image_file}`);
        const imageUrl = await uploadImage(imagePath);

        if (!imageUrl) {
            console.error(`[Seeder] Failed to upload image for ${item.languages['en'].title}`);
            continue;
        }

        console.log(`[Seeder] Image URL: ${imageUrl}`);

        const adminUser = await User.findOne({ email: 'admin@email.com' });

        const article = new Article({
            languages: item.languages,
            isPublished: true,
            user: adminUser._id,
            imageUrl,
        });

        await article.save();
        console.log(`[Seeder] Inserted: ${item.languages['en'].title}`);
    }
};

(async () => {
    try {
        await waitForMongo();
        await waitForBackend();
    } catch (err) {
        console.error('Seeder failed:', err.message);
    }
})();

populateAdminUser().catch((err) => {
    console.error('Error populating admin user:', err.message);
});

populateArticles().catch((err) => {
    console.error('Error populating articles:', err.message);
});
