// Animate skill bars
const skillProgress = document.querySelectorAll(".skill-progress");
const skillsSection = document.querySelector(".skills");

window.addEventListener("scroll", () => {
  const sectionPos = skillsSection.getBoundingClientRect().top;
  const screenPos = window.innerHeight;
  if (sectionPos < screenPos) {
    skillProgress.forEach((bar) => {
      bar.style.width = bar.dataset.width;
    });
  }
});

// ScrollReveal animations
ScrollReveal().reveal(".hero-text, .hero-img", {
  origin: "bottom",
  distance: "50px",
  duration: 1000,
  interval: 200,
});
ScrollReveal().reveal(".about-content", {
  origin: "left",
  distance: "50px",
  duration: 1000,
});
ScrollReveal().reveal(".skills-content", {
  origin: "right",
  distance: "50px",
  duration: 1000,
});
ScrollReveal().reveal(".work-card", {
  origin: "bottom",
  distance: "50px",
  duration: 1000,
  interval: 200,
});
ScrollReveal().reveal(".contact-form", {
  origin: "bottom",
  distance: "50px",
  duration: 1000,
});

// Smooth Scroll for nav links
document.querySelectorAll("header nav a").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    document
      .querySelector(this.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});
// Obfuscate phone number
  const part1 = "+91 ";      // Country code
  const part2 = "85330";     // First 5 digits
  const part3 = "62781";     // Last 5 digits

  // Combine and display
  document.getElementById("phone").innerText = part1 + part2 + part3;






  function openProject(url) {
  const viewer = document.getElementById('project-viewer');
  const iframe = document.getElementById('project-frame');
  iframe.src = url;        // Set the project URL
  viewer.style.display = 'block';  // Show iframe
  window.scrollTo({ top: viewer.offsetTop, behavior: 'smooth' }); // Scroll to iframe
}

function closeProject() {
  const viewer = document.getElementById('project-viewer');
  const iframe = document.getElementById('project-frame');
  iframe.src = '';         // Clear iframe
  viewer.style.display = 'none';  // Hide iframe
}


ScrollReveal().reveal('.skills', {
  duration: 1000,
  origin: 'left',
  distance: '50px',
  easing: 'ease-out',
  reset: false
});


ScrollReveal().reveal('.skill', {
  duration: 1000,
  origin: 'left',
  distance: '50px',
  easing: 'ease-out',
  reset: false
});


// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Scroll-to-top button
window.onscroll = function() {
  document.getElementById('toTop').classList.toggle('show', window.scrollY > 400);
};



// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Scroll-to-top button
window.onscroll = function() {
  document.getElementById('toTop').classList.toggle('show', window.scrollY > 400);
};



document.addEventListener("DOMContentLoaded", () => {
  const toTop = document.getElementById("toTop");

  // Show or hide the button when scrolling
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      toTop.classList.add("show");
    } else {
      toTop.classList.remove("show");
    }
  });

  // Scroll smoothly to top on click
  toTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});




const hamburger = document.getElementById("hamburger");
const nav = document.querySelector("header nav ul");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("active");
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});


ScrollReveal().reveal('.hero-text', { delay: 200, origin: 'left', distance: '50px' });
ScrollReveal().reveal('.hero-img', { delay: 400, origin: 'right', distance: '50px' });
ScrollReveal().reveal('.about-content', { delay: 200, origin: 'bottom', distance: '50px' });
ScrollReveal().reveal('.skills-content .skill', { interval: 200 });
ScrollReveal().reveal('.work-card', { interval: 200 });
ScrollReveal().reveal('.contact-form', { delay: 300 });



const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
});
