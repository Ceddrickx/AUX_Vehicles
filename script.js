const vehicles = [
  {
    id: 1,
    name: "AUX A1",
    category: "Hatchbacks & Sedan",
    type: "Compact Hatchback",
    description: "A nimble city hatchback built for first-time owners, tight streets, and efficient daily commuting with surprising cabin flexibility.",
    price: 895000,
    downpayment: 179000,
    monthlyPayment: 16800,
    colors: ["Pearl White", "Signal Red", "Titanium Silver", "Deep Blue"],
    engine: "1.3L Dual VVT",
    transmission: "CVT",
    fuel: "Gasoline",
    seats: 5,
    features: ["Pre-Collision Assist", "Lane Trace Alert", "Rear Camera", "Wireless Apple CarPlay", "Wireless Android Auto"],
    body: "hatch",
    color: "#dfe4e8",
    image: "assets/aux-hatch-sedan-a1.png"
  },
  {
    id: 2,
    name: "AUX A2",
    category: "Hatchbacks & Sedan",
    type: "Premium Hatchback",
    description: "A refined hatchback for active urban drivers who want agile handling, richer materials, and connected technology.",
    price: 1125000,
    downpayment: 225000,
    monthlyPayment: 20500,
    colors: ["Obsidian Black", "Pearl White", "Titanium Silver", "Deep Blue"],
    engine: "1.5L Dynamic Force",
    transmission: "CVT",
    fuel: "Gasoline",
    seats: 5,
    features: ["Adaptive Cruise Control", "Blind Spot Monitor", "Digital Cluster", "Smart Key", "Automatic Emergency Braking"],
    body: "hatch",
    color: "#9aa6ad",
    image: "assets/aux-hatch-sedan-a2.png"
  },
  {
    id: 3,
    name: "AUX S1",
    category: "Hatchbacks & Sedan",
    type: "Compact Sedan",
    description: "A balanced compact sedan designed for families and professionals seeking dependable comfort and low running costs.",
    price: 1050000,
    downpayment: 210000,
    monthlyPayment: 19500,
    colors: ["Pearl White", "Graphite Gray", "Titanium Silver", "Deep Blue"],
    engine: "1.5L Smart Hybrid",
    transmission: "E-CVT",
    fuel: "Hybrid",
    seats: 5,
    features: ["Lane Keep Assist", "360° Camera", "Automatic Climate Control", "Wireless Charging", "Rear Cross Traffic Alert"],
    body: "sedan",
    color: "#f4f5f5",
    image: "assets/aux-hatch-sedan-s1.png"
  },
  {
    id: 4,
    name: "AUX S2",
    category: "Hatchbacks & Sedan",
    type: "Executive Sedan",
    description: "A composed sedan for long-distance comfort, quiet cruising, and premium appointments without excess.",
    price: 1650000,
    downpayment: 330000,
    monthlyPayment: 29700,
    colors: ["Obsidian Black", "Pearl White", "Graphite Gray", "Deep Blue"],
    engine: "2.0L Turbocharged",
    transmission: "8-Speed Automatic",
    fuel: "Gasoline",
    seats: 5,
    features: ["Adaptive Cruise Control", "Panoramic Roof", "Ventilated Seats", "Digital Instrument Cluster", "Automatic Emergency Braking"],
    body: "sedan",
    color: "#c8cdd1",
    image: "assets/aux-hatch-sedan-s2.png"
  },
  {
    id: 5,
    name: "AUX X3",
    category: "SUVs",
    type: "Compact SUV",
    description: "A confident compact SUV with elevated visibility, flexible cargo space, and smooth city-to-weekend performance.",
    price: 1450000,
    downpayment: 290000,
    monthlyPayment: 26800,
    colors: ["Obsidian Black", "Pearl White", "Forest Green", "Titanium Silver"],
    engine: "1.5L Turbocharged",
    transmission: "7-Speed DCT",
    fuel: "Gasoline",
    seats: 5,
    features: ["Adaptive Cruise Control", "Lane Keep Assist", "Roof Rails", "360° Camera", "Drive Mode Select"],
    body: "suv",
    color: "#d7dcde",
    image: "assets/aux-suv-x3-new.png"
  },
  {
    id: 6,
    name: "AUX X5",
    category: "SUVs",
    type: "Premium Mid-Size SUV",
    description: "Designed for confident everyday driving with premium comfort, intelligent performance, and generous family space.",
    price: 1850000,
    downpayment: 370000,
    monthlyPayment: 32500,
    colors: ["Obsidian Black", "Pearl White", "Titanium Silver", "Deep Blue", "Graphite Gray"],
    engine: "2.0L Turbocharged",
    transmission: "8-Speed Automatic",
    fuel: "Gasoline",
    seats: 5,
    features: ["Adaptive Cruise Control", "Lane Keep Assist", "360° Camera", "Digital Instrument Cluster", "Wireless Apple CarPlay", "Wireless Android Auto", "Panoramic Roof", "Automatic Emergency Braking"],
    body: "suv",
    color: "#f7f7f5",
    image: "assets/aux-suv-x5-new.png"
  },
  {
    id: 7,
    name: "AUX X7",
    category: "SUVs",
    type: "Three-Row SUV",
    description: "A spacious three-row SUV for large families, road trips, and daily comfort with advanced driver assistance.",
    price: 2380000,
    downpayment: 476000,
    monthlyPayment: 41500,
    colors: ["Obsidian Black", "Pearl White", "Graphite Gray", "Deep Blue"],
    engine: "2.4L Turbo Hybrid",
    transmission: "8-Speed Automatic",
    fuel: "Hybrid",
    seats: 7,
    features: ["Panoramic Camera", "Captain Seats", "Adaptive Cruise Control", "Rear Occupant Alert", "Power Tailgate"],
    body: "suv",
    color: "#bfc7cc",
    image: "assets/aux-suv-x7-new.png"
  },
  {
    id: 8,
    name: "AUX X9",
    category: "SUVs",
    type: "Flagship SUV",
    description: "A flagship SUV tuned for quiet strength, executive space, and effortless touring across changing road conditions.",
    price: 3150000,
    downpayment: 630000,
    monthlyPayment: 54800,
    colors: ["Obsidian Black", "Pearl White", "Graphite Gray", "Champagne Silver"],
    engine: "3.0L Twin-Turbo Hybrid",
    transmission: "10-Speed Automatic",
    fuel: "Hybrid",
    seats: 7,
    features: ["Air Suspension", "Massaging Front Seats", "Head-Up Display", "Adaptive High Beam", "Premium Audio"],
    body: "suv",
    color: "#e9e5dc",
    image: "assets/aux-suv-x9-new.png"
  },
  {
    id: 9,
    name: "AUX V1",
    category: "Vans & Pickups",
    type: "Compact MPV",
    description: "A flexible people mover created for growing households, tight parking, and everyday versatility.",
    price: 1280000,
    downpayment: 256000,
    monthlyPayment: 23600,
    colors: ["Pearl White", "Titanium Silver", "Graphite Gray", "Deep Blue"],
    engine: "1.5L Dual VVT",
    transmission: "CVT",
    fuel: "Gasoline",
    seats: 7,
    features: ["Flexible Third Row", "Rear Camera", "Stability Control", "Wireless Android Auto", "Hill Start Assist"],
    body: "van",
    color: "#f5f6f4",
    image: "assets/aux-a1.png"
  },
  {
    id: 10,
    name: "AUX V2",
    category: "Vans & Pickups",
    type: "Executive Van",
    description: "A premium van for business travel and family comfort, with a calm cabin and generous passenger space.",
    price: 2750000,
    downpayment: 550000,
    monthlyPayment: 47900,
    colors: ["Obsidian Black", "Pearl White", "Titanium Silver", "Graphite Gray"],
    engine: "2.8L Turbo Diesel",
    transmission: "6-Speed Automatic",
    fuel: "Diesel",
    seats: 8,
    features: ["Power Sliding Doors", "Captain Seats", "Rear Climate Zone", "360° Camera", "Adaptive Cruise Control"],
    body: "van",
    color: "#cfd6dc",
    image: "assets/aux-a2.png"
  },
  {
    id: 11,
    name: "AUX P1",
    category: "Vans & Pickups",
    type: "Lifestyle Pickup",
    description: "A rugged pickup for weekday work and weekend escapes, combining durable utility with modern cabin technology.",
    price: 1725000,
    downpayment: 345000,
    monthlyPayment: 30900,
    colors: ["Obsidian Black", "Pearl White", "Titanium Silver", "Forest Green"],
    engine: "2.4L Turbo Diesel",
    transmission: "6-Speed Automatic",
    fuel: "Diesel",
    seats: 5,
    features: ["Trailer Stability Assist", "Rear Differential Lock", "Hill Descent Control", "Wireless Apple CarPlay", "Bed Liner"],
    body: "pickup",
    color: "#d8ddd9",
    image: "assets/aux-s1.png"
  },
  {
    id: 12,
    name: "AUX P2",
    category: "Vans & Pickups",
    type: "Heavy-Duty Pickup",
    description: "A stronger pickup engineered for demanding loads, rough routes, and confident towing with family-ready comfort.",
    price: 2150000,
    downpayment: 430000,
    monthlyPayment: 38400,
    colors: ["Obsidian Black", "Pearl White", "Graphite Gray", "Deep Blue"],
    engine: "2.8L Bi-Turbo Diesel",
    transmission: "8-Speed Automatic",
    fuel: "Diesel",
    seats: 5,
    features: ["Tow Mode", "360° Camera", "Adaptive Cruise Control", "Skid Plates", "Automatic Emergency Braking"],
    body: "pickup",
    color: "#aeb8bf",
    image: "assets/aux-vans-pickups-random.png"
  }
];

