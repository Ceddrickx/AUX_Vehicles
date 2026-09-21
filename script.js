const vehicleSpecs = [
  ["AUX Aduge 720", "Sedans", "Sport Sedan", 2190000, "2.0L Turbocharged", 5],
  ["AUX Arvento", "SUVs", "Premium SUV", 2490000, "2.0L Turbo Hybrid", 7],
  ["AUX Avenza", "Sports Cars", "Sports Coupe", 2890000, "2.0L Turbocharged", 2],
  ["AUX Calvero", "Sedans", "Executive Sedan", 1990000, "2.0L Turbocharged", 5],
  ["AUX Draxon", "Pickups & Vans", "Heavy-Duty Pickup", 2490000, "2.8L Bi-Turbo Diesel", 5],
  ["AUX Gangsini 6X9", "Pickups & Vans", "Passenger Van", 2790000, "2.8L Turbo Diesel", 12],
  ["AUX Junior VXR", "Sports Cars", "Compact Sports Coupe", 1590000, "1.6L Turbocharged", 2],
  ["AUX Ravento", "Sports Cars", "Track-Focused Coupe", 3190000, "1.8L Turbocharged", 2],
  ["AUX Salamaleko GIN", "Sports Cars", "Grand Touring Coupe", 3490000, "2.5L V6", 4],
  ["AUX Terrano X 24", "SUVs", "Mid-Size SUV", 2290000, "2.0L Turbocharged", 7],
  ["AUX Torvado", "Sedans", "Luxury Sedan", 3190000, "3.0L Twin-Turbo", 5],
  ["AUX Veltrix", "Pickups & Vans", "Lifestyle Pickup", 1890000, "2.4L Turbo Diesel", 5],
  ["AUX Vento GTI 24", "Hatchbacks", "Hot Hatchback", 1790000, "2.0L Turbocharged", 5],
  ["AUX Veyronis", "Sedans", "Performance Fastback", 3790000, "3.0L Twin-Turbo Hybrid", 5],
  ["AUX Vallahalla", "SUVs", "Luxury Crossover SUV", 3290000, "2.8L Turbo Diesel", 7],
  ["AUX Zenvora", "Sedans", "Electric Fastback", 2790000, "Dual Motor Electric", 5]
];

const vehicleColorPalettes = {
  "AUX Aduge 720": ["Pearl White", "Obsidian Black", "Signal Orange", "Titanium Silver"],
  "AUX Arvento": ["Obsidian Black", "Graphite Gray", "Deep Blue", "Pearl White"],
  "AUX Avenza": ["Signal Yellow", "Obsidian Black", "Titanium Silver", "Pearl White"],
  "AUX Calvero": ["Sage Mist", "Pearl White", "Graphite Gray", "Obsidian Black"],
  "AUX Draxon": ["Obsidian Black", "Graphite Gray", "Deep Blue", "Titanium Silver"],
  "AUX Gangsini 6X9": ["Pearl White", "Titanium Silver", "Signal Red", "Obsidian Black"],
  "AUX Junior VXR": ["Racing Blue", "Obsidian Black", "Titanium Silver", "Pearl White"],
  "AUX Ravento": ["Racing Green", "Obsidian Black", "Titanium Silver", "Pearl White"],
  "AUX Salamaleko GIN": ["Deep Blue", "Obsidian Black", "Champagne Silver", "Pearl White"],
  "AUX Terrano X 24": ["Forest Green", "Titanium Silver", "Obsidian Black", "Pearl White"],
  "AUX Torvado": ["Obsidian Black", "Champagne Silver", "Deep Blue", "Pearl White"],
  "AUX Veltrix": ["Graphite Gray", "Deep Blue", "Obsidian Black", "Titanium Silver"],
  "AUX Vento GTI 24": ["Signal Orange", "Signal Red", "Pearl White", "Obsidian Black"],
  "AUX Veyronis": ["Pearl White", "Deep Blue", "Obsidian Black", "Titanium Silver"],
  "AUX Vallahalla": ["Champagne Silver", "Forest Green", "Obsidian Black", "Pearl White"],
  "AUX Zenvora": ["Deep Blue", "Pearl White", "Titanium Silver", "Obsidian Black"]
};

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
    colors: vehicleColorPalettes[name],
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
  "Champagne Silver": "#c9b994",
  "Signal Orange": "#d66a1f",
  "Signal Yellow": "#f0bd19",
  "Racing Blue": "#1d5c83",
  "Racing Green": "#16833d",
  "Sage Mist": "#d7dfd7"
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
const vehicleCanvas = document.querySelector("#vehicleCanvas");
const modelLoading = document.querySelector("#modelLoading");
const modelFallback = document.querySelector("#modelFallback");
const modelViewerTitle = document.querySelector("#modelViewerTitle");
const resetCamera = document.querySelector("#resetCamera");
const toggleAutoRotate = document.querySelector("#toggleAutoRotate");
const toggleCamera = document.querySelector("#toggleCamera");
const freeCameraCursor = document.querySelector("#freeCameraCursor");
const requestModal = document.querySelector("#requestModal");
const requestForm = document.querySelector("#requestForm");
const requestFormError = document.querySelector("#requestFormError");
const requestFormSuccess = document.querySelector("#requestFormSuccess");
let lastFocusedElement = null;
let navigationInProgress = false;
let navigationEndTimer;
let activeModel = null;
let modelLoadRequest = 0;
let threePromise;
let threeState = null;

