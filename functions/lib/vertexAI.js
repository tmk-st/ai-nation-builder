"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const { VertexAI } = require('@google-cloud/vertexai');
// Vertex AI クライアント初期化
const vertex_ai = new VertexAI({
    project: process.env.GOOGLE_CLOUD_PROJECT,
    location: process.env.GOOGLE_CLOUD_LOCATION || 'us-central1',
});
const model = vertex_ai.preview.getGenerativeModel({
    model: 'gemini-2.5-flash',
    generation_config: {
        max_output_tokens: 2048,
        temperature: 0.7,
        top_p: 0.8,
    },
});
// 政策課題生成
exports.createPolicyIssue = async function (countryData, currentStats, turnNumber) {
    const prompt = `
あなたは仮想国家「${countryData.name}」の政策立案AIです。

【国家情報】
- 国名: ${countryData.name}
- 政府形態: ${countryData.government}
- 人口: ${countryData.population.toLocaleString()}人
- 説明: ${countryData.description}

【現在の国家指標】
- 国民幸福度: ${currentStats.happiness}/100
- 経済力: ${currentStats.economy}/100
- 環境: ${currentStats.environment}/100
- 治安: ${currentStats.security}/100
- 教育: ${currentStats.education || 50}/100
- 医療: ${currentStats.healthcare || 50}/100

【ターン情報】
第${turnNumber}期の政策課題

以下のJSON形式で、リアルな政策課題を1つ生成してください：
マークダウンのコードブロック（\`\`\`）は使用しないでください。

{
  "title": "政策課題のタイトル",
  "description": "課題の詳細説明（200-300文字）",
  "category": "economy|environment|social|security|education|healthcare",
  "difficulty": "easy|medium|hard",
  "options": [
    {
      "title": "選択肢1のタイトル",
      "description": "選択肢の説明",
      "consequences": "実施した場合の結果予測",
      "cost": 人口に基づく予算コスト,
      "timeToImplement": 数値（実装月数）,
      "impact": {
        "happiness": "国民の幸福度への予想される影響（-20から+20の整数）",
        "economy": "経済への予想される影響（-20から+20の整数）",
        "environment": "環境への予想される影響（-20から+20の整数）",
        "security": "安全保障への予想される影響（-20から+20の整数）"
      }
    },
    {
      "title": "選択肢2のタイトル",
      "description": "選択肢の説明",
      "consequences": "実施した場合の結果予測", 
      "cost": 数値（人口に基づく予算コスト）,
      "timeToImplement": 数値（実装月数）,
      "impact": {
        "happiness": "国民の幸福度への予想される影響（-20から+20の整数）",
        "economy": "経済への予想される影響（-20から+20の整数）",
        "environment": "環境への予想される影響（-20から+20の整数）",
        "security": "安全保障への予想される影響（-20から+20の整数）"
      }
    },
    {
      "title": "選択肢3のタイトル",
      "description": "選択肢の説明",
      "consequences": "実施した場合の結果予測",
      "cost": 数値（人口に基づく予算コスト）,
      "timeToImplement": 数値（実装月数）,
      "impact": {
        "happiness": "国民の幸福度への予想される影響（-20から+20の整数）",
        "economy": "経済への予想される影響（-20から+20の整数）",
        "environment": "環境への予想される影響（-20から+20の整数）",
        "security": "安全保障への予想される影響（-20から+20の整数）"
      }
    }
  ]
}

JSONのみを返してください。
`;
    try {
        const result = await model.generateContent(prompt);
        const responseText = result.response.candidates[0].content.parts[0].text;
        // JSONを抽出
        const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/) ||
            responseText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('JSON形式の応答が見つかりません');
        }
        const policyData = JSON.parse(jsonMatch[0]);
        // PolicyIssue形式に変換
        return {
            id: `policy-${Date.now()}`,
            title: policyData.title,
            description: policyData.description,
            category: policyData.category,
            difficulty: policyData.difficulty,
            impact: policyData.impact,
            options: policyData.options.map((opt, index) => ({
                id: `option-${Date.now()}-${index}`,
                title: opt.title,
                description: opt.description,
                consequences: opt.consequences,
                cost: opt.cost,
                timeToImplement: opt.timeToImplement,
                impact: opt.impact || {},
            })),
            createdAt: new Date(),
        };
    }
    catch (error) {
        console.error('Vertex AI Error:', error);
        throw new Error(`政策課題の生成に失敗しました: ${error}`);
    }
};
// AI官僚メッセージ生成
exports.createBureaucratMessage = async function (countryData, policyIssue, messageType, selectedOption) {
    let prompt = `
あなたは仮想国家「${countryData.name}」のAI官僚アシスタントです。

【状況】
政策課題: ${policyIssue.title}
課題説明: ${policyIssue.description}
`;
    if (selectedOption) {
        prompt += `
選択された政策: ${selectedOption.title}
政策説明: ${selectedOption.description}
`;
    }
    switch (messageType) {
        case 'question':
            prompt += `
この政策課題について、指導者への質問・確認事項を1つ生成してください。
政策選択に役立つ観点や考慮すべき点を含めてください。
150文字以内で回答してください。
`;
            break;
        case 'advice':
            prompt += `
この政策課題について、指導者への助言を生成してください。
各選択肢のメリット・デメリットや推奨事項を含めてください。
150文字以内で回答してください。
`;
            break;
        case 'neutral':
            prompt += `
選択された政策について、実行結果の報告を生成してください。
政策の効果と今後の展望について客観的に述べてください。
150文字以内で回答してください。
`;
            break;
        default:
            prompt += `
この状況について、適切なコメントを生成してください。
150文字以内で回答してください。
`;
    }
    try {
        const result = await model.generateContent(prompt);
        const responseText = result.response.candidates[0].content.parts[0].text;
        return {
            id: `msg-${Date.now()}`,
            type: messageType,
            message: responseText.trim(),
            timestamp: new Date(),
            policyIssueId: policyIssue.id,
        };
    }
    catch (error) {
        console.error('Vertex AI Error:', error);
        throw new Error(`官僚メッセージの生成に失敗しました: ${error}`);
    }
};
// 市民の声生成
exports.createCitizenVoices = async function (policyIssue, selectedOption, reasoning, countryData, currentStats) {
    const prompt = `
あなたは仮想国家「${countryData.name}」の市民として、政策に対する多様な意見を生成するAIです。

【国家情報】
- 国名: ${countryData.name}
- 政府形態: ${countryData.government}
- 人口: ${countryData.population.toLocaleString()}人
- 国家の特徴: ${countryData.description}

【現在の国家状況】
- 国民幸福度: ${currentStats.happiness}/100
- 経済力: ${currentStats.economy}/100
- 環境: ${currentStats.environment}/100
- 治安: ${currentStats.security}/100
- 教育: ${currentStats.education || 50}/100
- 医療: ${currentStats.healthcare || 50}/100

【政策課題】
課題: ${policyIssue.title}
内容: ${policyIssue.description}

【選択された政策】
政策名: ${selectedOption.title}
説明: ${selectedOption.description}
結果予測: ${selectedOption.consequences}
予算: ${selectedOption.cost.toLocaleString()}円
実装期間: ${selectedOption.timeToImplement}ヶ月
政策決定の理由: ${reasoning}

以下のJSON形式で、多様な市民の声を3-5人分生成してください：
マークダウンのコードブロック（\`\`\`）は使用しないでください。

{
  "voices": [
    {
      "name": "市民の名前（日本名）",
      "age": 年齢（20-70歳の間）,
      "occupation": "職業",
      "opinion": "この政策に対する職業・立場に応じた具体的な意見（100-150文字）",
      "sentiment": "positive|negative|neutral"
    }
  ]
}

【職業と視点の指定】
以下の職業から選択し、それぞれの立場に応じた意見を生成：

1. **会社員**: 雇用・給与・労働環境への影響を重視
2. **個人事業主**: 税制・規制・事業環境への影響を重視  
3. **エンジニア**: 技術革新・デジタル化・効率性を重視
4. **学生**: 教育・将来性・就職への影響を重視
5. **主婦**: 家計・子育て・生活コストへの影響を重視
6. **公務員**: 行政効率・予算・社会保障を重視
7. **自営業者**: 商売・地域経済・規制緩和を重視
8. **医療従事者**: 医療制度・社会保障・健康への影響を重視
9. **教育関係者**: 教育制度・人材育成・社会発展を重視
10. **高齢者**: 年金・医療・社会保障を重視

【生成ルール】
1. 3-5人の市民を生成
2. 年齢は20-70歳でバラつかせる
3. 職業は上記10種類から多様に選択
4. 各職業の専門的視点を反映した意見にする
5. 国家指標の状況を考慮する
6. sentiment は職業的利害と政策内容から realistic に判断
7. 賛成・反対・中立をバランス良く配置

JSONのみを返してください。
`;
    try {
        const result = await model.generateContent(prompt);
        const responseText = result.response.candidates[0].content.parts[0].text;
        // JSONを抽出
        const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/) ||
            responseText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('JSON形式の応答が見つかりません');
        }
        const voicesData = JSON.parse(jsonMatch[0]);
        // CitizenVoice形式に変換
        const citizenVoices = voicesData.voices.map((voice, index) => ({
            id: `voice-${Date.now()}-${index}`,
            name: voice.name,
            age: voice.age,
            occupation: voice.occupation,
            opinion: voice.opinion,
            sentiment: voice.sentiment,
            policyIssueId: policyIssue.id,
            timestamp: new Date(),
        }));
        return citizenVoices;
    }
    catch (error) {
        console.error('Vertex AI Error:', error);
        // AIが失敗した場合は空の配列を返す
        return [];
    }
};
