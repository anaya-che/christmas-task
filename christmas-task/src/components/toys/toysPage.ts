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
        </section>
        <section class="toy-cards"></section>
    `;
    mainElement.innerHTML = page;
  }
}

export default ToysPage;
