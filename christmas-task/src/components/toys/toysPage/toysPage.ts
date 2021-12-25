import './toysPage.css';

class ToysPage {
  static render(): void {
    const mainElement = <HTMLElement>document.querySelector('.main');
    const page = `
    <section class="form-filter">
      <div class="search-container">
        <div class="selected-ball">
          <span class="selected-amount"></span>
        </div>
        <input type="search" class="search" autocomplete="off" placeholder="Поиск..." autofocus>
      </div>
      <div class="form-filter__sort-container">
        <div class="form-filter__sort-title">Сортировка</div>
        <select class="form-filter__sort">
          <option value="name-asc">По названию от «А» до «Я»</option>
          <option value="name-desc">По названию от «Я» до «А»</option>
          <option value="year-asc">По году по возрастанию</option>
          <option value="year-desc">По году по убыванию</option>
        </select>
      </div>
      <div class="form-filter__shape-container">
        <div class="form-filter__shape-title">Форма</div>
        <div class="form-filter__shape">
          <button class="shape-button shape-button_round button" id="round"></button>
          <button class="shape-button shape-button_bell button" id="bell"></button>
          <button class="shape-button shape-button_cone button" id="cone"></button>
          <button class="shape-button shape-button_snowflake button" id="snowflake"></button>
          <button class="shape-button shape-button_figurine button" id="figurine"></button>
        </div>
      </div>
      <div class="form-filter__color-container">
        <div class="form-filter__color-title">Цвет</div>
        <div class="form-filter__color">
          <button class="color-button color-button_white button" id="white"></button>
          <button class="color-button color-button_yellow button" id="yellow"></button>
          <button class="color-button color-button_red button" id="red"></button>
          <button class="color-button color-button_blue button" id="blue"></button>
          <button class="color-button color-button_green button" id="green"></button>
        </div>
      </div>
      <div class="form-filter__size-container">
        <div class="form-filter__size-title">Размер</div>
        <div class="form-filter__size">
          <button class="size-button size-button_big button" id="big"></button>
          <button class="size-button size-button_medium button" id="medium"></button>
          <button class="size-button size-button_small button" id="small"></button>
        </div>
      </div>
      <div class="form-filter__favorite">
        <div class="form-filter__favorite-title">Только любимые</div>
        <input type="checkbox" class="favorite-input" id="favorite">
        <label for="favorite" class="favorite-label"></label>
      </div>
      <div class="form-filter__count-container">
        <div class="form-filter__count-title">Количество экземпляров:</div>
        <div class="count-slider slider"></div>
        <div class="form-filter__count">
          <div class="count-value_lower"></div>
          <div class="count-value_upper"></div>
        </div>
      </div>
      <div class="form-filter__year-container">
        <div class="form-filter__year-title">Год приобретения:</div>
        <div class="year-slider slider"></div>
        <div class="form-filter__year">
          <div class="year-value_lower"></div>
          <div class="year-value_upper"></div>
        </div>
      </div>
      <div class="form-filter__reset">
        <button class="reset-button button">Сброс фильтров</button>
        <button class="clear-button button">Сброс настроек</button>
      </div>
    </section>
    <div class="blur">
      <section class="toy-cards__container">
        <div class="toy-cards__message hidden">Извините, совпадений не обнаружено</div>
        <div class="toy-cards"></div>
      </section>
    </div>
    `;
    mainElement.innerHTML = page;
  }
}

export default ToysPage;
