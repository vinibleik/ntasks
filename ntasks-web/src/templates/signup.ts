export default () => {
    return `<form>
      <div class="list">
        <label class="item item-input item-stacked-label">
          <span class="input-label">Name</span>
          <input type="text" id="name" />
        </label>
        <label class="item item-input item-stacked-label">
          <span class="input-label">Email</span>
          <input type="text" id="email" />
        </label>
        <label class="item item-input item-stacked-label">
          <span class="input-label">Password</span>
          <input type="password" id="password" />
        </label>
      </div>
      <div class="padding">
        <button type="submit" class="button button-positive button-block">
          <i class="ion-thumbsup"></i> Register
        </button>
      </div>
    </form>`;
};
