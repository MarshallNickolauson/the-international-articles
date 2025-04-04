import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const port = process.env.MARIAN_MT_AI_PORT || 9000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(
    cors({
        origin: (origin, callback) => {
            const allowedOrigins = ['http://localhost:3000', 'http://frontend:3000'];
            if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
                callback(null, true);
            } else {
                callback(new Error('CORS policy does not allow access from this origin'), false);
            }
        },
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    })
);

app.use(express.json());

const activeProcesses = new Map();

app.post('/translate', (req, res) => {
    const { text, sourceLang, targetLang, requestId } = req.body;

    if (!text || !sourceLang || !targetLang) {
        return res.status(400).json({ error: "Missing required fields 'text', 'sourceLang', or 'targetLang'" });
    }

    const pythonProcess = spawn(process.env.PYTHON_PATH || 'python', [path.join(__dirname, 'translate.py'), text, sourceLang, targetLang]);

    activeProcesses.set(requestId, pythonProcess);

    let output = '';
    let errorOutput = '';

    pythonProcess.stdout.on('data', (data) => {
        output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        errorOutput += data.toString();
    });

    pythonProcess.on('close', (code) => {
        activeProcesses.delete(requestId);

        if (code !== 0 || !output.trim()) {
            return res.status(500).json({ error: 'Translation process failed or returned empty output.' });
        }

        try {
            const result = JSON.parse(output.trim());
            res.json({
                sourceLang,
                targetLang,
                translatedText: result.translatedText || '',
                timestamp: Date.now(),
            });
        } catch (parseError) {
            console.error('JSON Parse Error:', parseError, 'Output:', output);
            return res.status(500).json({ error: 'Failed to parse translation result' });
        }
    });
});

app.post('/translate/abort', (req, res) => {
    const { requestId } = req.body;

    if (!requestId || !activeProcesses.has(requestId)) {
        return res.status(400).json({ error: 'Invalid or missing requestId' });
    }

    const pythonProcess = activeProcesses.get(requestId);
    pythonProcess.kill('SIGTERM');

    activeProcesses.delete(requestId);

    res.status(200).json({ message: 'Translation aborted successfully' });
});

app.listen(port, () => console.log(`Marian MT AI server running on http://localhost:${port}`));