function loadThree() {
  if (!threePromise) {
    threePromise = Promise.all([
      import("three"),
      import("three/addons/loaders/GLTFLoader.js"),
      import("three/addons/loaders/DRACOLoader.js"),
      import("three/addons/controls/OrbitControls.js")
    ]);
  }
  return threePromise;
}

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
        <div class="metric"><span>Starting price</span><strong>${peso(vehicle.price)}</strong></div>
        <div class="metric"><span>Est. monthly</span><strong>${peso(vehicle.monthlyPayment)} / month</strong></div>
        <div class="metric"><span>Downpayment</span><strong>${peso(vehicle.downpayment)}</strong></div>
      </div>
      <div class="detail-section colors">
        <div class="detail-section-heading"><span>Available colors</span></div>
        <div class="swatches">
          ${vehicle.colors.map(color => `<i class="swatch" title="${color}" aria-label="${color}" style="background:${colorMap[color] || "#ccc"}"></i>`).join("")}
        </div>
      </div>
      <div class="detail-section">
        <div class="detail-section-heading"><span>Key specifications</span></div>
        <div class="spec-grid">
        <div class="spec"><span>Engine</span><strong>${vehicle.engine}</strong></div>
        <div class="spec"><span>Transmission</span><strong>${vehicle.transmission}</strong></div>
        <div class="spec"><span>Fuel</span><strong>${vehicle.fuel}</strong></div>
        <div class="spec"><span>Seating</span><strong>${vehicle.seats} Passengers</strong></div>
        </div>
      </div>
      <div class="detail-section features-list">
        <div class="detail-section-heading"><span>Included features</span></div>
        <div class="feature-chips">${vehicle.features.map(feature => `<span>${feature}</span>`).join("")}</div>
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
    grid.innerHTML = `<div class="empty-state"><div><p class="eyebrow">No results</p><h3>No AUX vehicles match your search.</h3><p>Try a different name or category, or clear the current filters.</p><button class="clear-search" type="button">Clear search</button></div></div>`;
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
      <button class="detail-button" type="button" data-id="${vehicle.id}" aria-expanded="${expandedIds.has(vehicle.id)}" aria-controls="details-${vehicle.id}">
        ${expandedIds.has(vehicle.id) ? "Hide Details" : "Details"}
      </button>
      <button class="model-button card-model-button" type="button" data-model-id="${vehicle.id}">3D Preview</button>
      <div class="details-panel" id="details-${vehicle.id}" aria-hidden="${!expandedIds.has(vehicle.id)}">${detailsMarkup(vehicle)}</div>
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
    if (event.target.closest(".clear-search")) {
      searchTerm = "";
      if (catalogSearch) catalogSearch.value = "";
      if (siteSearch) siteSearch.value = "";
      renderVehicles();
      catalogSearch?.focus();
      return;
    }
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
    grid.querySelector(`.detail-button[data-id="${id}"]`)?.focus();
  });
}

