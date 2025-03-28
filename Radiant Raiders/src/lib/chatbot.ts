import stringSimilarity from 'string-similarity';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

interface Conversation {
  conversation_id: string;
  messages: Message[];
}

// Enhanced training data with more detailed responses
const trainingData: Conversation[] = [
  {
    conversation_id: "1",
    messages: [
      {
        role: "user",
        text: "What are the symptoms of diabetes?"
      },
      {
        role: "bot",
        text: "Common symptoms of diabetes include excessive thirst, frequent urination, unexplained weight loss, fatigue, blurred vision, and slow-healing wounds."
      }
    ]
  },
  {
    conversation_id: "2",
    messages: [
      {
        role: "user",
        text: "What is the best diet for weight loss?"
      },
      {
        role: "bot",
        text: "A balanced diet for weight loss should include high-protein foods, fiber-rich vegetables, whole grains, and healthy fats while minimizing sugar and processed foods."
      }
    ]
  },
  {
    conversation_id: "3",
    messages: [
      {
        role: "user",
        text: "How can I lower my blood pressure naturally?"
      },
      {
        role: "bot",
        text: "Lower your blood pressure naturally by reducing salt intake, exercising regularly, managing stress, eating a potassium-rich diet, and avoiding excessive alcohol."
      }
    ]
  },
  {
    conversation_id: "4",
    messages: [
      {
        role: "user",
        text: "What are the side effects of paracetamol?"
      },
      {
        role: "bot",
        text: "Common side effects of paracetamol include nausea, rash, liver damage (in excessive doses), and low blood pressure in rare cases."
      }
    ]
  },
  {
    conversation_id: "5",
    messages: [
      {
        role: "user",
        text: "What should I eat before a blood test?"
      },
      {
        role: "bot",
        text: "If fasting is required, avoid food and drink (except water) for 8-12 hours before the test. Otherwise, eat normally and avoid alcohol and caffeine."
      }
    ]
  }
];

// Enhanced text preprocessing
const preprocessText = (text: string): string => {
  return text.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ')
    .replace(/[०-९]/g, d => String(d.charCodeAt(0) - '०'.charCodeAt(0))) // Convert Hindi numerals
    .trim();
};

// Enhanced similarity matching with context awareness
const findMostSimilarQuestion = (userQuery: string): string => {
  const processedQuery = preprocessText(userQuery);
  const questions = trainingData.map(conv => preprocessText(conv.messages[0].text));
  
  const matches = stringSimilarity.findBestMatch(processedQuery, questions);
  
  // If confidence is too low, provide a generic response
  if (matches.bestMatch.rating < 0.3) {
    return "I apologize, but I'm not sure about that. Please consult a healthcare professional for accurate medical advice.";
  }
  
  return trainingData[matches.bestMatchIndex].messages[1].text;
};

// Enhanced Hinglish to English translation
const translateHinglishToEnglish = (text: string): string => {
  const dictionary: { [key: string]: string } = {
    // Common symptoms
    'bukhar': 'fever',
    'dard': 'pain',
    'khasi': 'cough',
    'chakkar': 'dizziness',
    'kamzori': 'weakness',
    'thakan': 'fatigue',
    'bhook': 'appetite',
    'neend': 'sleep',
    
    // Body parts
    'sar': 'head',
    'pet': 'stomach',
    'kamar': 'back',
    'dil': 'heart',
    'dimag': 'brain',
    
    // Medical terms
    'bimari': 'disease',
    'dawai': 'medicine',
    'doctor': 'doctor',
    'mareez': 'patient',
    'sehat': 'health',
    'ilaaj': 'treatment',
    'nuskha': 'prescription',
    
    // Common phrases
    'theek': 'better',
    'kharab': 'worse',
    'achcha': 'good',
    'bura': 'bad',
    
    // Questions
    'kya': 'what',
    'kaise': 'how',
    'kab': 'when',
    'kyun': 'why'
  };

  let translatedText = text.toLowerCase();
  Object.entries(dictionary).forEach(([hinglish, english]) => {
    translatedText = translatedText.replace(new RegExp(hinglish, 'gi'), english);
  });

  return translatedText;
};

// Main chatbot function with enhanced response generation
export const getChatbotResponse = (userQuery: string): string => {
  if (!userQuery.trim()) {
    return "Kripya apna sawal puchiye. (Please ask your question.)";
  }

  // Translate Hinglish to English
  const translatedQuery = translateHinglishToEnglish(userQuery);
  
  // Get the most relevant response
  const response = findMostSimilarQuestion(translatedQuery);

  // Add contextual greeting if it's a greeting
  if (userQuery.match(/^(hi|hello|namaste|namaskar)/i)) {
    return "Namaste! 🙏 " + response;
  }

  return response;
};

// Export functions for testing and external use
export const utils = {
  preprocessText,
  translateHinglishToEnglish,
  findMostSimilarQuestion
};