import Signin from "./components/signin";
import Signup from "./components/signup";
import Tasks from "./components/tasks";
import Menu from "./components/menu";
import User from "./components/user";
import TaskForm from "./components/taskForm";

export default class App {
    signin: Signin;
    signup: Signup;
    menu: Menu;
    taskForm: TaskForm;
    tasks: Tasks;
    user: User;

    constructor(main: HTMLElement, footer: HTMLElement) {
        this.signin = new Signin(main);
        this.signup = new Signup(main);
        this.user = new User(main);
        this.tasks = new Tasks(main);
        this.taskForm = new TaskForm(main);
        this.menu = new Menu(footer);
    }

    init() {
        this.signin.render();
        this.addEventListener();
    }

    addEventListener() {
        this.signinEvents();
        this.signupEvents();
        this.tasksEvents();
        this.taskFormEvents();
        this.menuEvents();
        this.userEvents();
    }

    signinEvents() {
        this.signin.on("error", (e: any) => {
            console.error(e);
            alert("Authentication error");
        });
        this.signin.on("signin", (token: { token: string }) => {
            localStorage.setItem("token", token.token);
            this.menu.render("tasks");
            this.tasks.render();
        });
        this.signin.on("signup", () => this.signup.render());
    }

    signupEvents() {
        this.signup.on("error", (e: any) => {
            console.log(e);
            alert("Register error");
        });
        this.signup.on("signup", (user: any) => {
            alert(`${user.name} you were registered!`);
            this.signin.render();
        });
    }

    tasksEvents() {
        this.tasks.on("error", (e: any) => {
            console.log(e);
            alert("Task list error");
        });
        this.tasks.on("remove-error", (e: any) => {
            console.log(e);
            alert("Task delete error");
        });
        this.tasks.on("update-error", (e: any) => {
            console.log(e);
            alert("Task update error");
        });
        this.tasks.on("remove", () => this.tasks.render());
        this.tasks.on("update", () => this.tasks.render());
    }

    taskFormEvents() {
        this.taskForm.on("error", (e: any) => {
            console.log(e);
            alert("Task Register error");
        });
        this.taskForm.on("submit", () => {
            this.menu.render("tasks");
            this.tasks.render();
        });
    }
    userEvents() {
        this.user.on("error", (e: any) => {
            console.log(e);
            alert("User load error");
        });
        this.user.on("remove-error", (e: any) => {
            console.log(e);
            alert("Cancel account error");
        });
        this.user.on("remove-account", () => {
            alert("So sad! You are leaving us :(");
            localStorage.clear();
            this.menu.clear();
            this.signin.render();
        });
    }

    menuEvents() {
        this.menu.on("click", (path: string) => {
            this.menu.render(path);
            // @ts-ignore
            this[path].render();
        });
        this.menu.on("logout", () => {
            localStorage.clear();
            this.menu.clear();
            this.signin.render();
        });
    }
}
