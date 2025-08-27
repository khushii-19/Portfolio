// -----------------------------
// Typed text effect (roles)
// -----------------------------
const roles = [
  "AI Developer",
  "Full Stack Developer",
  "Automation Enthusiast",
  "ML Learner",
  "Open to Jobs & Internships"
];
const typedEl = document.getElementById('typed-line');
let rIndex = 0, chIndex = 0, typing = true;

function typeLoop() {
  const current = roles[rIndex];
  if (typing) {
    chIndex++;
    typedEl.textContent = current.slice(0, chIndex);
    if (chIndex === current.length) {
      typing = false;
      setTimeout(typeLoop, 900);
    } else setTimeout(typeLoop, 70);
  } else {
    chIndex--;
    typedEl.textContent = current.slice(0, chIndex);
    if (chIndex === 0) {
      typing = true;
      rIndex = (rIndex + 1) % roles.length;
      setTimeout(typeLoop, 200);
    } else setTimeout(typeLoop, 40);
  }
}
typeLoop();


// -----------------------------
// Simple particles canvas
// -----------------------------
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let W = canvas.width = innerWidth;
let H = canvas.height = innerHeight;
window.addEventListener('resize', () => { 
  W = canvas.width = innerWidth; 
  H = canvas.height = innerHeight; 
});

const particles = [];
const pCount = Math.floor((W*H)/90000); // density

function rand(min,max){ return Math.random()*(max-min)+min; }
for(let i=0;i<pCount;i++){
  particles.push({
    x: rand(0,W), y: rand(0,H),
    r: rand(0.6,2.2),
    vx: rand(-0.2,0.2), vy: rand(-0.15,0.15),
    alpha: rand(0.08,0.28)
  });
}
function drawParticles(){
  ctx.clearRect(0,0,W,H);
  for(const p of particles){
    p.x += p.vx; p.y += p.vy;
    if (p.x < -10) p.x = W + 10;
    if (p.x > W +10) p.x = -10;
    if (p.y < -10) p.y = H + 10;
    if (p.y > H +10) p.y = -10;
    ctx.beginPath();
    ctx.fillStyle = "rgba(255,255,255,"+p.alpha+")";
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fill();
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();


// -----------------------------
// Reveal on scroll (IntersectionObserver)
// -----------------------------
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add('visible');
  });
},{threshold:0.12});
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));


// -----------------------------
// Smooth scroll + Active highlight
// -----------------------------
const sections = document.querySelectorAll("section, header");
const navLinks = document.querySelectorAll(".nav-links a");

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({behavior:'smooth', block:'start'});
  });
});

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(sec => {
    const secTop = sec.offsetTop - 120;
    if (pageYOffset >= secTop) {
      current = sec.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});


// -----------------------------
// Card tilt effect (hover)
// -----------------------------
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width/2;
    const centerY = rect.height/2;
    const rotateX = ((y - centerY) / 20).toFixed(2);
    const rotateY = ((centerX - x) / 20).toFixed(2);
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });
});


// -----------------------------
// Gallery Lightbox
// -----------------------------
const galleryImgs = document.querySelectorAll(".gallery img");
const lightbox = document.createElement("div");
lightbox.id = "lightbox";
document.body.appendChild(lightbox);

galleryImgs.forEach(img => {
  img.addEventListener("click", () => {
    lightbox.classList.add("show");
    lightbox.innerHTML = `<img src="${img.src}" alt="">`;
  });
});
lightbox.addEventListener("click", () => {
  lightbox.classList.remove("show");
});


// -----------------------------
// Print resume button
// -----------------------------
document.getElementById('printBtn').addEventListener('click', () => window.print());


// -----------------------------
// Sticky Navbar
// -----------------------------
const nav = document.querySelector(".nav");
window.addEventListener("scroll", () => {
  if(window.scrollY > 20){
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
});
