let map;
let currentStateData = null;

const fireworksData = {
  "al": {
    name: "Alabama",
    status: "Legal",
    summary: "Most consumer fireworks legal for persons over 16.",
    legalDetails: "In Alabama, consumer fireworks are generally legal for individuals 18 and older, provided they comply with CPSC and PHMSA regulations. However, local municipalities can impose additional restrictions. There are also specific timeframes for when seasonal retailers can sell fireworks, typically June 20 through July 10 and December 15 through January 2",
  },
  "ak": {
    name: "Alaska",
    status: "Legal",
    summary: "Fireworks allowed with some restrictions. Banned in some municipalities.",
    legalDetails: "In Alaska, the rules regarding fireworks use are primarily set by local governments, not the state, with many larger towns and developed areas restricting or prohibiting fireworks. Generally, fireworks are allowed on private property with permission on New Year's Eve (December 31st from 6 PM to 1 AM on January 1st) in the Mat-Su Borough and Anchorage, with certain restrictions. Specific locations like Wasilla, Juneau, and Fairbanks have their own regulations, so it's crucial to check local ordinances",
  },
  "az": {
    name: "Arizona",
    status: "Restricted",
    summary: "Non-aerial and non-explosive fireworks permitted. Banned in some counties during fire season.",
    legalDetails: "In Arizona, the sale and use of consumer fireworks are regulated by state law, with specific dates and types of fireworks permitted. Permissible fireworks include sparklers, ground and handheld sparkling devices, and certain fountains. Illegal fireworks, such as aerial and exploding fireworks, are not allowed without a permit. ",
  },
  "ar": {
    name: "Arkansas",
    status: "Legal",
    summary: "Most consumer fireworks permitted. Some local restrictions may apply.",
    legalDetails: "In Arkansas, fireworks are legal for purchase and use during specific times of the year, primarily between June 13th and July 10th, and December 10th and January 5th. However, regulations vary by city, and some municipalities, like Little Rock, ban fireworks entirely. It's crucial to be aware of local ordinances as they may be stricter or prohibit fireworks altogether",
  },
  "ca": {
    name: "California",
    status: "Restricted",
    summary: "Only 'Safe and Sane' fireworks allowed in approved areas. Complete ban in some counties.",
    legalDetails: "In California, the sale, possession, and use of fireworks are heavily regulated. Generally, only safe and sane fireworks, those bearing the Office of the State Fire Marshal Safe and Sane seal, are permitted for sale and use in designated communities. Illegal fireworks, including those that explode, shoot into the air, or move uncontrollably, are prohibited. Violations can result in significant fines and potential jail time",
  },
  "co": {
    name: "Colorado",
    status: "Restricted",
    summary: "Only novelty fireworks allowed. Complete ban in some areas due to fire risk.",
    legalDetails: "In Colorado, fireworks laws vary by city and county, but generally, fireworks that explode or leave the ground are illegal. This includes items like firecrackers, rockets, and Roman candles. However, some smaller fireworks, such as sparklers, fountains, and ground spinners, are often permitted. It's crucial to check local ordinances for specific rules in your area.",
  },
  "ct": {
    name: "Connecticut",
    status: "Illegal",
    summary: "All consumer fireworks prohibited. Only sparklers and fountains permitted.",
    legalDetails: "In Connecticut, the general public is restricted to using sparklers and fountains. All other types of fireworks, including aerial fireworks, Roman candles, and firecrackers, are illegal to buy, sell, or use without a permit or license, according to the state government website. Violations can result in fines, and in cases of injury or death, felony charges. ",
  },
  "de": {
    name: "Delaware",
    status: "Illegal",
    summary: "All consumer fireworks prohibited. Only sparklers allowed.",
    legalDetails: "In Delaware, most fireworks are prohibited, including anything that explodes or shoots into the air, like firecrackers and bottle rockets. Legal fireworks, such as sparklers, fountains, and ground spinners, are only permitted on July 4th, December 31st, and January 1st. Illegal fireworks possession or use is a misdemeanor, potentially leading to fines. Injuries or property damage from fireworks can result in felony charges. ",
  },
  "fl": {
    name: "Florida",
    status: "Legal",
    summary: "Most consumer fireworks legal with restrictions on usage dates/times.",
    legalDetails: "In Florida, the use of fireworks for recreational purposes is generally limited to specific holidays: New Year's Eve, New Year's Day, and Independence Day (July 4th). Outside of these dates, a permit is generally required to legally discharge fireworks. Even on permitted holidays, local ordinances can further restrict or prohibit the use of fireworks. ",
  },
  "ga": {
    name: "Georgia",
    status: "Restricted",
    summary: "Only sparklers and similar items allowed. Some counties allow more.",
    legalDetails: "In Georgia, the use of consumer fireworks is generally legal, with specific time restrictions. Generally, fireworks can be used from 10 a.m. to 11:59 p.m. on most days. There are also specific holidays when fireworks are allowed for longer periods, including July 3rd and 4th, and the day before. However, local ordinances may impose stricter rules, so it's important to check with your local government, according to Atlanta News First. ",
  },
  "hi": {
    name: "Hawaii",
    status: "Illegal",
    summary: "All consumer fireworks prohibited without permit. Strict enforcement.",
    legalDetails: "In Hawaii has varying fireworks laws depending on the county. Generally, aerial fireworks and other consumer fireworks (like fountains, sparklers, and ground spinners) are illegal statewide, with some exceptions for permitted displays. Firecrackers are permitted with a permit, but their use is often restricted to specific times and locations. Oahu, for example, requires a firecracker permit and identification for firecracker use, and purchases are limited to a short window around holidays. ",
  },
  "id": {
    name: "Idaho",
    status: "Legal",
    summary: "Most consumer fireworks legal. Local restrictions may apply.",
    legalDetails: "In Idaho, while certain fireworks like sparklers, fountains, and smoke devices are legal for use, aerial fireworks such as bottle rockets and Roman candles are prohibited, even if legally purchased. Idaho law allows the sale of aerial fireworks, but using them is illegal. ",
  },
  "il": {
    name: "Illinois",
    status: "Restricted",
    summary: "Only novelty fireworks allowed. Complete ban in Chicago.",
    legalDetails: "In Illinois, most consumer fireworks are illegal. The state prohibits the sale, possession, and use of fireworks, including those that produce an audible or visible effect by explosion or combustion. This ban includes items like bottle rockets, missiles, and firecrackers. However, certain novelty fireworks such as sparklers, smoke bombs, and trick noisemakers are permitted. Local jurisdictions may also have their own ordinances regarding fireworks, which can be more restrictive than state law. ",
  },
  "in": {
    name: "Indiana",
    status: "Legal",
    summary: "Most consumer fireworks legal with some time restrictions.",
    legalDetails: "In Indiana, fireworks can be legally discharged between 9 a.m. and 11 p.m. on most days. However, there are specific exceptions for holidays like the Fourth of July, Memorial Day, and Labor Day, when the allowed hours extend to midnight. From June 29 to July 9, fireworks are permitted until two hours after sunset, which is roughly 11:15 p.m., and local ordinances cannot shorten these hours. Additionally, individuals must be 18 or older to purchase fireworks, and minors using them must be supervised by an adult. ",
  },
  "ia": {
    name: "Iowa",
    status: "Legal",
    summary: "Most consumer fireworks legal with restrictions on usage dates.",
    legalDetails: "In Iowa, fireworks are legal for purchase and use between June 1 and July 8, and again from December 10 to January 3. During these periods, consumer fireworks can be used from 9:00 a.m. to 10:00 p.m. daily. A recent law change prevents cities and counties from banning fireworks on July 3, 4, and New Year's Eve. However, local jurisdictions can still regulate the time of use and locations where fireworks are permitted. ",
  },
  "ks": {
    name: "Kansas",
    status: "Legal",
    summary: "Most consumer fireworks legal. Local restrictions may apply.",
    legalDetails: "In Kansas, fireworks laws vary by location, but generally, the sale and use of certain fireworks are permitted around the Fourth of July. Specifically, consumer fireworks (1.4G fireworks by DOT, except certain rockets) are allowed, but bottle rockets and M80s are illegal. There are also restrictions on where and when fireworks can be used, such as not on public property, near gas stations, or within a certain distance of fireworks stands. ",
  },
  "ky": {
    name: "Kentucky",
    status: "Legal",
    summary: "Most consumer fireworks legal with few restrictions.",
    legalDetails: "In Kentucky, fireworks laws vary by location. Generally, you must be 18 or older to buy, use, or sell fireworks. It's illegal to ignite fireworks within 200 feet of any home, vehicle, structure, or person. Specific regulations on when and where you can use fireworks depend on local ordinances, with some areas prohibiting the use of certain types of fireworks altogether. ",
  },
  "la": {
    name: "Louisiana",
    status: "Legal",
    summary: "Most consumer fireworks legal with some local restrictions.",
    legalDetails: "In Louisiana, certain fireworks are legal and others are prohibited. Legal fireworks include fountains, sparklers, spinners, wheels, mines, shells, Roman candles, bottle rockets, and firecrackers. Illegal fireworks consist of aerial bombs, certain types of torpedoes, and Roman candles larger than ten balls. There are also restrictions on the size and type of some fireworks. Additionally, there are specific time periods when fireworks are permitted, typically around the Fourth of July and New Year's. ",
  },
  "me": {
    name: "Maine",
    status: "Restricted",
    summary: "Only sparklers and similar items allowed. Complete ban in some areas.",
    legalDetails: "In Maine, most fireworks are legal with restrictions. Consumers can purchase and use consumer fireworks, but certain types, like missile-type rockets and aerial spinners, are prohibited. There are also restrictions on the time of day fireworks can be used, and individuals must be 21 years or older to purchase them. ",
  },
  "md": {
    name: "Maryland",
    status: "Illegal",
    summary: "All consumer fireworks prohibited. Only sparklers allowed.",
    legalDetails: "In Maryland, most fireworks are illegal, including firecrackers and bottle rockets. Public fireworks displays require permits and insurance from the State Fire Marshal. Legal fireworks include gold-labeled sparklers, novelty items like party poppers, and ground-based sparkler devices. Even with legal fireworks, adults should supervise and ensure safety, and it's best to leave fireworks to the professionals, according to the Maryland State Fire Marshal. ",
  },
  "ma": {
    name: "Massachusetts",
    status: "Illegal",
    summary: "All consumer fireworks prohibited. Strict enforcement.",
    legalDetails: "In Massachusetts, possession, use, sale, or transportation of fireworks is illegal for private citizens. This includes items like sparklers, bottle rockets, Roman candles, and firecrackers. Violations can result in fines and confiscation of the fireworks. The ban has been in place since 1943. ",
  },
  "mi": {
    name: "Michigan",
    status: "Restricted",
    summary: "Only low-impact fireworks allowed. Complete ban in some cities.",
    legalDetails: "In Michigan, fireworks are regulated by state law and local ordinances. Generally, consumer fireworks can be used on the day before, the day of, and the day after a national holiday. For example, fireworks can be used on Memorial Day weekend, from 11 a.m. to 11:45 p.m. on Saturday and Sunday. However, local municipalities can further restrict the days and times fireworks can be used. ",
  },
  "mn": {
    name: "Minnesota",
    status: "Restricted",
    summary: "Only novelty fireworks allowed. Complete ban in some areas.",
    legalDetails: "In Minnesota, fireworks laws are relatively strict. Generally, fireworks that explode or leave the ground are illegal. This includes items like firecrackers, bottle rockets, missiles, skyrockets, and Roman candles. Legal fireworks include sparklers, ground-based sparkling devices (like fountains, cones, and spinners), and novelty items such as snakes and party poppers. You must be 18 years old to purchase fireworks. ",
  },
  "ms": {
    name: "Mississippi",
    status: "Legal",
    summary: "Most consumer fireworks legal with few restrictions.",
    legalDetails: "In Mississippi, the sale and use of all consumer fireworks are generally permitted year-round. However, there are specific restrictions, including a 600-foot distance requirement from churches, hospitals, and schools, and a 75-foot distance from fireworks sales locations. Additionally, it is illegal to ignite fireworks within 100 feet of a public or private water well, according to The Clarion-Ledger. ",
  },
  "mo": {
    name: "Missouri",
    status: "Legal",
    summary: "Most consumer fireworks legal with some local restrictions.",
    legalDetails: "In Missouri, the sale of fireworks to consumers is legal from June 20 to July 10 at licensed seasonal retailers. However, using fireworks is restricted in many areas, with some allowing use only during specific holidays like July 4th. Large-scale fireworks displays require a permit. A recent law update, Senate Bill 81, modernizes regulations, including stricter sales rules and expanding the State Fire Marshal's oversight. ",
  },
  "mt": {
    name: "Montana",
    status: "Legal",
    summary: "Most consumer fireworks legal. Banned in some areas during fire season.",
    legalDetails: "In Montana, the sale and use of fireworks are regulated by both state law and local ordinances. Generally, consumer fireworks can be purchased from licensed stands from June 24th to July 5th and again from December 29th to 31st. However, some cities and counties have their own specific restrictions on when and where fireworks can be used. ",
  },
  "ne": {
    name: "Nebraska",
    status: "Restricted",
    summary: "Only novelty fireworks allowed. Complete ban in some counties.",
    legalDetails: "In Nebraska, the sale of fireworks is generally permitted between June 24 and July 5, and again between December 28 and January 1. However, local jurisdictions can impose further restrictions on both the sale and use of fireworks. It's crucial to check with local fire departments and city ordinances for specific regulations regarding dates, times, and locations for fireworks usage. ",
  },
  "nv": {
    name: "Nevada",
    status: "Legal",
    summary: "Most consumer fireworks legal. Local restrictions may apply.",
    legalDetails: "In Nevada, certain fireworks are legal for use between June 28th and July 4th, specifically those labeled Safe-N-Sane and purchased from licensed sellers in approved booths. Illegal fireworks include those that are dangerous, aerial, or explode on impact or by friction. Using fireworks on public property like streets, sidewalks, or city/federal land is also prohibited, and penalties for illegal use can include fines and jail time. ",
  },
  "nh": {
    name: "New Hampshire",
    status: "Restricted",
    summary: "Only sparklers and similar items allowed. Complete ban in some areas.",
    legalDetails: "In New Hampshire, fireworks are legal for consumers, but with restrictions. You must be at least 21 years old to purchase and use them, with exceptions for active-duty military and landlords allowing use on their property. Fireworks displays are limited to private property, and some municipalities may have their own ordinances. Additionally, certain types of fireworks, like M-80s and cherry bombs, are illegal. ",
  },
  "nj": {
    name: "New Jersey",
    status: "Illegal",
    summary: "All consumer fireworks prohibited. Only sparklers allowed.",
    legalDetails: "In New Jersey, most fireworks are illegal including aerial fireworks like bottle rockets, Roman candles, and firecrackers. Sparklers and other novelty items like snappers and poppers are permitted for individuals 16 and older. Even these legal items should be used with adult supervision due to potential safety hazards. ",
  },
  "nm": {
    name: "New Mexico",
    status: "Restricted",
    summary: "Only novelty fireworks allowed. Complete ban during fire season.",
    legalDetails: "In New Mexico, fireworks laws vary by location, but generally, the sale and use of aerial fireworks and ground audible devices are prohibited, especially in Albuquerque and Santa Fe. Illegal fireworks can lead to fines, confiscation, and even jail time. ",
  },
  "ny": {
    name: "New York",
    status: "Illegal",
    summary: "All consumer fireworks prohibited. Only sparklers allowed in some counties.",
    legalDetails: "In New York, sparkling devices like handheld or ground-based devices that produce colored sparks or flames are legal, but with restrictions on their type, size, and composition, and only available for purchase during specific dates (June 1 to July 5). All other types of fireworks, including firecrackers, skyrockets, and Roman candles, are illegal statewide except for permitted displays. New York City has the strictest laws, prohibiting all consumer fireworks, including sparklers. ",
  },
  "nc": {
    name: "North Carolina",
    status: "Restricted",
    summary: "Only novelty fireworks allowed. Complete ban in some areas.",
    legalDetails: "In North Carolina, certain fireworks are illegal, while others are permitted. Generally, fireworks that explode or leave the ground are prohibited. This includes firecrackers, bottle rockets, Roman candles, and aerial fireworks. Legal fireworks in NC include sparklers, snakes, smoke devices, and trick noisemakers like party poppers. ",
  },
  "nd": {
    name: "North Dakota",
    status: "Legal",
    summary: "Most consumer fireworks legal with some local restrictions.",
    legalDetails: "In North Dakota, fireworks laws are primarily governed by N.D.C.C. Chapters 23-15 and 23-15.1 and vary by municipality. Generally, fireworks can be sold from June 27 through July 5. Specific regulations regarding the type, sale, and use of fireworks are often determined by local ordinances. ",
  },
  "oh": {
    name: "Ohio",
    status: "Legal",
    summary: "Most consumer fireworks legal with restrictions on usage dates/times.",
    legalDetails: "In Ohio, consumer fireworks (1.4G) can be discharged on specific holidays, but local ordinances may restrict or ban their use. Generally, you can use them on your own property or with permission on another's, but not on public or private school property. There are also restrictions on who can handle them (18+) and where they can be discharged (distance from buildings, spectators, etc.). ",
  },
  "ok": {
    name: "Oklahoma",
    status: "Legal",
    summary: "Most consumer fireworks legal with few restrictions.",
    legalDetails: "In Oklahoma, the sale and use of fireworks are governed by state law and local ordinances, with specific regulations varying by city. Generally, fireworks can be sold between June 15 and July 4, and some cities allow their use only during certain dates and times. ",
  },
  "or": {
    name: "Oregon",
    status: "Restricted",
    summary: "Only novelty fireworks allowed. Complete ban in some areas.",
    legalDetails: "In Oregon, the sale and use of fireworks are regulated by the Oregon State Fire Marshal. Legal fireworks include ground-based items like fountains, sparklers, and ground spinners, while aerial fireworks like bottle rockets and Roman candles are generally prohibited. The sale of legal fireworks in Oregon is permitted from June 23rd to July 6th. ",
  },
  "pa": {
    name: "Pennsylvania",
    status: "Restricted",
    summary: "Only novelty fireworks allowed. Complete ban in some cities.",
    legalDetails: "In Pennsylvania, adults 18 and older can purchase and use consumer-grade fireworks (Class C) with some restrictions. These include prohibitions against using them on private or public property without permission, within 150 feet of buildings or vehicles, while intoxicated, or directed at people. Additionally, some municipalities may have further restrictions on the times fireworks can be used. ",
  },
  "ri": {
    name: "Rhode Island",
    status: "Illegal",
    summary: "All consumer fireworks prohibited. Only sparklers allowed.",
    legalDetails: "In Rhode Island, the sale, use, and possession of most fireworks, including aerial and display fireworks, are illegal for the general public. However, certain ground-based and handheld sparkling devices are permitted for those 16 and older. ",
  },
  "sc": {
    name: "South Carolina",
    status: "Legal",
    summary: "Most consumer fireworks legal with some local restrictions.",
    legalDetails: "In South Carolina, individuals 16 and older can purchase and use consumer fireworks, which include items that explode or launch into the air. However, specific regulations vary by municipality, so it's crucial to check local ordinances regarding time and location restrictions. Some towns prohibit fireworks entirely, while others have specific time windows for their use, often around holidays like the 4th of July. ",
  },
  "sd": {
    name: "South Dakota",
    status: "Legal",
    summary: "Most consumer fireworks legal with few restrictions.",
    legalDetails: "In South Dakota, consumer fireworks can be used during two specific periods: June 27th to the first Sunday after July 4th, and December 28th to January 1st. These dates are set by state law. Local jurisdictions like cities and counties may have additional restrictions or ordinances, so it's essential to check with your specific location. For example, Pennington County allows fireworks use from June 27th to midnight on July 7th. The City of Tea, SD allows fireworks from 12 PM to 12 AM on July 3rd, 4th, and 5th, as well as New Year's Eve from 10 PM to 12:30 AM, and during Teapot Days. ",
  },
  "tn": {
    name: "Tennessee",
    status: "Legal",
    summary: "Most consumer fireworks legal with restrictions on usage dates.",
    legalDetails: "In Tennessee, the legal sale and use of fireworks is regulated by both state and local laws. Generally, 16 is the minimum age to purchase fireworks, and those 16 and 17 must present photo ID. Retail sales are restricted in some counties based on population. State law also sets distances where fireworks can be set off in relation to certain buildings and locations. ",
  },
  "tx": {
    name: "Texas",
    status: "Legal",
    summary: "Most consumer fireworks legal. Banned in some counties during drought.",
    legalDetails: "In Texas, fireworks are generally legal for consumer use, but there are restrictions on where and how they can be used. Specifically, you cannot explode or ignite fireworks within 600 feet of churches, hospitals, asylums, licensed childcare centers, or schools. Additionally, there are restrictions related to flammable materials and storage locations. ",
  },
  "ut": {
    name: "Utah",
    status: "Restricted",
    summary: "Only novelty fireworks allowed. Complete ban in some areas.",
    legalDetails: "In Utah, fireworks are legal for purchase and discharge during specific holidays and dates, primarily around July 4th and July 24th, and New Year's Eve. While some fireworks are restricted or prohibited, and some areas may have further restrictions, state law generally allows for the use of legal, consumer-grade fireworks during these permitted times. Violations can result in fines, and fire restrictions can be implemented due to high fire danger. ",
  },
  "vt": {
    name: "Vermont",
    status: "Illegal",
    summary: "All consumer fireworks prohibited. Only sparklers allowed.",
    legalDetails: "In Vermont, all fireworks are illegal to use, possess, sell, or distribute without a permit, except for sparklers and novelty items like snakes and party poppers. Public fireworks displays conducted by trained professionals and permitted by local authorities are allowed. ",
  },
  "va": {
    name: "Virginia",
    status: "Restricted",
    summary: "Only novelty fireworks allowed. Complete ban in some areas.",
    legalDetails: "In Virginia, most fireworks that explode, travel laterally, rise into the air, or shoot projectiles are illegal for the general public. This includes items like firecrackers, bottle rockets, and Roman candles. Legal fireworks are generally limited to those that stay on the ground, such as sparklers, fountains, and pinwheels. Violations can result in a Class 1 misdemeanor, with penalties including jail time and fines. ",
  },
  "wa": {
    name: "Washington",
    status: "Restricted",
    summary: "Only novelty fireworks allowed. Complete ban in some counties.",
    legalDetails: "In Washington state, the sale and use of fireworks are restricted to specific dates and times around the July 4th and New Year's holidays. While the state has general rules, local governments can further restrict or ban fireworks within their jurisdictions. ",
  },
  "wv": {
    name: "West Virginia",
    status: "Legal",
    summary: "Most consumer fireworks legal with few restrictions.",
    legalDetails: "In West Virginia, all consumer fireworks are legal for purchase and use by individuals 18 years or older, with the exception of using them on private or public property without the owner's permission. This includes items like sky rockets, bottle rockets, and roman candles. There are no restrictions on the types of consumer fireworks allowed, but it's important to be aware of local ordinances and to avoid using them under the influence of alcohol or drugs, according to WVNS, WTRF, and My Buckhannon. ",
  },
  "wi": {
    name: "Wisconsin",
    status: "Restricted",
    summary: "Only novelty fireworks allowed. Complete ban in some cities.",
    legalDetails: "In Wisconsin, certain fireworks are legal to use without a permit, while others require one. Generally, sparklers, stationary cones and fountains, toy snakes, smoke bombs, caps, and noisemakers are permitted. Fireworks that explode or leave the ground, like firecrackers, Roman candles, bottle rockets, and mortars, require a permit for possession and use. ",
  },
  "wy": {
    name: "Wyoming",
    status: "Legal",
    summary: "Most consumer fireworks legal. Banned in some areas during fire season.",
    legalDetails: "In Wyoming, the legality of fireworks varies by location. Generally, the sale and use of fireworks are permitted, but some areas, like Cheyenne and Laramie, have restrictions or outright bans within city limits. ",
  }
};