async function openModelViewer(id) {
  if (!modelOverlay || !vehicleCanvas) return;
  const vehicle = vehicles.find(item => item.id === id);
  if (!vehicle) return;

  activeModel = vehicle;
  const requestId = ++modelLoadRequest;
  modelViewerTitle.textContent = `${vehicle.name} 3D Preview`;
  modelLoading.classList.remove("hidden");
  modelOverlay.classList.add("open");
  modelOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("viewer-open");
  lastFocusedElement = document.activeElement;
  modelOverlay.focus();
  modelLoading.textContent = "Loading 3D model...";
  modelLoading.classList.remove("hidden");
  modelFallback.src = vehicle.image;
  modelFallback.alt = `${vehicle.name} preview`;
  modelFallback.classList.remove("hidden");

  if (requestId !== modelLoadRequest || activeModel !== vehicle || !modelOverlay.classList.contains("open")) return;

  try {
    const [THREE, { GLTFLoader }, { DRACOLoader }, { OrbitControls }] = await loadThree();
    if (requestId !== modelLoadRequest || activeModel !== vehicle) return;

    if (threeState) threeState.dispose();
    const renderer = new THREE.WebGLRenderer({ canvas: vehicleCanvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setAnimationLoop(() => threeState?.render());

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#10161d");
    scene.add(new THREE.HemisphereLight(0xdde8f2, 0x18212b, 2.4));
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.5);
    keyLight.position.set(5, 8, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 0.1;
    keyLight.shadow.camera.far = 30;
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(0x9fc5e8, 1.5);
    fillLight.position.set(-5, 3, -4);
    scene.add(fillLight);
    const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 1000);
    camera.position.set(3.5, 2.4, 4.8);
    camera.lookAt(0, 1, 0);
    const orbit = new OrbitControls(camera, vehicleCanvas);
    orbit.target.set(0, 1, 0);
    orbit.enableDamping = true;
    const freeLook = { active: false, rightMouseDown: false, yaw: 0, pitch: 0, lastX: null, lastY: null };
    const movement = { forward: false, backward: false, left: false, right: false, up: false };
    let previousTime = performance.now();
    const root = new THREE.Group();
    scene.add(root);
    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(14, 64),
      new THREE.MeshStandardMaterial({ color: 0x151d26, roughness: 0.82, metalness: 0.08 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2;
    floor.receiveShadow = true;
    scene.add(floor);
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://unpkg.com/three@0.170.0/examples/jsm/libs/draco/");
    loader.setDRACOLoader(dracoLoader);

    threeState = {
      renderer,
      scene,
      camera,
      orbit,
      freeLook,
      movement,
      root,
      floor,
      autoRotate: true,
      initialCameraPosition: new THREE.Vector3(),
      initialTarget: new THREE.Vector3(),
      initialRootRotation: Math.PI,
      resize() {
        const rect = vehicleCanvas.getBoundingClientRect();
        renderer.setSize(rect.width, rect.height, false);
        camera.aspect = rect.width / Math.max(rect.height, 1);
        camera.updateProjectionMatrix();
      },
      render() {
        this.resize();
        if (this.autoRotate) root.rotation.y += 0.004;
        if (orbit.enabled) orbit.update();
        if (freeLook.active) {
          const now = performance.now();
          const delta = Math.min((now - previousTime) / 1000, 0.05);
          const direction = new THREE.Vector3(
            Number(movement.right) - Number(movement.left),
            Number(movement.up),
            Number(movement.backward) - Number(movement.forward)
          );
          if (direction.lengthSq()) {
            direction.normalize();
            const forward = camera.getWorldDirection(new THREE.Vector3());
            const right = new THREE.Vector3().crossVectors(forward, camera.up).normalize();
            camera.position.addScaledVector(forward, direction.z * -3 * delta);
            camera.position.addScaledVector(right, direction.x * 3 * delta);
            camera.position.y += direction.y * 3 * delta;
          }
          previousTime = now;
        } else previousTime = performance.now();
        renderer.render(scene, camera);
      },
      resetView() {
        camera.position.copy(this.initialCameraPosition);
        orbit.target.copy(this.initialTarget);
        orbit.update();
        root.rotation.y = this.initialRootRotation;
      },
      dispose() {
        renderer.setAnimationLoop(null);
        orbit.dispose();
        dracoLoader.dispose();
        root.traverse(object => {
          if (!object.isMesh) return;
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach(material => {
            Object.values(material).forEach(value => value?.isTexture && value.dispose());
            material.dispose();
          });
        });
        renderer.dispose();
        floor.geometry.dispose();
        floor.material.dispose();
        threeState = null;
      }
    };

    loader.load(vehicle.model, gltf => {
      if (requestId !== modelLoadRequest || activeModel !== vehicle || !threeState) return;
      root.add(gltf.scene);
      const bounds = new THREE.Box3().setFromObject(root);
      const center = bounds.getCenter(new THREE.Vector3());
      const size = bounds.getSize(new THREE.Vector3());
      const maxDimension = Math.max(size.x, size.y, size.z);
      const modelScale = 4 / Math.max(maxDimension, 0.001);
      gltf.scene.scale.setScalar(modelScale);
      const scaledBounds = new THREE.Box3().setFromObject(root);
      const scaledCenter = scaledBounds.getCenter(new THREE.Vector3());
      const scaledSize = scaledBounds.getSize(new THREE.Vector3());
      const scaledMaxDimension = Math.max(scaledSize.x, scaledSize.y, scaledSize.z);
      root.position.sub(scaledCenter);
      const centeredBounds = new THREE.Box3().setFromObject(root);
      root.position.y += -1.9 - centeredBounds.min.y;
      const fittedBounds = new THREE.Box3().setFromObject(root);
      const fittedCenter = fittedBounds.getCenter(new THREE.Vector3());
      const viewHeight = fittedCenter.y;
      const distance = Math.max(scaledMaxDimension * 2.2, 5);
      const target = new THREE.Vector3(0, viewHeight - 0.15, 0);
      camera.position.set(
        distance * 0.38,
        viewHeight + Math.max(scaledMaxDimension * 0.7, 1.8),
        distance * 0.95
      );
      camera.lookAt(target);
      orbit.target.copy(target);
      root.rotation.y = threeState.initialRootRotation;
      threeState.initialCameraPosition.copy(camera.position);
      threeState.initialTarget.copy(orbit.target);
      root.traverse(object => {
        if (object.isMesh) {
          object.castShadow = true;
          object.receiveShadow = true;
        }
      });
      modelFallback.classList.add("hidden");
      modelLoading.classList.add("hidden");
      threeState.resize();
    }, undefined, error => {
      modelLoading.textContent = "Unable to load this 3D model. Please reload and try again.";
      modelLoading.classList.remove("hidden");
      console.error("3D model loading failed:", error);
    });
  } catch (error) {
    modelLoading.textContent = "The 3D viewer could not be loaded. Check your internet connection and reload the page.";
    console.error("3D viewer unavailable:", error);
    return;
  }

  toggleAutoRotate.textContent = "Auto Rotate: On";
  toggleCamera.textContent = "Free Camera: Off";
}

function closeModelViewer() {
  if (!modelOverlay || !vehicleCanvas) return;
  modelOverlay.classList.remove("open");
  modelOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("viewer-open");
  modelLoadRequest += 1;
  if (threeState) threeState.dispose();
  modelFallback.classList.add("hidden");
  freeCameraCursor?.classList.remove("visible");
  activeModel = null;
  lastFocusedElement?.focus();
  lastFocusedElement = null;
}

if (toggleAutoRotate) {
  toggleAutoRotate.addEventListener("click", () => {
    if (!threeState) return;
    const enabled = threeState.autoRotate;
    threeState.autoRotate = !enabled;
    toggleAutoRotate.textContent = `Auto Rotate: ${enabled ? "Off" : "On"}`;
  });
}

resetCamera?.addEventListener("click", () => {
  threeState?.resetView();
});

toggleCamera?.addEventListener("click", () => {
  if (!threeState) return;
  const freeCameraEnabled = !threeState.orbit.enabled;
  if (freeCameraEnabled) {
    threeState.freeLook.active = false;
    threeState.orbit.enabled = true;
    threeState.autoRotate = true;
    threeState.resetView();
    toggleCamera.textContent = "Free Camera: Off";
    toggleAutoRotate.textContent = "Auto Rotate: On";
  } else {
    threeState.orbit.enabled = false;
    threeState.autoRotate = false;
    toggleCamera.textContent = "Free Camera: On";
    toggleAutoRotate.textContent = "Auto Rotate: Off";
    threeState.freeLook.active = true;
    threeState.freeLook.yaw = threeState.camera.rotation.y;
    threeState.freeLook.pitch = threeState.camera.rotation.x;
    threeState.freeLook.rightMouseDown = false;
    threeState.freeLook.lastX = null;
    threeState.freeLook.lastY = null;
  }
  vehicleCanvas.classList.toggle("fly-mode", !freeCameraEnabled);
});

const movementKeyNames = { w: "forward", s: "backward", a: "left", d: "right", " ": "up", arrowup: "forward", arrowdown: "backward", arrowleft: "left", arrowright: "right" };
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    if (modelOverlay?.classList.contains("open")) closeModelViewer();
    else if (searchDrawer?.classList.contains("open")) closeSearchDrawer();
    else if (mobilePanel?.classList.contains("open")) {
      mobilePanel.classList.remove("open");
      mobilePanel.setAttribute("aria-hidden", "true");
      document.querySelector("#menuButton")?.setAttribute("aria-expanded", "false");
      document.querySelector("#menuButton")?.focus();
    }
    return;
  }
  if (!threeState || threeState.orbit.enabled) return;
  const key = movementKeyNames[event.key.toLowerCase()];
  if (key) { event.preventDefault(); threeState.movement[key] = true; }
});
document.addEventListener("keyup", event => {
  if (!threeState) return;
  const key = movementKeyNames[event.key.toLowerCase()];
  if (key) threeState.movement[key] = false;
});
vehicleCanvas?.addEventListener("pointermove", event => {
  if (!threeState || !threeState.freeLook.active || !threeState.freeLook.rightMouseDown) return;
  const look = threeState.freeLook;
  if (look.lastX === null || look.lastY === null) {
    look.lastX = event.clientX;
    look.lastY = event.clientY;
    return;
  }
  look.yaw -= (event.clientX - look.lastX) * 0.003;
  look.pitch -= (event.clientY - look.lastY) * 0.003;
  look.pitch = Math.max(-Math.PI / 2 + 0.05, Math.min(Math.PI / 2 - 0.05, look.pitch));
  look.lastX = event.clientX;
  look.lastY = event.clientY;
  threeState.camera.rotation.set(look.pitch, look.yaw, 0, "YXZ");
});

