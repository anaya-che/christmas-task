import './toysPage.css';

class ToysPage {
  static render(): void {
    const mainElement = <HTMLElement>document.querySelector('.main');
    const page = `
      <section class="form-filter">
          <div class="form-filter__shape">
            <button class="shape-button shape-button_round" id="round">Round</button>
            <button class="shape-button shape-button_bell" id="bell">Bell</button>
            <button class="shape-button shape-button_cone" id="cone">Cone</button>
            <button class="shape-button shape-button_snowflake" id="snowflake">Snowflake</button>
            <button class="shape-button shape-button_figurine" id="figurine">Figurine</button>
          </div>
          <div class="form-filter__color">
            <button class="color-button color-button_white" id="white">White</button>
            <button class="color-button color-button_yellow" id="yellow">Yellow</button>
            <button class="color-button color-button_red" id="red">Red</button>
            <button class="color-button color-button_blue" id="blue">Blue</button>
            <button class="color-button color-button_green" id="green">Green</button>
          </div>
          <div class="form-filter__size">
            <button class="size-button size-button_big" id="big">Big</button>
            <button class="size-button size-button_medium" id="medium">Medium</button>
            <button class="size-button size-button_small" id="small">Small</button>
          </div>
          <div class="form-filter__favorite">
            <input type="checkbox" class="favorite-input" id="favorite">
            <label for="favorite" class="favorite-label"></label>
          </div>
          <div class="form-filter__count">
            <div class="count-value_lower">1</div>
            <div class="count-slider"></div>
            <div class="count-value_upper">12</div>
          </div>
          <div class="form-filter__year">
            <div class="year-value_lower">1940</div>
            <div class="year-slider"></div>
            <div class="year-value_upper">2020</div>
          </div>
          <div class="form-filter__reset">
            <button class="reset-button" id="reset">Reset</button>
          </div>
          <select class="form-filter__sort">
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="year-asc">Old First</option>
            <option value="year-desc">New First</option>
          </select>
        </section>
        <section class="toy-cards"></section>
    `;
    mainElement.innerHTML = page;
  }
}

export default ToysPage;