// 🔁 Page load - this should be first
window.onload = function() {
  // Recent Updates
  document.getElementById("change").innerHTML = `
    2025-07-10: Updated California law.<br><br>
    2025-07-08: Added Arizona.<br><br>
    2025-07-05: Fixed Texas restrictions.
  `;

  // Initialize the map first
  map = L.map('map').setView([37.8, -96], 4);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);

  // Set up map click handler
  map.on('click', function(e) {
    const analysisElement = document.getElementById('detailedAnalysis');
    analysisElement.innerHTML = `
      <h3>County-Level Details</h3>
      <p>Clicked at coordinates: ${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}</p>
      <p>County-level data coming soon. Currently showing state-level data for ${currentStateData ? currentStateData.name : 'selected state'}.</p>
      ${currentStateData ? `<p>${currentStateData.summary}</p>` : ''}
    `;
  });
};

// Then your updateDetailedAnalysis function
function updateDetailedAnalysis(stateInfo) {
  const analysisElement = document.getElementById('detailedAnalysis');
  const expandBtn = document.getElementById('expandBtn');
  const collapseBtn = document.getElementById('collapseBtn');
  
  if (!stateInfo) {
    analysisElement.innerHTML = '<p>Search for a state to see detailed legal analysis here.</p>';
    expandBtn.classList.add('hidden');
    collapseBtn.classList.add('hidden');
    return;
  }

  analysisElement.innerHTML = `
    <h3>${stateInfo.name} Fireworks Regulations</h3>
    <div class="status-display">
      <span class="status-badge ${stateInfo.status.toLowerCase()}">${stateInfo.status}</span>
    </div>
    <p>${stateInfo.summary}</p>
    
    <div class="legal-details collapsed" id="legalDetails">
      <h4>Detailed Legal Information:</h4>
      <div class="legal-point">
        <span class="legal-icon">📜</span>
        <span>${stateInfo.legalDetails}</span>
      </div>
      <div class="legal-point">
        <span class="legal-icon">⚠️</span>
        <span>Local ordinances may impose additional restrictions beyond state law.</span>
      </div>
      <div class="legal-point">
        <span class="legal-icon">ℹ️</span>
        <span>Always check with local authorities for the most current regulations.</span>
      </div>
    </div>
  `;
  
  if (stateInfo.legalDetails.length > 300) {
    expandBtn.classList.remove('hidden');
    collapseBtn.classList.add('hidden');
  } else {
    expandBtn.classList.add('hidden');
    collapseBtn.classList.add('hidden');
  }
  
  expandBtn.onclick = function() {
    document.getElementById('legalDetails').classList.remove('collapsed');
    document.getElementById('legalDetails').classList.add('expanded');
    expandBtn.classList.add('hidden');
    collapseBtn.classList.remove('hidden');
  };
  
  collapseBtn.onclick = function() {
    document.getElementById('legalDetails').classList.remove('expanded');
    document.getElementById('legalDetails').classList.add('collapsed');
    collapseBtn.classList.add('hidden');
    expandBtn.classList.remove('hidden');
  };
}

