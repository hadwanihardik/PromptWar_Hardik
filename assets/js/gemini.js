/**
 * Gemini API Integration
 * Provides AI-powered responses for the assistant and quiz explanations.
 * Falls back to local knowledge base when no API key is configured.
 */
const Gemini = (() => {
  // Set your Gemini API key here or leave empty for offline mode
  let API_KEY = '';
  const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  const SYSTEM_PROMPT = `You are VoteWise, a friendly and knowledgeable election education assistant for Indian citizens. 
Your role:
- Explain election processes in simple, clear language
- Help first-time voters understand registration, voting, and their rights
- Provide accurate information about the Election Commission of India
- Be encouraging and supportive about civic participation
- Keep responses concise (2-4 paragraphs max)
- Use bullet points for steps and lists
- If asked about something outside elections/voting, politely redirect to election topics

Important facts to remember:
- Minimum voting age in India: 18 years
- Election Commission established under Article 324
- Voter registration via Form 6 on NVSP portal
- EPIC (Voter ID) is the primary identification
- EVMs and VVPATs are used for voting
- NOTA option available since 2013

Current Parliament Leaders (18th Lok Sabha, 2024–present):
LOK SABHA:
- Speaker: Om Birla (BJP, Kota, Rajasthan) — re-elected June 2024 for 2nd consecutive term
- Leader of the House: Narendra Modi (PM, BJP, Varanasi) — 3rd consecutive term
- Leader of the Opposition: Rahul Gandhi (INC, Rae Bareli) — first official LoP since 2014
- Deputy Speaker: Post currently vacant (vacant since 17th Lok Sabha, 2019)
RAJYA SABHA:
- Chairman: C.P. Radhakrishnan — ex-officio as Vice President of India (Article 89)
- Deputy Chairman: Harivansh Narayan Singh (JDU, Bihar)
- Leader of the House: J.P. Nadda (BJP, HP) — also BJP National President
- Leader of the Opposition: Mallikarjun Kharge (INC, Karnataka) — also INC National President`;

  // Local fallback knowledge base
  const FALLBACK_KB = {
    'document': 'To vote in India, you need your **Voter ID Card (EPIC)** as primary identification. The ECI also accepts 11 other photo IDs including:\n\n• Aadhaar Card\n• Passport\n• Driving License\n• PAN Card\n• Smart Card issued by RGI\n• MNREGA Job Card\n• Bank/Post Office Passbook with photo\n\nMake sure to carry one of these on election day!',
    'register': 'To register as a voter in India:\n\n1. **Online:** Visit the NVSP portal (nvsp.in) and fill Form 6\n2. **Offline:** Visit your nearest Electoral Registration Officer (ERO)\n3. **App:** Use the Voter Helpline App\n\n**Documents needed:**\n• Age proof (birth certificate, school certificate)\n• Address proof (Aadhaar, utility bills)\n• Passport-size photo\n\nThe qualifying date for age is January 1st of the year of revision of electoral rolls.',
    'nota': '**NOTA (None Of The Above)** is an option on the EVM that allows voters to reject all candidates.\n\n• Introduced by Supreme Court order in September 2013\n• Available in all elections (Lok Sabha, State Assembly, etc.)\n• If NOTA gets the highest votes, the candidate with next highest votes still wins\n• It\'s a way to formally express dissatisfaction with all candidates\n• Symbol: A ballot paper with a cross mark',
    'evm': 'The **Electronic Voting Machine (EVM)** has two units:\n\n1. **Ballot Unit:** Where candidates\' names and symbols are displayed. Voter presses the button next to their choice.\n2. **Control Unit:** Operated by the presiding officer. Controls the ballot unit.\n\n**Key features:**\n• Runs on battery (no electricity needed)\n• Records up to 2,000 votes\n• Cannot be connected to the internet\n• Paired with VVPAT for paper verification\n\nAfter voting, the VVPAT displays a paper slip for 7 seconds showing your choice.',
    'rights': 'As a voter in India, you have these fundamental rights:\n\n• **Right to Vote:** Every citizen 18+ can vote (Article 326)\n• **Right to Secret Ballot:** Your vote is confidential\n• **Right to NOTA:** Reject all candidates officially\n• **Right to Information:** Know about candidates (affidavits)\n• **Right to Complain:** File complaints about electoral malpractice\n• **Right to Accessibility:** PWD-friendly polling stations\n• **Paid Leave:** Employees get paid leave on election day\n\nRemember: Voting is your right, exercise it responsibly!',
    'polling': 'To find your polling station:\n\n1. **Online:** Visit electoralsearch.eci.gov.in\n2. **SMS:** Send EPIC<space>VOTER_ID to 1950\n3. **App:** Use the Voter Helpline App\n4. **Call:** Dial 1950 (toll-free)\n\nPolling stations are typically set up in schools, community halls, and government buildings within your constituency.',
    'default': 'I\'m here to help you learn about the Indian election process! You can ask me about:\n\n• 📋 Voter registration process\n• 📄 Required documents for voting\n• 🗳️ How EVMs and VVPATs work\n• ✋ NOTA and your voting rights\n• 📍 Finding your polling station\n• 📅 Election timelines and schedules\n• 🏛️ Leaders of Lok Sabha & Rajya Sabha\n\nWhat would you like to know?',
    'leaders': '**Current Leaders of Parliament (18th Lok Sabha, 2024–present)**\n\n🏛️ **LOK SABHA (Lower House)**\n• **Speaker:** Om Birla (BJP, Kota, Rajasthan) — 2nd consecutive term, elected June 2024\n• **Leader of the House:** Narendra Modi (PM, BJP, Varanasi) — 3rd consecutive term\n• **Leader of the Opposition:** Rahul Gandhi (INC, Rae Bareli) — first official LoP since 2014\n• **Deputy Speaker:** Post currently vacant (vacant since 17th Lok Sabha)\n\n📜 **RAJYA SABHA (Upper House)**\n• **Chairman:** C.P. Radhakrishnan (ex-officio as Vice President, Article 89)\n• **Deputy Chairman:** Harivansh Narayan Singh (JDU, Bihar)\n• **Leader of the House:** J.P. Nadda (BJP, HP) — also BJP National President\n• **Leader of the Opposition:** Mallikarjun Kharge (INC, Karnataka) — also INC National President, first non-Gandhi to lead INC in 24 years\n\nVisit the **Leaders** tab for detailed profiles with constitutional roles and key facts!'
  };

  function setApiKey(key) {
    API_KEY = key;
  }

  function findFallbackAnswer(query) {
    const q = query.toLowerCase();
    if (q.includes('document') || q.includes('id') || q.includes('card') || q.includes('proof')) return FALLBACK_KB['document'];
    if (q.includes('register') || q.includes('enroll') || q.includes('form 6') || q.includes('nvsp')) return FALLBACK_KB['register'];
    if (q.includes('nota') || q.includes('none of the above') || q.includes('reject')) return FALLBACK_KB['nota'];
    if (q.includes('evm') || q.includes('machine') || q.includes('vvpat') || q.includes('electronic')) return FALLBACK_KB['evm'];
    if (q.includes('right') || q.includes('entitle') || q.includes('privilege')) return FALLBACK_KB['rights'];
    if (q.includes('polling') || q.includes('station') || q.includes('booth') || q.includes('where')) return FALLBACK_KB['polling'];
    if (q.includes('leader') || q.includes('speaker') || q.includes('lok sabha') || q.includes('rajya sabha') || q.includes('parliament') || q.includes('om birla') || q.includes('rahul') || q.includes('kharge') || q.includes('nadda') || q.includes('modi') || q.includes('chairman') || q.includes('opposition')) return FALLBACK_KB['leaders'];
    return FALLBACK_KB['default'];
  }

  async function ask(userMessage, conversationHistory = []) {
    // If no API key, use fallback
    if (!API_KEY) {
      await delay(800 + Math.random() * 700);
      return findFallbackAnswer(userMessage);
    }

    try {
      const contents = [];
      // Add system instruction as first turn
      contents.push({ role: 'user', parts: [{ text: SYSTEM_PROMPT }] });
      contents.push({ role: 'model', parts: [{ text: 'Understood! I\'m VoteWise, ready to help with election education.' }] });

      // Add conversation history
      for (const msg of conversationHistory) {
        contents.push({ role: msg.role === 'user' ? 'user' : 'model', parts: [{ text: msg.text }] });
      }

      // Add current message
      contents.push({ role: 'user', parts: [{ text: userMessage }] });

      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.7,
            topP: 0.9,
            maxOutputTokens: 512
          }
        })
      });

      if (!response.ok) {
        console.warn('Gemini API error, falling back to local KB');
        return findFallbackAnswer(userMessage);
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || findFallbackAnswer(userMessage);
    } catch (err) {
      console.warn('Gemini API call failed:', err);
      return findFallbackAnswer(userMessage);
    }
  }

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  return { ask, setApiKey };
})();
