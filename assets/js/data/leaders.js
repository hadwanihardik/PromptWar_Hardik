/**
 * Leaders Data
 * Current leaders of Lok Sabha and Rajya Sabha (18th Lok Sabha, 2024–present)
 */
const LEADERS_DATA = {
  lokSabha: {
    house: 'Lok Sabha',
    fullName: 'House of the People (Lok Sabha)',
    description: 'The lower house of the Parliament of India. Currently in its 18th session, constituted after the 2024 General Elections.',
    constitution: 'Article 81',
    totalSeats: 543,
    currentStrength: 543,
    term: '2024–2029',
    leaders: [
      {
        id: 'ls-speaker',
        role: 'Speaker',
        roleIcon: '🏛️',
        name: 'Om Birla',
        party: 'BJP',
        partyFull: 'Bharatiya Janata Party',
        partyColor: '#FF6B35',
        constituency: 'Kota, Rajasthan',
        since: 'June 2024',
        tenure: '2nd consecutive term',
        education: 'B.Com, University of Rajasthan',
        keyFacts: [
          'Re-elected Speaker with highest majority in history',
          'Former Deputy Speaker of Rajasthan Legislative Assembly',
          'Chairs all Lok Sabha sessions and maintains order',
          'Appoints members to Parliamentary committees'
        ],
        about: 'Om Birla was unanimously elected as the Speaker of the 18th Lok Sabha in June 2024, marking his second consecutive term in this prestigious constitutional office. As Speaker, he is the presiding officer of Lok Sabha and is responsible for the orderly conduct of business in the House.',
        constitutionalRole: 'Article 93 — Speaker elected by members of Lok Sabha',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Om_Birla_%282021%29_%28cropped%29.jpg/500px-Om_Birla_%282021%29_%28cropped%29.jpg'
      },
      {
        id: 'ls-leader-house',
        role: 'Leader of the House',
        roleIcon: '👑',
        name: 'Narendra Modi',
        party: 'BJP',
        partyFull: 'Bharatiya Janata Party',
        partyColor: '#FF6B35',
        constituency: 'Varanasi, Uttar Pradesh',
        since: 'May 2014',
        tenure: '3rd consecutive term as PM',
        education: 'MA (Political Science), Gujarat University',
        keyFacts: [
          'Prime Minister and Leader of Lok Sabha',
          'Led BJP to victories in 2014, 2019, and 2024',
          'Longest serving non-Congress PM in India',
          'Former Chief Minister of Gujarat (2001–2014)'
        ],
        about: 'Narendra Modi serves as the Leader of the House in Lok Sabha in his capacity as Prime Minister of India. The Prime Minister, by convention, leads the ruling party\'s proceedings in the lower house. He was sworn in for his third consecutive term as Prime Minister in June 2024.',
        constitutionalRole: 'Article 75 — PM appointed by President, must command majority in Lok Sabha',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/The_official_portrait_of_Shri_Narendra_Modi%2C_the_Prime_Minister_of_the_Republic_of_India.jpg'
      },
      {
        id: 'ls-leader-opposition',
        role: 'Leader of Opposition',
        roleIcon: '⚔️',
        name: 'Rahul Gandhi',
        party: 'INC',
        partyFull: 'Indian National Congress',
        partyColor: '#0066CC',
        constituency: 'Rae Bareli, Uttar Pradesh',
        since: 'June 2024',
        tenure: 'First LoP in 10 years',
        education: 'BA (History), Trinity College Cambridge; MA, Harvard University',
        keyFacts: [
          'First official Leader of Opposition in Lok Sabha since 2014',
          'Led the INDIA alliance in 2024 elections',
          'Also holds Wayanad seat (vacated; won both)',
          'Conducted Bharat Jodo Yatra covering 4,000+ km'
        ],
        about: 'Rahul Gandhi was appointed as the Leader of Opposition in the 18th Lok Sabha — the first person to hold this official recognition since 2014 (when Congress had won fewer than 10% of seats). This marked a significant return of a formal opposition leadership in the House.',
        constitutionalRole: 'Gets Cabinet-rank status, official recognition & government facilities',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Rahul_Gandhi.png/500px-Rahul_Gandhi.png'
      },
      {
        id: 'ls-deputy-speaker',
        role: 'Deputy Speaker',
        roleIcon: '🔧',
        name: 'Vacant',
        party: '—',
        partyFull: 'Post currently unfilled',
        partyColor: '#64748B',
        constituency: '—',
        since: '—',
        tenure: 'Post vacant since 17th Lok Sabha',
        education: '—',
        keyFacts: [
          'Post has been vacant since 2019',
          'By convention, Deputy Speaker is from opposition',
          'Required under Article 93 of the Constitution',
          'Presides over house when Speaker is absent'
        ],
        about: 'The post of Deputy Speaker in Lok Sabha has remained vacant since the 17th Lok Sabha (2019), making it a notable constitutional gap. Traditionally, this post goes to the opposition party, but the appointment has been delayed. The Deputy Speaker presides over Lok Sabha when the Speaker is absent.',
        constitutionalRole: 'Article 93 — Must be elected, presides in absence of Speaker',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png'
      }
    ]
  },
  rajyaSabha: {
    house: 'Rajya Sabha',
    fullName: 'Council of States (Rajya Sabha)',
    description: 'The upper house of Parliament. A permanent body that cannot be dissolved — one-third of members retire every two years.',
    constitution: 'Article 80',
    totalSeats: 250,
    currentStrength: 245,
    term: 'Permanent (rotational elections)',
    leaders: [
      {
        id: 'rs-chairman',
        role: 'Chairman',
        roleIcon: '🏛️',
        name: 'C.P. Radhakrishnan',
        party: 'BJP',
        partyFull: 'Bharatiya Janata Party',
        partyColor: '#FF6B35',
        constituency: 'Ex-officio (Vice President)',
        since: '2025',
        tenure: 'Serving as Vice President of India',
        education: 'B.Tech, NIT Trichy; MBA',
        keyFacts: [
          'Ex-officio Chairman of Rajya Sabha as Vice President',
          'Formerly served as Governor of Telangana & Jharkhand',
          'BJP MP from Coimbatore (2014 & 2019)',
          'Cannot vote except in case of a tie'
        ],
        about: 'C.P. Radhakrishnan serves as the Chairman of Rajya Sabha in his ex-officio capacity as the Vice President of India. The Vice President of India is constitutionally designated as the ex-officio Chairman of Rajya Sabha under Article 89. He presides over sessions and maintains order in the upper house.',
        constitutionalRole: 'Article 89 — Vice President is ex-officio Chairman of Rajya Sabha',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Shri_C_P_Radhakrishnan%2C_Honourable_Vice_President_of_India.jpg/500px-Shri_C_P_Radhakrishnan%2C_Honourable_Vice_President_of_India.jpg'
      },
      {
        id: 'rs-deputy-chairman',
        role: 'Deputy Chairman',
        roleIcon: '🔧',
        name: 'Harivansh Narayan Singh',
        party: 'JDU',
        partyFull: 'Janata Dal (United)',
        partyColor: '#22C55E',
        constituency: 'Bihar',
        since: 'September 2018',
        tenure: 'Serving his second term',
        education: 'M.A. (Economics), Banaras Hindu University',
        keyFacts: [
          'Senior journalist turned politician',
          'Former editor of Prabhat Khabar newspaper',
          'Presides over Rajya Sabha in Chairman\'s absence',
          'Known for impartial conduct of proceedings'
        ],
        about: 'Harivansh Narayan Singh has been serving as the Deputy Chairman of Rajya Sabha since September 2018. Before entering politics, he had a distinguished career as a journalist and editor. He is elected by the members of Rajya Sabha and presides over the house in the absence of the Chairman.',
        constitutionalRole: 'Article 90 — Elected by Rajya Sabha members; presides in Chairman\'s absence',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Shri_Harivansh_Narayan_Singh_%28cropped%29.jpg'
      },
      {
        id: 'rs-leader-house',
        role: 'Leader of the House',
        roleIcon: '👑',
        name: 'J.P. Nadda',
        party: 'BJP',
        partyFull: 'Bharatiya Janata Party',
        partyColor: '#FF6B35',
        constituency: 'Himachal Pradesh (RS Member)',
        since: 'June 2024',
        tenure: 'National President of BJP',
        education: 'B.A. LLB, Patna University',
        keyFacts: [
          'National President of BJP since 2020',
          'Senior Union Cabinet Minister (Health, 2014–2019)',
          'Leader of BJP in the upper house',
          'Coordinates NDA legislative strategy in RS'
        ],
        about: 'Jagat Prakash (J.P.) Nadda became the Leader of the House in Rajya Sabha following the 2024 elections. As the National President of BJP and a key NDA leader, he manages the ruling coalition\'s legislative agenda in the upper house. He is also a senior member of the Union Cabinet.',
        constitutionalRole: 'Leads the ruling party/coalition\'s bench; manages government business in RS',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Jagat_Prakash_Nadda_2023.jpg/500px-Jagat_Prakash_Nadda_2023.jpg'
      },
      {
        id: 'rs-leader-opposition',
        role: 'Leader of Opposition',
        roleIcon: '⚔️',
        name: 'Mallikarjun Kharge',
        party: 'INC',
        partyFull: 'Indian National Congress',
        partyColor: '#0066CC',
        constituency: 'Karnataka (RS Member)',
        since: 'February 2021',
        tenure: 'Also INC National President since 2022',
        education: 'B.A., LLB, Government Law College, Gulbarga',
        keyFacts: [
          'National President of INC since October 2022',
          'First non-Gandhi to head INC in 24 years',
          'Veteran leader with 50+ years in politics',
          'Leads I.N.D.I.A. alliance in Rajya Sabha'
        ],
        about: 'Mallikarjun Kharge has served as the Leader of Opposition in Rajya Sabha since February 2021. In 2022, he was also elected as the National President of the Indian National Congress — the first non-Gandhi to hold that position in over two decades. He is a veteran politician with a distinguished career spanning five decades.',
        constitutionalRole: 'Leads the principal opposition party; gets Cabinet-rank status & official recognition',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Mallikarjun_Kharge_briefing_the_media_after_presenting_the_Interim_Railway_Budget_2014-15_in_New_Delhi_%28cropped%29.jpg'
      }
    ]
  }
};
