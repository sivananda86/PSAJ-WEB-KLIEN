/* ================= SCROLL ANIMATION ================= */
const items = document.querySelectorAll(".fade-up");

function showOnScroll() {
  const trigger = window.innerHeight * 0.85;

  items.forEach((item, index) => {
    const top = item.getBoundingClientRect().top;

    if (top < trigger) {
      setTimeout(() => item.classList.add("show"), index * 120);
    }
  });
}

window.addEventListener("scroll", showOnScroll);
window.addEventListener("load", showOnScroll);

/* ================= BUTTON HOVER ================= */
document.querySelectorAll(".btn-primary, .btn-outline").forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    btn.style.transform = "translateY(-1px)";
    btn.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translateY(0)";
    btn.style.boxShadow = "none";
  });
});

/* ================= STORY SYSTEM ================= */
document.addEventListener("DOMContentLoaded", () => {
  const stories = {
    seragam: {
      title: "Produksi Seragam",
      images: ["assets/1.png", "assets/2.png", "assets/3.png"],
    },
    apparel: {
      title: "Custom Apparel",
      images: ["assets/2.png", "assets/3.png"],
    },
    massal: {
      title: "Produksi Massal",
      images: ["assets/3.png", "assets/4.png"],
    },
    sample: {
      title: "Sample & Development",
      images: ["assets/4.png", "assets/1.png"],
    },
  };

  const storyItems = document.querySelectorAll(".services__item");
  const modal = document.getElementById("storyModal");
  if (!modal) return;

  const frame = document.querySelector(".story-frame");
  const storyImg = document.getElementById("storyImage");
  const storyTitle = document.getElementById("storyTitle");
  const progress = document.getElementById("storyProgress");
  const closeBtn = document.getElementById("closeStory");

  const prevBtn = document.querySelector(".story-arrow.left");
  const nextBtn = document.querySelector(".story-arrow.right");

  let currentService = null;
  let currentIndex = 0;
  let timer = null;

  const DURATION = 20000;

  /* pause system */
  let startTime = 0;
  let remaining = DURATION;
  let paused = false;

  /* OPEN */
  storyItems.forEach((item) => {
    item.addEventListener("click", () => {
      currentService = item.dataset.service;
      if (!stories[currentService]) return;

      currentIndex = 0;
      modal.classList.add("active");
      playStory();
    });
  });

  /* PLAY */
  function playStory() {
    const data = stories[currentService];
    if (!data) return;

    if (currentIndex >= data.images.length) {
      closeStory();
      return;
    }

    storyTitle.textContent = data.title;
    storyImg.src = data.images[currentIndex];

    progress.style.transition = "none";
    progress.style.width = "0%";

    setTimeout(() => {
      progress.style.transition = `width ${DURATION}ms linear`;
      progress.style.width = "100%";
    }, 50);

    clearTimeout(timer);

    remaining = DURATION;
    startTime = Date.now();

    timer = setTimeout(nextSlide, remaining);
  }

  function nextSlide() {
    currentIndex++;
    playStory();
  }

  /* PAUSE ON HOVER */
  frame.addEventListener("mouseenter", () => {
    if (paused) return;
    paused = true;

    clearTimeout(timer);

    const elapsed = Date.now() - startTime;
    remaining -= elapsed;

    progress.style.transition = "none";
  });

  frame.addEventListener("mouseleave", () => {
    if (!paused) return;
    paused = false;

    startTime = Date.now();

    progress.style.transition = `width ${remaining}ms linear`;

    timer = setTimeout(nextSlide, remaining);
  });

  /* CLOSE */
  function closeStory() {
    modal.classList.remove("active");
    clearTimeout(timer);
    progress.style.width = "0%";
  }

  closeBtn.addEventListener("click", closeStory);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeStory();
  });

  /* NAVIGATION */
  prevBtn?.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      playStory();
    }
  });

  nextBtn?.addEventListener("click", () => {
    currentIndex++;
    playStory();
  });
});
