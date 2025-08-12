"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const { createPolicyIssue, createBureaucratMessage, createCitizenVoices, } = require('./vertexAI');
const app = (0, express_1.default)();
// CORS設定
const corsOrigins = [
    'http://localhost:5173',
    ...(process.env.CORS_ORIGINS
        ? process.env.CORS_ORIGINS.split(',').map((s) => s.trim())
        : []),
];
console.log('Allowed CORS origins:', corsOrigins);
app.use((0, cors_1.default)({
    origin: corsOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
}));
app.use(express_1.default.json());
// 政策課題生成API
app.post('/api/generatePolicy', async (req, res) => {
    try {
        console.log('政策課題生成リクエスト受信:', req.body);
        const { countryData, currentStats, turnNumber } = req.body;
        if (!countryData || !currentStats || !turnNumber) {
            return res.status(400).json({
                error: 'Missing required fields: countryData, currentStats, turnNumber',
            });
        }
        const policyIssue = await createPolicyIssue(countryData, currentStats, turnNumber);
        console.log('政策課題生成成功:', policyIssue.title);
        res.json({
            success: true,
            data: policyIssue,
            timestamp: new Date().toISOString(),
        });
    }
    catch (error) {
        console.error('政策課題生成エラー:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({
            error: 'Failed to generate policy issue',
            message: errorMessage,
            timestamp: new Date().toISOString(),
        });
    }
});
// AI官僚メッセージ生成API
app.post('/api/generateBureaucratMessage', async (req, res) => {
    try {
        console.log('AI官僚メッセージ生成リクエスト受信:', req.body);
        const { countryData, policyIssue, messageType, selectedOption } = req.body;
        if (!countryData || !policyIssue || !messageType) {
            return res.status(400).json({
                error: 'Missing required fields: countryData, policyIssue, messageType',
            });
        }
        const message = await createBureaucratMessage(countryData, policyIssue, messageType, selectedOption);
        console.log('AI官僚メッセージ生成成功:', message.message);
        res.json({
            success: true,
            data: message,
            timestamp: new Date().toISOString(),
        });
    }
    catch (error) {
        console.error('AI官僚メッセージ生成エラー:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({
            error: 'Failed to generate bureaucrat message',
            message: errorMessage,
            timestamp: new Date().toISOString(),
        });
    }
});
// 市民の声生成API
app.post('/api/generateCitizenVoices', async (req, res) => {
    try {
        console.log('市民の声生成リクエスト受信:', req.body);
        const { policyIssue, selectedOption, reasoning, countryData, currentStats, } = req.body;
        if (!policyIssue || !selectedOption || !countryData) {
            return res.status(400).json({
                error: 'Missing required fields: policyIssue, selectedOption, countryData',
            });
        }
        const citizenVoices = await createCitizenVoices(policyIssue, selectedOption, reasoning, countryData, currentStats);
        console.log('市民の声生成成功:', citizenVoices.length, '件');
        res.json({
            success: true,
            data: citizenVoices,
            timestamp: new Date().toISOString(),
        });
    }
    catch (error) {
        console.error('市民の声生成エラー:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({
            error: 'Failed to generate citizen voices',
            message: errorMessage,
            timestamp: new Date().toISOString(),
        });
    }
});
exports['ai-nation-api'] = app;
