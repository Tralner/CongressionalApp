  let map;

  // 🎆 Data for search
const fireworksData = {
  "al": {
    name: "Alabama",
    status: "Legal",
    summary: "Most consumer fireworks are legal for persons over 16. Local restrictions may apply.",
  },
  "ak": {
    name: "Alaska",
    status: "Legal",
    summary: "Fireworks allowed with some restrictions. Banned in some municipalities.",
  },
  "az": {
    name: "Arizona",
    status: "Restricted",
    summary: "Non-aerial and non-explosive fireworks permitted. Banned in some counties during fire season.",
  },
  "ar": {
    name: "Arkansas",
    status: "Legal",
    summary: "Most consumer fireworks permitted. Some local restrictions may apply.",
  },
  "ca": {
    name: "California",
    status: "Restricted",
    summary: "Only 'Safe and Sane' fireworks allowed in approved areas. Complete ban in some counties.",
  },
  "co": {
    name: "Colorado",
    status: "Restricted",
    summary: "Only novelty fireworks allowed. Complete ban in some areas due to fire risk.",
  },
  "ct": {
    name: "Connecticut",
    status: "Illegal",
    summary: "All consumer fireworks prohibited. Only sparklers and fountains permitted.",
  },
  "de": {
    name: "Delaware",
    status: "Illegal",
    summary: "All consumer fireworks prohibited. Only sparklers allowed.",
  },
  "fl": {
    name: "Florida",
    status: "Legal",
    summary: "Most consumer fireworks legal with restrictions on usage dates/times.",
  },
  "ga": {
    name: "Georgia",
    status: "Restricted",
    summary: "Only sparklers and similar items allowed. Some counties allow more.",
  },
  "hi": {
    name: "Hawaii",
    status: "Illegal",
    summary: "All consumer fireworks prohibited without permit. Strict enforcement.",
  },
  "id": {
    name: "Idaho",
    status: "Legal",
    summary: "Most consumer fireworks legal. Local restrictions may apply.",
  },
  "il": {
    name: "Illinois",
    status: "Restricted",
    summary: "Only novelty fireworks allowed. Complete ban in Chicago.",
  },
  "in": {
    name: "Indiana",
    status: "Legal",
    summary: "Most consumer fireworks legal with some time restrictions.",
  },
  "ia": {
    name: "Iowa",
    status: "Legal",
    summary: "Most consumer fireworks legal with restrictions on usage dates.",
  },
  "ks": {
    name: "Kansas",
    status: "Legal",
    summary: "Most consumer fireworks legal. Local restrictions may apply.",
  },
  "ky": {
    name: "Kentucky",
    status: "Legal",
    summary: "Most consumer fireworks legal with few restrictions.",
  },
  "la": {
    name: "Louisiana",
    status: "Legal",
    summary: "Most consumer fireworks legal with some local restrictions.",
  },
  "me": {
    name: "Maine",
    status: "Restricted",
    summary: "Only sparklers and similar items allowed. Complete ban in some areas.",
  },
  "md": {
    name: "Maryland",
    status: "Illegal",
    summary: "All consumer fireworks prohibited. Only sparklers allowed.",
  },
  "ma": {
    name: "Massachusetts",
    status: "Illegal",
    summary: "All consumer fireworks prohibited. Strict enforcement.",
  },
  "mi": {
    name: "Michigan",
    status: "Restricted",
    summary: "Only low-impact fireworks allowed. Complete ban in some cities.",
  },
  "mn": {
    name: "Minnesota",
    status: "Restricted",
    summary: "Only novelty fireworks allowed. Complete ban in some areas.",
  },
  "ms": {
    name: "Mississippi",
    status: "Legal",
    summary: "Most consumer fireworks legal with few restrictions.",
  },
  "mo": {
    name: "Missouri",
    status: "Legal",
    summary: "Most consumer fireworks legal with some local restrictions.",
  },
  "mt": {
    name: "Montana",
    status: "Legal",
    summary: "Most consumer fireworks legal. Banned in some areas during fire season.",
  },
  "ne": {
    name: "Nebraska",
    status: "Restricted",
    summary: "Only novelty fireworks allowed. Complete ban in some counties.",
  },
  "nv": {
    name: "Nevada",
    status: "Legal",
    summary: "Most consumer fireworks legal. Local restrictions may apply.",
  },
  "nh": {
    name: "New Hampshire",
    status: "Restricted",
    summary: "Only sparklers and similar items allowed. Complete ban in some areas.",
  },
  "nj": {
    name: "New Jersey",
    status: "Illegal",
    summary: "All consumer fireworks prohibited. Only sparklers allowed.",
  },
  "nm": {
    name: "New Mexico",
    status: "Restricted",
    summary: "Only novelty fireworks allowed. Complete ban during fire season.",
  },
  "ny": {
    name: "New York",
    status: "Illegal",
    summary: "All consumer fireworks prohibited. Only sparklers allowed in some counties.",
  },
  "nc": {
    name: "North Carolina",
    status: "Restricted",
    summary: "Only novelty fireworks allowed. Complete ban in some areas.",
  },
  "nd": {
    name: "North Dakota",
    status: "Legal",
    summary: "Most consumer fireworks legal with some local restrictions.",
  },
  "oh": {
    name: "Ohio",
    status: "Legal",
    summary: "Most consumer fireworks legal with restrictions on usage dates/times.",
  },
  "ok": {
    name: "Oklahoma",
    status: "Legal",
    summary: "Most consumer fireworks legal with few restrictions.",
  },
  "or": {
    name: "Oregon",
    status: "Restricted",
    summary: "Only novelty fireworks allowed. Complete ban in some areas.",
  },
  "pa": {
    name: "Pennsylvania",
    status: "Restricted",
    summary: "Only novelty fireworks allowed. Complete ban in some cities.",
  },
  "ri": {
    name: "Rhode Island",
    status: "Illegal",
    summary: "All consumer fireworks prohibited. Only sparklers allowed.",
  },
  "sc": {
    name: "South Carolina",
    status: "Legal",
    summary: "Most consumer fireworks legal with some local restrictions.",
  },
  "sd": {
    name: "South Dakota",
    status: "Legal",
    summary: "Most consumer fireworks legal with few restrictions.",
  },
  "tn": {
    name: "Tennessee",
    status: "Legal",
    summary: "Most consumer fireworks legal with restrictions on usage dates.",
  },
  "tx": {
    name: "Texas",
    status: "Legal",
    summary: "Most consumer fireworks legal. Banned in some counties during drought.",
  },
  "ut": {
    name: "Utah",
    status: "Restricted",
    summary: "Only novelty fireworks allowed. Complete ban in some areas.",
  },
  "vt": {
    name: "Vermont",
    status: "Illegal",
    summary: "All consumer fireworks prohibited. Only sparklers allowed.",
  },
  "va": {
    name: "Virginia",
    status: "Restricted",
    summary: "Only novelty fireworks allowed. Complete ban in some areas.",
  },
  "wa": {
    name: "Washington",
    status: "Restricted",
    summary: "Only novelty fireworks allowed. Complete ban in some counties.",
  },
  "wv": {
    name: "West Virginia",
    status: "Legal",
    summary: "Most consumer fireworks legal with few restrictions.",
  },
  "wi": {
    name: "Wisconsin",
    status: "Restricted",
    summary: "Only novelty fireworks allowed. Complete ban in some cities.",
  },
  "wy": {
    name: "Wyoming",
    status: "Legal",
    summary: "Most consumer fireworks legal. Banned in some areas during fire season.",
  }
};

  // 🔁 Page load
  window.onload = function () {
    // Recent Updates
    document.getElementById("change").innerHTML = `
      2025-07-10: Updated California law.<br><br>
      2025-07-08: Added Arizona.<br><br>
      2025-07-05: Fixed Texas restrictions.
    `;

    // 🗺 Initialize the map
    map = L.map('map').setView([37.8, -96], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);
  };

  // 🔍 Handle search
