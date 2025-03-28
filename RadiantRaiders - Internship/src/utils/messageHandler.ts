import { ChatMessage, Job, InterviewQuestion } from '../types';
import { supabase } from '../lib/supabase';

// Intent patterns for better message classification
const INTENT_PATTERNS = {
  RESEARCH_INTERNSHIP: /research|phd|academic|professor|lab|university/i,
  REMOTE_WORK: /remote|work from home|wfh|virtual/i,
  SPECIFIC_LOCATION: /bangalore|delhi|mumbai|hyderabad|pune/i,
  SPECIFIC_ROLE: /software|data science|ai|ml|marketing|finance|product/i,
  APPLICATION_HELP: /tips|help|resume|cv|apply|application/i,
  PORTAL_INFO: /portal|website|platform|where|how to find/i,
  SALARY_INFO: /salary|stipend|pay|compensation/i,
  COMPANY_INFO: /company|companies|firm|organization/i,
  FRESHER: /fresher|graduate|entry level|new grad|placement/i
};

// Enhanced response templates with more context and detail
const RESPONSE_TEMPLATES = {
  RESEARCH_INTERNSHIP: [
    "Here are some research internship opportunities I found:\n\n" +
    "🔬 Academic Research:\n" +
    "- University research labs\n" +
    "- Research institutes\n" +
    "- Industry R&D departments\n\n" +
    "Would you like me to show specific openings in your field of interest?",
    
    "I can help you find research internships! Some key areas to consider:\n\n" +
    "📚 Types of Programs:\n" +
    "1. Summer Research Programs\n" +
    "2. Lab Assistantships\n" +
    "3. Research Fellow positions\n\n" +
    "Which type interests you most?"
  ],
  
  REMOTE_WORK: [
    "I've found several remote internship opportunities:\n\n" +
    "💻 Available Positions:\n" +
    "- Software Development\n" +
    "- Data Analysis\n" +
    "- Digital Marketing\n" +
    "- Content Writing\n\n" +
    "Would you like to see the full job descriptions?",
    
    "Here are some remote-friendly companies hiring interns:\n\n" +
    "🏢 Top Employers:\n" +
    "- Tech Giants (Google, Microsoft)\n" +
    "- Startups\n" +
    "- Research Organizations\n\n" +
    "Shall I filter these based on your skills?"
  ],
  
  APPLICATION_TIPS: [
    "Here are some key tips for your internship application:\n\n" +
    "📝 Application Checklist:\n" +
    "1. Tailor your resume to the role\n" +
    "2. Write a compelling cover letter\n" +
    "3. Highlight relevant projects\n" +
    "4. Prepare for technical interviews\n\n" +
    "Would you like specific tips for any of these areas?",
    
    "Let me help you strengthen your application:\n\n" +
    "🎯 Key Focus Areas:\n" +
    "- Resume optimization\n" +
    "- Interview preparation\n" +
    "- Portfolio development\n" +
    "- Network building\n\n" +
    "Which area would you like to work on first?"
  ]
};

// Function to detect intent from user message
function detectIntent(message: string): string {
  if (INTENT_PATTERNS.RESEARCH_INTERNSHIP.test(message)) return 'RESEARCH_INTERNSHIP';
  if (INTENT_PATTERNS.REMOTE_WORK.test(message)) return 'REMOTE_WORK';
  if (INTENT_PATTERNS.APPLICATION_HELP.test(message)) return 'APPLICATION_TIPS';
  if (INTENT_PATTERNS.PORTAL_INFO.test(message)) return 'PORTAL_INFO';
  if (INTENT_PATTERNS.SPECIFIC_ROLE.test(message)) return 'SPECIFIC_ROLE';
  if (INTENT_PATTERNS.SPECIFIC_LOCATION.test(message)) return 'SPECIFIC_LOCATION';
  return 'GENERAL';
}

// Function to get a random response template
function getRandomResponse(intent: string): string {
  const templates = RESPONSE_TEMPLATES[intent as keyof typeof RESPONSE_TEMPLATES];
  if (!templates) return RESPONSE_TEMPLATES.APPLICATION_TIPS[0];
  return templates[Math.floor(Math.random() * templates.length)];
}

// Enhanced message handler with intent detection and contextual responses
export async function handleMessage(message: string): Promise<ChatMessage> {
  const intent = detectIntent(message);
  let response = '';
  let type: ChatMessage['type'] = 'general';

  try {
    // Fetch relevant data based on intent
    if (intent === 'SPECIFIC_ROLE' || intent === 'SPECIFIC_LOCATION') {
      const { data: jobs } = await supabase
        .from('jobs')
        .select('*')
        .limit(5);
      
      if (jobs && jobs.length > 0) {
        response = formatJobResponse(jobs);
        type = 'jobs';
      }
    } else if (intent === 'APPLICATION_TIPS') {
      response = getRandomResponse('APPLICATION_TIPS');
      type = 'general';
    } else if (intent === 'RESEARCH_INTERNSHIP') {
      response = getRandomResponse('RESEARCH_INTERNSHIP');
      type = 'jobs';
    } else if (intent === 'REMOTE_WORK') {
      response = getRandomResponse('REMOTE_WORK');
      type = 'jobs';
    } else {
      // Default response with general guidance
      response = "I can help you with:\n\n" +
        "1. Finding internships and jobs\n" +
        "2. Resume analysis and improvement\n" +
        "3. Interview preparation\n" +
        "4. Application tips\n\n" +
        "What would you like to focus on?";
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    response = "I apologize, but I encountered an error while fetching the latest opportunities. " +
               "Please try again or let me know if you'd like to explore other topics.";
  }

  return {
    id: Date.now().toString(),
    content: response,
    role: 'assistant',
    timestamp: new Date(),
    type,
    status: 'sent'
  };
}

function formatJobResponse(jobs: Job[]): string {
  return "Here are some relevant opportunities:\n\n" +
    jobs.map(job => (
      `🔹 ${job.title} at ${job.company}\n` +
      `   📍 ${job.location} (${job.type})\n` +
      `   💰 ${job.stipend || 'Stipend not specified'}\n` +
      `   ⏰ Deadline: ${job.deadline || 'Open'}\n` +
      `   🔗 [Apply Now](${job.applyUrl})\n`
    )).join('\n');
}