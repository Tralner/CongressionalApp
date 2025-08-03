let map;

<script src="js/fireworksData.js"></script>

// DOM Elements
const expandBtn = document.getElementById('expandBtn');
const collapseBtn = document.getElementById('collapseBtn');
const fullAnalysis = document.getElementById('fullAnalysis');
const analysisSummary = document.getElementById('analysisSummary');
const searchInput = document.getElementById('searchInput');
const resultElement = document.getElementById('searchResult');

// Initialize map and UI
function initMap() {
  map = L.map('map').setView([37.8, -96], 4);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);
}

// Initialize analysis toggle
function initAnalysisToggle() {
  if (expandBtn && collapseBtn && fullAnalysis) {
    expandBtn.addEventListener('click', () => {
      fullAnalysis.classList.remove('hidden');
      expandBtn.classList.add('hidden');
    });

    collapseBtn.addEventListener('click', () => {
      fullAnalysis.classList.add('hidden');
      expandBtn.classList.remove('hidden');
    });
  }
}

// Update analysis content
function updateAnalysis(stateInfo) {
  if (!stateInfo) return;
  
  const defaultSafetyTips = "Always check local ordinances. Never use fireworks near dry vegetation.";
  
  analysisSummary.textContent = `Quick overview: In ${stateInfo.name}, fireworks are ${stateInfo.status.toLowerCase()}.`;
  
  document.getElementById('analysisLegalText').textContent = 
    stateInfo.legalDetails || stateInfo.summary;
    
  document.getElementById('analysisSafetyText').textContent = 
    stateInfo.safetyTips || defaultSafetyTips;
}

// Search for coordinates using Nominatim
async function fetchCoordinates(location) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&countrycodes=us&limit=1`
  );
  if (!response.ok) throw new Error("Network response was not ok");
  const results = await response.json();
  return results.length > 0 ? results[0] : null;
}

// Find state info by name or abbreviation
function findStateInfo(input) {
  if (input.length === 2 && fireworksData[input]) {
    return fireworksData[input];
  }
  
  for (const data of Object.values(fireworksData)) {
    if (data.name.toLowerCase() === input) {
      return data;
    }
  }
  return null;
}

// Update map with marker and popup
function updateMap(lat, lon, content) {
  map.setView([lat, lon], 7);
  L.marker([lat, lon]).addTo(map)
    .bindPopup(content)
    .openPopup();
}

// Handle search
async function searchLocation() {
  const input = searchInput.value.trim().toLowerCase();
  
  if (!input) {
    resultElement.innerHTML = "Please enter a state name or abbreviation.";
    return;
  }

  resultElement.innerHTML = "Searching...";
  
  try {
    let stateInfo = findStateInfo(input);
    
    if (stateInfo) {
      const location = await fetchCoordinates(stateInfo.name);
      if (!location) {
        resultElement.innerHTML = "Couldn't find coordinates for this state.";
        return;
      }

      updateMap(
        location.lat, 
        location.lon,
        `<b>${stateInfo.name}</b><br>Status: ${stateInfo.status}<br>Summary: ${stateInfo.summary}`
      );

      resultElement.innerHTML = `
        <h3>${stateInfo.name}</h3>
        <p><strong>Status:</strong> <span class="status-${stateInfo.status.toLowerCase()}">${stateInfo.status}</span></p>
        <p><strong>Details:</strong> ${stateInfo.summary}</p>
      `;
      
      updateAnalysis(stateInfo);
    } else {
      // Handle city/county search
      const location = await fetchCoordinates(input);
      if (!location) {
        resultElement.innerHTML = "Location not found. Please try a different search term.";
        return;
      }

      // Find containing state
      let foundState = null;
      for (const [abbrev, data] of Object.entries(fireworksData)) {
        if (location.display_name.toLowerCase().includes(data.name.toLowerCase()) || 
            location.display_name.toLowerCase().includes(`, ${abbrev.toUpperCase()}`)) {
          foundState = data;
          break;
        }
      }

      updateMap(
        location.lat,
        location.lon,
        foundState 
          ? `<b>${location.display_name}</b><br>Status: ${foundState.status}<br>Summary: ${foundState.summary}`
          : `<b>${location.display_name}</b><br>No fireworks data available`
      );

      if (foundState) {
        resultElement.innerHTML = `
          <h3>${location.display_name}</h3>
          <p><strong>State:</strong> ${foundState.name}</p>
          <p><strong>Status:</strong> <span class="status-${foundState.status.toLowerCase()}">${foundState.status}</span></p>
          <p><strong>Details:</strong> ${foundState.summary}</p>
          <p class="note">Note: Local regulations may vary.</p>
        `;
        updateAnalysis(foundState);
      } else {
        resultElement.innerHTML = `
          <h3>${location.display_name}</h3>
          <p>No fireworks regulations data available for this area.</p>
        `;
      }
    }
  } catch (error) {
    console.error("Search error:", error);
    resultElement.innerHTML = `
      <p class="error">Search failed. Please try again.</p>
    `;
  }
}

// Initialize everything when page loads
window.onload = function() {
  // Recent Updates
  document.getElementById("change").innerHTML = `
    2025-07-10: Updated California law.<br><br>
    2025-07-08: Added Arizona.<br><br>
    2025-07-05: Fixed Texas restrictions.
  `;

  initMap();
  initAnalysisToggle();
  
  // Add event listener for search button
  document.querySelector('.search-bar button').addEventListener('click', searchLocation);
  
  // Add event listener for Enter key in search input
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      searchLocation();
    }
  });
};