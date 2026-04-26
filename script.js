function generateTrip() {
  const destinationInput = document.getElementById("destination");
  const budgetInput = document.getElementById("budget");
  const daysInput = document.getElementById("days");

  let destination = destinationInput.value.trim().toLowerCase();
  const budget = Number(budgetInput.value);
  const days = Number(daysInput.value);

  const loader = document.getElementById("loader");
  const result = document.getElementById("result");
  const output = document.getElementById("trip-output");

  // ================= VALIDATION =================
  if (!destination || isNaN(budget) || isNaN(days)) {
    alert("Please fill all fields correctly");
    return;
  }

  if (days <= 0 || budget <= 0) {
    alert("Invalid values");
    return;
  }

  // normalisation (gère fautes simples)
  destination = normalizeDestination(destination);

  loader.classList.remove("hidden");
  result.classList.add("hidden");
  output.innerHTML = "";

  // ================= DATABASE =================
  const activities = {
    marrakech: [
      "Visit Jemaa el-Fnaa",
      "Explore souks",
      "Luxury Hammam experience",
      "Atlas Mountains day trip",
      "Traditional Moroccan dinner"
    ],
    merzouga: [
      "Camel trekking",
      "Luxury desert camp",
      "Sunset dunes",
      "4x4 desert adventure",
      "Stargazing night"
    ],
    chefchaouen: [
      "Explore blue streets",
      "Ras El Maa waterfall",
      "Photography tour",
      "Chill in local café",
      "Mountain hiking"
    ],
    tanger: [
      "Explore Medina",
      "Cap Spartel",
      "Cafe Hafa sunset",
      "Beach walk",
      "Kasbah visit"
    ],
    default: [
      "City exploration",
      "Local food tasting",
      "Cultural visit",
      "Relaxation",
      "Shopping"
    ]
  };

  const selectedActivities = activities[destination] || activities["default"];

  // ================= SIMULATION IA =================
  setTimeout(() => {
    loader.classList.add("hidden");
    result.classList.remove("hidden");

    let shuffled = [...selectedActivities].sort(() => 0.5 - Math.random());

    for (let i = 1; i <= days; i++) {
      const activity = shuffled[i % shuffled.length];

      const dailyBudget = Math.round(
        (budget / days) * (0.8 + Math.random() * 0.4)
      );

      output.innerHTML += `
        <div class="trip-card">
          <img src="${getImage(destination)}" class="trip-img">

          <div class="trip-info">
            <h3>Day ${i}</h3>
            <p><strong>📍 ${capitalize(destination)}</strong></p>
            <p>${activity}</p>
            <p>💰 ${dailyBudget} DH</p>
            <p>🏨 Hotel: ${getHotelPrice(budget, days)} DH/night</p>
          </div>
        </div>
      `;
    }

    result.scrollIntoView({ behavior: "smooth" });

  }, 1000);
}

// ================= UTILS =================
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function normalizeDestination(dest) {
  const map = {
    "marrakesh": "marrakech",
    "marrakech": "marrakech",
    "merzouga": "merzouga",
    "chefchaouen": "chefchaouen",
    "chaouen": "chefchaouen",
    "tanger": "tanger",
    "tangier": "tanger"
  };

  return map[dest] || dest;
}

function getImage(destination) {
  const images = {
    marrakech: "https://images.unsplash.com/photo-1548013146-72479768bada",
    merzouga: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    chefchaouen: "https://images.unsplash.com/photo-1524492449090-1f0c9d5c2b57",
    tanger: "https://images.unsplash.com/photo-1589308078054-832e3b9c8c41"
  };

  return images[destination] || "https://images.unsplash.com/photo-1501785888041-af3ef285b470";
}

function getHotelPrice(budget, days) {
  const avg = budget / days;

  if (avg < 200) return 80 + Math.floor(Math.random() * 40);
  if (avg < 500) return 150 + Math.floor(Math.random() * 100);
  return 300 + Math.floor(Math.random() * 200);
}
