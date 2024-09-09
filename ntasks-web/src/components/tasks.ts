import Ntask from "./ntask";
import Template from "../templates/tasks";

export default class Tasks extends Ntask {
    private body: HTMLElement;

    constructor(body: HTMLElement) {
        super();
        this.body = body;
    }

    render() {
        this.renderTaskList();
    }

    addEventListener() {
        this.taskDoneCheckbox();
        this.taskRemoveClick();
    }

    renderTaskList() {
        fetch(`${this.URL}/tasks`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then(async (res) => {
                const data = await res.json();
                if (!res) {
                    throw data;
                }
                this.body.innerHTML = Template(data.tasks);
                this.addEventListener();
            })
            .catch((e) => {
                this.emit("error", e);
            });
    }

    taskDoneCheckbox() {
        this.body.querySelectorAll("[data-done]").forEach((i) => {
            i.addEventListener("click", (e) => {
                e.preventDefault();
                // @ts-ignore
                const id = e.target.getAttribute("data-task-id");
                // @ts-ignore
                const done = e.target.getAttribute("data-task-done");
                fetch(`${this.URL}/tasks/${id}`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ done: !done }),
                })
                    .then(async (res) => {
                        if (!res.ok) {
                            this.emit("update-error", await res.json());
                            return;
                        }
                        this.emit("update");
                    })
                    .catch((err) => {
                        this.emit("update-error", err);
                    });
            });
        });
    }

    taskRemoveClick() {
        const removes = this.body.querySelectorAll("[data-remove]");
        for (let i = 0, max = removes.length; i < max; i++) {
            removes[i].addEventListener("click", (e) => {
                e.preventDefault();

                if (!confirm("Do you really wanna to delete this task?")) {
                    return;
                }

                // @ts-ignore
                const id = e.target.getAttribute("data-task-id");

                fetch(`${this.URL}/tasks/${id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                })
                    .then(async (res) => {
                        if (!res.ok) {
                            this.emit("remove-error", await res.json());
                            return;
                        }
                        this.emit("remove");
                    })
                    .catch((err) => {
                        this.emit("remove-error", err);
                    });
            });
        }
    }
}
