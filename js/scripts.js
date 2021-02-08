customElements.define(
  "fade-in",
  class FadeIn extends HTMLElement {
    //
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = `
      <style>
        :host { 
          display: block;
          opacity: 0;
          transform: translateY(10px);
          transition: all 1s ease-in 0.5s;
        }
        :host(.build-in-animate) { 
          opacity: 1;
          transform: translateY(0);
        }
      </style>
      <slot></slot>
      `;

      this.animationObserver = new IntersectionObserver(
        (entries, _observer) => {
          for (const entry of entries) {
            console.log(entry);
            entry.target.classList.toggle(
              "build-in-animate",
              entry.isIntersecting
            );
          }
        }
      );

      this.animationObserver.observe(this);
    }
  }
);
