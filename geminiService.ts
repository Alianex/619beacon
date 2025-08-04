
import { GoogleGenAI, Type } from "@google/genai";
import type { Shelter, MindfulnessTip, VeteranServiceCategory, AnalyzedFeedback, TransportationProvider, GroundingSource } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface ShelterSearchResult {
    shelters: Shelter[];
    sources: GroundingSource[];
}

// Schemas for structured data extraction

const shelterSchema = {
    type: Type.OBJECT,
    properties: {
        name: { type: Type.STRING, description: "The official name of the shelter or organization." },
        address: { type: Type.STRING, description: "The full street address of the facility." },
        phone: { type: Type.STRING, description: "The main contact phone number in (XXX) XXX-XXXX format." },
        services: {
            type: Type.ARRAY,
            description: "A list of key services provided, e.g., 'Overnight Shelter', 'Meals', 'Counseling'.",
            items: { type: Type.STRING }
        },
        description: { type: Type.STRING, description: "A brief one or two sentence description of the shelter and who it serves." },
        hours: { type: Type.STRING, description: "The hours of operation, e.g., '24/7' or '9am - 5pm, Mon-Fri'." },
        latitude: { type: Type.NUMBER, description: "The geographic latitude of the shelter's address." },
        longitude: { type: Type.NUMBER, description: "The geographic longitude of the shelter's address." },
    },
    required: ["name", "address", "phone", "services", "description", "hours", "latitude", "longitude"]
};

const mindfulnessSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "A short, catchy title for the mindfulness exercise (e.g., 'Box Breathing')." },
        tip: { type: Type.STRING, description: "A 2-4 sentence description of a simple mindfulness or grounding technique. The tone should be calm, gentle, and easy to follow." },
    },
    required: ["title", "tip"]
};

const veteranProgramSchema = {
    type: Type.OBJECT,
    properties: {
        name: { type: Type.STRING, description: "The name of the specific program or organization." },
        description: { type: Type.STRING, description: "A brief description of the program and what it offers." },
    },
    required: ["name", "description"]
};

const veteranServiceCategorySchema = {
    type: Type.OBJECT,
    properties: {
        category: { type: Type.STRING, description: "The name of the service category (e.g., 'Housing Assistance', 'Healthcare')." },
        description: { type: Type.STRING, description: "A one or two sentence summary of what this category of service entails." },
        programs: {
            type: Type.ARRAY,
            description: "A list of key programs or agencies within this service category.",
            items: veteranProgramSchema
        }
    },
    required: ["category", "description", "programs"]
};

const analyzedFeedbackSchema = {
    type: Type.OBJECT,
    properties: {
        category: {
            type: Type.STRING,
            description: "Categorize the feedback into one of the following: 'Bug Report', 'Feature Request', 'Data Correction', 'Compliment', 'General'."
        },
        summary: { type: Type.STRING, description: "A one to two sentence summary of the user's feedback." },
        priority: {
            type: Type.STRING,
            description: "The priority of this feedback. One of 'Low', 'Medium', 'High'."
        }
    },
    required: ["category", "summary", "priority"]
};

const transportationProviderSchema = {
    type: Type.OBJECT,
    properties: {
        providerName: { type: Type.STRING, description: "The official name of the transportation provider or program." },
        description: { type: Type.STRING, description: "A brief one or two sentence summary of the transportation service offered." },
        contact: { type: Type.STRING, description: "The primary contact phone number or email for the service." },
        website: { type: Type.STRING, description: "The official website URL for the provider. Must start with http or https." },
        eligibility: { type: Type.STRING, description: "A brief summary of who is eligible for the service (e.g., 'Seniors 60+', 'Disabled individuals')." },
    },
    required: ["providerName", "description", "contact", "website", "eligibility"]
};

// API Functions

/**
 * Finds shelters using a user query with Google Search grounding.
 */