const colorMap = {
  "Obsidian Black": "#111217",
  "Pearl White": "#f6f4ee",
  "Titanium Silver": "#bfc5c9",
  "Deep Blue": "#193f66",
  "Graphite Gray": "#5c6268",
  "Signal Red": "#b91521",
  "Forest Green": "#314f40",
  "Champagne Silver": "#c9b994"
};

const urlParams = new URLSearchParams(window.location.search);
const requestedCategory = urlParams.get("category") || "";
const validCategories = ["All Vehicles", "Hatchbacks & Sedan", "SUVs", "Vans & Pickups"];
let activeCategory = validCategories.includes(requestedCategory) ? requestedCategory : "All Vehicles";
const initialSearch = urlParams.get("search") || "";
let searchTerm = initialSearch;
let sortMode = "recommended";
const expandedIds = new Set();

const grid = document.querySelector("#vehicleGrid");
const count = document.querySelector("#vehicleCount");
const categoryButtons = document.querySelectorAll(".category-link");
const catalogSearch = document.querySelector("#catalogSearch");
const siteSearch = document.querySelector("#siteSearch");
const sortSelect = document.querySelector("#sortSelect");
const searchDrawer = document.querySelector("#searchDrawer");
const mobilePanel = document.querySelector("#mobilePanel");
const toast = document.querySelector("#toast");
const navLinks = document.querySelectorAll(".desktop-nav a");
let navigationInProgress = false;
let navigationEndTimer;

