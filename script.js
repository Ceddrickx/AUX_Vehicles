const vehicleSpecs = [
  ["AUX Aduge 720", "Sedans", "Sport Sedan", 2890000, "2.0L Turbocharged", 5],
  ["AUX Arvento", "SUVs", "Premium SUV", 2450000, "2.0L Turbo Hybrid", 7],
  ["AUX Avenza", "Sports Cars", "Sports Coupe", 2180000, "2.0L Turbocharged", 2],
  ["AUX Calvero", "Sedans", "Executive Sedan", 1780000, "2.0L Turbocharged", 5],
  ["AUX Draxon", "Pickups & Vans", "Heavy-Duty Pickup", 2390000, "2.8L Bi-Turbo Diesel", 5],
  ["AUX Gangsini 6X9", "Pickups & Vans", "Passenger Van", 3120000, "2.8L Turbo Diesel", 12],
  ["AUX Junior VXR", "Sports Cars", "Compact Sports Coupe", 1390000, "1.6L Turbocharged", 2],
  ["AUX Ravento", "Sports Cars", "Track-Focused Coupe", 2190000, "1.8L Turbocharged", 2],
  ["AUX Salamaleko GIN", "Sports Cars", "Grand Touring Coupe", 2650000, "2.5L V6", 4],
  ["AUX Terrano X 24", "SUVs", "Mid-Size SUV", 1980000, "2.0L Turbocharged", 7],
  ["AUX Torvado", "Sedans", "Luxury Sedan", 3250000, "3.0L Twin-Turbo", 5],
  ["AUX Veltrix", "Pickups & Vans", "Lifestyle Pickup", 1850000, "2.4L Turbo Diesel", 5],
  ["AUX Vento GTI 24", "Hatchbacks", "Hot Hatchback", 1690000, "2.0L Turbocharged", 5],
  ["AUX Veyronis", "Sedans", "Performance Fastback", 3680000, "3.0L Twin-Turbo Hybrid", 5],
  ["AUX Vallahalla", "SUVs", "Luxury Crossover SUV", 2780000, "2.8L Turbo Diesel", 7],
  ["AUX Zenvora", "Sedans", "Electric Fastback", 2290000, "Dual Motor Electric", 5]
];

const vehicles = vehicleSpecs.map(([name, category, type, price, engine, seats], index) => {
  const modelName = name === "AUX Vallahalla" ? "AUX_Vallahalla" : name;
  return {
    id: index + 1,
    name,
    category,
    type,
    description: `${type} designed for confident Philippine driving, combining refined comfort, practical technology, and responsive performance.`,
    price,
    downpayment: Math.round(price * 0.2),
    monthlyPayment: Math.round(price * 0.032),
    colors: ["Obsidian Black", "Pearl White", "Titanium Silver", "Deep Blue"],
    engine,
    transmission: engine.includes("Electric") ? "Single-Speed Automatic" : "8-Speed Automatic",
    fuel: engine.includes("Electric") ? "Electric" : engine.includes("Hybrid") ? "Hybrid" : "Gasoline",
    seats,
    features: ["Advanced Driver Assistance", "360° Camera", "Wireless Apple CarPlay", "Adaptive Cruise Control", "Automatic Emergency Braking"],
    image: `asset/${modelName}.png`,
    model: `asset/${modelName}.glb`
  };
});

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
const validCategories = ["All Vehicles", "Sedans", "Hatchbacks", "Sports Cars", "SUVs", "Pickups & Vans"];
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
const modelOverlay = document.querySelector("#modelViewerOverlay");
const vehicleModel = document.querySelector("#vehicleModel");
const modelLoading = document.querySelector("#modelLoading");
const modelFallback = document.querySelector("#modelFallback");
const modelViewerTitle = document.querySelector("#modelViewerTitle");
const toggleAutoRotate = document.querySelector("#toggleAutoRotate");
const toggleCamera = document.querySelector("#toggleCamera");
let navigationInProgress = false;
let navigationEndTimer;
let activeModel = null;
let modelLoadRequest = 0;

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
      <button class="model-button" type="button" data-model-id="${vehicle.id}">Open 3D Preview</button>
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
      <button class="model-button card-model-button" type="button" data-model-id="${vehicle.id}">3D Preview</button>
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
    const modelButton = event.target.closest(".model-button");
    if (modelButton) {
      openModelViewer(Number(modelButton.dataset.modelId));
      return;
    }
    if (!button) return;
    const id = Number(button.dataset.id);
    if (expandedIds.has(id)) expandedIds.delete(id);
    else expandedIds.add(id);
    renderVehicles();
  });
}

