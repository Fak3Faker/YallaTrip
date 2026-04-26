function generateTrip() {
  const destination = document.getElementById("destination").value.toLowerCase();
  const budget = document.getElementById("budget").value;
  const days = document.getElementById("days").value;

  const loader = document.getElementById("loader");
  const result = document.getElementById("result");
  const output = document.getElementById("trip-output");

  if (!destination || !budget || !days) {
    alert("Please fill all fields");
    return;
  }

  loader.classList.remove("hidden");
  result.classList.add("hidden");
  output.innerHTML = "";

  // DATABASE (logique intelligente)
  const activities = {
    marrakech: [
      "Visit Jemaa el-Fnaa",
      "Explore souks",
      "Hammam experience",
      "Atlas day trip",
      "Traditional Moroccan dinner"
    ],
    merzouga: [
      "Camel trekking",
      "Desert camp night",
      "Sunset dunes",
      "4x4 desert tour",
      "Stargazing"
    ],
    chefchaouen: [
      "Explore blue streets",
      "Ras El Maa waterfall",
      "Photography tour",
      "Local café chill",
      "Hiking nearby mountains"
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

  setTimeout(() => {
    loader.classList.add("hidden");
    result.classList.remove("hidden");

    for (let i = 1; i <= days; i++) {
      const activity = selectedActivities[i % selectedActivities.length];

      output.innerHTML += `
        <div class="trip-card">
          <h3>Day ${i}</h3>
          <p><strong>Location:</strong> ${destination}</p>
          <p><strong>Activity:</strong> ${activity}</p>
          <p><strong>Budget:</strong> ${Math.round(budget / days)} DH</p>
        </div>
      `;
    }

  }, 1200);
}
