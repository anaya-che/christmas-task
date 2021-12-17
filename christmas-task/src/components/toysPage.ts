class ToysPage {
  static render(): void {
    const mainElement = <HTMLElement>document.querySelector('.main');
    const page = `
      <section class="form-filter">
          <div class="form-filter__shape">
            <button class="button" id="round">Round</button>
            <button class="button" id="bell">Bell</button>
            <button class="button" id="cone">Cone</button>
            <button class="button" id="snowflake">Snowflake</button>
            <button class="button" id="figurine">Figurine</button>
          </div>
          <div class="form-filter__color">
            <button class="button" id="white">White</button>
            <button class="button" id="yellow">Yellow</button>
            <button class="button" id="red">Red</button>
            <button class="button" id="blue">Blue</button>
            <button class="button" id="green">Green</button>
          </div>
          <div class="form-filter__size">
            <button class="button" id="big">Big</button>
            <button class="button" id="medium">Medium</button>
            <button class="button" id="small">Small</button>
          </div>
          <div class="form-filter__favorite">
            <button class="button" id="favorite">Favorite</button>
            <button class="button" id="unfavorite">Unfavorite</button>
          </div>
        </section>
    `;
    mainElement.innerHTML = page;
  }
}

export default ToysPage;
