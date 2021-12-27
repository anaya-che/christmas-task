class DragToys {
  static start() {
    const toysContainer = <HTMLElement>document.querySelector('.toys-container');
    const treeContainer = <HTMLElement>document.querySelector('.main-tree__toys-container');

    treeContainer.addEventListener('drop', DragToys.drop.bind(this));
    treeContainer.addEventListener('dragover', DragToys.dragover.bind(this));

    toysContainer.addEventListener('dragstart', DragToys.drag.bind(this));
    treeContainer.addEventListener('dragstart', DragToys.drag.bind(this));
  }

  static dragover(event: DragEvent) {
    event.preventDefault();
  }

  static drop(event: DragEvent) {
    const target = <HTMLElement>event.target;
    const dataTransfer = <DataTransfer>event.dataTransfer;
    const data: string = dataTransfer.getData('text');
    const element = <HTMLElement>document.getElementById(data);

    target.append(element);
    const { offsetX } = event;
    const { offsetY } = event;
    const { offsetWidth } = element;
    const { offsetHeight } = element;
    element.style.left = `${offsetX - (offsetWidth / 2)}px`;
    element.style.top = `${offsetY - (offsetHeight / 2)}px`;
  }

  static drag(event: DragEvent) {
    const target = <HTMLElement>event.target;
    const closest = <HTMLElement>target.closest('.toys-img');
    if (closest) {
      const dataTransfer = <DataTransfer>event.dataTransfer;
      dataTransfer.setData('text', closest.id);
    }
  }
}

export default DragToys;
