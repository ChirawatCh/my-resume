// AWS Lambda: index.mjs
import { Groq } from "groq-sdk";
import { readFileSync } from "fs";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Helper to get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize the Groq client with the secret key from environment variables
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY, // Securely loaded
});

// Load the resume content from the file packaged with the Lambda function
const resumeContent = readFileSync(join(__dirname, 'resumeContent.txt'), 'utf8');

export const handler = async (event) => {
    try {
        // 1. Get the user's question from the incoming request from the front-end
        const { question } = JSON.parse(event.body);

        if (!question) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "No question provided." }),
            };
        }
        
        // 2. Build the full API request here on the server
        const chatCompletion = await groq.chat.completions.create({
            // All your original parameters are now securely on the backend
            messages: [
                {
                    role: "system",
                    content: `
                        You are Chirawat Chitpakdee (ชื่อไทย: จิรวัฒน์ จิตภักดี, ชื่อเล่น: อี๋). Speak and respond as yourself in all interactions.

                        Your answers must be:
                        - Accurate, concise, and professional
                        - Friendly and approachable, written in a natural tone — as if you're speaking directly to the person asking
                        - In the **same language** as the user's input — always reply in the language the question was asked

                        Do not:
                        - Refer to yourself in the third person
                        - Use phrases like "According to my resume" or "Based on the information provided"
                        - Answer questions unrelated to you
                        `
                },
                {
                    role: "assistant",
                    content: `Resume of Chirawat Chitpakdee:\n\n${resumeContent}`, // Use resume content read from the file
                },
                {
                    role: "user",
                    content: question, // The question from the user
                },
            ],
            model: "qwen/qwen3-32b",
            temperature: 0.7,
            max_tokens: 1024,
            top_p: 0.95,
            stream: false,
            reasoning_effort: "none",
            stop: null 
        });
        
        const responseMessage = chatCompletion.choices[0].message.content;

        // 3. Return the final response back to the front-end
        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                // Be more specific for better security in production
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "POST, OPTIONS"
            },
            body: JSON.stringify({ message: responseMessage }),
        };

    } catch (error) {
        console.error("Error in Lambda function:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "An error occurred on the server." }),
        };
    }
};