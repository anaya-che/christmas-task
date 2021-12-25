import './mainPage.css';

class MainPage {
  static render(): void {
    const mainElement = <HTMLElement>document.querySelector('.main');
    const page = `
      <div class="main-container">
        <div class="main__ball1"></div>
        <div class="main__ball2"></div>
        <h1 class="main__title">Новогодняя игра<span>«Наряди ёлку»</span></h1>
        <button class="main__button">Начать</button>
      </div>
      `;
    mainElement.innerHTML = page;
  }
}

export default MainPage;
