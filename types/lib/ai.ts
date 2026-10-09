import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIAnalysisResult, UrgencyLevel } from '@/types/support';

const SYSTEM_PROMPT = `
You are an AI customer support assistant for SWII.
Analyze the customer's support request carefully and provide:
1. A helpful, professional, friendly, and empathetic response addressing their issue.
2. The most appropriate category from: Technical Issue, Account Issue, Billing, Payment, Product or Service Inquiry, Complaint, General Inquiry, Feedback, Other.
3. An urgency level: Low, Medium, High, or Critical.
4. A concise summary of the complaint (1-2 sentences).

Do not invent company policies, account information, refunds, or technical fixes that have not been confirmed.

You MUST return strictly valid JSON matching this structure:
{
  "response": "Your detailed support response here",
  "category": "Selected Category",
  "urgency": "Low" | "Medium" | "High" | "Critical",
  "summary": "Short summary of the issue"
}
`;

function validateUrgency(urgencyStr: string): UrgencyLevel {
  const normalized = (urgencyStr || '').toLowerCase();
  if (normalized.includes('critical')) return 'Critical';
  if (normalized.includes('high')) return 'High';
  if (normalized.includes('medium')) return 'Medium';
  return 'Low';
}

function determineCategory(subject: string, complaint: string): string {
  const text = `${subject} ${complaint}`.toLowerCase();
  if (text.includes('login') || text.includes('password') || text.includes('account') || text.includes('access')) {
    return 'Account Issue';
  }
  if (text.includes('billing') || text.includes('invoice') || text.includes('charge') || text.includes('refund')) {
    return 'Billing';
  }
  if (text.includes('payment') || text.includes('card') || text.includes('checkout') || text.includes('bank')) {
    return 'Payment';
  }
  if (text.includes('bug') || text.includes('error') || text.includes('broken') || text.includes('crash')) {
    return 'Technical Issue';
  }
  if (text.includes('feedback') || text.includes('suggestion') || text.includes('feature')) {
    return 'Feedback';
  }
  return 'General Inquiry';
}

function generateFallbackAnalysis(subject: string, complaint: string): AIAnalysisResult {
  const category = determineCategory(subject, complaint);
  const text = `${subject} ${complaint}`.toLowerCase();
  
  let urgency: UrgencyLevel = 'Low';
  if (text.includes('urgent') || text.includes('immediately') || text.includes('cannot access') || text.includes('locked out') || text.includes('critical')) {
    urgency = 'High';
  } else if (text.includes('error') || text.includes('fail') || text.includes('problem') || text.includes('issue')) {
    urgency = 'Medium';
  }

  return {
    response: `Hello, thank you for contacting SWII Support regarding "${subject}". We have logged your request. Our support team is prioritizing your inquiry under category '${category}' with urgency level '${urgency}'. A support representative will follow up if further action is required.`,
    category,
    urgency,
    summary: `Customer reported: ${subject} - ${complaint.length > 90 ? complaint.slice(0, 90) + '...' : complaint}`,
  };
}

export async function analyzeSupportRequest(
  subject: string,
  complaint: string
): Promise<AIAnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY || process.env.AI_API_KEY || process.env.OPENAI_API_KEY;

  if (!apiKey || apiKey.includes('YOUR_')) {
    return generateFallbackAnalysis(subject, complaint);
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
      },
    });

    const userPrompt = `Subject: ${subject}\nComplaint/Request: ${complaint}`;

    const result = await model.generateContent([
      { text: SYSTEM_PROMPT },
      { text: userPrompt },
    ]);

    const responseText = result.response.text();
    const parsed = JSON.parse(responseText);

    return {
      response: parsed.response || 'Thank you for reaching out to SWII support. We have received your request and our team will review it shortly.',
      category: parsed.category || determineCategory(subject, complaint),
      urgency: validateUrgency(parsed.urgency),
      summary: parsed.summary || `${subject}: ${complaint.slice(0, 80)}...`,
    };
  } catch (error) {
    console.error('Error during AI analysis with Gemini API:', error);
    return generateFallbackAnalysis(subject, complaint);
  }
}
