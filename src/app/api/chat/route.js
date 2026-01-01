import { GoogleGenerativeAI } from "@google/generative-ai";
import { developerInfo } from "@/data/developerInfo";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return Response.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const context = `
You are an AI assistant representing ${developerInfo.name}, a ${developerInfo.role} from ${developerInfo.location}.

Developer Details:
- Skills: ${developerInfo.skills.join(", ")}
- Experience: ${developerInfo.experience}
- Education: ${developerInfo.education}
- Passions: ${developerInfo.passions.join(", ")}
- Projects: ${developerInfo.projects.join(", ")}
- Availability: ${developerInfo.availability}
- Contact: Email: ${developerInfo.contact.email}, LinkedIn: ${developerInfo.contact.linkedin}, GitHub: ${developerInfo.contact.github}

Respond in a professionally, concise, and informative way. If the question is unrelated, politely redirect to his skills, projects, or availability. Keep responses conversational and engaging. 
Provide needable details without overwhelming the user. Not wesat time of user. Answer Shortly.
    `.trim();

    const lastMessage = messages[messages.length - 1];
    const fullPrompt = `${context}\n\nUser: ${lastMessage.content}\n\nAssistant:`;

    const result = await model.generateContent(fullPrompt);
    const text = result.response.text();

    return Response.json({ text });
  } catch (error) {
    console.error("Gemini Error:", error);
    return Response.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}