export async function findShelters(query: string): Promise<ShelterSearchResult> {
    const systemInstruction = `You are an expert resource finder for San Diego. Your task is to locate homeless shelters and related support services based on user queries.
- You MUST use Google Search to find the most accurate and up-to-date information.
- Your response MUST be a valid JSON array of objects.
- Each object in the array represents a single shelter or resource.
- The JSON object must strictly follow this structure: { "name": "string", "address": "string", "phone": "string", "services": ["string"], "description": "string", "hours": "string", "latitude": number, "longitude": number }.
- Ensure latitude and longitude are precise for mapping.
- If you cannot find a specific piece of information for a field, use a reasonable default like "Not available".
- Do NOT wrap the JSON output in markdown formatting like \`\`\`json.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Find resources in San Diego for: "${query}"`,
        config: {
            systemInstruction: systemInstruction,
            tools: [{ googleSearch: {} }],
        },
    });

    let shelters: Shelter[] = [];
    try {
        const text = response.text;

        // Gracefully handle cases where the model returns no text or the request was blocked.
        if (!text) {
             const candidate = response.candidates?.[0];
             if (candidate?.finishReason && candidate.finishReason !== 'STOP') {
                // Provide a more specific error if the model blocked the request for a known reason.
                throw new Error(`The request was blocked. Reason: ${candidate.finishReason}. Please modify your search query.`);
             }
             // Generic error for an empty response.
             throw new Error("The AI model returned an empty response. Please try your search again.");
        }

        // The model can sometimes wrap the JSON in markdown. This removes it.
        const jsonText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        shelters = JSON.parse(jsonText);
    } catch (e) {
        // Log the detailed error and raw text safely for debugging.
        console.error("Failed to parse shelter search results:", e, "Raw text:", response?.text ?? "undefined");
        if (e instanceof Error) {
            // Rethrow our specific, user-friendly errors.
            if (e.message.startsWith("The AI model returned an empty response") || e.message.startsWith("The request was blocked")) {
                throw e;
            }
        }
        // For JSON parsing errors or other unexpected issues, throw a generic message.
        throw new Error("The AI model returned an unexpected format. Please try your search again.");
    }
    
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    const sources: GroundingSource[] = groundingChunks
        // Ensure the URI exists and looks like a valid web link.
        .filter(chunk => chunk.web?.uri?.startsWith('http'))
        .map(chunk => ({
            uri: chunk.web!.uri!,
            title: chunk.web!.title || chunk.web!.uri!,
        }));
    
    // Deduplicate sources based on URI to avoid showing the same link multiple times.
    const uniqueSources = Array.from(new Map(sources.map(item => [item.uri, item])).values());

    return { shelters, sources: uniqueSources };
}

/**
 * Gets a single mindfulness tip.
 */
export async function getMindfulnessTip(): Promise<MindfulnessTip> {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Generate one simple, effective, and brief mindfulness or grounding technique suitable for someone experiencing stress. The tone should be calming and reassuring.",
        config: {
            responseMimeType: "application/json",
            responseSchema: mindfulnessSchema,
        },
    });

    return JSON.parse(response.text);
}

/**
 * Gets a list of veteran service categories.
 */
export async function getVeteranServices(): Promise<VeteranServiceCategory[]> {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "List major categories of veteran support services available in San Diego. For each category, provide a name, a brief description, and a list of 2-3 key example programs or organizations with brief descriptions of what they do. Focus on categories like housing, healthcare, employment, and mental wellness.",
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: veteranServiceCategorySchema
            }
        }
    });

    return JSON.parse(response.text);
}

/**
 * Gets a list of transportation providers.
 */
export async function getTransportationInfo(): Promise<TransportationProvider[]> {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "List free or very low-cost transportation providers or programs available in San Diego County for low-income individuals, seniors, or people with disabilities. For each, provide the provider name, a brief description, contact info (phone or website), the website URL, and a summary of eligibility requirements.",
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: transportationProviderSchema,
            }
        }
    });

    return JSON.parse(response.text);
}

/**
 * Analyzes and "submits" user feedback.
 */
export async function submitFeedback(feedbackType: string, message: string): Promise<void> {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Analyze the following user feedback. The user has pre-categorized it as "${feedbackType}". The message is: "${message}". Please confirm or correct the category, provide a concise one-sentence summary, and assign a priority level (Low, Medium, High).`,
        config: {
            responseMimeType: "application/json",
            responseSchema: analyzedFeedbackSchema,
        }
    });

    const analysis: AnalyzedFeedback = JSON.parse(response.text);
    
    // In a real application, this `analysis` object would be sent to a backend.
    // For this example, we'll just log it to the console.
    console.log("Analyzed Feedback Submitted:", analysis);
}
