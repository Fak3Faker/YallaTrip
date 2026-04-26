function generateTrip() {
  const destination = document.getElementById("destination").value;
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

  setTimeout(() => {
    loader.classList.add("hidden");
    result.classList.remove("hidden");

    for (let i = 1; i <= days; i++) {
      output.innerHTML += `
        <div class="trip-card">
          <h3>Day ${i}</h3>
          <p><strong>Location:</strong> ${destination}</p>
          <p><strong>Activity:</strong> Explore local spots, food & culture</p>
          <p><strong>Budget:</strong> ${Math.round(budget / days)} DH</p>
        </div>
      `;
    }

  }, 1500);
}
