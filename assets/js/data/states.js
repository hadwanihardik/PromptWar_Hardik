/**
 * State-wise Parliamentary Seats Data
 * Contains the distribution of Lok Sabha and Rajya Sabha seats for all Indian States and UTs.
 * ISO codes correspond to Google GeoChart IN region codes.
 */
const STATES_DATA = [
  { id: 'IN-AP', name: 'Andhra Pradesh', name_hi: 'आंध्र प्रदेश', name_gu: 'આંધ્ર પ્રદેશ', name_mr: 'आंध्र प्रदेश', type: 'State', lokSabha: 25, rajyaSabha: 11 },
  { id: 'IN-AR', name: 'Arunachal Pradesh', name_hi: 'अरुणाचल प्रदेश', name_gu: 'અરુણાચલ પ્રદેશ', name_mr: 'अरुणाचल प्रदेश', type: 'State', lokSabha: 2, rajyaSabha: 1 },
  { id: 'IN-AS', name: 'Assam', name_hi: 'असम', name_gu: 'આસામ', name_mr: 'आसाम', type: 'State', lokSabha: 14, rajyaSabha: 7 },
  { id: 'IN-BR', name: 'Bihar', name_hi: 'बिहार', name_gu: 'બિહાર', name_mr: 'बिहार', type: 'State', lokSabha: 40, rajyaSabha: 16 },
  { id: 'IN-CT', name: 'Chhattisgarh', name_hi: 'छत्तीसगढ़', name_gu: 'છત્તીસગઢ', name_mr: 'छत्तीसगड', type: 'State', lokSabha: 11, rajyaSabha: 5 },
  { id: 'IN-GA', name: 'Goa', name_hi: 'गोवा', name_gu: 'ગોવા', name_mr: 'गोवा', type: 'State', lokSabha: 2, rajyaSabha: 1 },
  { id: 'IN-GJ', name: 'Gujarat', name_hi: 'गुजरात', name_gu: 'ગુજરાત', name_mr: 'गुजरात', type: 'State', lokSabha: 26, rajyaSabha: 11 },
  { id: 'IN-HR', name: 'Haryana', name_hi: 'हरियाणा', name_gu: 'હરિયાણા', name_mr: 'हरियाणा', type: 'State', lokSabha: 10, rajyaSabha: 5 },
  { id: 'IN-HP', name: 'Himachal Pradesh', name_hi: 'हिमाचल प्रदेश', name_gu: 'હિમાચલ પ્રદેશ', name_mr: 'हिमाचल प्रदेश', type: 'State', lokSabha: 4, rajyaSabha: 3 },
  { id: 'IN-JH', name: 'Jharkhand', name_hi: 'झारखंड', name_gu: 'ઝારખંડ', name_mr: 'झारखंड', type: 'State', lokSabha: 14, rajyaSabha: 6 },
  { id: 'IN-KA', name: 'Karnataka', name_hi: 'कर्नाटक', name_gu: 'કર્ણાટક', name_mr: 'कर्नाटक', type: 'State', lokSabha: 28, rajyaSabha: 12 },
  { id: 'IN-KL', name: 'Kerala', name_hi: 'केरल', name_gu: 'કેરળ', name_mr: 'केरळ', type: 'State', lokSabha: 20, rajyaSabha: 9 },
  { id: 'IN-MP', name: 'Madhya Pradesh', name_hi: 'मध्य प्रदेश', name_gu: 'મધ્ય પ્રદેશ', name_mr: 'मध्य प्रदेश', type: 'State', lokSabha: 29, rajyaSabha: 11 },
  { id: 'IN-MH', name: 'Maharashtra', name_hi: 'महाराष्ट्र', name_gu: 'મહારાષ્ટ્ર', name_mr: 'महाराष्ट्र', type: 'State', lokSabha: 48, rajyaSabha: 19 },
  { id: 'IN-MN', name: 'Manipur', name_hi: 'मणिपुर', name_gu: 'મણિપુર', name_mr: 'मणिपूर', type: 'State', lokSabha: 2, rajyaSabha: 1 },
  { id: 'IN-ML', name: 'Meghalaya', name_hi: 'मेघालय', name_gu: 'મેઘાલય', name_mr: 'मेघालय', type: 'State', lokSabha: 2, rajyaSabha: 1 },
  { id: 'IN-MZ', name: 'Mizoram', name_hi: 'मिजोरम', name_gu: 'મિઝોરમ', name_mr: 'मिझोरम', type: 'State', lokSabha: 1, rajyaSabha: 1 },
  { id: 'IN-NL', name: 'Nagaland', name_hi: 'नागालैंड', name_gu: 'નાગાલેન્ડ', name_mr: 'नागालँड', type: 'State', lokSabha: 1, rajyaSabha: 1 },
  { id: 'IN-OR', name: 'Odisha', name_hi: 'ओडिशा', name_gu: 'ઓડિશા', name_mr: 'ओडिशा', type: 'State', lokSabha: 21, rajyaSabha: 10 },
  { id: 'IN-PB', name: 'Punjab', name_hi: 'पंजाब', name_gu: 'પંજાબ', name_mr: 'पंजाब', type: 'State', lokSabha: 13, rajyaSabha: 7 },
  { id: 'IN-RJ', name: 'Rajasthan', name_hi: 'राजस्थान', name_gu: 'રાજસ્થાન', name_mr: 'राजस्थान', type: 'State', lokSabha: 25, rajyaSabha: 10 },
  { id: 'IN-SK', name: 'Sikkim', name_hi: 'सिक्किम', name_gu: 'સિક્કિમ', name_mr: 'सिक्कीम', type: 'State', lokSabha: 1, rajyaSabha: 1 },
  { id: 'IN-TN', name: 'Tamil Nadu', name_hi: 'तमिलनाडु', name_gu: 'તમિલનાડુ', name_mr: 'तमिळनाडू', type: 'State', lokSabha: 39, rajyaSabha: 18 },
  { id: 'IN-TG', name: 'Telangana', name_hi: 'तेलंगाना', name_gu: 'તેલંગાણા', name_mr: 'तेलंगणा', type: 'State', lokSabha: 17, rajyaSabha: 7 },
  { id: 'IN-TR', name: 'Tripura', name_hi: 'त्रिपुरा', name_gu: 'ત્રિપુરા', name_mr: 'त्रिपुरा', type: 'State', lokSabha: 2, rajyaSabha: 1 },
  { id: 'IN-UP', name: 'Uttar Pradesh', name_hi: 'उत्तर प्रदेश', name_gu: 'ઉત્તર પ્રદેશ', name_mr: 'उत्तर प्रदेश', type: 'State', lokSabha: 80, rajyaSabha: 31 },
  { id: 'IN-UT', name: 'Uttarakhand', name_hi: 'उत्तराखंड', name_gu: 'ઉત્તરાખંડ', name_mr: 'उत्तराखंड', type: 'State', lokSabha: 5, rajyaSabha: 3 },
  { id: 'IN-WB', name: 'West Bengal', name_hi: 'पश्चिम बंगाल', name_gu: 'પશ્ચિમ બંગાળ', name_mr: 'पश्चिम बंगाल', type: 'State', lokSabha: 42, rajyaSabha: 16 },
  
  // Union Territories
  { id: 'IN-AN', name: 'Andaman & Nicobar', name_hi: 'अंडमान और निकोबार', name_gu: 'અંદામાન અને નિકોબાર', name_mr: 'अंदमान आणि निकोबार', type: 'UT', lokSabha: 1, rajyaSabha: 0 },
  { id: 'IN-CH', name: 'Chandigarh', name_hi: 'चंडीगढ़', name_gu: 'ચંદીગઢ', name_mr: 'चंदीगड', type: 'UT', lokSabha: 1, rajyaSabha: 0 },
  { id: 'IN-DN', name: 'Dadra & Nagar Haveli and Daman & Diu', name_hi: 'दादरा और नगर हवेली और दमन और दीव', name_gu: 'દાદરા અને નગર હવેલી અને દમણ અને દીવ', name_mr: 'दादरा आणि नगर हवेली आणि दमण आणि दीव', type: 'UT', lokSabha: 2, rajyaSabha: 0 },
  { id: 'IN-DL', name: 'NCT of Delhi', name_hi: 'दिल्ली एनसीटी', name_gu: 'દિલ્હી એનસીટી', name_mr: 'दिल्ली एनसीटी', type: 'UT', lokSabha: 7, rajyaSabha: 3 },
  { id: 'IN-JK', name: 'Jammu & Kashmir', name_hi: 'जम्मू और कश्मीर', name_gu: 'જમ્મુ અને કાશ્મીર', name_mr: 'जम्मू आणि काश्मीर', type: 'UT', lokSabha: 5, rajyaSabha: 4 },
  { id: 'IN-LA', name: 'Ladakh', name_hi: 'लद्दाख', name_gu: 'લદ્દાખ', name_mr: 'लडाख', type: 'UT', lokSabha: 1, rajyaSabha: 0 },
  { id: 'IN-LD', name: 'Lakshadweep', name_hi: 'लक्षद्वीप', name_gu: 'લક્ષદ્વીપ', name_mr: 'लक्षद्वीप', type: 'UT', lokSabha: 1, rajyaSabha: 0 },
  { id: 'IN-PY', name: 'Puducherry', name_hi: 'पुडुचेरी', name_gu: 'પુડુચેરી', name_mr: 'पुडुचेरी', type: 'UT', lokSabha: 1, rajyaSabha: 1 }
];
