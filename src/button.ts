import { getChatCompletion } from "./lib/openAi.ts";

const handleClick = async () => {
  await getChatCompletion(
    "Create an illustration of a sitting cat in vibrant colors. One paw should have the id='paw'"
  );
};

class buttonComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const button = document.createElement("button");
    button.textContent = "Create new Cat";
    button.addEventListener("click", handleClick);

    const style = document.createElement("style");

    style.textContent = `
      button {
        margin: auto;
        background-color: pink;
        color: darkviolet;
        padding: 10px 20px;
        border-radius: 6px;
        border: darkviolet solid 3px;
        transition: transform 0.3s ease-in-out;
        cursor: pointer;
        font-family: "ABCGravity", serif;
      }

      button:hover {
        transform: rotate(5deg);
´      }
    `;
    this.shadowRoot!.appendChild(style);
    this.shadowRoot!.appendChild(button);
    this.shadowRoot!.querySelector<HTMLButtonElement>(
      "#button"
    )!.addEventListener("click", handleClick);
  }
}
window.customElements.define("button-component", buttonComponent);
