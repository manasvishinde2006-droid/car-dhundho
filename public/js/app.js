/* CAR DHUNDHO - shared script: header/footer, inventory, EMI, sign in, forms */
const $ = (s, r = document) => r.querySelector(s);
const NAV = [["index.html", "Home"], ["inventory.html", "Inventory"], ["dealers.html", "Dealer"], ["contact.html", "Contact"], ["support.html", "Health & Support"]];

/* ---------- DATA (price in lakh) ---------- */
const CARS = [
  { id: "tesla-model-s", name: "Tesla Model S", brand: "Tesla", year: 2022, fuel: "Electric", trans: "Automatic", km: 12000, price: 79, body: "Sedan", city: "Mumbai" },
  { id: "hyundai-creta", name: "Hyundai Creta SX", brand: "Hyundai", year: 2022, fuel: "Petrol", trans: "Automatic", km: 18000, price: 14.5, body: "SUV", city: "Thane" },
  { id: "mahindra-xuv700", name: "Mahindra XUV700", brand: "Mahindra", year: 2021, fuel: "Diesel", trans: "Manual", km: 28500, price: 18.75, body: "SUV", city: "Pune" },
  { id: "tata-nexon", name: "Tata Nexon XZ+", brand: "Tata", year: 2022, fuel: "Petrol", trans: "Automatic", km: 21000, price: 11.4, body: "SUV", city: "Thane" },
  { id: "maruti-swift", name: "Maruti Suzuki Swift VXI", brand: "Maruti Suzuki", year: 2022, fuel: "Petrol", trans: "Manual", km: 16500, price: 7.25, body: "Hatchback", city: "Mumbai" },
  { id: "toyota-innova", name: "Toyota Innova Crysta", brand: "Toyota", year: 2021, fuel: "Diesel", trans: "Automatic", km: 35000, price: 22.9, body: "MPV", city: "Pune" },
  { id: "mahindra-thar", name: "Mahindra Thar", brand: "Mahindra", year: 2022, fuel: "Diesel", trans: "Manual", km: 20500, price: 16.9, body: "SUV", city: "Pune" },
  { id: "skoda-kushaq", name: "Skoda Kushaq", brand: "Skoda", year: 2022, fuel: "Petrol", trans: "Automatic", km: 19000, price: 19.5, body: "SUV", city: "Mumbai" },
  { id: "vw-taigun", name: "Volkswagen Taigun", brand: "Volkswagen", year: 2022, fuel: "Petrol", trans: "Automatic", km: 22000, price: 18.2, body: "SUV", city: "Thane" },
  { id: "mercedes-c-class", name: "Mercedes-Benz C-Class", brand: "Mercedes-Benz", year: 2020, fuel: "Diesel", trans: "Automatic", km: 32000, price: 38.5, body: "Sedan", city: "Mumbai" },
  { id: "honda-city", name: "Honda City ZX", brand: "Honda", year: 2021, fuel: "Petrol", trans: "Manual", km: 24000, price: 10.8, body: "Sedan", city: "Navi Mumbai" },
  { id: "kia-sonet", name: "Kia Sonet HTX", brand: "Kia", year: 2023, fuel: "Petrol", trans: "Automatic", km: 9000, price: 12.9, body: "SUV", city: "Mumbai" }
];
const DEALERS = [
  ["Prime Auto Gallery", "Andheri, Mumbai", "Premium used cars & luxury vehicles", 4.8, "9930247582"],
  ["Royal Wheels", "Borivali, Mumbai", "Certified pre-owned cars", 4.7, "9856482046"],
  ["Metro Motors", "Thane, Maharashtra", "Popular hatchbacks, sedans & SUVs", 4.6, "8896537702"],
  ["Elite Cars Hub", "Vashi, Navi Mumbai", "Premium and executive vehicles", 4.8, "8097646892"],
  ["Highway Auto Point", "Pune, Maharashtra", "Wide range of affordable used cars", 4.5, ""],
  ["Velocity Motors", "Chembur, Mumbai", "Sports and performance cars", 4.6, ""]
];
const inr = lakh => "₹" + Math.round(lakh * 1e5).toLocaleString("en-IN");

/* ---------- HEADER / FOOTER ---------- */
const page = location.pathname.split("/").pop() || "index.html";
const CARICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 17H3v-5l2-5h14l2 5v5h-2"/><circle cx="7.5" cy="17" r="2"/><circle cx="16.5" cy="17" r="2"/><path d="M3 12h18"/></svg>';
$("#site-header").innerHTML = `<header class="site-header"><div class="container bar">
 <a class="logo" href="index.html"><span class="logo-i">${CARICON}</span>Car<b>Dhundho</b></a>
 <nav>${NAV.map(([h, t]) => `<a href="${h}" class="${h === page ? "on" : ""}">${t}</a>`).join("")}</nav>
 <button class="btn sm" id="authBtn"></button><button class="burger" aria-label="Menu">☰</button></div></header>`;
