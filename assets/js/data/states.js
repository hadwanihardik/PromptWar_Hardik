/**
 * State-wise Parliamentary Seats Data
 * Contains the distribution of Lok Sabha and Rajya Sabha seats for all Indian States and UTs.
 * ISO codes correspond to Google GeoChart IN region codes.
 */
const STATES_DATA = [
  { id: 'IN-AP', name: 'Andhra Pradesh', type: 'State', lokSabha: 25, rajyaSabha: 11 },
  { id: 'IN-AR', name: 'Arunachal Pradesh', type: 'State', lokSabha: 2, rajyaSabha: 1 },
  { id: 'IN-AS', name: 'Assam', type: 'State', lokSabha: 14, rajyaSabha: 7 },
  { id: 'IN-BR', name: 'Bihar', type: 'State', lokSabha: 40, rajyaSabha: 16 },
  { id: 'IN-CT', name: 'Chhattisgarh', type: 'State', lokSabha: 11, rajyaSabha: 5 },
  { id: 'IN-GA', name: 'Goa', type: 'State', lokSabha: 2, rajyaSabha: 1 },
  { id: 'IN-GJ', name: 'Gujarat', type: 'State', lokSabha: 26, rajyaSabha: 11 },
  { id: 'IN-HR', name: 'Haryana', type: 'State', lokSabha: 10, rajyaSabha: 5 },
  { id: 'IN-HP', name: 'Himachal Pradesh', type: 'State', lokSabha: 4, rajyaSabha: 3 },
  { id: 'IN-JH', name: 'Jharkhand', type: 'State', lokSabha: 14, rajyaSabha: 6 },
  { id: 'IN-KA', name: 'Karnataka', type: 'State', lokSabha: 28, rajyaSabha: 12 },
  { id: 'IN-KL', name: 'Kerala', type: 'State', lokSabha: 20, rajyaSabha: 9 },
  { id: 'IN-MP', name: 'Madhya Pradesh', type: 'State', lokSabha: 29, rajyaSabha: 11 },
  { id: 'IN-MH', name: 'Maharashtra', type: 'State', lokSabha: 48, rajyaSabha: 19 },
  { id: 'IN-MN', name: 'Manipur', type: 'State', lokSabha: 2, rajyaSabha: 1 },
  { id: 'IN-ML', name: 'Meghalaya', type: 'State', lokSabha: 2, rajyaSabha: 1 },
  { id: 'IN-MZ', name: 'Mizoram', type: 'State', lokSabha: 1, rajyaSabha: 1 },
  { id: 'IN-NL', name: 'Nagaland', type: 'State', lokSabha: 1, rajyaSabha: 1 },
  { id: 'IN-OR', name: 'Odisha', type: 'State', lokSabha: 21, rajyaSabha: 10 },
  { id: 'IN-PB', name: 'Punjab', type: 'State', lokSabha: 13, rajyaSabha: 7 },
  { id: 'IN-RJ', name: 'Rajasthan', type: 'State', lokSabha: 25, rajyaSabha: 10 },
  { id: 'IN-SK', name: 'Sikkim', type: 'State', lokSabha: 1, rajyaSabha: 1 },
  { id: 'IN-TN', name: 'Tamil Nadu', type: 'State', lokSabha: 39, rajyaSabha: 18 },
  { id: 'IN-TG', name: 'Telangana', type: 'State', lokSabha: 17, rajyaSabha: 7 },
  { id: 'IN-TR', name: 'Tripura', type: 'State', lokSabha: 2, rajyaSabha: 1 },
  { id: 'IN-UP', name: 'Uttar Pradesh', type: 'State', lokSabha: 80, rajyaSabha: 31 },
  { id: 'IN-UT', name: 'Uttarakhand', type: 'State', lokSabha: 5, rajyaSabha: 3 },
  { id: 'IN-WB', name: 'West Bengal', type: 'State', lokSabha: 42, rajyaSabha: 16 },
  
  // Union Territories
  { id: 'IN-AN', name: 'Andaman & Nicobar', type: 'UT', lokSabha: 1, rajyaSabha: 0 },
  { id: 'IN-CH', name: 'Chandigarh', type: 'UT', lokSabha: 1, rajyaSabha: 0 },
  { id: 'IN-DN', name: 'Dadra & Nagar Haveli and Daman & Diu', type: 'UT', lokSabha: 2, rajyaSabha: 0 },
  { id: 'IN-DL', name: 'NCT of Delhi', type: 'UT', lokSabha: 7, rajyaSabha: 3 },
  { id: 'IN-JK', name: 'Jammu & Kashmir', type: 'UT', lokSabha: 5, rajyaSabha: 4 },
  { id: 'IN-LA', name: 'Ladakh', type: 'UT', lokSabha: 1, rajyaSabha: 0 },
  { id: 'IN-LD', name: 'Lakshadweep', type: 'UT', lokSabha: 1, rajyaSabha: 0 },
  { id: 'IN-PY', name: 'Puducherry', type: 'UT', lokSabha: 1, rajyaSabha: 1 }
];
