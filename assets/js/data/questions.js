/**
 * Quiz Question Bank — Election Process Education
 * 60+ questions across easy, medium, hard
 */
const QUESTION_BANK = [
  // ══════════ EASY (20 questions) ══════════
  {
    id:1, difficulty:'easy', topic:'Basics',
    question:'What is the minimum age to vote in India?',
    options:['16 years','18 years','21 years','25 years'], correct:1,
    explanation:'According to Article 326, every citizen 18+ is eligible to vote.'
  },
  {
    id:2, difficulty:'easy', topic:'Basics',
    question:'Which body conducts elections in India?',
    options:['Supreme Court','Parliament','Election Commission of India','President of India'], correct:2,
    explanation:'The ECI is an autonomous constitutional authority responsible for all election processes.'
  },
  {
    id:3, difficulty:'easy', topic:'Registration',
    question:'What document is essential for voter identification at the polling booth?',
    options:['PAN Card','Voter ID Card (EPIC)','Driving License only','Ration Card only'], correct:1,
    explanation:'The EPIC is the primary voter identification document. ECI also accepts 11 other photo IDs.'
  },
  {
    id:4, difficulty:'easy', topic:'Basics',
    question:'What does EVM stand for?',
    options:['Electronic Voting Machine','Election Verification Module','Electronic Vote Manager','Electors Voting Method'], correct:0,
    explanation:'EVM stands for Electronic Voting Machine, used in India since 1999.'
  },
  {
    id:5, difficulty:'easy', topic:'Basics',
    question:'What is NOTA in elections?',
    options:['A political party','None Of The Above option','A voting rule','A type of ballot paper'], correct:1,
    explanation:'NOTA allows voters to officially reject all candidates. Introduced in 2013.'
  },
  {
    id:6, difficulty:'easy', topic:'Process',
    question:'What is applied on a voter\'s finger after voting?',
    options:['Red ink','Blue ink','Indelible ink (purple)','No ink is applied'], correct:2,
    explanation:'Indelible ink containing silver nitrate is applied on the left index finger.'
  },
  {
    id:7, difficulty:'easy', topic:'Basics',
    question:'How often are Lok Sabha elections held?',
    options:['Every 3 years','Every 4 years','Every 5 years','Every 6 years'], correct:2,
    explanation:'Lok Sabha elections are held every 5 years unless dissolved earlier.'
  },
  {
    id:8, difficulty:'easy', topic:'Registration',
    question:'Can you register as a voter online in India?',
    options:['No, only offline','Yes, through the NVSP portal','Only in metro cities','Only during elections'], correct:1,
    explanation:'The NVSP portal at nvsp.in allows online registration and corrections.'
  },
  {
    id:9, difficulty:'easy', topic:'Basics',
    question:'What is the full form of EPIC?',
    options:['Election Photo Identity Card','Electors Photo Identity Card','Electronic Photo ID Card','Election Participation ID Card'], correct:1,
    explanation:'EPIC stands for Electors Photo Identity Card, commonly known as Voter ID.'
  },
  {
    id:10, difficulty:'easy', topic:'Basics',
    question:'Which finger is marked with indelible ink after voting?',
    options:['Right thumb','Left index finger','Right index finger','Left thumb'], correct:1,
    explanation:'The left index finger is marked with indelible ink to prevent double voting.'
  },
  {
    id:11, difficulty:'easy', topic:'Basics',
    question:'What is the national voter helpline number in India?',
    options:['100','1800','1950','112'], correct:2,
    explanation:'1950 is the toll-free voter helpline number operated by the ECI.'
  },
  {
    id:12, difficulty:'easy', topic:'Basics',
    question:'Who is the head of the Election Commission of India?',
    options:['Chief Election Commissioner','Prime Minister','President','Speaker'], correct:0,
    explanation:'The Chief Election Commissioner heads the ECI along with other Election Commissioners.'
  },
  {
    id:13, difficulty:'easy', topic:'Process',
    question:'What colour is the button for NOTA on the EVM?',
    options:['Red','Green','Blue','The last button on the ballot unit'], correct:3,
    explanation:'NOTA is always the last option on the ballot unit of the EVM.'
  },
  {
    id:14, difficulty:'easy', topic:'Basics',
    question:'What is Rajya Sabha also known as?',
    options:['House of the People','Council of States','Upper Council','Federal Assembly'], correct:1,
    explanation:'Rajya Sabha is the Council of States — the upper house of Indian Parliament.'
  },
  {
    id:15, difficulty:'easy', topic:'Basics',
    question:'What is Lok Sabha also known as?',
    options:['Council of States','House of the People','National Assembly','Lower Council'], correct:1,
    explanation:'Lok Sabha is the House of the People — the lower house of Indian Parliament.'
  },
  {
    id:16, difficulty:'easy', topic:'Process',
    question:'During which hours are polling stations generally open?',
    options:['6 AM to 4 PM','7 AM to 6 PM','8 AM to 5 PM','9 AM to 7 PM'], correct:1,
    explanation:'Polling hours are typically 7:00 AM to 6:00 PM, though this can vary by region.'
  },
  {
    id:17, difficulty:'easy', topic:'Basics',
    question:'What does NVSP stand for?',
    options:['National Voter Service Portal','National Voting System Platform','New Voter Support Program','National Verification Service Portal'], correct:0,
    explanation:'NVSP is the National Voter Service Portal for voter registration and services.'
  },
  {
    id:18, difficulty:'easy', topic:'Basics',
    question:'How many members are there in the Lok Sabha (maximum)?',
    options:['250','500','545','552'], correct:3,
    explanation:'Lok Sabha can have a maximum of 552 members (530 states + 20 UTs + 2 Anglo-Indian nominees, though the last category was discontinued).'
  },
  {
    id:19, difficulty:'easy', topic:'Basics',
    question:'What symbol represents NOTA on the EVM?',
    options:['A red cross','A ballot paper with a cross mark','A thumbs down','A blank box'], correct:1,
    explanation:'NOTA is represented by a ballot paper with a cross mark symbol.'
  },
  {
    id:20, difficulty:'easy', topic:'Process',
    question:'Can a voter take a mobile phone inside the polling booth?',
    options:['Yes, always','No, phones are not allowed','Only for photos','Only if switched off'], correct:1,
    explanation:'Mobile phones, cameras, and any electronic devices are prohibited inside the polling booth.'
  },

  // ══════════ MEDIUM (25 questions) ══════════
  {
    id:21, difficulty:'medium', topic:'Process',
    question:'What is the VVPAT machine used for?',
    options:['Counting votes automatically','Providing a paper trail of the vote cast','Identifying voters biometrically','Broadcasting results'], correct:1,
    explanation:'VVPAT prints a paper slip showing the candidate symbol. Voter can verify for 7 seconds.'
  },
  {
    id:22, difficulty:'medium', topic:'Process',
    question:'What is the Model Code of Conduct?',
    options:['A law passed by Parliament','Guidelines issued by ECI during elections','Rules for counting votes','Code for EVM programming'], correct:1,
    explanation:'The MCC governs behavior of parties and candidates once elections are announced.'
  },
  {
    id:23, difficulty:'medium', topic:'Process',
    question:'Who appoints the Chief Election Commissioner?',
    options:['Prime Minister','Parliament','President of India','Supreme Court'], correct:2,
    explanation:'The CEC is appointed by the President based on committee recommendations.'
  },
  {
    id:24, difficulty:'medium', topic:'Registration',
    question:'What form is used for new voter registration?',
    options:['Form 1','Form 6','Form 8','Form 10'], correct:1,
    explanation:'Form 6 is used for new voter registration, available online and offline.'
  },
  {
    id:25, difficulty:'medium', topic:'Rights',
    question:'Can a person in police custody vote?',
    options:['No, they lose voting rights','Yes, through postal ballot','Only if bail is granted','Only in local elections'], correct:1,
    explanation:'Undertrial prisoners retain their right to vote through postal ballot provisions.'
  },
  {
    id:26, difficulty:'medium', topic:'Process',
    question:'What is "booth capturing"?',
    options:['Setting up booths','Illegal seizure of a polling booth','Counting at booth','Monitoring booth activities'], correct:1,
    explanation:'Booth capturing is illegal seizure of polling booths, punishable under law.'
  },
  {
    id:27, difficulty:'medium', topic:'Process',
    question:'What is the "electoral roll"?',
    options:['List of candidates','Official list of eligible voters','List of polling stations','Tally of votes'], correct:1,
    explanation:'The electoral roll is the official list of all eligible voters in a constituency.'
  },
  {
    id:28, difficulty:'medium', topic:'Rights',
    question:'Is voting compulsory in India?',
    options:['Yes, by law','No, it is voluntary','Only for govt employees','Only in Lok Sabha'], correct:1,
    explanation:'Voting is a right, not a legal duty. Some states have local compulsory voting laws for municipal elections.'
  },
  {
    id:29, difficulty:'medium', topic:'Process',
    question:'What is a "by-election"?',
    options:['General election','Election held to fill a vacancy mid-term','Local body election','Presidential election'], correct:1,
    explanation:'A by-election fills a seat vacated due to death, resignation, or disqualification of a member.'
  },
  {
    id:30, difficulty:'medium', topic:'Registration',
    question:'What is Form 8 used for in voter registration?',
    options:['New registration','Correction of entries in electoral roll','Deletion of name','Overseas registration'], correct:1,
    explanation:'Form 8 is used to correct details like name, address, age, or photo in the voter list.'
  },
  {
    id:31, difficulty:'medium', topic:'Process',
    question:'What is a "postal ballot"?',
    options:['Voting via internet','Voting by mail for eligible voters','Ballot printed at post office','Emergency voting'], correct:1,
    explanation:'Postal ballots allow certain voters (armed forces, govt officials on duty, seniors 80+) to vote by mail.'
  },
  {
    id:32, difficulty:'medium', topic:'Process',
    question:'What is the role of a Presiding Officer?',
    options:['Count the votes','Oversee polling at a station','Announce results','Register new voters'], correct:1,
    explanation:'The Presiding Officer manages the polling station, controls the EVM, and ensures fair voting.'
  },
  {
    id:33, difficulty:'medium', topic:'Process',
    question:'What is the "Voter Helpline App"?',
    options:['A social media app','Official ECI app for voter services','A news app','A polling predictor'], correct:1,
    explanation:'The Voter Helpline App provides voter registration, search, complaint filing, and election info.'
  },
  {
    id:34, difficulty:'medium', topic:'Basics',
    question:'How many Rajya Sabha members are there (maximum)?',
    options:['200','245','250','300'], correct:2,
    explanation:'Rajya Sabha can have a maximum of 250 members — 238 elected + 12 nominated by the President.'
  },
  {
    id:35, difficulty:'medium', topic:'Process',
    question:'What is a "Returning Officer"?',
    options:['Officer who counts returned ballots','Officer responsible for conducting election in a constituency','Officer who returns EVMs','Officer who manages voter helpline'], correct:1,
    explanation:'The Returning Officer oversees the entire election process in a constituency including nomination, polling, and counting.'
  },
  {
    id:36, difficulty:'medium', topic:'Process',
    question:'What happens if a voter\'s name is not on the electoral roll?',
    options:['They can still vote with ID','They cannot vote in that election','They can vote with a court order','They get added on the spot'], correct:1,
    explanation:'If your name is not on the electoral roll, you cannot vote. Always verify before election day.'
  },
  {
    id:37, difficulty:'medium', topic:'Rights',
    question:'Can NRIs (Non-Resident Indians) vote in Indian elections?',
    options:['No, never','Yes, if registered and present at polling station','Yes, via online voting','Yes, via postal ballot'], correct:1,
    explanation:'NRIs can vote if registered as overseas electors and physically present at the polling station.'
  },
  {
    id:38, difficulty:'medium', topic:'Process',
    question:'What is "delimitation" in election context?',
    options:['Limiting campaign spending','Redrawing constituency boundaries','Limiting number of candidates','Setting election dates'], correct:1,
    explanation:'Delimitation is the process of redrawing constituency boundaries based on census data.'
  },
  {
    id:39, difficulty:'medium', topic:'Process',
    question:'What is a "swing vote"?',
    options:['Illegal voting','Votes that shift between parties across elections','Vote of the speaker','Proxy voting'], correct:1,
    explanation:'Swing votes are votes from undecided voters who change their party preference between elections.'
  },
  {
    id:40, difficulty:'medium', topic:'Process',
    question:'Who is a BLO?',
    options:['Block Level Officer','Booth Level Officer','Bureau Level Organizer','Ballot Logistics Officer'], correct:1,
    explanation:'BLO (Booth Level Officer) is a local govt official responsible for voter registration at the booth level.'
  },
  {
    id:41, difficulty:'medium', topic:'Process',
    question:'What is "exit poll"?',
    options:['Poll taken before voting','Survey of voters after they have voted','Final vote count','Poll for NRIs'], correct:1,
    explanation:'Exit polls survey voters after they cast their vote to predict election outcomes. They cannot be published until polling ends.'
  },
  {
    id:42, difficulty:'medium', topic:'Rights',
    question:'Can persons with disabilities vote?',
    options:['No','Yes, with accessible facilities at polling stations','Only via postal ballot','Only with a guardian'], correct:1,
    explanation:'PwD voters have the right to accessible polling stations, wheelchairs, ramps, and can bring a companion.'
  },
  {
    id:43, difficulty:'medium', topic:'Process',
    question:'What is a "hung parliament"?',
    options:['Parliament that is dissolved','When no party gets a clear majority','Parliament in session','Emergency parliament'], correct:1,
    explanation:'A hung parliament occurs when no single party wins enough seats to form government independently.'
  },
  {
    id:44, difficulty:'medium', topic:'Process',
    question:'What is the "qualifying date" for voter eligibility?',
    options:['Election day','January 1st of the year','Date of application','July 1st of the year'], correct:1,
    explanation:'January 1st of the year is the qualifying date — you must be 18 on or before this date.'
  },
  {
    id:45, difficulty:'medium', topic:'Process',
    question:'What is "electoral bond"?',
    options:['Government savings bond','Financial instrument for political donations','Bond posted by candidates','Voter insurance'], correct:1,
    explanation:'Electoral bonds were financial instruments for anonymous political donations (declared unconstitutional by SC in 2024).'
  },

  // ══════════ HARD (20 questions) ══════════
  {
    id:46, difficulty:'hard', topic:'Law',
    question:'Under which Article is the Election Commission established?',
    options:['Article 280','Article 324','Article 356','Article 370'], correct:1,
    explanation:'Article 324 vests the superintendence and control of elections in the ECI.'
  },
  {
    id:47, difficulty:'hard', topic:'Law',
    question:'What is the maximum election expenditure limit for a Lok Sabha candidate?',
    options:['₹50 lakh','₹70 lakh','₹95 lakh','₹1.5 crore'], correct:2,
    explanation:'The revised ECI limit (2022) is ₹95 lakh in larger states and ₹75 lakh in smaller states.'
  },
  {
    id:48, difficulty:'hard', topic:'Process',
    question:'What percentage of VVPAT slips are physically verified?',
    options:['1% of booths','2% of booths','5 random machines per constituency','100% of all machines'], correct:2,
    explanation:'As per SC directive (2019), 5 randomly selected EVMs per assembly constituency are verified.'
  },
  {
    id:49, difficulty:'hard', topic:'Law',
    question:'Which section of RPA deals with disqualification of candidates?',
    options:['Section 8','Section 15','Section 22','Section 33'], correct:0,
    explanation:'Section 8 of the RPA 1951 deals with disqualification on conviction for certain offences.'
  },
  {
    id:50, difficulty:'hard', topic:'Process',
    question:'What is the significance of Form 17C?',
    options:['Candidate nomination','Account of votes at each polling station','Voter correction form','Expenditure report'], correct:1,
    explanation:'Form 17C records the vote account at each station. Polling agents of each candidate get a copy.'
  },
  {
    id:51, difficulty:'hard', topic:'Rights',
    question:'What is a "Proxy Vote" and who is eligible?',
    options:['Available to all','Only for classified service voters','For senior citizens','For NRIs'], correct:1,
    explanation:'Proxy voting is currently available only to classified service voters (armed forces on active duty).'
  },
  {
    id:52, difficulty:'hard', topic:'Law',
    question:'What is the "Anti-Defection Law"?',
    options:['Prevents party switching by elected officials','Prevents election fraud','Regulates campaign finance','Voter protection law'], correct:0,
    explanation:'The Anti-Defection Law (10th Schedule, 52nd Amendment 1985) disqualifies members who defect.'
  },
  {
    id:53, difficulty:'hard', topic:'Law',
    question:'Which Constitutional Amendment lowered voting age from 21 to 18?',
    options:['42nd Amendment','44th Amendment','61st Amendment','73rd Amendment'], correct:2,
    explanation:'The 61st Constitutional Amendment Act, 1988 reduced the voting age from 21 to 18 years.'
  },
  {
    id:54, difficulty:'hard', topic:'Law',
    question:'Under which Article can the President impose President\'s Rule in a state?',
    options:['Article 324','Article 352','Article 356','Article 360'], correct:2,
    explanation:'Article 356 allows President\'s Rule when state government cannot function per the Constitution.'
  },
  {
    id:55, difficulty:'hard', topic:'Process',
    question:'What is the "first past the post" system?',
    options:['Candidate reaching booth first wins','Candidate with most votes wins','Proportional representation','Ranked choice voting'], correct:1,
    explanation:'India uses FPTP — the candidate with the most votes in a constituency wins, regardless of majority.'
  },
  {
    id:56, difficulty:'hard', topic:'Law',
    question:'What is the tenure of the Chief Election Commissioner?',
    options:['5 years','6 years or age 65','6 years or age 65, whichever is earlier','Until retirement at 62'], correct:2,
    explanation:'The CEC serves for 6 years or until age 65, whichever comes earlier.'
  },
  {
    id:57, difficulty:'hard', topic:'Law',
    question:'Which act governs the conduct of elections in India?',
    options:['Election Act 1950','Representation of the People Act 1951','Voting Rights Act 1952','Democratic Elections Act 1949'], correct:1,
    explanation:'The Representation of the People Act, 1951 governs the conduct of elections and electoral offences.'
  },
  {
    id:58, difficulty:'hard', topic:'Process',
    question:'What is "proportional representation" used for in India?',
    options:['Lok Sabha elections','Rajya Sabha and Presidential elections','Municipal elections','Panchayat elections'], correct:1,
    explanation:'Proportional representation with single transferable vote is used for Rajya Sabha and Presidential elections.'
  },
  {
    id:59, difficulty:'hard', topic:'Law',
    question:'Can the Chief Election Commissioner be removed from office?',
    options:['By the President anytime','Only by Parliament through impeachment-like process','By the Prime Minister','Cannot be removed'], correct:1,
    explanation:'The CEC can only be removed through a process similar to removal of a Supreme Court judge.'
  },
  {
    id:60, difficulty:'hard', topic:'Process',
    question:'What is "SVEEP"?',
    options:['Systematic Voters Education & Electoral Participation','State Voter Enrollment Enhancement Program','Supreme Voter Empowerment & Eligibility Portal','Standard Voting Equipment & Election Protocol'], correct:0,
    explanation:'SVEEP is the ECI\'s flagship program to boost voter awareness, education and participation.'
  },
  {
    id:61, difficulty:'hard', topic:'Law',
    question:'What is Schedule 10 of the Indian Constitution about?',
    options:['Fundamental Rights','Anti-Defection provisions','Election procedures','Panchayati Raj'], correct:1,
    explanation:'The Tenth Schedule contains provisions for disqualification of members on grounds of defection.'
  },
  {
    id:62, difficulty:'hard', topic:'Process',
    question:'What is a "whip" in parliamentary context?',
    options:['A directive to party members to vote in a specific way','A disciplinary action','A debate procedure','A voting machine component'], correct:0,
    explanation:'A whip is a directive issued by a party to its members requiring them to vote in a particular way.'
  },
  {
    id:63, difficulty:'hard', topic:'Law',
    question:'What is the security deposit for a Lok Sabha candidate?',
    options:['₹10,000','₹15,000','₹25,000','₹50,000'], correct:2,
    explanation:'General candidates deposit ₹25,000 and SC/ST candidates deposit ₹12,500 for Lok Sabha elections.'
  },
  {
    id:64, difficulty:'hard', topic:'Process',
    question:'When was the first general election held in India?',
    options:['1947','1950','1951-52','1955'], correct:2,
    explanation:'India\'s first general election was held in 1951-52, making it the largest democratic exercise at the time.'
  },
  {
    id:65, difficulty:'hard', topic:'Law',
    question:'What is Section 126 of the RPA regarding?',
    options:['Voter bribery','Prohibition of campaign 48 hours before polling','Booth capturing','Electoral fraud'], correct:1,
    explanation:'Section 126 prohibits election campaigning in a constituency 48 hours before the poll closes.'
  }
];
