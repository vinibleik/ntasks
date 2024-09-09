type User = {
    id: number;
    name: string;
    email: string;
};

export default function (user: User) {
    return `<div class="list">
                <label class="item item-input item-stacked-label">
                    <span class="input-label">Name</span>
                    <small class="dark">${user.name}</small>
                </label>
                <label class="item item-input item-stacked-label">
                    <span class="input-label">Email</span>
                    <small class="dark">${user.email}</small>
                </label>
            </div>
            <div class="padding">
                <button data-remove-account class="button button-assertive button-block">
                    <i class="ion-trash-a"></i> Cancel account
                </button>
            </div>`;
}
