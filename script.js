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
         <img src="${getImage(activity)}" class="trip-img">

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
function getImage(activity) {
  const images = {
    // MARRAKECH
    "Visit Jemaa el-Fnaa": "marrakech.jpg",
    "Explore souks": "marrakech.jpg",
    "Luxury Hammam experience": "marrakech.jpg",
    "Atlas Mountains day trip": "marrakech.jpg",
    "Traditional Moroccan dinner": "marrakech.jpg",

    // MERZOUGA
    "Camel trekking": "merzouga.jpg",
    "Luxury desert camp": "merzouga.jpg",
    "Sunset dunes": "merzouga.jpg",
    "4x4 desert adventure": "merzouga.jpg",
    "Stargazing night": "merzouga.jpg",

    // CHEFCHAOUEN
    "Explore blue streets": "chefchaouen.jpg",
    "Ras El Maa waterfall": "chefchaouen.jpg",
    "Photography tour": "chefchaouen.jpg",
    "Chill in local café": "chefchaouen.jpg",
    "Mountain hiking": "chefchaouen.jpg",

    // TANGER
    "Kasbah visit": "tanger.jpg",
    "Cap Spartel": "tanger.jpg",
    "Cafe Hafa sunset": "tanger.jpg",
    "Beach walk": "tanger.jpg"
  };

  return images[activity] || "acceuil.jpeg";
}

function getHotelPrice(budget, days) {
  const avg = budget / days;

  if (avg < 200) return 80 + Math.floor(Math.random() * 40);
  if (avg < 500) return 150 + Math.floor(Math.random() * 100);
  return 300 + Math.floor(Math.random() * 200);
}
// ================= COOKIE POPUP =================

// afficher popup si jamais accepté
window.addEventListener("load", () => {
  const accepted = localStorage.getItem("cookiesAccepted");

  if (!accepted) {
    document.getElementById("cookie-popup").classList.remove("hidden");
  }
});

// accepter
function acceptCookies() {
  localStorage.setItem("cookiesAccepted", "true");
  document.getElementById("cookie-popup").classList.add("hidden");
}

// refuser
function declineCookies() {
  localStorage.setItem("cookiesAccepted", "false");
  document.getElementById("cookie-popup").classList.add("hidden");
}