vehicleCanvas?.addEventListener("pointerdown", event => {
  if (!threeState?.freeLook.active || event.button !== 2) return;
  event.preventDefault();
  threeState.freeLook.rightMouseDown = true;
  threeState.freeLook.lastX = event.clientX;
  threeState.freeLook.lastY = event.clientY;
  freeCameraCursor?.classList.add("visible");
  if (freeCameraCursor) {
    freeCameraCursor.style.left = `${event.clientX}px`;
    freeCameraCursor.style.top = `${event.clientY}px`;
  }
  vehicleCanvas.setPointerCapture(event.pointerId);
});

vehicleCanvas?.addEventListener("pointerup", event => {
  if (event.button !== 2 || !threeState) return;
  threeState.freeLook.rightMouseDown = false;
  threeState.freeLook.lastX = null;
  threeState.freeLook.lastY = null;
  freeCameraCursor?.classList.remove("visible");
  if (vehicleCanvas.hasPointerCapture(event.pointerId)) {
    vehicleCanvas.releasePointerCapture(event.pointerId);
  }
});

vehicleCanvas?.addEventListener("pointercancel", event => {
  if (!threeState) return;
  threeState.freeLook.rightMouseDown = false;
  freeCameraCursor?.classList.remove("visible");
  if (vehicleCanvas.hasPointerCapture(event.pointerId)) {
    vehicleCanvas.releasePointerCapture(event.pointerId);
  }
});

