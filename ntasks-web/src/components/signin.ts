import Ntask from "./ntask";
import Template from "../templates/signin";

export default class Signin extends Ntask {
    private body: HTMLElement;

    constructor(body: HTMLElement) {
        super();
        this.body = body;
    }

    render() {
        this.body.innerHTML = Template();
        document.getElementById("email")?.focus();
        this.addEventListener();
    }

    addEventListener() {
        this.formSubmit();
        this.signupClick();
    }

    formSubmit() {
        const form = this.body.querySelector("form") as HTMLFormElement;
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("email") as HTMLInputElement;
            const password = document.getElementById(
                "password",
            ) as HTMLInputElement;
            fetch(`${this.URL}/users/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email.value,
                    password: password.value,
                }),
            })
                .then((res) => {
                    if (!res.ok) {
                        return this.emit("error", res);
                    }
                    return res.json();
                })
                .then((data) => this.emit("signin", data))
                .catch((err) => this.emit("error", err));
        });
    }

    signupClick() {
        const signup = this.body.querySelector(
            "#btn-signup",
        ) as HTMLButtonElement;
        signup.addEventListener("click", (e) => {
            e.preventDefault();
            this.emit("signup");
        });
    }
}
