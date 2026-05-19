// ===== LOADER =====
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loader").classList.add("hidden");
  }, 1800);
});

// ===== PARTICLES =====
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let W, H, particles = [];

function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", () => { resize(); initParticles(); });

function Particle() {
  this.x = Math.random() * W;
  this.y = Math.random() * H;
  this.r = Math.random() * 1.5 + 0.3;
  this.vx = (Math.random() - 0.5) * 0.3;
  this.vy = (Math.random() - 0.5) * 0.3;
  this.alpha = Math.random() * 0.5 + 0.1;
  this.color = Math.random() > 0.5 ? "#4f8cff" : "#a855f7";
}

function initParticles() {
  particles = [];
  const count = Math.min(Math.floor((W * H) / 12000), 80);
  for (let i = 0; i < count; i++) particles.push(new Particle());
}
initParticles();

function drawParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0) p.x = W;
    if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H;
    if (p.y > H) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.alpha;
    ctx.fill();
  });
  // Draw connections
  ctx.globalAlpha = 1;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.strokeStyle = "#4f8cff";
        ctx.globalAlpha = (1 - dist / 100) * 0.12;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(drawParticles);
}
drawParticles();

// ===== NAVBAR =====
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 30);
  document.getElementById("back-top").classList.toggle("show", window.scrollY > 400);
});

// ===== MOBILE MENU =====
document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("mobileMenu").classList.add("open");
});
document.getElementById("menuClose").addEventListener("click", closeMob);
function closeMob() {
  document.getElementById("mobileMenu").classList.remove("open");
}

// ===== TYPING ANIMATION =====
const lines = [
  "CSE Student | Frontend & PHP Developer",
  "Full Stack Web Developer",
  "Building Modern Web Experiences",
  "Open Source Enthusiast",
];
let li = 0, ci = 0, del = false;
const el = document.getElementById("typed-text");
function type() {
  const cur = lines[li];
  if (!del) {
    el.textContent = cur.slice(0, ci++);
    if (ci > cur.length) { del = true; setTimeout(type, 1800); return; }
  } else {
    el.textContent = cur.slice(0, ci--);
    if (ci < 0) { del = false; li = (li + 1) % lines.length; ci = 0; }
  }
  setTimeout(type, del ? 45 : 65);
}
setTimeout(type, 1000);

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add("visible"), i * 60);
      e.target.querySelectorAll(".skill-fill").forEach((bar) => {
        bar.style.width = bar.dataset.w + "%";
      });
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// ===== THEME TOGGLE =====
const toggle = document.getElementById("themeToggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  toggle.textContent = document.body.classList.contains("light") ? "🌙" : "☀️";
});

// ===== CONTACT FORM =====
function handleSubmit() {
  const n = document.getElementById("fname").value.trim();
  const e = document.getElementById("femail").value.trim();
  if (!n || !e) { showToast("Please fill in required fields!"); return; }
  showToast("Message sent! I'll get back to you soon ✨");
  ["fname", "femail", "fsubject", "fmessage"].forEach(
    (id) => (document.getElementById(id).value = "")
  );
}

// ===== TOAST =====
function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3200);
}
