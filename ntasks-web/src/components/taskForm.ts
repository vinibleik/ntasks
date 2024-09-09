import Ntask from "./ntask";
import Template from "../templates/taskForm";

export default class TaskForm extends Ntask {
    private body: HTMLElement;

    constructor(body: HTMLElement) {
        super();
        this.body = body;
    }

    render() {
        this.body.innerHTML = Template();
        //@ts-ignore
        this.body.querySelector("[data-task]").focus();
        this.addEventListener();
    }

    addEventListener() {
        this.formSubmit();
    }

    formSubmit() {
        const form = this.body.querySelector("form") as HTMLFormElement;
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            // @ts-ignore
            const task = e.target.querySelector("[data-task]");
            fetch(`${this.URL}/tasks`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: task.value }),
            })
                .then(async (res) => {
                    if (!res.ok) {
                        const data = await res.json();
                        throw data;
                    }
                    this.emit("submit");
                })
                .catch((e) => {
                    this.emit("error", e);
                });
        });
    }
}
