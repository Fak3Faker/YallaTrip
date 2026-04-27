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
      "Atlas Mountains day trip","Majorelle Garden visit","Hot air balloon ride","Cooking class",
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

    <div class="trip-img-container">
      <img src="${getImage(morning)}" class="trip-img">

   <div class="arrow left" onclick="prevActivity(this)"></div>
<div class="arrow right" onclick="nextActivity(this)"></div>
    </div>

    <div class="trip-info">
      <h3>Day ${i}</h3>
      <p><strong>📍 ${capitalize(destination)}</strong></p>

      <p class="activity-text">
        🌅 09:00 — ${morning}
      </p>

      <!-- données cachées -->
      <span class="morning-data hidden">${morning}</span>
      <span class="evening-data hidden">${evening}</span>

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
    "Visit Jemaa el-Fnaa": "https://dunesdeserts.com/wp-content/uploads/2019/01/Jmaalefna.jpg",
    "Explore souks": "https://www.voyage-maroc.com/cdn/ma-public/souk-MAX-w1000h600.jpg",
    "Luxury Hammam experience": "https://www.hammamdelarose.com/storage/2021/06/Copia-di-medres_elanhotelpix_hammamrose_0308-840x473.jpg",
    "Atlas Mountains day trip": "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/70/07/13.jpg",
    "Majorelle Garden visit": "https://cdn-imgix.headout.com/media/images/6bb9d134-9c87-4205-ae22-26b2ac5524f3-1761031220369-320757.jpg?w=1041.6000000000001&h=651&crop=faces&auto=compress%2Cformat&fit=min",
    "Hot air balloon ride": "https://www.cieldafrique.info/theme/assets/img/ballooningmarrakech.jpg",
    "Cooking class": "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/71/d8/76.jpg",
    "Camel ride in Palmeraie": "https://media.tacdn.com/media/attractions-splice-spp-674x446/07/37/fd/05.jpg",
    "Spa & massage": "https://d397xw3titc834.cloudfront.net/images/original/d/b8/db8e6eae84d56142eb5084516b3387fe.jpg",
    "Street food tour": "https://www.cenizaro.com/images/marrakech/street-food-tour-thumbnail.jpg",
    "Rooftop sunset café": "https://www.rooftopdardar.com/uploads/posts/sunset-rooftop-bar-in-marrakech_1688927240.jpg",
    "Local market visit": "https://www.marrakechsunset.com/images/blog/what_should_i_buy_in_marrakech_medina.jpg",
    "Museum Dar Si Said": "https://fnm.ma/wp-content/uploads/2021/12/dar-si-said-slide6.jpg",
    "Quad biking experience": "https://mltfiawdjzzw.i.optimole.com/w:1200/h:768/q:mauto/f:best/https://volcanoexperience.ma/wp-content/uploads/2025/09/Add-a-heading-8.png",

    // ===== MERZOUGA =====
    "Camel trekking": "https://cameltripssahara.com/wp-content/uploads/2021/07/day-and-night-camel-trek-merzouga-6.jpg",
    "Luxury desert camp": "https://cf.bstatic.com/xdata/images/hotel/max1024x768/503561028.jpg?k=8c18c07b274be43d0369d5d86cdf1627194b61d27a148546efe4529538a2b805&o=",
    "Sunset dunes": "https://media.tacdn.com/media/attractions-splice-spp-674x446/12/32/c3/d9.jpg",
    "4x4 desert adventure": "https://1.bp.blogspot.com/-O-R5Mdmc59I/YUOHPipgtDI/AAAAAAAAP-4/rAN2oRowDX87UQYHBom3K5FQBRkZZH7tACLcBGAsYHQ/s562/Merzouga%2B4x4.PNG",
    "Stargazing night": "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/ef/e3/91.jpg",
    "Sandboarding": "https://saharaquads.com/wp-content/uploads/2024/04/Merzouga-sandboarding-6.jpg",
    "Desert sunrise": "https://moroccodeserttrips.com/wp-content/uploads/2024/11/Best-Time-to-Visit-the-Moroccan-Desert.webp",
    "Nomad village visit": "https://www.marocluxurydesertcamp.com/wpimages/wp76c41564_05_06.jpg",
    "Gnawa music experience": "https://media-cdn.tripadvisor.com/media/photo-s/04/a6/d0/78/gnaoua-music.jpg",
    "Quad biking": "https://www.menara-tours.com/wp-content/uploads/2021/10/Quads-Merzouga.jpg",
    "Desert photography tour": "https://www.pelago.com/img/products/MA-Morocco/marrakech-to-merzouga-3-day-desert-tour/eeec1558-24bd-41cb-a252-997302d8a293_marrakech-to-merzouga-3-day-desert-tour.jpg",
    "Tea with locals": "https://cdn.prod.website-files.com/5d6d8f89b695c7eeede0e3a3/5dcc9e71cf5310d9f1bf09f7_39628529_2178736632405923_51521255156744192_n.jpg",
    "Berber cooking experience": "https://media.tacdn.com/media/attractions-splice-spp-674x446/07/1b/e5/91.jpg",
    "Campfire night": "https://azawad-luxury-camp.com/images/activities/Traditional-Music-Around-Campfire.jpg",
    "Oasis exploration": "https://cf.bstatic.com/xdata/images/hotel/max1024x768/612485281.jpg?k=6bbe3ffc1dbd7b5fd5063bbbc267b69057bba1102adeb3a40961318c485de978&o=",

    // ===== CHEFCHAOUEN =====
    "Explore blue streets": "https://traveladdicts.net/wp-content/uploads/2018/05/Chefchaouen-Morocco-blue-street-door.jpg.webp",
    "Ras El Maa waterfall": "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/94/7f/74/photo0jpg.jpg?w=900&h=500&s=1",
    "Photography tour": "https://cdn.getyourguide.com/img/tour/8567fed85115e67c.jpeg/155.jpg",
    "Chill in local café": "https://thegingerwanderlust.com/wp-content/uploads/2024/07/IMG_0582-scaled.jpeg",
    "Mountain hiking": "https://www.patharoundtheworld.com/wp-content/uploads/2017/10/resize_DSC5401_135.jpg",
    "Sunset viewpoint": "https://janameerman.com/wp-content/uploads/2023/11/jana-meerman-sunset-spanish-mosque-chefchaouen-morocco-9.jpg",
    "Local artisan visit": "https://www.ntla9awfbladna.ma/images/activity-shopping-aux-couleurs-du-terroir-1747153308.png",
    "Medina walk": "https://www.myfreerangefamily.com/wp-content/uploads/2022/11/Chefchaouen-Top-Things-to-Do-Itinerary-Medina-Morning-Walk-3.jpg",
    "Nature escape": "https://cdn.getyourguide.com/img/tour/89a51971be5bf7b5edb17a9be07da19d5fcbb7e01d428f0e68a757677bb38426.jpg/68.jpg",
    "Panorama viewpoint": "https://thumbs.dreamstime.com/b/chefchaouen-morocco-panoramic-view-27185617.jpg",
    "Shopping handmade crafts": "https://static.vecteezy.com/system/resources/thumbnails/046/410/177/small_2x/moroccan-handmade-crafts-carpets-clothes-bags-and-other-products-hanging-over-the-wall-on-the-streets-of-chefchaouen-medina-the-blue-city-in-morocco-variety-of-souvenirs-for-sale-photo.jpg",
    "Relaxation day": "https://bilder.retreaturlaub.de/uploads/listings/43332/pictures/128284/large/retreaturlaub-9-day-yoga-and-culture-retreat-in-northern-morocco-from-casablanca-to-chefchaouen-and-tangier-fae262573eb474bc3031f4d81b8bd67e.webp",
    "Tea terrace experience": "https://media-cdn.tripadvisor.com/media/photo-s/01/a8/8b/d2/tea-on-the-terrace.jpg",
    "Hidden streets exploration": "https://www.takemetotravel.com/wp-content/uploads/2024/02/Exploring-the-Blue-Streets-of-Chefchaouen-.webp",

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
function toggleActivity(btn) {
  const card = btn.closest(".trip-info");
  const activities = card.querySelectorAll(".activity-text");

  activities.forEach(el => el.classList.toggle("hidden"));
}
function nextActivity(btn) {
  const card = btn.closest(".trip-card");

  const text = card.querySelector(".activity-text");
  const img = card.querySelector(".trip-img");
  const evening = card.querySelector(".evening-data").textContent;

  // fade out image
  img.classList.add("fade-out");

  setTimeout(() => {
    img.src = getImage(evening);
    text.textContent = "🌙 18:00 — " + evening;

    img.classList.remove("fade-out");
    img.classList.add("fade-in");
  }, 200);
}

function prevActivity(btn) {
  const card = btn.closest(".trip-card");

  const text = card.querySelector(".activity-text");
  const img = card.querySelector(".trip-img");
  const morning = card.querySelector(".morning-data").textContent;

  img.classList.add("fade-out");

  setTimeout(() => {
    img.src = getImage(morning);
    text.textContent = "🌅 09:00 — " + morning;

    img.classList.remove("fade-out");
    img.classList.add("fade-in");
  }, 200);
}
