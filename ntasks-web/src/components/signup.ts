import Ntask from "./ntask";
import Template from "../templates/signup";

export default class Signup extends Ntask {
    private body: HTMLElement;

    constructor(body: HTMLElement) {
        super();
        this.body = body;
    }

    render() {
        this.body.innerHTML = Template();
        document.getElementById("name")?.focus();
        this.addEventListener();
    }

    addEventListener() {
        this.formSubmit();
    }

    formSubmit() {
        const form = this.body.querySelector("form") as HTMLFormElement;
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("name") as HTMLInputElement;
            const email = document.getElementById("email") as HTMLInputElement;
            const password = document.getElementById(
                "password",
            ) as HTMLInputElement;
            fetch(`${this.URL}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name.value,
                    email: email.value,
                    password: password.value,
                }),
            })
                .then(async (res) => {
                    const data = await res.json();
                    if (!res.ok) {
                        return this.emit("error", data);
                    }
                    this.emit("signup", data);
                })
                .catch((err) => this.emit("error", err));
        });
    }
}