$("#site-footer").innerHTML = `<footer><div class="container"><div class="foot">
 <div><a class="logo" href="index.html"><span class="logo-i">${CARICON}</span>Car<b>Dhundho</b></a><p style="margin-top:12px;max-width:300px">Find the car. Drive the dream.</p></div>
 <div><h4>Quick links</h4>${NAV.map(([h, t]) => `<a href="${h}">${t}</a>`).join("")}</div>
 <div><h4>Contact</h4><a href="tel:9833327478">+91 9833327478</a><a href="contact.html">Send an enquiry</a></div></div>
 <p class="copy">© 2026 Car Dhundho. All rights reserved. Car photos via Wikipedia / Wikimedia Commons.</p></div></footer>`;
$(".burger").onclick = () => $(".site-header").classList.toggle("open");

/* ---------- MODAL ---------- */
function openModal(html) {
  const bg = document.createElement("div");
  bg.className = "modal-bg";
  bg.innerHTML = `<div class="modal"><button class="x" aria-label="Close">&times;</button>${html}</div>`;
  const close = () => { bg.remove(); document.removeEventListener("keydown", esc); };
  const esc = e => { if (e.key === "Escape") close(); };
  bg.onclick = e => { if (e.target === bg) close(); };
  bg.querySelector(".x").onclick = close;
  document.addEventListener("keydown", esc);
  document.body.appendChild(bg);
  bg.close = close;
  return bg;
}

/* ---------- EMI CALCULATOR ---------- */
function openEMI(price) {
  const m = openModal(`<h2>EMI Calculator</h2><p class="sub">Estimate your monthly payment</p>
   <label>Car price (₹)<input id="ePrice" type="number" value="${price || ""}" placeholder="e.g. 1450000"></label>
   <label>Down payment (₹)<input id="eDown" type="number" value="${price ? Math.round(price * 0.2) : ""}" placeholder="e.g. 300000"></label>
   <label>Interest rate (% per year)<input id="eRate" type="number" step="0.1" value="9.5"></label>
   <label>Tenure<select id="eYears">${[1, 2, 3, 4, 5, 6, 7].map(y => `<option value="${y}" ${y == 5 ? "selected" : ""}>${y} year${y > 1 ? "s" : ""}</option>`).join("")}</select></label>
   <button class="btn full" id="eGo">Calculate EMI</button><div class="emi-out" id="eOut"></div>`);
  m.querySelector("#eGo").onclick = () => {
    const price = +$("#ePrice", m).value, down = +$("#eDown", m).value, rate = +$("#eRate", m).value, n = +$("#eYears", m).value * 12;
    const out = $("#eOut", m); out.classList.add("show");
    if (!(price > 0) || down < 0 || down >= price || rate < 0) { out.innerHTML = "<p>Please enter a valid price, a smaller down payment and a valid rate.</p>"; return; }
    const loan = price - down, r = rate / 1200;
    const emi = r === 0 ? loan / n : loan * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    const f = v => "₹" + Math.round(v).toLocaleString("en-IN");
    out.innerHTML = `<small>Monthly EMI</small><big>${f(emi)}</big><p>Loan amount <b>${f(loan)}</b></p><p>Total interest <b>${f(emi * n - loan)}</b></p><p>Total payment <b>${f(emi * n)}</b></p>`;
  };
}
document.addEventListener("click", e => {
  const b = e.target.closest("[data-emi]");
  if (b) openEMI(Number(b.dataset.emi) || 0);
});

/* ---------- API (falls back to browser-only demo mode if the server is not running) ---------- */
async function hash(s) {
  try { const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s)); return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, "0")).join(""); }
  catch (e) { return btoa(s); }
}
const store = (k, v) => v === undefined ? JSON.parse(localStorage.getItem(k) || "[]") : localStorage.setItem(k, JSON.stringify(v));
async function demo(url, b) {
  const fail = message => ({ ok: false, data: { message } });
  if (url === "/api/enquiry") { const l = store("cd_enquiries"); l.push({ ...b, at: Date.now() }); store("cd_enquiries", l); return { ok: true, data: { message: "Thank you! Your message has been received (demo mode: saved in this browser)." } }; }
  const users = store("cd_users"), email = (b.email || "").trim().toLowerCase(), pw = await hash(b.password || "");
  if (url === "/api/signup") {
    if (!b.name || !email || (b.password || "").length < 6) return fail("Enter your name, email and a password of at least 6 characters.");
    if (users.find(u => u.email === email)) return fail("An account with this email already exists.");
    users.push({ name: b.name.trim(), email, pw }); store("cd_users", users);
    return { ok: true, data: { message: "Account created! You are now signed in (demo mode).", user: { name: b.name.trim(), email } } };
  }
  const u = users.find(u => u.email === email && u.pw === pw);
  return u ? { ok: true, data: { message: "Signed in successfully! (demo mode)", user: { name: u.name, email } } } : fail("Incorrect email or password.");
}
async function api(url, body) {
  try {
    const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (r.status === 404 || r.status === 405) return demo(url, body);
    return { ok: r.ok, data: await r.json().catch(() => ({})) };
  } catch (e) { return demo(url, body); }
}