// Finally, your search function
async function searchLocation() {
  const input = document.getElementById('searchInput').value.trim().toLowerCase();
  const resultElement = document.getElementById("searchResult");

  if (!input) {
    resultElement.innerHTML = "Please enter a state name or abbreviation.";
    return;
  }

  resultElement.innerHTML = "Searching...";
  
  try {
    let stateInfo = null;
    let stateName = "";
    
    if (input.length === 2 && fireworksData[input]) {
      stateInfo = fireworksData[input];
      stateName = stateInfo.name;
    } else {
      for (const [abbrev, data] of Object.entries(fireworksData)) {
        if (data.name.toLowerCase() === input) {
          stateInfo = data;
          stateName = data.name;
          break;
        }
      }
    }

    if (stateInfo) {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(stateName)}&countrycodes=us&limit=1`);
      if (!response.ok) throw new Error("Network response was not ok");
      
      const results = await response.json();
      if (results.length === 0) {
        resultElement.innerHTML = "Couldn't find coordinates for this state.";
        return;
      }

      const { lat, lon } = results[0];
      
      map.setView([lat, lon], 7);
      L.marker([lat, lon]).addTo(map)
        .bindPopup(`
          <b>${stateInfo.name}</b><br>
          Status: ${stateInfo.status}<br>
          Summary: ${stateInfo.summary}
        `)
        .openPopup();

      resultElement.innerHTML = `
        <h3>${stateInfo.name}</h3>
        <p><strong>Fireworks Status:</strong> <span class="status-${stateInfo.status.toLowerCase()}">${stateInfo.status}</span></p>
        <p><strong>Details:</strong> ${stateInfo.summary}</p>
      `;
      
      // Set current state data and update analysis AFTER we have the info
      currentStateData = stateInfo;
      updateDetailedAnalysis(stateInfo);
    } else {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}&countrycodes=us&limit=1`);
      if (!response.ok) throw new Error("Network response was not ok");
      
      const results = await response.json();
      if (results.length === 0) {
        resultElement.innerHTML = "Location not found. Please try a different search term.";
        return;
      }

      const { lat, lon, display_name } = results[0];
      
      let foundState = null;
      for (const [abbrev, data] of Object.entries(fireworksData)) {
        if (display_name.toLowerCase().includes(data.name.toLowerCase()) || 
            display_name.toLowerCase().includes(`, ${abbrev.toUpperCase()}`)) {
          foundState = data;
          break;
        }
      }

      map.setView([lat, lon], 9);
      const marker = L.marker([lat, lon]).addTo(map);
      
      if (foundState) {
        marker.bindPopup(`
          <b>${display_name}</b><br>
          Status: ${foundState.status}<br>
          Summary: ${foundState.summary}
        `);
        
        resultElement.innerHTML = `
          <h3>${display_name}</h3>
          <p><strong>State:</strong> ${foundState.name}</p>
          <p><strong>Fireworks Status:</strong> <span class="status-${foundState.status.toLowerCase()}">${foundState.status}</span></p>
          <p><strong>Details:</strong> ${foundState.summary}</p>
          <p class="note">Note: Local regulations may vary. Check with your city/county.</p>
        `;
        
        currentStateData = foundState;
        updateDetailedAnalysis(foundState);
      } else {
        marker.bindPopup(`<b>${display_name}</b><br>No fireworks data available`);
        
        resultElement.innerHTML = `
          <h3>${display_name}</h3>
          <p>No fireworks regulations data available for this area.</p>
          <p>Please check with local authorities.</p>
        `;
        
        currentStateData = null;
        updateDetailedAnalysis(null);
      }
      marker.openPopup();
    }
  } catch (error) {
    console.error("Search error:", error);
    resultElement.innerHTML = `
      <p class="error">An error occurred during search.</p>
      <p>Please try again later or check your internet connection.</p>
    `;
  }
}