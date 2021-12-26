import './garland.css';

class Garland {
  static start(color: string): void {
    const garlandContainer = <HTMLElement>document.querySelector('.main-tree__garland-container');
    garlandContainer.innerHTML = '';
    const numberOfRopes = 8;
    let firstRopeLength = 6;
    const ropeLengthStep = 2;
    for (let i = 0; i < numberOfRopes; i += 1) {
      const ropeElement: HTMLUListElement = document.createElement('ul');
      ropeElement.classList.add('lightrope');

      for (let j = 0; j < firstRopeLength; j += 1) {
        const lightElement: HTMLLIElement = document.createElement('li');
        lightElement.classList.add('light');
        lightElement.classList.add(`${color}`);
        ropeElement.append(lightElement);
      }
      firstRopeLength += ropeLengthStep;
      garlandContainer.append(ropeElement);
    }

    this.setLightPosition();
  }

  static setLightPosition(): void {
    const rope: NodeListOf<HTMLElement> = document.querySelectorAll('.lightrope');
    rope.forEach((ulElement: HTMLElement) => {
      const ulCollection: HTMLCollection = ulElement.children;
      const liArray: Element[] = Array.from(ulCollection, (element: Element) => element);

      const startAngle = Math.PI / liArray.length;
      const radius = liArray.length * 3;
      let angle = startAngle / 2;

      liArray.forEach((el: Element) => {
        const liElement = <HTMLElement>el;
        const topPosition = radius * Math.sin(angle);
        liElement.style.top = `${topPosition.toString()}px`;
        angle += startAngle;
      });
    });
  }
}

export default Garland;
