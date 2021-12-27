import './treePage.css';

class TreePage {
  static render(): void {
    const mainElement = <HTMLElement>document.querySelector('.main');
    const page = `
      <div class="blur">
        <div class="tree-page-container">
          <div class="settings-container">
            <div class="settings__effects-container">
              <div class="effects__audio mute"></div>
              <div class="effects__snow"></div>
            </div>
            <div class="settings__tree-container">
              <div class="settings__title">Выберите ёлку</div>
              <div class="tree-container">
                <div class="tree-1 tree" id="tree-1"></div>
                <div class="tree-2 tree" id="tree-2"></div>
                <div class="tree-3 tree" id="tree-3"></div>
                <div class="tree-4 tree" id="tree-4"></div>
                <div class="tree-5 tree" id="tree-5"></div>
                <div class="tree-6 tree" id="tree-6"></div>
              </div>
            </div>
            <div class="settings__bg-container">
              <div class="settings__title">Выберите фон</div>
              <div class="bg-container">
                <div class="bg-1 bg" id="bg-1"></div>
                <div class="bg-2 bg" id="bg-2"></div>
                <div class="bg-3 bg" id="bg-3"></div>
                <div class="bg-4 bg" id="bg-4"></div>
                <div class="bg-5 bg" id="bg-5"></div>
                <div class="bg-6 bg" id="bg-6"></div>
                <div class="bg-7 bg" id="bg-7"></div>
                <div class="bg-8 bg" id="bg-8"></div>
                <div class="bg-9 bg" id="bg-9"></div>
                <div class="bg-10 bg" id="bg-10"></div>
              </div>
            </div>
            <div class="settings__garland-container">
              <div class="settings__title">Гирлянда</div>
              <div class="garland-container">
                <button class="multicolor-garland garland-btn" id="garland-multicolor"></button>
                <button class="red-garland garland-btn" id="garland-red"></button>
                <button class="blue-garland garland-btn" id="garland-blue"></button>
                <button class="yellow-garland garland-btn" id="garland-yellow"></button>
                <button class="green-garland garland-btn" id="garland-green"></button>
                <input class="garland-input" type="checkbox" id="garland-input">
                <label class="garland-switch" for="garland-input">
                  <span class="garland-switch-handle"></span>
                  <span class="garland-switch-label" data-on="On" data-off="Off"></span>
              </label>
              </div>
            </div>
            <button class="clear-button button">Сброс настроек</button>
          </div>
          <div class="main-tree-container">
            <div class="main-tree__snowflakes-container hide"></div>
            <div class="main-tree__garland-container"></div>
            <map name="main-tree__map">
              <area coords="245,9,18,615,118,687,375,687,473,624" shape="poly">
            </map>
            <img usemap="#main-tree__map" class="main-tree__img" src="./assets/tree/1.png" alt="Tree">
          </div>
          <div class="favorites-container">
            <div class="favorite__toys-container">
              <div class="favorites__title">Игрушки</div>
              <div class="toys-container"></div>
            </div>
          </div>
        </div>
      </div>
    `;
    mainElement.innerHTML = page;
  }
}

export default TreePage;