window.addEventListener("blur", () => {
  if (!threeState) return;
  Object.keys(threeState.movement).forEach(key => {
    threeState.movement[key] = false;
  });
  threeState.freeLook.rightMouseDown = false;
  threeState.freeLook.lastX = null;
  threeState.freeLook.lastY = null;
  freeCameraCursor?.classList.remove("visible");
});

vehicleCanvas?.addEventListener("contextmenu", event => {
  if (threeState && !threeState.orbit.enabled) event.preventDefault();
});

document.querySelector("#closeModelViewer")?.addEventListener("click", closeModelViewer);

if (catalogSearch) {
  catalogSearch.addEventListener("input", event => {
    searchTerm = event.target.value;
    if (siteSearch) siteSearch.value = searchTerm;
    renderVehicles();
  });
}

if (siteSearch) {
  siteSearch.addEventListener("input", event => {
    searchTerm = event.target.value;
    if (catalogSearch) catalogSearch.value = searchTerm;
    renderVehicles();
    if (!grid && document.querySelector("#vehicles")) {
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

document.querySelector("#openSearch")?.addEventListener("click", openSearchDrawer);
document.querySelector("#mobileSearch")?.addEventListener("click", () => {
  mobilePanel.classList.remove("open");
  mobilePanel.setAttribute("aria-hidden", "true");
  document.querySelector("#menuButton")?.setAttribute("aria-expanded", "false");
  openSearchDrawer();
});
document.querySelector("#closeSearch")?.addEventListener("click", closeSearchDrawer);

document.querySelector("#menuButton")?.addEventListener("click", event => {
  const isOpen = mobilePanel.classList.toggle("open");
  mobilePanel.setAttribute("aria-hidden", String(!isOpen));
  event.currentTarget.setAttribute("aria-expanded", String(isOpen));
  if (isOpen) document.querySelector("#closeMenu")?.focus();
});

document.querySelector("#closeMenu")?.addEventListener("click", () => {
  mobilePanel.classList.remove("open");
  mobilePanel.setAttribute("aria-hidden", "true");
  document.querySelector("#menuButton")?.setAttribute("aria-expanded", "false");
  document.querySelector("#menuButton")?.focus();
});

document.querySelectorAll(".mobile-panel a").forEach(link => {
  link.addEventListener("click", () => {
    mobilePanel.classList.remove("open");
    mobilePanel.setAttribute("aria-hidden", "true");
    document.querySelector("#menuButton").setAttribute("aria-expanded", "false");
    document.querySelector("#menuButton")?.focus();
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
  requestInfo.addEventListener("click", () => {
    lastFocusedElement = document.activeElement;
    requestModal?.classList.add("open");
    requestModal?.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    requestFormError.textContent = "";
    requestFormSuccess.textContent = "";
    setTimeout(() => document.querySelector("#requestName")?.focus(), 50);
  });
}

function closeRequestModal() {
  if (!requestModal) return;
  requestModal.classList.remove("open");
  requestModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  lastFocusedElement?.focus();
  lastFocusedElement = null;
}

document.querySelector("#closeRequestModal")?.addEventListener("click", closeRequestModal);
requestModal?.addEventListener("click", event => {
  if (event.target === requestModal) closeRequestModal();
});
requestForm?.addEventListener("submit", event => {
  event.preventDefault();
  if (!requestForm.checkValidity()) {
    requestFormError.textContent = "Please enter your name and a valid email address.";
    requestForm.reportValidity();
    return;
  }
  requestFormError.textContent = "";
  requestFormSuccess.textContent = "Thank you — your request has been received. We’ll be in touch soon.";
  requestForm.reset();
  requestFormSuccess.focus();
});

window.addEventListener("scroll", () => {
  document.querySelector("#siteHeader").classList.toggle("scrolled", window.scrollY > 24);
  if (!navigationInProgress) updateActiveNav();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeSearchDrawer();
    mobilePanel.classList.remove("open");
    if (modelOverlay?.classList.contains("open")) closeModelViewer();
    else if (requestModal?.classList.contains("open")) closeRequestModal();
  }
});

renderVehicles();
updateActiveNav();
