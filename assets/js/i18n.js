/**
 * Internationalization (i18n) Module
 * Handles multi-language support (English, Hindi, Gujarati)
 */
const I18n = (() => {
  let currentLang = localStorage.getItem('vw-lang') || 'en';

  const TRANSLATIONS = {
    en: {
      nav_home: 'Home',
      nav_quiz: 'Quiz',
      nav_journey: 'Journey',
      nav_leaders: 'Leaders',
      nav_states: 'States Map',
      nav_assistant: 'Assistant',
      nav_dashboard: 'Progress',
      hero_badge: '🗳️ 2024 Election Guide',
      hero_title_1: 'Master India\'s ',
      hero_title_span: 'Election Process',
      hero_subtitle: 'Your interactive roadmap to becoming an informed voter. Learn every step from registration to the polling booth.',
      roadmap_register: 'Register',
      roadmap_verify: 'Verify',
      roadmap_learn: 'Learn',
      roadmap_vote: 'Vote',
      journey_title: 'Interactive Voter Journey',
      journey_desc: 'A step-by-step masterclass on India\'s election process. Registration, EVM training, and your rights.',
      quiz_title: 'Knowledge Check',
      quiz_desc: 'Challenge yourself with quizzes on the electoral system. Earn XP as you master the rules of democracy.',
      leaders_title: 'Parliament Leaders',
      leaders_desc: 'Meet the current leaders of Lok Sabha & Rajya Sabha — their roles, powers, and constitutional responsibilities.',
      states_title: 'States Distribution',
      states_desc: 'Explore how Parliament seats are distributed across India\'s States and Union Territories on an interactive map.',
      assistant_title: 'Ask the Assistant',
      assistant_desc: 'Got questions? Our AI-powered assistant explains complex election concepts in simple language.',
      start_here: 'START HERE'
    },
    hi: {
      nav_home: 'होम',
      nav_quiz: 'क्विज',
      nav_journey: 'यात्रा',
      nav_leaders: 'नेता',
      nav_states: 'राज्य मानचित्र',
      nav_assistant: 'सहायक',
      nav_dashboard: 'प्रगति',
      hero_badge: '🗳️ 2024 चुनाव मार्गदर्शिका',
      hero_title_1: 'भारत की ',
      hero_title_span: 'चुनाव प्रक्रिया',
      hero_subtitle: 'एक सूचित मतदाता बनने के लिए आपका इंटरैक्टिव रोडमैप। पंजीकरण से लेकर मतदान केंद्र तक हर कदम सीखें।',
      roadmap_register: 'पंजीकरण',
      roadmap_verify: 'सत्यापित करें',
      roadmap_learn: 'सीखें',
      roadmap_vote: 'वोट दें',
      journey_title: 'इंटरैक्टिव मतदाता यात्रा',
      journey_desc: 'भारत की चुनाव प्रक्रिया पर एक स्टेप-बाय-स्टेप मास्टरक्लास। पंजीकरण, ईवीएम प्रशिक्षण और आपके अधिकार।',
      quiz_title: 'ज्ञान की जांच',
      quiz_desc: 'चुनावी प्रणाली पर क्विज के साथ खुद को चुनौती दें। जैसे-जैसे आप लोकतंत्र के नियमों में महारत हासिल करते हैं, XP अर्जित करें।',
      leaders_title: 'संसद के नेता',
      leaders_desc: 'लोकसभा और राज्यसभा के वर्तमान नेताओं से मिलें — उनकी भूमिकाएं, शक्तियां और संवैधानिक जिम्मेदारियां।',
      states_title: 'राज्यों का वितरण',
      states_desc: 'एक इंटरैक्टिव मानचित्र पर जानें कि भारत के राज्यों और केंद्र शासित प्रदेशों में संसद की सीटें कैसे वितरित की जाती हैं।',
      assistant_title: 'सहायक से पूछें',
      assistant_desc: 'सवाल हैं? हमारा एआई-संचालित सहायक जटिल चुनाव अवधारणाओं को सरल भाषा में समझाता है।',
      start_here: 'यहाँ से शुरू करें'
    },
    gu: {
      nav_home: 'હોમ',
      nav_quiz: 'ક્વિઝ',
      nav_journey: 'યાત્રા',
      nav_leaders: 'નેતાઓ',
      nav_states: 'રાજ્ય નકશો',
      nav_assistant: 'સહાયક',
      nav_dashboard: 'પ્રગતિ',
      hero_badge: '🗳️ 2024 ચૂંટણી માર્ગદર્શિકા',
      hero_title_1: 'ભારતની ',
      hero_title_span: 'ચૂંટણી પ્રક્રિયા',
      hero_subtitle: 'માહિતગાર મતદાર બનવા માટેનો તમારો ઇન્ટરેક્ટિવ રોડમેપ. નોંધણીથી લઈને મતદાન મથક સુધીના દરેક પગલા શીખો.',
      roadmap_register: 'નોંધણી',
      roadmap_verify: 'ચકાસો',
      roadmap_learn: 'શીખો',
      roadmap_vote: 'મત આપો',
      journey_title: 'ઇન્ટરેક્ટિવ મતદાર યાત્રા',
      journey_desc: 'ભારતની ચૂંટણી પ્રક્રિયા પર સ્ટેપ-બાય-સ્ટેપ માસ્ટરક્લાસ. નોંધણી, EVM તાલીમ અને તમારા અધિકારો.',
      quiz_title: 'જ્ઞાનની ચકાસણી',
      quiz_desc: 'ચૂંટણી પ્રણાલી પર ક્વિઝ સાથે તમારી જાતને પડકારો. જેમ તમે લોકશાહીના નિયમોમાં નિપુણતા મેળવશો તેમ XP મેળવો.',
      leaders_title: 'સંસદના નેતાઓ',
      leaders_desc: 'લોકસભા અને રાજ્યસભાના વર્તમાન નેતાઓને મળો — તેમની ભૂમિકાઓ, સત્તાઓ અને બંધારણીય જવાબદારીઓ.',
      states_title: 'રાજ્યોનું વિતરણ',
      states_desc: 'ઇન્ટરેક્ટિવ નકશા પર જાણો કે ભારતની સંસદની બેઠકો રાજ્યો અને કેન્દ્રશાસિત પ્રદેશોમાં કેવી રીતે વહેંચાયેલી છે.',
      assistant_title: 'સહાયકને પૂછો',
      assistant_desc: 'પ્રશ્નો છે? અમારો AI-સંચાલિત સહાયક જટિલ ચૂંટણી ખ્યાલોને સરળ ભાષામાં સમજાવે છે.',
      start_here: 'અહીંથી શરૂ કરો'
    },
    mr: {
      nav_home: 'होम',
      nav_quiz: 'क्विझ',
      nav_journey: 'प्रवास',
      nav_leaders: 'नेते',
      nav_states: 'राज्य नकाशा',
      nav_assistant: 'सहाय्यक',
      nav_dashboard: 'प्रगती',
      hero_badge: '🗳️ २०२४ निवडणूक मार्गदर्शिका',
      hero_title_1: 'भारताची ',
      hero_title_span: 'निवडणूक प्रक्रिया',
      hero_subtitle: 'एक जागरूक मतदार बनण्यासाठी तुमचा संवादात्मक रोडमॅप. नोंदणीपासून ते मतदान केंद्रापर्यंतचे प्रत्येक पाऊल शिका.',
      roadmap_register: 'नोंदणी',
      roadmap_verify: 'पडताळणी',
      roadmap_learn: 'शिका',
      roadmap_vote: 'मतदान करा',
      journey_title: 'संवादात्मक मतदार प्रवास',
      journey_desc: 'भारताच्या निवडणूक प्रक्रियेवर एक स्टेप-बाय-स्टेप मास्टरक्लास. नोंदणी, ईव्हीएम प्रशिक्षण आणि तुमचे अधिकार.',
      quiz_title: 'ज्ञान चाचणी',
      quiz_desc: 'निवडणूक प्रणालीवरील क्विझसह स्वतःला आव्हान द्या. तुम्ही लोकशाहीच्या नियमांमध्ये प्राविण्य मिळवत असताना XP मिळवा.',
      leaders_title: 'संसद नेते',
      leaders_desc: 'लोकसभा आणि राज्यसभेच्या वर्तमान नेत्यांना भेटा — त्यांच्या भूमिका, अधिकार आणि घटनात्मक जबाबदाऱ्या.',
      states_title: 'राज्यांचे वितरण',
      states_desc: 'भारतातील राज्ये आणि केंद्रशासित प्रदेशांमध्ये संसदेच्या जागा कशा वितरित केल्या जातात हे नकाशावर पहा.',
      assistant_title: 'सहाय्यकाला विचारा',
      assistant_desc: 'काही प्रश्न आहेत? आमचा AI-आधारित सहाय्यक निवडणूक संकल्पना सोप्या भाषेत स्पष्ट करतो.',
      start_here: 'येथून सुरुवात करा'
    }
  };

  function init() {
    updateUI();
  }

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('vw-lang', lang);
    updateUI();
    
    // Dispatch event for other components to update
    window.dispatchEvent(new CustomEvent('langChanged', { detail: { lang } }));
  }

  function updateUI() {
    const dict = TRANSLATIONS[currentLang];
    
    // Update elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (dict[key]) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });

    // Handle special cases (HTML content)
    const title1 = document.querySelector('[data-i18n-html="hero_title_1"]');
    if (title1) title1.textContent = dict.hero_title_1;
    
    const titleSpan = document.querySelector('[data-i18n-html="hero_title_span"]');
    if (titleSpan) titleSpan.textContent = dict.hero_title_span;

    // Update language selector active state
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('lang-btn--active', btn.dataset.lang === currentLang);
    });

    // Update HTML lang attribute
    document.documentElement.lang = currentLang;
  }

  function get(key) {
    return TRANSLATIONS[currentLang][key] || TRANSLATIONS['en'][key] || key;
  }

  return { init, setLanguage, get, currentLang: () => currentLang };
})();
