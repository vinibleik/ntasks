export default () => {
    return `<form>
      <div class="list">
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
          <i class="ion-home"></i> Login
        </button>
      </div>
    </form>
    <div class="padding">
      <button class="button button-block" id="btn-signup">
        <i class="ion-person-add"></i> Sign up
      </button>
    </div>`;
};
