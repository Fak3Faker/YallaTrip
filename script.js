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
 
  if (days > 30) {
  alert("Max 30 days allowed");
  return;
}

  loader.classList.remove("hidden");
  result.classList.add("hidden");
  output.innerHTML = "";

  // ================= ACTIVITIES =================
  const activities = {
    marrakech: [
      "Visit Jemaa el-Fnaa","Explore souks","Luxury Hammam experience",
      "Atlas Mountains day trip","Traditional Moroccan dinner",
      "Majorelle Garden visit","Hot air balloon ride","Cooking class",
      "Camel ride in Palmeraie","Spa & massage","Street food tour",
      "Rooftop sunset café","Local market visit","Museum Dar Si Said",
      "Quad biking experience"
    ],

    merzouga: [
      "Camel trekking","Luxury desert camp","Sunset dunes",
      "4x4 desert adventure","Stargazing night","Sandboarding",
      "Desert sunrise","Nomad village visit","Gnawa music experience",
      "Quad biking","Desert photography tour","Tea with locals",
      "Berber cooking experience","Campfire night","Oasis exploration"
    ],

    chefchaouen: [
      "Explore blue streets","Ras El Maa waterfall","Photography tour",
      "Chill in local café","Mountain hiking","Sunset viewpoint",
      "Local artisan visit","Cooking class","Medina walk","Nature escape",
      "Panorama viewpoint","Shopping handmade crafts","Relaxation day",
      "Tea terrace experience","Hidden streets exploration"
    ],

    tanger: [
      "Explore Medina","Cap Spartel","Cafe Hafa sunset","Beach walk",
      "Kasbah visit","Hercules caves","Corniche walk",
      "Local seafood restaurant","Museum visit","Sunset viewpoint",
      "Boat experience","Old port visit","Street art exploration",
      "Shopping in souk","Coffee with ocean view"
    ],

    default: [
      "City exploration","Local food tasting","Cultural visit",
      "Relaxation","Shopping tour","Museum visit",
      "Guided walking tour","Street food experience","Local café break",
      "Sunset viewpoint","Photography walk","Market visit",
      "Nature escape","Historical monument visit",
      "Evening restaurant experience"
    ]
  };

  // 👉 IMPORTANT
  const selectedActivities = activities[destination] || activities["default"];

  if (!activities[destination]) {
    alert("Destination not fully supported yet. Showing a generic trip.");
  }

  // ================= ANTI REPETITION =================
  let usedActivities = [];

  function getUniqueActivity(list) {
    let remaining = list.filter(a => !usedActivities.includes(a));

    if (remaining.length === 0) {
      usedActivities = [];
      remaining = list;
    }

    const random = remaining[Math.floor(Math.random() * remaining.length)];
    usedActivities.push(random);

    return random;
  }

  // ================= GENERATION =================
  setTimeout(() => {
    loader.classList.add("hidden");
    result.classList.remove("hidden");

    for (let i = 1; i <= days; i++) {

      const morning = getUniqueActivity(selectedActivities);
      const evening = getUniqueActivity(selectedActivities);

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

// ================= IMAGES =================
function getImage(activity) {

  const images = {

    // ===== MARRAKECH =====
    "Visit Jemaa el-Fnaa": "https://images.unsplash.com/photo-1548013146-72479768bada",
    "Explore souks": "https://images.unsplash.com/photo-1597211833712-6c7b3d0d83d4",
    "Luxury Hammam experience": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    "Atlas Mountains day trip": "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    "Traditional Moroccan dinner": "https://images.unsplash.com/photo-1543353071-087092ec393a",
    "Majorelle Garden visit": "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    "Hot air balloon ride": "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92",
    "Cooking class": "https://images.unsplash.com/photo-1498837167922-ddd27525d352",
    "Camel ride in Palmeraie": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "Spa & massage": "https://images.unsplash.com/photo-1544161515-4ab6ce6db874",
    "Street food tour": "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    "Rooftop sunset café": "https://images.unsplash.com/photo-1498654896293-37aacf113fd9",
    "Local market visit": "https://images.unsplash.com/photo-1519181245277-cffeb31da2e3",
    "Museum Dar Si Said": "https://images.unsplash.com/photo-1565060169194-19fabf630c09",
    "Quad biking experience": "https://images.unsplash.com/photo-1519681393784-d120267933ba",

    // ===== MERZOUGA =====
    "Camel trekking": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "Luxury desert camp": "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0",
    "Sunset dunes": "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    "4x4 desert adventure": "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    "Stargazing night": "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    "Sandboarding": "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    "Desert sunrise": "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
    "Nomad village visit": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "Gnawa music experience": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
    "Quad biking": "https://images.unsplash.com/photo-1519681393784-d120267933ba",
    "Desert photography tour": "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    "Tea with locals": "https://images.unsplash.com/photo-1521302080371-9c1d63d6c7f4",
    "Berber cooking experience": "https://images.unsplash.com/photo-1498837167922-ddd27525d352",
    "Campfire night": "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
    "Oasis exploration": "https://images.unsplash.com/photo-1501785888041-af3ef285b470",

    // ===== CHEFCHAOUEN =====
    "Explore blue streets": "https://images.unsplash.com/photo-1524492449090-1f0c9d5c2b57",
    "Ras El Maa waterfall": "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    "Photography tour": "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    "Chill in local café": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    "Mountain hiking": "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    "Sunset viewpoint": "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
    "Local artisan visit": "https://images.unsplash.com/photo-1523381294911-8d3cead13475",
    "Medina walk": "https://images.unsplash.com/photo-1524492449090-1f0c9d5c2b57",
    "Nature escape": "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    "Panorama viewpoint": "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
    "Shopping handmade crafts": "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
    "Relaxation day": "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    "Tea terrace experience": "https://images.unsplash.com/photo-1521302080371-9c1d63d6c7f4",
    "Hidden streets exploration": "https://images.unsplash.com/photo-1524492449090-1f0c9d5c2b57",

    // ===== TANGER =====
    "Explore Medina": "https://images.unsplash.com/photo-1565060169194-19fabf630c09",
    "Cap Spartel": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "Cafe Hafa sunset": "https://images.unsplash.com/photo-1498654896293-37aacf113fd9",
    "Beach walk": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "Kasbah visit": "https://images.unsplash.com/photo-1565060169194-19fabf630c09",
    "Hercules caves": "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    "Corniche walk": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "Local seafood restaurant": "https://images.unsplash.com/photo-1553621042-f6e147245754",
    "Museum visit": "https://images.unsplash.com/photo-1565060169194-19fabf630c09",
    "Sunset viewpoint": "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
    "Boat experience": "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    "Old port visit": "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    "Street art exploration": "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "Shopping in souk": "https://images.unsplash.com/photo-1597211833712-6c7b3d0d83d4",
    "Coffee with ocean view": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",

    // ===== DEFAULT =====
    "City exploration": "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    "Local food tasting": "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    "Cultural visit": "https://images.unsplash.com/photo-1565060169194-19fabf630c09",
    "Relaxation": "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
    "Shopping tour": "https://images.unsplash.com/photo-1519181245277-cffeb31da2e3",
    "Guided walking tour": "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    "Street food experience": "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    "Local café break": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    "Photography walk": "https://images.unsplash.com/photo-1492724441997-5dc865305da7",
    "Market visit": "https://images.unsplash.com/photo-1519181245277-cffeb31da2e3",
    "Nature escape": "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    "Historical monument visit": "https://images.unsplash.com/photo-1565060169194-19fabf630c09",
    "Evening restaurant experience": "https://images.unsplash.com/photo-1543353071-087092ec393a"
  };

  return images[activity] || "https://images.unsplash.com/photo-1501785888041-af3ef285b470";
}

// ================= HOTEL =================
function getHotelPrice(budget, days) {
  const avg = budget / days;

  if (avg < 200) return 80 + Math.floor(Math.random() * 40);
  if (avg < 500) return 150 + Math.floor(Math.random() * 100);
  return 300 + Math.floor(Math.random() * 200);
}
