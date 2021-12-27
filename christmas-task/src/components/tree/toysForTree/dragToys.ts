class DragToys {
  static start(): void {
    const toysContainer = <HTMLElement>document.querySelector('.toys-container');
    const treeArea = <HTMLAreaElement>document.querySelector('area');

    toysContainer.addEventListener('dragstart', DragToys.drag.bind(this));
    treeArea.addEventListener('drop', DragToys.drop.bind(this));
    treeArea.addEventListener('dragstart', DragToys.drag.bind(this));
    document.addEventListener('dragover', DragToys.dragover.bind(this));
    document.addEventListener('drop', DragToys.returnToy.bind(this));
  }

  static returnToy(event: DragEvent): void {
    const target = <HTMLElement>event.target;
    if (target.tagName !== 'AREA') {
      const dataTransfer = <DataTransfer>event.dataTransfer;
      const data: string = dataTransfer.getData('text');
      const element = <HTMLElement>document.getElementById(data);
      element.remove();
      element.style.left = '';
      element.style.top = '';
      const groupId: string = element.id.split('-')[0];
      const cardId = `#card-${groupId}`;
      const toyCard = <HTMLElement>document.querySelector(cardId);
      toyCard.append(element);
      DragToys.changeToyCount(element.id);
    }
  }

  static dragover(event: DragEvent): void {
    event.preventDefault();
  }

  static drop(event: DragEvent): void {
    const target = <HTMLElement>event.target;
    const dataTransfer = <DataTransfer>event.dataTransfer;
    const data: string = dataTransfer.getData('text');
    const element = <HTMLElement>document.getElementById(data);

    const areaTop = -710;
    const areaLeft = 220;

    const { offsetX } = event;
    const { offsetY } = event;
    const { offsetWidth } = element;
    const { offsetHeight } = element;

    element.style.left = `${offsetX - areaLeft - (offsetWidth / 2)}px`;
    element.style.top = `${offsetY - areaTop - (offsetHeight / 2)}px`;
    target.append(element);
    DragToys.changeToyCount(element.id);
  }

  static changeToyCount(toyId: string): void {
    const groupId: string = toyId.split('-')[0];
    const cardId = `#card-${groupId}`;
    const countId = `#count-${groupId}`;
    const toyCard = <HTMLElement>document.querySelector(cardId);
    const countElement = <HTMLElement>document.querySelector(countId);
    countElement.textContent = `${toyCard.childElementCount - 1}`;
  }

  static drag(event: DragEvent): void {
    const target = <HTMLElement>event.target;
    const closest = <HTMLElement>target.closest('.toys-img');
    if (closest) {
      const dataTransfer = <DataTransfer>event.dataTransfer;
      dataTransfer.setData('text', closest.id);
    }
  }
}

export default DragToys;
