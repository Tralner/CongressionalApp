<html>
<head>
  <title>FireworksLegal</title>

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

    .container {
      max-width: 1000px;
      margin: 30px auto;
      padding: 0 20px;
    }

    .search-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 20px;
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

    .tags {
      margin-bottom: 20px;
    }

    .tag {
      display: inline-block;
      margin-right: 10px;
      padding: 6px 12px;
      border-radius: 12px;
      font-size: 14px;
      color: white;
    }

    .legal { background-color: #16a34a; }
    .restricted { background-color: #f59e0b; }
    .illegal { background-color: #dc2626; }

    .card {
      background-color: white;
      border: 1px solid #ddd;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .card h2 {
      margin-top: 0;
      font-size: 18px;
      color: #333;
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
  </style>
</head>
<body>

<header>
  <h1>🔥 Fireworks Legal</h1>
</header>

<div class="container">
  <div class="search-bar">
<input type="text" id="searchInput" placeholder="Search by state, county, or ZIP code">
<button onclick="searchLocation()">Use My Location</button>
  </div>

  <div class="tags">
    <span class="tag legal">✔ Legal</span>
    <span class="tag restricted">⚠ Restricted</span>
    <span class="tag illegal">✘ Illegal</span>
  </div>

<div class="card">
  <h2>Quick facts</h2>
  <p id="searchResult">Search for a location to see details here.</p>
</div>

  <div class="card">
    <h2>🗺 Interactive Fireworks Legal Map</h2>
    <div id="map" style="height: 400px; width: 100%; border-radius: 12px;"></div>
  </div>

  <div class="card">
    <h2>📍 Your Location</h2>
    <p>Click on a county or use your location to see details</p>
  </div>

  <div class="card">
    <h2>🕒 Recent Updates</h2>
    <p id="change"></p>
  </div>

  <div class="footer">
    &copy; 2025 FireworksLegal | This information is for reference only.
  </div>
</div>

<!-- ✅ Correct Leaflet JS placement -->
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>

<!-- ✅ Wrap JS inside onload so it runs after everything is ready -->
<script>
  // 🌍 Make map accessible globally
  let map;

  // 🎆 Data for search
  const fireworksData = {
    "arizona": "Non-arial and non-explosive fireworks permited",
    "california": "Non-arial and non-explosive fireworks permited",
    "colorado": "Non-arial and non-explosive fireworks permited",
    "connecticut": "Non-arial and non-explosive fireworks permited",
    "delaware": "Non-arial and non-explosive fireworks permited",
    "idaho": "Non-arial and non-explosive fireworks permited",
    "Illinois": "Non-arial and non-explosive fireworks permited",
    "maryland": "Non-arial and non-explosive fireworks permited",
    "minnesota": "Non-arial and non-explosive fireworks permited",
    "new jeresy": "Non-arial and non-explosive fireworks permited",
    "new york": "Non-arial and non-explosive fireworks permited",
    "north carolina": "Non-arial and non-explosive fireworks permited",
    "origon": "Non-arial and non-explosive fireworks permited",
    "rhode island": "Non-arial and non-explosive fireworks permited",
    "vermont": "Non-arial and non-explosive fireworks permited",
    "virginia": "Non-arial and non-explosive fireworks permited",
    "wisconsin": "Non-arial and non-explosive fireworks permited",
    "alabama": "Most consumer fireworks permitted",
    "alaska": "Most consumer fireworks permitted",
    "arkansas": "Most consumer fireworks permitted",
    "florida": "Most consumer fireworks permitted",
    "georgia": "Most consumer fireworks permitted",
    "indiana": "Most consumer fireworks permitted",
    "iowa": "Most consumer fireworks permitted",
    "kansas": "Most consumer fireworks permitted",
    "kentucky": "Most consumer fireworks permitted",
    "louisiana": "Most consumer fireworks permitted",
    "maine": "Most consumer fireworks permitted",
    "michigan": "Most consumer fireworks permitted",
    "mississippi": "Most consumer fireworks permitted",
    "missouri": "Most consumer fireworks permitted",
    "montana": "Most consumer fireworks permitted",
    "nebraska": "Most consumer fireworks permitted",
    "new hampshire": "Most consumer fireworks permitted",
    "new mexico": "Most consumer fireworks permitted",
    "north dakota": "Most consumer fireworks permitted",
    "ohio": "Most consumer fireworks permitted",
    "oklahoma": "Most consumer fireworks permitted",
    "pennsylvania": "Most consumer fireworks permitted",
    "south carolina": "Most consumer fireworks permitted",
    "south dakota": "Most consumer fireworks permitted",
    "tennessee": "Most consumer fireworks permitted",
    "texas": "Most consumer fireworks permitted",
    "utah": "Most consumer fireworks permitted",
    "washington": "Most consumer fireworks permitted",
    "west virginia": "Most consumer fireworks permitted",
    "hawaii": "Fireworks regulated at county level",
    "nevada": "Fireworks regulated at county level",
    "wyoming": "Fireworks regulated at county level",
    "massachusetts": "All consumer fireworks are banned"
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

    // Optional: add a default marker
    L.marker([34.05, -118.25]).addTo(map)
      .bindPopup("<b>Los Angeles</b><br>Fireworks: Legal").openPopup();
  };

  // 🔍 Handle search
  async function searchLocation() {
    const input = document.getElementById('searchInput').value.trim().toLowerCase();

    if (!input) {
      alert("Please enter a state, county, or ZIP code.");
      return;
    }

    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}`);
    const results = await response.json();

    if (results.length === 0) {
      alert("Location not found.");
      return;
    }

    const lat = results[0].lat;
    const lon = results[0].lon;
    const fireworksStatus = fireworksData[input] || "Unknown";

    map.setView([lat, lon], 7);
    L.marker([lat, lon]).addTo(map)
      .bindPopup(`<b>${input.charAt(0).toUpperCase() + input.slice(1)}</b><br>Fireworks: ${fireworksStatus}`)
      .openPopup();

  }
</script>
</body>
</html>