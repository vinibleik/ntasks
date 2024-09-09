import App from "./app";

window.addEventListener("load", () => {
    const main = document.querySelector("main") as HTMLElement;
    const footer = document.querySelector("footer") as HTMLElement;
    new App(main, footer).init();
});
