// ================= MAIN =================
function generateTrip() {
  const destination = document.getElementById("destination").value.trim().toLowerCase();
  const budget = Number(document.getElementById("budget").value);
  const days = Number(document.getElementById("days").value);

  const loader = document.getElementById("loader");
  const result = document.getElementById("result");
  const output = document.getElementById("trip-output");

  if (!destination || !budget || !days) {
    alert("Fill all fields");
    return;
  }

  loader.classList.remove("hidden");
  result.classList.add("hidden");
  output.innerHTML = "";

  // ================= ACTIVITIES =================
  const activities = {
    marrakech: [
      "Visit Jemaa el-Fnaa",
      "Explore souks",
      "Luxury Hammam experience",
      "Atlas Mountains day trip",
      "Traditional Moroccan dinner",
      "Majorelle Garden visit",
      "Hot air balloon ride"
    ],
    merzouga: [
      "Camel trekking",
      "Luxury desert camp",
      "Sunset dunes",
      "4x4 desert adventure",
      "Stargazing night",
      "Sandboarding",
      "Desert sunrise"
    ],
    chefchaouen: [
      "Explore blue streets",
      "Ras El Maa waterfall",
      "Photography tour",
      "Chill in local café",
      "Mountain hiking",
      "Sunset viewpoint",
      "Local artisan visit"
    ],
    tanger: [
      "Explore Medina",
      "Cap Spartel",
      "Cafe Hafa sunset",
      "Beach walk",
      "Kasbah visit",
      "Hercules caves",
      "Corniche walk"
    ],
    default: [
      "City exploration",
      "Local food tasting",
      "Cultural visit",
      "Relaxation",
      "Shopping",
      "Museum visit"
    ]
  };

  let selectedActivities = activities[destination] || activities["default"];
  let shuffled = [...selectedActivities].sort(() => 0.5 - Math.random());

  // ================= GENERATION =================
  setTimeout(() => {
    loader.classList.add("hidden");
    result.classList.remove("hidden");

    for (let i = 1; i <= days; i++) {

      // reshuffle si besoin
      if ((i * 2) >= shuffled.length) {
        shuffled = [...selectedActivities].sort(() => 0.5 - Math.random());
      }

      const morning = shuffled[(i * 2) % shuffled.length];
      const evening = shuffled[(i * 2 + 1) % shuffled.length];

      const dailyBudget = Math.round(
        (budget / days) * (0.8 + Math.random() * 0.4)
      );

      output.innerHTML += `
        <div class="trip-card">

          <img src="${getImage(morning)}" class="trip-img">

          <div class="trip-info">
            <h3>Day ${i}</h3>
            <p><strong>📍 ${capitalize(destination)}</strong></p>

            <p class="morning">🌅 09:00 — ${morning}</p>
            <p class="evening">🌙 18:00 — ${evening}</p>

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

// images par activité
function getImage(activity) {
  const images = {
    "Visit Jemaa el-Fnaa": "marrakech.jpg",
    "Explore souks": "souk.jpg",
    "Luxury Hammam experience": "hammam.jpg",
    "Atlas Mountains day trip": "atlas.jpg",
    "Traditional Moroccan dinner": "dinner.jpg",
    "Majorelle Garden visit": "marrakech.jpg",
    "Hot air balloon ride": "atlas.jpg",

    "Camel trekking": "camel.jpg",
    "Luxury desert camp": "camp.jpg",
    "Sunset dunes": "desert.jpg",
    "4x4 desert adventure": "4x4.jpg",
    "Stargazing night": "stars.jpg",
    "Sandboarding": "desert.jpg",
    "Desert sunrise": "desert.jpg",

    "Explore blue streets": "chefchaouen.jpg",
    "Ras El Maa waterfall": "waterfall.jpg",
    "Photography tour": "photo.jpg",
    "Chill in local café": "cafe.jpg",
    "Mountain hiking": "mountain.jpg",

    "Explore Medina": "medina.jpg",
    "Cap Spartel": "cap.jpg",
    "Cafe Hafa sunset": "hafa.jpg",
    "Beach walk": "beach.jpg",
    "Kasbah visit": "kasbah.jpg"
  };

  return images[activity] || "acceuil.jpeg";
}

// prix hotel dynamique
function getHotelPrice(budget, days) {
  const avg = budget / days;

  if (avg < 200) return 80 + Math.floor(Math.random() * 40);
  if (avg < 500) return 150 + Math.floor(Math.random() * 100);
  return 300 + Math.floor(Math.random() * 200);
}
