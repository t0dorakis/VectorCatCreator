import { globalState, TState } from "./lib/stateManager";

const defaultCat = `
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <g>
    <!-- Body -->
    <ellipse cx="100" cy="115" rx="40" ry="25" style="fill:gray"></ellipse>
    <!-- Head -->
    <circle cx="100" cy="70" r="30" style="fill:lightgray"></circle>
    <!-- Eyes -->
    <circle cx="90" cy="65" r="5" style="fill:white"></circle>
    <circle cx="110" cy="65" r="5" style="fill:white"></circle>
    <!-- Pupils -->
    <circle cx="90" cy="65" r="2" style="fill:black"></circle>
    <circle cx="110" cy="65" r="2" style="fill:black"></circle>
    <!-- Ears -->
    <polygon id="ear_a" points="70,45 100,20 85,70" style="fill:lightgray"></polygon>
    <polygon id="ear_b" points="130,45 100,20 115,70" style="fill:lightgray"></polygon>
    <!-- Nose -->
    <circle cx="100" cy="75" r="2" style="fill:pink"></circle>
    <!-- Mouth -->
    <path d="M 100,75 Q 95,85 100,95 Q 105,85 100,75" style="fill:none; stroke:pink; stroke-linecap:round"></path>
    <!-- Whiskers -->
    <path d="M 85,75 Q 80,70 75,75" style="fill:none; stroke:black; stroke-linecap:round"></path>
    <path d="M 85,80 Q 80,80 75,80" style="fill:none; stroke:black; stroke-linecap:round"></path>
    <path d="M 85,85 Q 80,90 75,85" style="fill:none; stroke:black; stroke-linecap:round"></path>
    <path d="M 115,75 Q 120,70 125,75" style="fill:none; stroke:black; stroke-linecap:round"></path>
    <path d="M 115,80 Q 120,80 125,80" style="fill:none; stroke:black; stroke-linecap:round"></path>
    <path d="M 115,85 Q 120,90 125,85" style="fill:none; stroke:black; stroke-linecap:round"></path>
  </g>
</svg>
`;

class MessageComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.unsubscribe = null;

    this.shadowRoot!.innerHTML = `
    <div id="message" style="display:flex; place-items:center;">
        ${defaultCat}
    </div>
    
    <style>
      :host {
        display: block;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 3rem;
      }

      svg{
        width: 100%;
        height: 100%;
        stroke: black;
        stroke-width: 2;
        animation: skewAnimation 3s ease-out infinite;
        transform: scale(2);
      }

      #paw {
        animation: movePaw 1s ease-in-out infinite;
        stroke: black;
        stroke-width: 2;
        transform: scale(4);
        z-index: 999;
      }
      #ear_b {
        animation: moveEarB 1s ease-in-out infinite;
      }
      @keyframes skewAnimation {
        0% {
          transform: skew(0deg, 0deg) scale(2);
        }
        25% {
          transform: skew(10deg , 0deg) scale(2);
        }
        75% {
          transform: skew(-10deg, 4deg) scale(2);
        }
      }
      @keyframes movePaw {
        0% {
          transform: translateY(0);
        }
        60% {
          transform: translateY(-6%);
        }
        100% {
          transform: translateY(0);
        }
      }
      @keyframes moveEarB {
        0% {
          transform: translateY(0);
        }
        40% {
          transform: translateY(2%);
        }
        100% {
          transform: translateY(0);
        }
      }
    </style>
    `;
  }

  unsubscribe: null | (() => void);

  connectedCallback() {
    this.unsubscribe = globalState.subscribe((state) => this.update(state));
    this.update(globalState.getState()); // Initial update based on current state
  }

  disconnectedCallback() {
    if (this.unsubscribe) this.unsubscribe();
  }

  update(state: TState) {
    if (!state.message) {
      return;
    }
    this.shadowRoot!.getElementById("message")!.innerHTML = state.message;
  }
}

customElements.define("reply-message", MessageComponent);
