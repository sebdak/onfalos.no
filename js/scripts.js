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
          transition-property: opacity, transform;
          transition-duration: 0.5s;
          transition-delay: 0.3s;
          transition-timing-function: ease-in;
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

customElements.define(
  "shiny-a",
  class ShinyA extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      const href = this.getAttribute("href");
      this.shadowRoot.innerHTML = `
      <style>
        a {
          display: inline-block;
          border-radius: var(--border-radius);
          text-decoration: none;
          width: auto;
          position: relative;
          cursor: pointer;
          padding: 10px 30px;
          background-color: var(--color-highlight);
          color: var(--color-background);
          font: inherit;
          font-weight: bold;
          text-transform: uppercase;
          overflow: hidden;
          transition: background-color 300ms linear;
        }

        a:hover {
          background-color: var(--color-highlight-hover);
        }

        a:hover::after {
          content: "";
          width: 60px;
          height: 175%;
          display: block;
          position: absolute;
          top: -20px;
          left: 0;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 1) 25%,
            rgba(255, 255, 255, 1) 50%,
            rgba(255, 255, 255, 1) 75%,
            rgba(255, 255, 255, 0) 100%
          );
          opacity: 0.3;
          animation: shine 1500ms linear infinite;
          animation-delay: 0.2s;
          transform: translateX(250px);
        }

        @keyframes shine {
          0% {
            transform: translateX(-30px) rotate(25deg);
          }

          40% {
            transform: translateX(250px) rotate(25deg);
          }
        }
      </style>
      <a href=${!!href ? href : "#"}>
        <slot></slot>
      </a>
      `;
    }
  }
);