/* ---------- SIGN IN / SIGN UP ---------- */
const user = () => { try { return JSON.parse(localStorage.getItem("cd_user")); } catch (e) { return null; } };
function paintAuth() { const u = user(); $("#authBtn").innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="width:16px;height:16px;margin-right:8px"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>' + (u ? "Hi, " + u.name.split(" ")[0] + " (Sign out)" : "Sign In"); }
function openAuth() {
  const m = openModal(`<div class="tabs"><button class="on" data-t="in">SIGN IN</button><button data-t="up">SIGN UP</button></div>
   <form id="aIn"><h2>Welcome back</h2><p class="sub">Sign in to your Car Dhundho account</p>
    <label>Email<input name="email" type="email" required></label><label>Password<input name="password" type="password" required></label><button class="btn full">Sign In</button></form>
   <form id="aUp" hidden><h2>Create account</h2><p class="sub">Join Car Dhundho today</p>
    <label>Full name<input name="name" required></label><label>Email<input name="email" type="email" required></label>
    <label>Password (min 6 characters)<input name="password" type="password" minlength="6" required></label><button class="btn full">Sign Up</button></form>
   <p class="form-msg" id="aMsg"></p>`);
  const tabs = m.querySelectorAll(".tabs button");
  tabs.forEach(t => t.addEventListener("click", () => {
    tabs.forEach(x => x.classList.toggle("on", x === t));
    $("#aIn", m).hidden = t.dataset.t !== "in"; $("#aUp", m).hidden = t.dataset.t !== "up"; $("#aMsg", m).textContent = "";
  }));
  [["#aIn", "/api/signin"], ["#aUp", "/api/signup"]].forEach(([sel, url]) => {
    $(sel, m).addEventListener("submit", async e => {
      e.preventDefault();
      const msg = $("#aMsg", m); msg.className = "form-msg"; msg.textContent = "Please wait...";
      const r = await api(url, Object.fromEntries(new FormData(e.target)));
      if (!r.ok) { msg.className = "form-msg err"; msg.textContent = r.data.message || "Something went wrong."; return; }
      localStorage.setItem("cd_user", JSON.stringify(r.data.user));
      msg.textContent = r.data.message; paintAuth(); setTimeout(m.close, 1100);
    });
  });
}
$("#authBtn").onclick = () => {
  if (user()) { if (confirm("Do you want to sign out?")) { localStorage.removeItem("cd_user"); paintAuth(); } } else openAuth();
};
paintAuth();


/* ---------- REAL CAR PHOTOS ----------
   1) your own file  images/cars/<id>.jpg  (if you add one)
   2) otherwise the car's photo from Wikipedia / Wikimedia Commons
   3) otherwise the drawn placeholder stays */
const WIKI = { "tesla-model-s": "Tesla_Model_S", "hyundai-creta": "Hyundai_Creta", "mahindra-xuv700": "Mahindra_XUV700", "tata-nexon": "Tata_Nexon",
  "maruti-swift": "Suzuki_Swift", "toyota-innova": "Toyota_Innova", "mahindra-thar": "Mahindra_Thar", "skoda-kushaq": "Škoda_Kushaq",
  "vw-taigun": "Volkswagen_Taigun", "mercedes-c-class": "Mercedes-Benz_C-Class", "honda-city": "Honda_City", "kia-sonet": "Kia_Sonet" };
const canLoad = url => new Promise(res => { if (!url) return res(null); const i = new Image(); i.onload = () => res(url); i.onerror = () => res(null); i.src = url; });
async function wikiThumb(title) {
  const k = "cd_wp_" + title; let u = localStorage.getItem(k);
  if (u) return u;
  try {
    const r = await fetch("https://en.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(title));
    const d = await r.json(); u = d.thumbnail ? d.thumbnail.source : "";
    if (u) localStorage.setItem(k, u);
    return u;
  } catch (e) { return ""; }
}
function upgradePhotos() {
  document.querySelectorAll("img[data-car]:not([data-done])").forEach(async img => {
    img.dataset.done = 1;
    const id = img.dataset.car;
    let url = await canLoad("images/cars/" + id + ".jpg");
    if (!url) { const t = await wikiThumb(WIKI[id]); url = (await canLoad(t.replace(/\/\d+px-/, "/960px-"))) || (await canLoad(t)); }
    if (url) img.src = url;
  });
}

/* ---------- CAR CARDS ---------- */
const card = c => `<article class="car"><div class="car-img"><img src="images/cars/${c.id}.svg" data-car="${c.id}" alt="${c.name}"><span class="tag">${c.fuel}</span></div>
 <div class="car-body"><h3>${c.name}</h3><p class="sub">${c.brand} · ${c.body} · ${c.city}</p>
 <ul class="specs"><li><span>Year</span>${c.year}</li><li><span>Driven</span>${c.km.toLocaleString("en-IN")} km</li><li><span>Fuel</span>${c.fuel}</li><li><span>Transmission</span>${c.trans}</li></ul>
 <div class="car-foot"><strong>${inr(c.price)}</strong><div><button class="btn ghost sm" data-emi="${c.price * 1e5}">EMI</button><a class="btn sm" href="contact.html?car=${encodeURIComponent(c.name)}">Enquire</a></div></div></div></article>`;

document.querySelectorAll("[data-stat]").forEach(el => {
  el.textContent = el.dataset.stat === "cars" ? CARS.length : new Set(CARS.map(c => c.brand)).size;
});
if ($("#featured")) $("#featured").innerHTML = ["mahindra-xuv700", "hyundai-creta", "mahindra-thar"].map(id => card(CARS.find(c => c.id === id))).join("");
upgradePhotos();

/* ---------- INVENTORY FILTERS ---------- */
if ($("#cars")) {
  const fill = (id, key) => [...new Set(CARS.map(c => c[key]))].sort().forEach(v => $(id).insertAdjacentHTML("beforeend", `<option>${v}</option>`));
  fill("#fBrand", "brand"); fill("#fFuel", "fuel"); fill("#fBody", "body");
  const draw = () => {
    const q = $("#q").value.trim().toLowerCase(), [lo, hi] = ($("#fBudget").value || "0-99999").split("-").map(Number);
    let list = CARS.filter(c => (!q || c.name.toLowerCase().includes(q)) && (!$("#fBrand").value || c.brand === $("#fBrand").value) &&
      (!$("#fFuel").value || c.fuel === $("#fFuel").value) && (!$("#fBody").value || c.body === $("#fBody").value) && c.price >= lo && c.price < hi);
    if ($("#fSort").value) list.sort((a, b) => $("#fSort").value === "lo" ? a.price - b.price : b.price - a.price);
    $("#count").textContent = list.length + (list.length === 1 ? " car found" : " cars found");
    $("#cars").innerHTML = list.length ? list.map(card).join("") : '<p class="lead">No cars match these filters.</p>';
    upgradePhotos();
  };
  ["#q", "#fBrand", "#fFuel", "#fBody", "#fBudget", "#fSort"].forEach(s => $(s).addEventListener("input", draw));
  $("#fReset").onclick = () => { ["#q", "#fBrand", "#fFuel", "#fBody", "#fBudget", "#fSort"].forEach(s => $(s).value = ""); draw(); };
  draw();
}

/* ---------- DEALERS ---------- */
if ($("#dealerList")) $("#dealerList").innerHTML = DEALERS.map(([n, loc, d, r, ph]) => `<article class="dealer"><div class="d-top"><img class="d-logo" src="images/dealers/${n.toLowerCase().replace(/[^a-z]+/g,"-")}.svg" alt="${n} logo"><div><span class="v">✓ VERIFIED DEALER</span><h3>${n}</h3></div></div><p>📍 ${loc}</p><p>${d}</p><p>★ ${r} rating</p>
 <div class="acts">${ph ? `<a class="btn ghost sm" href="tel:${ph}">Call +91 ${ph}</a>` : ""}<a class="btn sm" href="contact.html?dealer=${encodeURIComponent(n)}">Enquire</a></div></article>`).join("");

/* ---------- ENQUIRY FORMS ---------- */
document.querySelectorAll("form[data-enquiry]").forEach(f => {
  const p = new URLSearchParams(location.search), t = f.querySelector("textarea");
  if (t && p.get("car")) t.value = "I am interested in the " + p.get("car") + ". Please share more details.";
  if (t && p.get("dealer")) t.value = "I would like to get in touch with " + p.get("dealer") + ".";
  f.addEventListener("submit", async e => {
    e.preventDefault();
    const msg = f.querySelector(".form-msg"); msg.className = "form-msg"; msg.textContent = "Sending...";
    const r = await api("/api/enquiry", Object.fromEntries(new FormData(f)));
    msg.className = "form-msg" + (r.ok ? "" : " err");
    msg.textContent = r.data.message || (r.ok ? "Sent!" : "Something went wrong.");
    if (r.ok) f.reset();
  });
});
