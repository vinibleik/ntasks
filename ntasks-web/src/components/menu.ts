import Ntask from "./ntask";
import Template from "../templates/footer";

export default class Menu extends Ntask {
    private body: HTMLElement;
    constructor(body: HTMLElement) {
        super();
        this.body = body;
    }

    render(path: string) {
        this.body.innerHTML = Template(path);
        this.addEventListener();
    }

    clear() {
        this.body.innerHTML = "";
    }

    addEventListener() {
        this.pathsClick();
        this.logoutClick();
    }

    pathsClick() {
        const links = this.body.querySelectorAll("[data-path]");
        for (let i = 0; i < links.length; i++) {
            links[i].addEventListener("click", (e) => {
                e.preventDefault();
                // @ts-ignore
                const link = e.target.parentElement;
                const path = link.getAttribute("data-path");
                this.emit("click", path);
            });
        }
    }

    logoutClick() {
        const link = this.body.querySelector("[data-logout]");
        link?.addEventListener("click", (e) => {
            e.preventDefault();
            this.emit("logout");
        });
    }
}