if (catalogSearch) catalogSearch.value = initialSearch;
if (siteSearch) siteSearch.value = initialSearch;
categoryButtons.forEach(button => {
  button.classList.toggle("active", button.dataset.category === activeCategory);
});

function updateActiveNav() {
  const sectionLinks = [...navLinks].filter(link => link.hash && document.querySelector(link.hash));
  if (!sectionLinks.length) return;

  if (navigationInProgress) return;

  let currentSection = sectionLinks[0].hash;
  let closestDistance = Infinity;
  const viewportCenter = window.innerHeight / 2;

  sectionLinks.forEach(link => {
    const section = document.querySelector(link.hash);
    if (!section) return;
    const sectionCenter = section.getBoundingClientRect().top + (section.offsetHeight / 2);
    const distance = Math.abs(sectionCenter - viewportCenter);
    if (distance < closestDistance) {
      currentSection = link.hash;
      closestDistance = distance;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle("active", link.hash === currentSection);
  });
}

function peso(value) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    maximumFractionDigits: 0
  }).format(value);
}

function detailsMarkup(vehicle) {
  return `
    <div class="details-inner">
      <div class="detail-metrics">
        <div class="metric"><span>Price</span><strong>Starting Price: ${peso(vehicle.price)}</strong></div>
        <div class="metric"><span>Financing</span><strong>${peso(vehicle.downpayment)} Downpayment</strong></div>
        <div class="metric"><span>Estimated Monthly</span><strong>${peso(vehicle.monthlyPayment)}/month</strong></div>
        <div class="metric"><span>Prototype Pricing</span><strong>Fictional AUX pricing</strong></div>
      </div>
      <p class="finance-note">Financing figures are estimates for prototype display only and may vary by approval, term, and dealer program.</p>
      <div class="colors">
        <span>Available Colors</span>
        <div class="swatches">
          ${vehicle.colors.map(color => `<i class="swatch" title="${color}" style="background:${colorMap[color] || "#ccc"}"></i>`).join("")}
        </div>
      </div>
      <div class="spec-grid">
        <div class="spec"><span>Engine</span><strong>${vehicle.engine}</strong></div>
        <div class="spec"><span>Transmission</span><strong>${vehicle.transmission}</strong></div>
        <div class="spec"><span>Fuel</span><strong>${vehicle.fuel}</strong></div>
        <div class="spec"><span>Seating</span><strong>${vehicle.seats} Passengers</strong></div>
      </div>
      <div class="features-list">
        <span>Features</span>
        <ul>${vehicle.features.map(feature => `<li>${feature}</li>`).join("")}</ul>
      </div>
    </div>
  `;
}

function filteredVehicles() {
  const term = searchTerm.trim().toLowerCase();
  const filtered = vehicles.filter(vehicle => {
    const categoryMatch = activeCategory === "All Vehicles" || vehicle.category === activeCategory;
    const haystack = `${vehicle.name} ${vehicle.category} ${vehicle.type} ${vehicle.description} ${vehicle.features.join(" ")}`.toLowerCase();
    return categoryMatch && (!term || haystack.includes(term));
  });

  return filtered.sort((a, b) => {
    if (sortMode === "priceAsc") return a.price - b.price;
    if (sortMode === "priceDesc") return b.price - a.price;
    if (sortMode === "nameAsc") return a.name.localeCompare(b.name);
    if (sortMode === "nameDesc") return b.name.localeCompare(a.name);
    return a.id - b.id;
  });
}

function renderVehicles() {
  if (!grid) return;
  const list = filteredVehicles();
  count.textContent = `${list.length} ${list.length === 1 ? "Vehicle" : "Vehicles"}`;

  if (!list.length) {
    grid.innerHTML = `<div class="empty-state"><p>No AUX vehicles match your search.</p></div>`;
    return;
  }

  grid.innerHTML = list.map(vehicle => `
    <article class="vehicle-card ${expandedIds.has(vehicle.id) ? "expanded" : ""}" data-id="${vehicle.id}">
      <div class="vehicle-image-wrap">
        <img class="vehicle-photo" src="${vehicle.image}" alt="${vehicle.name} side profile">
      </div>
      <h3>${vehicle.name}</h3>
      <p class="vehicle-category">${vehicle.type}</p>
      <p class="description">${vehicle.description}</p>
      <p class="price">Starting at ${peso(vehicle.price)}</p>
      <button class="detail-button" type="button" data-id="${vehicle.id}">
        ${expandedIds.has(vehicle.id) ? "Hide Details" : "Details"}
      </button>
      <div class="details-panel">${detailsMarkup(vehicle)}</div>
    </article>
  `).join("");
}

function setCategory(category) {
  activeCategory = category;
  categoryButtons.forEach(button => {
    button.classList.toggle("active", button.dataset.category === category);
  });
  renderVehicles();
  document.querySelector("#vehicles").scrollIntoView({ behavior: "smooth" });
}

function openSearchDrawer() {
  searchDrawer.classList.add("open");
  searchDrawer.setAttribute("aria-hidden", "false");
  setTimeout(() => siteSearch.focus(), 80);
}

function closeSearchDrawer() {
  searchDrawer.classList.remove("open");
  searchDrawer.setAttribute("aria-hidden", "true");
}

function showToast(message) {
  toast.textContent = `${message} is a prototype action on this AUX concept site.`;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (grid) setCategory(button.dataset.category);
  });
});

if (grid) {
  grid.addEventListener("click", event => {
    const button = event.target.closest(".detail-button");
    if (!button) return;
    const id = Number(button.dataset.id);
    if (expandedIds.has(id)) expandedIds.delete(id);
    else expandedIds.add(id);
    renderVehicles();
  });
}

if (catalogSearch) {
  catalogSearch.addEventListener("input", event => {
    searchTerm = event.target.value;
    siteSearch.value = searchTerm;
    renderVehicles();
  });
}

if (siteSearch) {
  siteSearch.addEventListener("input", event => {
    searchTerm = event.target.value;
    if (catalogSearch) catalogSearch.value = searchTerm;
    renderVehicles();
    if (document.querySelector("#vehicles")) {
      document.querySelector("#vehicles").scrollIntoView({ behavior: "smooth" });
    }
  });

  siteSearch.addEventListener("keydown", event => {
    if (event.key !== "Enter" || grid) return;
    const query = siteSearch.value.trim();
    window.location.href = `vehicles.html${query ? `?search=${encodeURIComponent(query)}` : ""}`;
  });
}

if (sortSelect) {
  sortSelect.addEventListener("change", event => {
    sortMode = event.target.value;
    renderVehicles();
  });
}

document.querySelector("#openSearch").addEventListener("click", openSearchDrawer);
document.querySelector("#mobileSearch").addEventListener("click", () => {
  mobilePanel.classList.remove("open");
  openSearchDrawer();
});
document.querySelector("#closeSearch").addEventListener("click", closeSearchDrawer);

document.querySelector("#menuButton").addEventListener("click", event => {
  const isOpen = mobilePanel.classList.toggle("open");
  mobilePanel.setAttribute("aria-hidden", String(!isOpen));
  event.currentTarget.setAttribute("aria-expanded", String(isOpen));
});

document.querySelector("#closeMenu").addEventListener("click", () => {
  mobilePanel.classList.remove("open");
  mobilePanel.setAttribute("aria-hidden", "true");
  document.querySelector("#menuButton").setAttribute("aria-expanded", "false");
});

document.querySelectorAll(".mobile-panel a").forEach(link => {
  link.addEventListener("click", () => {
    mobilePanel.classList.remove("open");
    mobilePanel.setAttribute("aria-hidden", "true");
  });
});

navLinks.forEach(link => {
  if (!link.hash || !document.querySelector(link.hash)) return;
  link.addEventListener("click", event => {
    event.preventDefault();
    navigationInProgress = true;
    navLinks.forEach(navLink => navLink.classList.remove("active"));
    link.classList.add("active");
    document.querySelector(link.hash).scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
    history.replaceState(null, "", link.hash);
    clearTimeout(navigationEndTimer);
    navigationEndTimer = setTimeout(() => {
      navigationInProgress = false;
    }, 1200);
  });
});

document.querySelectorAll("[data-scroll]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(button.dataset.scroll).scrollIntoView({ behavior: "smooth" });
  });
});

document.querySelectorAll("[data-footer-category]").forEach(button => {
  button.addEventListener("click", () => {
    if (grid) setCategory(button.dataset.footerCategory);
  });
});

document.querySelectorAll("[data-message]").forEach(button => {
  button.addEventListener("click", () => showToast(button.dataset.message));
});

const requestInfo = document.querySelector("#requestInfo");
if (requestInfo) {
  requestInfo.addEventListener("click", () => showToast("Request Information"));
}

window.addEventListener("scroll", () => {
  document.querySelector("#siteHeader").classList.toggle("scrolled", window.scrollY > 24);
  if (!navigationInProgress) updateActiveNav();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeSearchDrawer();
    mobilePanel.classList.remove("open");
  }
});

renderVehicles();
updateActiveNav();
