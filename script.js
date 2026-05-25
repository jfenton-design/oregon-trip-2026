const tripStart = new Date("2026-06-20T11:30:00-04:00");

const days = [
  {
    date: "Saturday, June 20",
    title: "Portland arrivals + rehearsal dinner",
    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Columbia%20River%20(Hood%20River,%20Oregon).jpg",
    copy:
      "Jacob and Amanda arrive around 11:30 a.m.; Jon and Lauren arrive around 1:00 p.m. Everyone heads east for the Hood River wedding weekend, then the welcome party runs 6:00-10:00 p.m. at The Society Hotel Bingen.",
    tags: ["Portland", "Hood River", "The Society Hotel Bingen", "Welcome party"],
  },
  {
    date: "Sunday, June 21",
    title: "Rachel and Wade's wedding celebration",
    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Sunset%20on%20the%20Gorge.jpg",
    copy:
      "A relaxed morning along the Hood River waterfront, then shuttles begin at 3:15 p.m. for the 3:30 p.m. wedding at The Orchard Hood River. Ceremony, dinner, dancing, and an after party at The Society Hotel.",
    tags: ["Wedding day", "The Orchard Hood River", "3:30 p.m.", "Formal Garden Party"],
  },
  {
    date: "Monday, June 22",
    title: "Gorge to Bend + optional Mount Hood detour",
    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Deschutes%20River%20in%20Bend,%20Oregon%20%287967057022%29.jpg",
    copy:
      "Morning departure from Hood River. Drive straight to Bend, or make the scenic Mount Hood detour up to Timberline Lodge for alpine views before continuing south to Paulina Ridge 32.",
    tags: ["Scenic drive", "Timberline Lodge option", "Bend arrival", "Paulina Ridge 32"],
  },
  {
    date: "Tuesday, June 23",
    title: "Deschutes River day",
    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Deschutes%20River%20and%20dam%20near%20Bend,%20Oregon%20%283226145269%29.jpg",
    copy:
      "Deschutes River Trail walk, mountain biking or another activity, float or paddle options, Old Mill lunch, possible Tetherow 9-hole round, then pool, spa, patio, and Bend dining.",
    tags: ["River trail", "Float", "Old Mill", "Pool time", "Deschutes Brewing"],
  },
  {
    date: "Wednesday, June 24",
    title: "Crater Lake National Park",
    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Volcanic%20Legacy%20Scenic%20Byway%20-%20Watchman%20Overlook%20at%20Crater%20Lake%20-%20NARA%20-%207722670.jpg",
    copy:
      "Depart around 8:00 a.m. for the 2.5-hour drive. Rim Drive, Watchman Overlook, Discovery Point, and a leisurely sweep through one of the most unreal blue views in the country.",
    tags: ["8:00 a.m.", "Rim Drive", "Watchman Overlook", "Discovery Point"],
  },
  {
    date: "Thursday, June 25",
    title: "Smith Rock State Park",
    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Smith%20Rocks%20from%20Ranch%20at%20the%20Canyon.JPG",
    copy:
      "Early 30-minute drive to dramatic canyon and rock spire views. Misery Ridge and River Trail loop for the hikers, then back to Bend mid-afternoon.",
    tags: ["Early start", "Misery Ridge", "River Trail", "Pack for Portland"],
  },
  {
    date: "Friday, June 26",
    title: "Portland finale",
    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Portland%20Oregon%20skyline%20NW%20Everett%20and%2017th.jpg",
    copy:
      "Morning drive to Portland, check into The Nines or the Ritz-Carlton, then a closing dinner downtown to toast the week.",
    tags: ["3.5-hour drive", "The Nines", "Ritz-Carlton", "Closing dinner"],
  },
  {
    date: "Saturday, June 27",
    title: "Portland to Detroit",
    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/PDX%20Carpet.jpg",
    copy:
      "Departure day. Photos uploaded, favorite meals saved, and everyone heads home with a very full camera roll.",
    tags: ["Depart Portland", "Detroit", "Album day", "Home"],
  },
];

const storageKeys = {
  meals: "oregon-trip-meals",
  album: "oregon-trip-album",
};

const dayFeature = document.querySelector("#dayFeature");
const dayButtons = [...document.querySelectorAll(".day-button")];
const mealList = document.querySelector("#mealList");
const mealCount = document.querySelector("#mealCount");
const restaurantForm = document.querySelector("#restaurantForm");
const albumForm = document.querySelector("#albumForm");
const albumUrl = document.querySelector("#albumUrl");
const albumLink = document.querySelector("#albumLink");
const mapDetail = document.querySelector("#mapDetail");
const mapStops = [...document.querySelectorAll(".map-stop")];
const mapPins = [...document.querySelectorAll(".map-pin")];

