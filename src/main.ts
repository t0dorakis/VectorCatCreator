import "./style.css";
import "./button.ts";
import "./message.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div style="display:flex; place-items:center; flex-direction:column; min-height:100vh; justify-content:space-evenly;">
    <reply-message></reply-message>
    <button-component>
    I want a new cat!
    </button-component>
  </div>
`;
