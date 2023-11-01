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

var t1 = gsap.timeline();

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

var elemets = document.querySelectorAll(".page1-elem");
var cursor = document.querySelectorAll(".cursor");
console.log(cursor);

elemets.forEach(function (elem, index) {
  elem.addEventListener("mousemove", function (dets) {
    if (index === 0) {
      cursor[index].style.opacity = 1;
      cursor[index].style.left = dets.x + "px";
      cursor[index].style.top = dets.y - 200 + "px";
    } else if (index === 1) {
      cursor[index].style.opacity = 1;
      cursor[index].style.left = dets.x - 320 + "px";
      cursor[index].style.top = dets.y - 200 + "px";
    } else if (index === 2) {
      cursor[index].style.opacity = 1;
      cursor[index].style.left = dets.x - 630 + "px";
      cursor[index].style.top = dets.y - 200 + "px";
    } else if (index === 3) {
      cursor[index].style.opacity = 1;
      cursor[index].style.left = dets.x - 940 + "px";
      cursor[index].style.top = dets.y - 200 + "px";
    }
  });

  elem.addEventListener("mouseleave", function (dets) {
    cursor[index].style.opacity = 0;
  });
});