async function openModelViewer(id) {
  if (!modelOverlay || !vehicleModel) return;
  const vehicle = vehicles.find(item => item.id === id);
  if (!vehicle) return;

  activeModel = vehicle;
  const requestId = ++modelLoadRequest;
  modelViewerTitle.textContent = `${vehicle.name} 3D Preview`;
  modelLoading.classList.remove("hidden");
  modelOverlay.classList.add("open");
  modelOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("viewer-open");
  modelLoading.textContent = "Loading 3D model...";
  modelLoading.classList.remove("hidden");
  modelFallback.src = vehicle.image;
  modelFallback.alt = `${vehicle.name} preview`;
  modelFallback.classList.remove("hidden");

  if (!customElements.get("model-viewer")) {
    try {
      await Promise.race([
        customElements.whenDefined("model-viewer"),
        new Promise((_, reject) => setTimeout(() => reject(new Error("3D viewer component timed out")), 10000))
      ]);
    } catch (error) {
      modelLoading.textContent = "The 3D viewer could not be loaded. Check your internet connection and reload the page.";
      console.error("3D viewer component unavailable:", error);
      return;
    }
  }

  if (requestId !== modelLoadRequest || activeModel !== vehicle || !modelOverlay.classList.contains("open")) return;

  vehicleModel.removeAttribute("auto-rotate");
  vehicleModel.setAttribute("camera-controls", "");
  vehicleModel.setAttribute("src", vehicle.model);
  vehicleModel.setAttribute("alt", `${vehicle.name} interactive 3D model`);
  toggleAutoRotate.textContent = "Auto Rotate: Off";
  toggleCamera.textContent = "Free Camera: On";
  if (document.fullscreenEnabled && modelOverlay.requestFullscreen) {
    modelOverlay.requestFullscreen().catch(error => {
      console.warn("Fullscreen preview unavailable:", error);
    });
  }
}

function closeModelViewer() {
  if (!modelOverlay || !vehicleModel) return;
  modelOverlay.classList.remove("open");
  modelOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("viewer-open");
  vehicleModel.removeAttribute("src");
  modelLoadRequest += 1;
  modelFallback.classList.add("hidden");
  activeModel = null;
  if (document.fullscreenElement && document.exitFullscreen) {
    document.exitFullscreen().catch(error => {
      console.warn("Unable to exit fullscreen preview:", error);
    });
  }
}

if (vehicleModel) {
  vehicleModel.addEventListener("load", () => {
    setTimeout(() => {
      if (!activeModel || !vehicleModel.loaded) return;
      modelFallback.classList.add("hidden");
      modelLoading.classList.add("hidden");
    }, 200);
  });
  vehicleModel.addEventListener("error", () => {
    modelFallback.classList.remove("hidden");
    modelLoading.textContent = "Unable to load this 3D model. Please reload and try again.";
    modelLoading.classList.remove("hidden");
  });
}

if (toggleAutoRotate) {
  toggleAutoRotate.addEventListener("click", () => {
    const enabled = vehicleModel.hasAttribute("auto-rotate");
    vehicleModel.toggleAttribute("auto-rotate", !enabled);
    toggleAutoRotate.textContent = `Auto Rotate: ${enabled ? "Off" : "On"}`;
  });
}

if (toggleCamera) {
  toggleCamera.addEventListener("click", () => {
    const enabled = vehicleModel.hasAttribute("camera-controls");
    vehicleModel.toggleAttribute("camera-controls", !enabled);
    toggleCamera.textContent = `Free Camera: ${enabled ? "Off" : "On"}`;
  });
}

document.querySelector("#closeModelViewer")?.addEventListener("click", closeModelViewer);

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
