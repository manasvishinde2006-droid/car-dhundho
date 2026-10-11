/* Car Dhundho backend: sign up / sign in / enquiries + serves the site from /public */
const express = require("express"), cors = require("cors"), bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"), fs = require("fs"), path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET = process.env.JWT_SECRET || "change-this-secret-before-going-live";
const DATA = path.join(__dirname, "data");
const USERS = path.join(DATA, "users.json"), ENQ = path.join(DATA, "enquiries.json");

if (!fs.existsSync(DATA)) fs.mkdirSync(DATA);
[USERS, ENQ].forEach(f => { if (!fs.existsSync(f)) fs.writeFileSync(f, "[]"); });
const read = f => { try { return JSON.parse(fs.readFileSync(f, "utf8")); } catch (e) { return []; } };
const write = (f, d) => fs.writeFileSync(f, JSON.stringify(d, null, 2));
const okEmail = e => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
const token = u => jwt.sign({ id: u.id, email: u.email, name: u.name }, SECRET, { expiresIn: "7d" });

app.use(cors());
app.use(express.json());

app.post("/api/signup", async (req, res) => {
  const name = (req.body.name || "").trim(), email = (req.body.email || "").trim().toLowerCase(), pw = req.body.password || "";
  if (!name || !email || !pw) return res.status(400).json({ message: "Please fill in all the fields." });
  if (!okEmail(email)) return res.status(400).json({ message: "Please enter a valid email address." });
  if (pw.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters." });
  const users = read(USERS);
  if (users.find(u => u.email === email)) return res.status(409).json({ message: "An account with this email already exists." });
  const user = { id: Date.now(), name, email, password: await bcrypt.hash(pw, 10), createdAt: new Date().toISOString() };
  users.push(user); write(USERS, users);
  res.status(201).json({ message: "Account created! You are now signed in.", token: token(user), user: { name, email } });
});

app.post("/api/signin", async (req, res) => {
  const email = (req.body.email || "").trim().toLowerCase(), pw = req.body.password || "";
  const user = read(USERS).find(u => u.email === email);
  if (!user || !(await bcrypt.compare(pw, user.password))) return res.status(401).json({ message: "Incorrect email or password." });
  res.json({ message: "Signed in successfully!", token: token(user), user: { name: user.name, email } });
});

app.post("/api/enquiry", (req, res) => {
  const { name, phone, email, subject, message } = req.body;
  if (!name || !phone || !email || !message) return res.status(400).json({ message: "Please fill in all the fields." });
  if (!okEmail(email)) return res.status(400).json({ message: "Please enter a valid email address." });
  const list = read(ENQ);
  list.push({ id: Date.now(), name, phone, email, subject: subject || "", message, createdAt: new Date().toISOString() });
  write(ENQ, list);
  res.status(201).json({ message: "Thank you! Your message has been received. We will get back to you soon." });
});

app.use(express.static(path.join(__dirname, "public")));
app.listen(PORT, () => console.log("Car Dhundho running at http://localhost:" + PORT));
