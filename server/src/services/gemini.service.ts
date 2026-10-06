import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIAnalysisResult, IssueType, IssueSeverity } from '../types/index.js';
import fs from 'fs';

export async function analyzeImageWithGemini(
  filePath?: string,
  fileMimeType: string = 'image/jpeg'
): Promise<AIAnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && filePath && fs.existsSync(filePath)) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const imageBuffer = fs.readFileSync(filePath);
      const base64Image = imageBuffer.toString('base64');

      const prompt = `
You are an expert civil infrastructure inspection AI for municipal governance.
Analyze this public infrastructure image. Identify if there is a defect like a Pothole, Damaged Road, Broken Streetlight, Overflowing Drain, Waterlogging, or Other.

Respond with ONLY valid JSON strictly adhering to this schema:
{
  "issueType": "Pothole" | "Damaged Road" | "Broken Streetlight" | "Overflowing Drain" | "Waterlogging" | "Other",
  "confidence": number between 0.80 and 0.99,
  "severity": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
  "description": "Detailed technical inspection summary of the defect",
  "department": "Public Works Department (PWD)" | "Stormwater & Drainage Board" | "Electrical Utilities Department" | "Disaster & Flood Cell",
  "recommendedAction": "Actionable repair recommendation for field engineers",
  "riskFactors": ["Risk 1", "Risk 2", "Risk 3"],
  "riskScore": number between 0 and 100
}
Do not wrap in backticks or markdown, return raw JSON string.
`;

      const result = await model.generateContent([
        prompt,
        {
          inlineData: {
            data: base64Image,
            mimeType: fileMimeType,
          },
        },
      ]);

      const responseText = result.response.text().trim();
      const cleanedJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed: AIAnalysisResult = JSON.parse(cleanedJson);
      return {
        ...parsed,
        isDemoMode: false,
      };
    } catch (error) {
      console.warn('Gemini API call failed, falling back to AI Demo Mode:', error);
    }
  }

  // Graceful fallback AI response (Demo Mode)
  return getFallbackAIAnalysis();
}

export function getFallbackAIAnalysis(): AIAnalysisResult {
  const categories: {
    issueType: IssueType;
    severity: IssueSeverity;
    department: string;
    description: string;
    action: string;
    risks: string[];
    riskScore: number;
  }[] = [
    {
      issueType: 'Pothole',
      severity: 'HIGH',
      department: 'Public Works Department (PWD)',
      description: 'Severe surface asphalt disintegration with sub-base depression (~85cm width, 12cm depth) located on high-volume traffic lane.',
      action: 'Immediate hot-mix asphalt compaction and sub-base stabilizer injection.',
      risks: ['High motorcycle loss-of-balance hazard', 'Tire blow-out and axle shear risk', 'Water infiltration accelerating erosion'],
      riskScore: 87,
    },
    {
      issueType: 'Damaged Road',
      severity: 'MEDIUM',
      department: 'Public Works Department (PWD)',
      description: 'Bituminous wearing coat unraveling with widespread micro-cracking and loose gravel scatter along lane shoulder.',
      action: 'Cold-milling of top wearing coat followed by micro-surfacing emulsion overlay.',
      risks: ['Flying gravel damage to vehicles', 'Rapid progression into structural pothole grid'],
      riskScore: 68,
    },
    {
      issueType: 'Overflowing Drain',
      severity: 'CRITICAL',
      department: 'Stormwater & Drainage Board',
      description: 'Choked stormwater catch pit with accumulated debris causing active blackwater spillover onto pedestrian footway.',
      action: 'Hydraulic suction jetting machine dispatch for immediate obstruction clearance.',
      risks: ['Severe public health hazard & bacterial contamination', 'Pedestrian slippage hazard', 'Flooding of adjacent commercial storefronts'],
      riskScore: 92,
    },
    {
      issueType: 'Broken Streetlight',
      severity: 'HIGH',
      department: 'Electrical Utilities Department',
      description: 'Non-functional 150W high-mast LED luminaire resulting in a 45m dark corridor across a primary pedestrian crossing.',
      action: 'Replace LED driver circuit board and inspect relay transformer wiring.',
      risks: ['Nighttime pedestrian safety hazard', 'Increased urban security vulnerability'],
      riskScore: 81,
    }
  ];

  // Pick a realistic result deterministically or semi-randomly
  const selected = categories[Math.floor(Math.random() * categories.length)];

  return {
    issueType: selected.issueType,
    confidence: Number((0.89 + Math.random() * 0.08).toFixed(2)),
    severity: selected.severity,
    description: selected.description,
    department: selected.department,
    recommendedAction: selected.action,
    riskFactors: selected.risks,
    riskScore: selected.riskScore,
    isDemoMode: true,
  };
}
