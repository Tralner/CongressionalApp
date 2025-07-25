<html>
<head>
  {{<title>FireworksLegal</title>

  <!-- ✅ Correct Leaflet CSS placement -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />

  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f5f7fa;
      margin: 0;
      padding: 0;
    }

    header {
      background-color: #ffffff;
      padding: 20px;
      border-bottom: 1px solid #ddd;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    header h1 {
      color: #333;
      margin: 0;
    }

    p{
      color: #000000ff;
      margin: 0;
    }

    aside {
      width: 28%;
      padding-left: 5px;
      margin-left: 5px;
      float: right;
      background-color: #f5f7fa;
    }

    

    beside {
      width: 70%;
      padding-right: 5px;
      margin-right: 5px;
      float: left;
      background-color: #f5f7fa;
    }

    /* Remove GitHub Pages' default container padding */
.container-lg {
  max-width: 100% !important;
  padding: 0 !important;
}

/* Ensure full-width layout */
body, html {
  margin: 0 !important;
  padding: 0 !important;
  width: 100%;
}

/* Force content to take full width */
.main-content {
  max-width: 100% !important;
  padding: 0 !important;
}

    .topper {
      position: sticky;
      top: 0;
      padding: 10px 16px;
      background: #ffffff;
      color: #000000;
      z-index: 10;
    }

    .container {
      width: 87% !important;
      margin: 10px auto !important;
      padding: 0 20px !important;
    }

    .search-bar {
      display: flex !important;
      flex-wrap: wrap !important;
      gap: 10px !important;
      margin-bottom: 20px !important;
    }

    .search-bar input[type="text"] {
      flex: 1;
      padding: 10px;
      border-radius: 8px;
      border: 1px solid #ccc;
    }

    .search-bar button {
      background-color: #2563eb;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    :root {
  --primary: #2563eb;       /* Deep blue */
  --secondary: #dc2626;    /* Red */
  --accent: #f59e0b;       /* Gold (for highlights) */
  --light-bg: #f8fafc;     /* Off-white background */
}

    .tag {
      display: inline-block;
      margin-right: 10px;
      padding: 6px 12px;
      border-radius: 12px;
      font-size: 14px;
      color: white;
    }

    .card {
      background: var(--white);
      border: 1px solid var(--medium-gray);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      box-shadow: 0 1px 3px rgba(0,0,0,0.02);
    }

    .card h2 {
      color: var(--darker-gray);
      border-bottom: 1px solid var(--medium-gray);
      padding-bottom: 0.5rem;
      margin-top: 0;
    }

    .stats {
      display: flex;
      justify-content: space-around;
      text-align: center;
      margin-top: 10px;
    }

    .stat {
      font-size: 16px;
    }

    .stat span {
      font-weight: bold;
      display: block;
      font-size: 20px;
    }

    .footer {
      text-align: center;
      font-size: 13px;
      color: #777;
      padding: 10px;
    }
    
    :root {
      --white: #ffffff;
      --light-gray: #f5f7fa;
      --medium-gray: #e1e5eb;
      --dark-gray: #6b7280;
      --darker-gray: #374151;
      --accent: #3b82f6;
    }

    .status-legal {
      color: #2e7d32;
      font-weight: bold;
    }
    .status-restricted {
      color: #ff8f00;
      font-weight: bold;
    }
    .status-illegal {
      color: #c62828;
      font-weight: bold;
    }
    .note {
      font-size: 0.9em;
      color: #666;
      font-style: italic;
    }
    .error {
      color: #c62828;
      font-weight: bold;
    }
  </style>}}
</head>
<body>
{{
<header class="topper">
  <h1>Fireworks Laws Made Simple</h1>
  <div class="search-bar">
    <input type="text" id="searchInput" placeholder="🔍 Search by state (e.g., 'CA' or 'California')">
    <button onclick="searchLocation()">Search</button>
  </div>
</header>

<div class="card">
  <h2>Quick facts</h2>
  <p id="searchResult">Search for a location to see details here.</p>
</div>
<beside>
  <div class="card">
    <h2>Interactive Fireworks Legal Map</h2>
    <div id="map" style="height: 400px; width: 100%; border-radius: 12px; z-index: 1;"></div>
  </div>
  </beside>
<aside>
  <div class="card">
    <h2>Detailed Anylasis</h2>
    <p>Click on a county or use your location to see details</p>
  </div>

  <div class="card">
    <h2>Recent Updates</h2>
    <p id="change"></p>
  </div>
</aside>

<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

  <div class="footer">
    2025 FireworksLegal | This information is for reference only.
  </div>
</div>

<!-- Correct Leaflet JS placement -->
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
<!--do not dare to touch this-->
<!--think about the gass prices-->

<script>
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
</script>}}
</body>