// 🔍 Handle search - improved version
async function searchLocation() {
  const input = document.getElementById('searchInput').value.trim().toLowerCase();
  const resultElement = document.getElementById("searchResult");

  if (!input) {
    resultElement.innerHTML = "Please enter a state name or abbreviation.";
    return;
  }

  // Show loading state
  resultElement.innerHTML = "Searching...";
  
  try {
    // First try to match against our fireworks data directly
    let stateInfo = null;
    let stateName = "";
    
    // Check for exact abbreviation match (like "ca" for California)
    if (input.length === 2 && fireworksData[input]) {
      stateInfo = fireworksData[input];
      stateName = stateInfo.name;
    } 
    // Check for full state name match
    else {
      for (const [abbrev, data] of Object.entries(fireworksData)) {
        if (data.name.toLowerCase() === input) {
          stateInfo = data;
          stateName = data.name;
          break;
        }
      }
    }

    // If we found state info, use it
    if (stateInfo) {
      // Search for the state's coordinates
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(stateName)}&countrycodes=us&limit=1`);
      if (!response.ok) throw new Error("Network response was not ok");
      
      const results = await response.json();
      if (results.length === 0) {
        resultElement.innerHTML = "Couldn't find coordinates for this state.";
        return;
      }

      const { lat, lon } = results[0];
      
      // Update map view
      map.setView([lat, lon], 7);
      L.marker([lat, lon]).addTo(map)
        .bindPopup(`
          <b>${stateInfo.name}</b><br>
          Status: ${stateInfo.status}<br>
          Summary: ${stateInfo.summary}
        `)
        .openPopup();

      // Update search result text
      resultElement.innerHTML = `
        <h3>${stateInfo.name}</h3>
        <p><strong>Fireworks Status:</strong> <span class="status-${stateInfo.status.toLowerCase()}">${stateInfo.status}</span></p>
        <p><strong>Details:</strong> ${stateInfo.summary}</p>
      `;
    } 
    // If no direct match, try a general location search
    else {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}&countrycodes=us&limit=1`);
      if (!response.ok) throw new Error("Network response was not ok");
      
      const results = await response.json();
      if (results.length === 0) {
        resultElement.innerHTML = "Location not found. Please try a different search term.";
        return;
      }

      const { lat, lon, display_name } = results[0];
      
      // Try to find which state this location is in
      let foundState = null;
      for (const [abbrev, data] of Object.entries(fireworksData)) {
        if (display_name.toLowerCase().includes(data.name.toLowerCase()) || 
            display_name.toLowerCase().includes(`, ${abbrev.toUpperCase()}`)) {
          foundState = data;
          break;
        }
      }

      // Update map view
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
      } else {
        marker.bindPopup(`<b>${display_name}</b><br>No fireworks data available`);
        
        resultElement.innerHTML = `
          <h3>${display_name}</h3>
          <p>No fireworks regulations data available for this area.</p>
          <p>Please check with local authorities.</p>
        `;
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