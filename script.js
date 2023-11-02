function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
// loco();

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

let percent = document.querySelector(".percent");
let line = document.querySelector(".inner-line");
let num = 0;

var myInterval = setInterval(function () {
  if (num < 80) {
    num = num + Math.floor(Math.random() * 21);
    percent.innerHTML = num + "%";
    line.style.width = num + "%";
  } else {
    num = 100;
    percent.innerHTML = num + "%";
    line.style.width = num + "%";
    start();
    clearInterval(myInterval);
  }
}, 100);

var t1 = gsap.timeline();
function start() {
  t1.to(".loder", {
    top: "-100%",
    delay: 0.5,
    duration: 1,
    ease: "power1.inOut",
  });

  t1.from(
    ".page1",
    {
      opacity: 0,
      ease: "power1.inOut",
    },
    "a"
  );

  t1.from(
    ".page1-box",
    {
      scale: 0.9,
      ease: "power1.inOut",
    },
    "a"
  );

  t1.to(".nav-right>h3", {
    y: -50,
    ease: "power1.inOut",
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".nav-right>h3",
      scroller: "body",
      start: "top top",
      scrub: 1,
    },
  });

  t1.to(".menu", {
    opacity: 1,
    scrollTrigger: {
      trigger: ".menu",
      scroller: "body",
      start: "top -8%",
      scrub: 1,
    },
  });

  t1.from(".page3 > video", {
    width: "30%",
    scrollTrigger: {
      trigger: ".page3 > video",
      scroller: "body",
      start: "top 90%",
      end: "top 10%",
      scrub: 2,
      // markers: true,
    },
  });

  t1.to(".page5", {
    scrollTrigger: {
      trigger: ".page5",
      start: "50% 50%",
      // markers: true,
      pin: true,
    },
  });

  t1.to(".page5-top", {
    top: "-50%",
    scrollTrigger: {
      trigger: ".page5-top",
      start: "top top",
      // markers: true,
      scrub: 2,
    },
  });

  t1.to(".page5-top>h1", {
    bottom: "-10%",
    scrollTrigger: {
      trigger: ".page5-top",
      start: "top top",
      // markers: true,
      scrub: 2,
    },
  });

  t1.to(".page5-bottom", {
    bottom: "-50%",
    scrollTrigger: {
      trigger: ".page5-top",
      start: "top top",
      // markers: true,
      scrub: 2,
    },
  });

  t1.to(".page5-bottom>h1", {
    top: "-10%",
    scrollTrigger: {
      trigger: ".page5-top",
      start: "top top",
      // markers: true,
      scrub: 1,
    },
  });
}

var elemets = document.querySelectorAll(".page1-elem");
var cursor = document.querySelectorAll(".cursor");

elemets.forEach(function (elem, index) {
  elem.addEventListener("mousemove", function (dets) {
    if (index === 0) {
      cursor[index].style.opacity = 1;
      cursor[index].style.left = dets.x + "px";
      cursor[index].style.top = dets.y - 80 + "px";
    } else if (index === 1) {
      cursor[index].style.opacity = 1;
      cursor[index].style.left = dets.x - 320 + "px";
      cursor[index].style.top = dets.y - 80 + "px";
    } else if (index === 2) {
      cursor[index].style.opacity = 1;
      cursor[index].style.left = dets.x - 630 + "px";
      cursor[index].style.top = dets.y - 80 + "px";
    } else if (index === 3) {
      cursor[index].style.opacity = 1;
      cursor[index].style.left = dets.x - 940 + "px";
      cursor[index].style.top = dets.y - 80 + "px";
    }
  });

  elem.addEventListener("mouseleave", function (dets) {
    cursor[index].style.opacity = 0;
  });
});

let btn = document.querySelectorAll(".page4-btn");
let btnTop = document.querySelectorAll(".page4-btn > button:nth-child(2)");
let btnBottom = document.querySelectorAll(".page4-btn > button:nth-child(1)");

btn.forEach(function (elem, index) {
  elem.addEventListener("mouseenter", () => {
    btnTop[index].innerHTML = "";
    btnTop[index].style.padding = "0";
    btnTop[index].style.marginLeft = ".2vw";
    btnTop[index].style.height = "1.5vh";
    btnTop[index].style.width = "1.5vh";
    btnTop[index].style.boderRadius = "50%";
  });

  elem.addEventListener("mouseleave", () => {
    if (index == 4) {
      btnTop[index].innerHTML = "Contact us";
      btnTop[index].style.width = "12vh";
    } else {
      btnTop[index].innerHTML = "View case study";
      btnTop[index].style.width = "16vh";
    }
    btnTop[index].style.padding = ".6vw 0.5vw";
    btnTop[index].style.marginLeft = "0";
    btnTop[index].style.height = "2vh";
    btnTop[index].style.boderRadius = "2vw";
  });

  elem.addEventListener("mouseenter", () => {
    btnBottom[index].style.opacity = 1;
    btnBottom[index].style.width = "fit-content";
  });

  elem.addEventListener("mouseleave", () => {
    btnBottom[index].style.opacity = 0;
    btnBottom[index].style.width = "0%";
  });
});

var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  loop: true,
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
  },
});
