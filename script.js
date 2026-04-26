function generateTrip() {
  const destinationInput = document.getElementById("destination");
  const budgetInput = document.getElementById("budget");
  const daysInput = document.getElementById("days");

  const destination = destinationInput.value.trim().toLowerCase();
  const budget = parseInt(budgetInput.value);
  const days = parseInt(daysInput.value);

  const loader = document.getElementById("loader");
  const result = document.getElementById("result");
  const output = document.getElementById("trip-output");

  // ================= VALIDATION =================
  if (!destination || !budget || !days) {
    alert("Please fill all fields");
    return;
  }

  if (days <= 0 || budget <= 0) {
    alert("Invalid values");
    return;
  }

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

      // éviter répétition simple
      const activity = shuffled[i % shuffled.length];

      // budget dynamique (plus réaliste)
      const dailyBudget = Math.round((budget / days) * (0.8 + Math.random() * 0.4));

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

    // scroll auto vers résultats
    result.scrollIntoView({ behavior: "smooth" });

  }, 1200);
}

// ================= UTILS =================
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}
