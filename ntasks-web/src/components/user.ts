import Ntask from "./ntask";
import Template from "../templates/user";

export default class User extends Ntask {
    private body: HTMLElement;

    constructor(body: HTMLElement) {
        super();
        this.body = body;
    }

    render() {
        this.renderUserData();
    }

    addEventListener() {
        this.userCancelClick();
    }

    renderUserData() {
        fetch(`${this.URL}/users`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then(async (res) => {
                const data = await res.json();
                if (!res.ok) {
                    throw data;
                }
                this.body.innerHTML = Template(data);
                this.addEventListener();
            })
            .catch((err) => {
                this.emit("error", err);
            });
    }

    userCancelClick() {
        const button = this.body.querySelector(
            "[data-remove-account]",
        ) as HTMLButtonElement;
        button.addEventListener("click", (e) => {
            e.preventDefault();
            if (!confirm("This will cancel your account, are you sure?")) {
                return;
            }

            fetch(`${this.URL}/users`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
                .then(async (res) => {
                    if (!res.ok) {
                        const data = await res.json();
                        throw data;
                    }
                    this.emit("remove-account");
                })
                .catch((err) => this.emit("remove-error", err));
        });
    }
}
