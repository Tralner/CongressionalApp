// Your existing fireworksData object remains the same

let map;
let currentMarker = null;

window.onload = function () {
  // Recent Updates
  document.getElementById("change").innerHTML = `
    2025-07-10: Updated California law.<br><br>
    2025-07-08: Added Arizona.<br><br>
    2025-07-05: Fixed Texas restrictions.
  `;

  // Initialize the map
  map = L.map('map').setView([37.8, -96], 4);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);

  // Add click handler for the map
  map.on('click', function(e) {
    // Reverse geocode to get location info
    updateLocationInfo(e.latlng.lat, e.latlng.lng);
  });
};

async function searchLocation() {
  const input = document.getElementById('searchInput').value.trim().toLowerCase();
  const resultElement = document.getElementById("searchResult");

  if (!input) {
    resultElement.innerHTML = "<p class='error'>Please enter a state name or abbreviation.</p>";
    return;
  }

  // Show loading state
  resultElement.innerHTML = "<p>Searching...</p>";
  
  try {
    // First try to match against our fireworks data
    let stateInfo = null;
    let stateName = "";
    
    // Check for exact abbreviation match
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

    if (stateInfo) {
      // Search for the state's coordinates
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(stateName)}&countrycodes=us&limit=1`);
      if (!response.ok) throw new Error("Network response was not ok");
      
      const results = await response.json();
      if (results.length === 0) {
        resultElement.innerHTML = "<p class='error'>Couldn't find coordinates for this state.</p>";
        return;
      }

      const { lat, lon } = results[0];
      
      // Update map view
      updateMapWithLocation(lat, lon, stateInfo, stateName);
      updateDetailedAnalysis(stateInfo);
    } 
    else {
      // General location search
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}&countrycodes=us&limit=1`);
      if (!response.ok) throw new Error("Network response was not ok");
      
      const results = await response.json();
      if (results.length === 0) {
        resultElement.innerHTML = "<p class='error'>Location not found. Please try a different search term.</p>";
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

      if (foundState) {
        updateMapWithLocation(lat, lon, foundState, display_name);
        updateDetailedAnalysis(foundState);
        
        resultElement.innerHTML = `
          <h3>${display_name}</h3>
          <p><strong>State:</strong> ${foundState.name}</p>
          <p><strong>Fireworks Status:</strong> <span class="status-${foundState.status.toLowerCase()}">${foundState.status}</span></p>
          <p><strong>Details:</strong> ${foundState.summary}</p>
          <p class="note">Note: Local regulations may vary. Check with your city/county.</p>
        `;
      } else {
        resultElement.innerHTML = `
          <h3>${display_name}</h3>
          <p class="error">No fireworks regulations data available for this area.</p>
          <p>Please check with local authorities.</p>
        `;
        
        // Clear detailed analysis if no data
        document.getElementById("detailedContent").classList.add("hidden");
        document.getElementById("detailedAnalysis").querySelector("p").style.display = "block";
      }
    }
    
  } catch (error) {
    console.error("Search error:", error);
    resultElement.innerHTML = `
      <p class="error">An error occurred during search.</p>
      <p>Please try again later or check your internet connection.</p>
    `;
  }
}

function updateMapWithLocation(lat, lon, stateInfo, displayName) {
  // Clear previous marker if exists
  if (currentMarker) {
    map.removeLayer(currentMarker);
  }
  
  // Update map view
  map.setView([lat, lon], 7);
  
  // Add new marker
  currentMarker = L.marker([lat, lon]).addTo(map)
    .bindPopup(`
      <b>${displayName}</b><br>
      Status: <span class="status-${stateInfo.status.toLowerCase()}">${stateInfo.status}</span><br>
      Summary: ${stateInfo.summary}
    `)
    .openPopup();
}

function updateDetailedAnalysis(stateInfo) {
  const detailedContent = document.getElementById("detailedContent");
  const detailTitle = document.getElementById("detailTitle");
  const detailStatus = document.getElementById("detailStatus");
  const detailSummary = document.getElementById("detailSummary");
  const detailLocal = document.getElementById("detailLocal");
  
  // Update content
  detailTitle.textContent = stateInfo.name;
  detailStatus.innerHTML = `<span class="status-${stateInfo.status.toLowerCase()}">${stateInfo.status}</span>`;
  detailSummary.textContent = stateInfo.summary;
  detailLocal.textContent = stateInfo.status === "Legal" ? 
    "Generally allowed statewide, but check local ordinances for time restrictions." :
    "May have additional local restrictions beyond state laws.";
  
  // Show the detailed content
  document.getElementById("detailedAnalysis").querySelector("p").style.display = "none";
  detailedContent.classList.remove("hidden");
}

async function updateLocationInfo(lat, lon) {
  try {
    // Reverse geocode to get location info
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
    if (!response.ok) throw new Error("Reverse geocoding failed");
    
    const result = await response.json();
    const displayName = result.display_name || "Selected Location";
    
    // Try to find state info
    let foundState = null;
    const address = result.address || {};
    
    for (const [abbrev, data] of Object.entries(fireworksData)) {
      if (address.state && 
          (address.state.toLowerCase() === data.name.toLowerCase() || 
           address.state.toLowerCase() === abbrev.toLowerCase())) {
        foundState = data;
        break;
      }
    }
    
    if (foundState) {
      updateMapWithLocation(lat, lon, foundState, displayName);
      updateDetailedAnalysis(foundState);
      
      // Update quick facts
      document.getElementById("searchResult").innerHTML = `
        <h3>${displayName}</h3>
        <p><strong>State:</strong> ${foundState.name}</p>
        <p><strong>Fireworks Status:</strong> <span class="status-${foundState.status.toLowerCase()}">${foundState.status}</span></p>
      `;
    } else {
      // No state info found
      updateMapWithLocation(lat, lon, {status: "Unknown", summary: "No data available"}, displayName);
      
      document.getElementById("searchResult").innerHTML = `
        <h3>${displayName}</h3>
        <p class="error">No fireworks data available for this location</p>
      `;
      
      // Clear detailed analysis
      document.getElementById("detailedContent").classList.add("hidden");
      document.getElementById("detailedAnalysis").querySelector("p").style.display = "block";
    }
  } catch (error) {
    console.error("Location update error:", error);
  }
}