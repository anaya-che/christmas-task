import Snowflake from '../snowflake/snowflake';
import Garland from '../garland/garland';

class Settings {
  music: string;

  snow: string;

  treeImage: string;

  bgImage: string;

  garland: string;

  garlandColor: string;

  constructor() {
    this.music = 'off';
    this.snow = 'off';
    this.treeImage = '1';
    this.bgImage = '1';
    this.garland = 'off';
    this.garlandColor = 'multicolor';
  }

  start(): void {
    document.addEventListener('click', this.changeSettings.bind(this));
  }

  changeSettings(event: MouseEvent): void {
    const target = <HTMLElement>event.target;
    if (target.closest('.effects__audio')) this.playMusic();
    if (target.closest('.effects__snow')) this.startSnow();
    if (target.closest('.tree')) {
      const imgNumber: string = target.id.split('-')[1];
      this.treeImage = imgNumber;
      this.changeTree();
    }
    if (target.closest('.bg')) {
      const imgNumber: string = target.id.split('-')[1];
      this.bgImage = imgNumber;
      this.changeBg();
    }
    if (target.closest('.garland-btn')) {
      const color: string = target.id.split('-')[1];
      this.garlandColor = color;
      this.choseGarland();
    }
    if (target.closest('.garland-switch')) this.checkGarlandInput();
  }

  playMusic(): void {
    if (this.music === 'off') {
      this.music = 'on';
      Settings.musicOn();
    } else if (this.music === 'on') {
      this.music = 'off';
      Settings.musicOff();
    }
  }

  static musicOn(): void {
    const audioElement = <HTMLAudioElement>document.querySelector('.music');
    const audioImage = <HTMLElement>document.querySelector('.effects__audio');
    audioElement.play();
    audioImage.classList.remove('mute');
  }

  static musicOff(): void {
    const audioElement = <HTMLAudioElement>document.querySelector('.music');
    const audioImage = <HTMLElement>document.querySelector('.effects__audio');
    audioElement.pause();
    audioImage.classList.add('mute');
  }

  changeTree(): void {
    const treeElement = <HTMLElement>document.querySelector('.main-tree__img');
    const imageSrc = `../../../assets/tree/${this.treeImage}.png`;
    treeElement.setAttribute('src', imageSrc);
  }

  changeBg(): void {
    const mainContainer = <HTMLElement>document.querySelector('.main-tree-container');
    const imageSrc = `../../../assets/bg/${this.bgImage}.jpg`;
    mainContainer.style.backgroundImage = `url("${imageSrc}")`;
  }

  startSnow(): void {
    const snowContainer = <HTMLElement>document.querySelector('.main-tree__snowflakes-container');
    const snowButton = <HTMLElement>document.querySelector('.effects__snow');
    if (this.snow === 'off') {
      this.snow = 'on';
      snowContainer.classList.remove('hide');
      snowButton.classList.add('active');
      Snowflake.snowfall();
    } else if (this.snow === 'on') {
      this.snow = 'off';
      snowContainer.classList.add('hide');
      snowButton.classList.remove('active');
    }
  }

  choseGarland(): void {
    const garlandInput = <HTMLInputElement>document.querySelector('.garland-input');
    this.garland = 'on';
    garlandInput.checked = true;
    Garland.start(this.garlandColor);
  }

  checkGarlandInput(): void {
    const garlandContainer = <HTMLElement>document.querySelector('.main-tree__garland-container');
    const garlandInput = <HTMLInputElement>document.querySelector('.garland-input');
    if (garlandInput.checked === true) {
      this.garland = 'off';
      garlandContainer.innerHTML = '';
    } else if (garlandInput.checked === false) {
      this.garland = 'on';
      Garland.start(this.garlandColor);
    }
  }
}

export default Settings;
