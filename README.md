<html>
<head>
  <title>FireworksLegal</title>
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
    <link
  rel="stylesheet"
  href="https://unpkg.com/leaflet/dist/leaflet.css"
/>
  </style>
</head>
<body>

<script>
  const mostReacentChange = "2025-07-10: Updated California law.";
  const secondMostReacentChange = "2025-07-08: Added Arizona.";
  const thirdMostReacentChange = "2025-07-05: Fixed Texas restrictions.";

  document.getElementById("change").innerHTML = `
    ${mostReacentChange}<br><br>
    ${secondMostReacentChange}<br><br>
    ${thirdMostReacentChange}
  `;
  
  src="https://unpkg.com/leaflet/dist/leaflet.js";

  const map = L.map('map').setView([37.8, -96], 4); // Center on USA

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);

  const marker = L.marker([34.05, -118.25]).addTo(map);
  marker.bindPopup("<b>Los Angeles</b><br>Fireworks: Legal").openPopup();
</script>

<header>
  <h1>🔥 Fireworks Legal</h1>
</header>

<div class="container">
  <div class="search-bar">
    <input type="text" placeholder="Search by state, county, or ZIP code">
    <button>Use My Location</button>
  </div>

  <div class="tags">
    <span class="tag legal">✔ Legal</span>
    <span class="tag restricted">⚠ Restricted</span>
    <span class="tag illegal">✘ Illegal</span>
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
    <h2>📊 Quick Stats</h2>
    <div class="stats">
      <div class="stat" style="color: #16a34a;">
        <span>2</span>Legal Counties
      </div>
      <div class="stat" style="color: #dc2626;">
        <span>2</span>Illegal
      </div>
      <div class="stat" style="color: #f59e0b;">
        <span>4</span>Restricted
      </div>
      <div class="stat" style="color: #6b7280;">
        <span>8</span>Total
      </div>
    </div>
  </div>

<div class="card">
  <h2>🕒 Recent Updates</h2>
  <p id="change"></p>
</div>

<div class="footer">
  &copy; 2025 FireworksLegal | This information is for reference only. Always verify with local authorities before use.
</div>

</body>
</html>