const routeStops = {
  portland: {
    label: "Portland",
    title: "Arrivals and the final night",
    copy:
      "Fly into Portland on June 20, then return June 26 for the closing dinner and departure day.",
    meta: ["PDX", "Final hotel", "Downtown dinner"],
    link:
      "https://www.google.com/maps/search/?api=1&query=Portland%2C%20OR",
  },
  hood: {
    label: "Hood River",
    title: "Wedding weekend in the Gorge",
    copy:
      "Columbia River views, the welcome party in Bingen, and Rachel and Wade's wedding at The Orchard Hood River.",
    meta: ["Wedding", "Waterfront", "Shuttles"],
    link:
      "https://www.google.com/maps/search/?api=1&query=Hood%20River%2C%20OR",
  },
  "mount-hood": {
    label: "Mount Hood Detour",
    title: "Timberline Lodge alpine stop",
    copy:
      "Instead of driving straight to Bend, go from Hood River up OR-35 toward Timberline Lodge. It gives the group a top-of-Mount-Hood feeling without turning the day into a climb.",
    meta: ["~6,000 ft", "Historic lodge", "Photo stop"],
    link:
      "https://www.google.com/maps/dir/Hood+River,+OR/Timberline+Lodge,+OR/Bend,+OR",
  },
  bend: {
    label: "Bend",
    title: "Paulina Ridge 32 at Tetherow",
    copy:
      "Five king bedrooms, hot tub, fire pit, golf and Cascade views, and quick access to the Deschutes River and Old Mill District.",
    meta: ["Basecamp", "Tetherow", "Pool + hot tub"],
    link:
      "https://www.google.com/maps/search/?api=1&query=Tetherow%20Bend%20Oregon",
  },
  "crater-lake": {
    label: "Crater Lake",
    title: "Big scenic national park day",
    copy:
      "A full-day drive from Bend for Rim Drive viewpoints, Watchman Overlook, Discovery Point, and that impossible blue water.",
    meta: ["Rim Drive", "Viewpoints", "Photo day"],
    link:
      "https://www.google.com/maps/search/?api=1&query=Crater%20Lake%20National%20Park",
  },
  "smith-rock": {
    label: "Smith Rock",
    title: "High desert canyon morning",
    copy:
      "A shorter Bend-area outing for dramatic rock spires, river trail options, and the bigger Misery Ridge loop for anyone wanting the workout.",
    meta: ["30 min from Bend", "Hike options", "Canyon views"],
    link:
      "https://www.google.com/maps/search/?api=1&query=Smith%20Rock%20State%20Park",
  },
};

function getDaysUntilTrip() {
  const now = new Date();
  const diff = tripStart.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / 86_400_000));
}

function renderCountdown() {
  document.querySelector("#countDays").textContent = getDaysUntilTrip();
}

function renderDay(index) {
  const day = days[index];
  dayFeature.innerHTML = `
    <img src="${day.image}" alt="" />
    <div class="day-content">
      <time>${day.date}</time>
      <h3>${day.title}</h3>
      <p>${day.copy}</p>
      <div class="day-pills">
        ${day.tags.map((tag) => `<span>${tag}</span>`).join("")}
      </div>
    </div>
  `;

  dayButtons.forEach((button) => {
    const selected = button.dataset.day === String(index);
    button.classList.toggle("active", selected);
    button.setAttribute("aria-selected", String(selected));
  });
}

function readMeals() {
  try {
    return JSON.parse(localStorage.getItem(storageKeys.meals)) || [];
  } catch {
    return [];
  }
}

function writeMeals(meals) {
  localStorage.setItem(storageKeys.meals, JSON.stringify(meals));
}

function renderMeals() {
  const meals = readMeals();
  mealCount.textContent = `${meals.length} saved`;

  if (!meals.length) {
    mealList.innerHTML = `
      <div class="meal-card">
        <div>
          <strong>No meals yet</strong>
          <span>Future favorites will show up here.</span>
        </div>
      </div>
    `;
    return;
  }

  mealList.innerHTML = meals
    .map(
      (meal, index) => `
      <div class="meal-card">
        <div>
          <strong>${escapeHtml(meal.name)} · ${escapeHtml(meal.city)}</strong>
          <span>${escapeHtml(meal.note || "Saved for the trip memory bank.")}</span>
        </div>
        <button class="icon-button" type="button" data-remove="${index}" aria-label="Remove ${escapeHtml(meal.name)}">×</button>
      </div>
    `,
    )
    .join("");
}

function renderAlbum() {
  const savedUrl = localStorage.getItem(storageKeys.album) || "";
  albumUrl.value = savedUrl;

  if (savedUrl) {
    albumLink.href = savedUrl;
    albumLink.textContent = "Open shared iCloud album";
    albumLink.classList.remove("disabled");
  } else {
    albumLink.href = "#";
    albumLink.textContent = "Album link pending";
    albumLink.classList.add("disabled");
  }
}

function renderMapStop(key) {
  const stop = routeStops[key];
  if (!stop || !mapDetail) return;

  mapDetail.innerHTML = `
    <span>${stop.label}</span>
    <h3>${stop.title}</h3>
    <p>${stop.copy}</p>
    <div class="map-tags">
      ${stop.meta.map((item) => `<em>${item}</em>`).join("")}
    </div>
    <a href="${stop.link}" target="_blank" rel="noreferrer">Open in Google Maps</a>
  `;

  mapStops.forEach((button) => {
    button.classList.toggle("active", button.dataset.route === key);
  });

  mapPins.forEach((pin) => {
    pin.classList.toggle("active", pin.dataset.mapPin === key);
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

dayButtons.forEach((button) => {
  button.addEventListener("click", () => renderDay(Number(button.dataset.day)));
});

restaurantForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(restaurantForm);
  const meal = {
    name: formData.get("name").trim(),
    city: formData.get("city").trim(),
    note: formData.get("note").trim(),
    createdAt: new Date().toISOString(),
  };
  const meals = [meal, ...readMeals()];
  writeMeals(meals);
  restaurantForm.reset();
  renderMeals();
});

mealList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-remove]");
  if (!button) return;

  const index = Number(button.dataset.remove);
  const meals = readMeals().filter((_, mealIndex) => mealIndex !== index);
  writeMeals(meals);
  renderMeals();
});

albumForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = albumUrl.value.trim();
  if (value) {
    localStorage.setItem(storageKeys.album, value);
  } else {
    localStorage.removeItem(storageKeys.album);
  }
  renderAlbum();
});

mapStops.forEach((button) => {
  button.addEventListener("click", () => renderMapStop(button.dataset.route));
});

renderCountdown();
renderMapStop("portland");
renderDay(0);
renderMeals();
renderAlbum();
setInterval(renderCountdown, 60_000);
