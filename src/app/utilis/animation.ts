import gsap from "gsap";

// Fade Up Animation
export const fadeUp = (element, options = {}) => {
  if (!element) return;
  gsap.fromTo(
    element,
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", ...options }
  );
};

// Fade In from Left
export const fadeLeft = (element, options = {}) => {
  if (!element) return;
  gsap.fromTo(
    element,
    { opacity: 0, x: -50 },
    { opacity: 1, x: 0, duration: 1.2, ease: "power3.out", ...options }
  );
};

// Text Wave Animation
export const waveText = (elements, options = {}) => {
  if (!elements || !elements.length) return;
  gsap.to(elements, {
    y: -8,
    duration: 0.5,
    ease: "power1.inOut",
    yoyo: true,
    repeat: -1,
     repeatDelay: 2,
    stagger: { each: 0.15},
    ...options,
  });
};
