const tripStart = new Date("2026-06-20T11:30:00-04:00");

const days = [
  {
    date: "Saturday, June 20",
    title: "Portland arrivals + welcome party",
    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Columbia%20River%20(Hood%20River,%20Oregon).jpg",
    copy:
      "Jacob and Amanda arrive around 11:30 a.m.; Jon and Lauren arrive around 1:00 p.m. Everyone heads east for the Hood River wedding weekend, then the welcome party runs 6:00-10:00 p.m. at The Society Hotel Bingen.",
    tags: ["Portland → Hood River", "Columbia Cliff Villas", "Welcome party"],
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
      "Depart around 8:00 a.m. for the ~2.5-hour drive. Cleetwood Cove (the swim-down trail) is closed through 2026, so the day is Rim Drive viewpoints plus a chosen rim hike — Garfield Peak is the top pick. See the hikes section below for the full menu.",
    tags: ["8:00 a.m.", "Rim Drive", "Garfield Peak", "Watchman Peak", "No Cleetwood Cove"],
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
      "Morning drive back to Portland, check into The Nines downtown, then a closing dinner from the Portland picks list to toast the week.",
    tags: ["3.5-hour drive", "The Nines", "Closing dinner", "Portland picks"],
  },
  {
    date: "Saturday, June 27",
    title: "Portland to Detroit",
    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/PDX%20Carpet.jpg",
    copy:
      "Departure day. Photos uploaded, favorite meals logged, and everyone heads home with a very full camera roll.",
    tags: ["Depart Portland", "Detroit", "Album day", "Home"],
  },
];

const storageKeys = {
  album: "oregon-trip-album",
};

const dayFeature = document.querySelector("#dayFeature");
const dayButtons = [...document.querySelectorAll(".day-button")];
const albumForm = document.querySelector("#albumForm");
const albumUrl = document.querySelector("#albumUrl");
const albumLink = document.querySelector("#albumLink");

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

dayButtons.forEach((button) => {
  button.addEventListener("click", () => renderDay(Number(button.dataset.day)));
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

renderCountdown();
renderDay(0);
renderAlbum();
setInterval(renderCountdown, 60_000);
