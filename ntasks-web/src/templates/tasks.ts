type Task = {
    id: number;
    title: string;
    user_id: number;
    done: boolean;
};
function renderTasks(tasks: Task[]) {
    return tasks
        .map((task) => {
            let done = task.done ? "ios-checkmark" : "ios-circle-outline";
            return `<li class="item item-icon-left item-button-right">
                    <i class="icon ion-${done}" data-done
                    data-task-done="${task.done ? "done" : ""}"
                    data-task-id="${task.id}"></i>
                    ${task.title}
                    <button data-remove data-task-id="${task.id}"
                    class="button button-assertive">
                    <i class="ion-trash-a"></i>
                    </button>
                    </li>`;
        })
        .join("");
}

export default function (tasks: Task[]) {
    if (tasks && tasks.length) {
        return `<ul class="list">${renderTasks(tasks)}</ul>`;
    }
    return `<h4 class="text-center">The task list is empty</h4>`;
}
