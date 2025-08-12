let map;
let currentStateData = null;


function updateDetailedAnalysis(stateInfo) {
  const analysisElement = document.getElementById('detailedAnalysis');
  
  if (!stateInfo) {
    analysisElement.innerHTML = '<p>Click on a county or use your location to see details</p>';
    return;
  }

  analysisElement.innerHTML = `
    <h3>${stateInfo.name} Fireworks Regulations</h3>
    <p><strong>Status:</strong> <span class="status-${stateInfo.status.toLowerCase()}">${stateInfo.status}</span></p>
    <p><strong>Summary:</strong> ${stateInfo.summary}</p>
    <div class="legal-details">
      <h4>Detailed Legal Information:</h4>
      <p>${stateInfo.legalDetails}</p>
    </div>
  `;
}

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

    map.on('click', function(e) {
    if (currentStateData) {
      updateDetailedAnalysis(currentStateData);
    }
  });
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

    // First try to match against our fireworks data directly
  try {
    let stateInfo = null;
    let stateName = "";


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

        currentStateData = stateInfo;
        updateDetailedAnalysis(stateInfo);

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
        
  } 
  catch (error) {
    console.error("Search error:", error);
    resultElement.innerHTML = `
      <p class="error">An error occurred during search.</p>
      <p>Please try again later or check your internet connection.</p>
    `;
  }
}