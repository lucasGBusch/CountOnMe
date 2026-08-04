document.addEventListener("DOMContentLoaded", () => {
  // 1. Verificar e registrar os plugins do GSAP
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
  } else {
      console.warn("GSAP ou ScrollTrigger não foram identificados.");
      return;
  }

  // 2. Animação de Entrada do Hero
  const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

  if (document.querySelector(".hero-eyebrow")) {
      heroTl.from(".hero-eyebrow", { y: -20, opacity: 0, duration: 0.6 })
            .from(".hero-pro h1", { y: 30, opacity: 0, duration: 0.8 }, "-=0.3")
            .from(".hero-sub", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
            .from(".hero-buttons", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
            .from(".hero-stat", { y: 30, opacity: 0, duration: 0.6, stagger: 0.15 }, "-=0.2");
  }

  // 3. Efeito de Morph nos Botões do Hero (.cta-morph)
  const ctaMorphBtns = document.querySelectorAll('.cta-morph');

  ctaMorphBtns.forEach((btn) => {
      const arrow = btn.querySelector('.icon-arrow');
      const check = btn.querySelector('.icon-check') || btn.querySelector('.icon-bolt');

      const hoverTl = gsap.timeline({ paused: true });

      hoverTl.to(btn, { scale: 1.05, duration: 0.25, ease: "power2.out" }, 0);

      if (arrow && check) {
          hoverTl.to(arrow, { opacity: 0, x: 8, scale: 0.6, duration: 0.2, ease: "power2.in" }, 0)
                 .fromTo(check, 
                     { opacity: 0, x: -8, scale: 0.6 },
                     { opacity: 1, x: 0, scale: 1, duration: 0.25, ease: "back.out(1.7)" },
                     "-=0.1"
                 );
      } else if (arrow) {
          hoverTl.to(arrow, { x: 6, duration: 0.2, ease: "power2.out" }, 0);
      }

      btn.addEventListener('mouseenter', () => hoverTl.play());
      btn.addEventListener('mouseleave', () => hoverTl.reverse());
  });

  // 4. Revelação ao Rolar a Página (ScrollTrigger leve)
  const animElements = document.querySelectorAll(".tools, .about, .about-card");

  animElements.forEach(element => {
      gsap.from(element, {
          scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true
          },
          y: 35,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out"
      });
  });
});