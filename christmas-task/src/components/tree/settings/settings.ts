import Snowflake from '../snowflake/snowflake';
import Garland from '../garland/garland';
import { ISettings } from '../../../types/types';
import Storage from './storage';

class Settings {
  garland: string;

  garlandColor: string;

  settings: ISettings;

  storage: Storage;

  constructor() {
    this.settings = {
      music: 'off',
      snow: 'off',
      treeImage: '1',
      bgImage: '1',
    };
    this.garland = 'off';
    this.garlandColor = 'multicolor';
    this.storage = new Storage();
  }

  start(): void {
    document.addEventListener('click', this.changeSettings.bind(this));
    this.storage.start();
    document.addEventListener('click', this.storage.setLocalStorage.bind(this));
    this.applySettings();
  }

  applySettings(): void {
    this.settings = this.storage.settings;

    if (this.settings.music === 'on') Settings.musicOn();
    else if (this.settings.music === 'off') Settings.musicOff();

    if (this.settings.snow === 'on') Settings.snowOn();
    else if (this.settings.snow === 'off') Settings.snowOff();
    this.changeTree();
    this.changeBg();
  }

  changeSettings(event: MouseEvent): void {
    const target = <HTMLElement>event.target;
    if (target.closest('.effects__audio')) this.playMusic();
    if (target.closest('.effects__snow')) this.startSnow();
    if (target.closest('.tree')) {
      const imgNumber: string = target.id.split('-')[1];
      this.settings.treeImage = imgNumber;
      this.changeTree();
    }
    if (target.closest('.bg')) {
      const imgNumber: string = target.id.split('-')[1];
      this.settings.bgImage = imgNumber;
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
    if (this.settings.music === 'off') {
      this.settings.music = 'on';
      Settings.musicOn();
    } else if (this.settings.music === 'on') {
      this.settings.music = 'off';
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
    const imageSrc = `../../../assets/tree/${this.settings.treeImage}.png`;
    treeElement.setAttribute('src', imageSrc);
  }

  changeBg(): void {
    const mainContainer = <HTMLElement>document.querySelector('.main-tree-container');
    const imageSrc = `../../../assets/bg/${this.settings.bgImage}.jpg`;
    mainContainer.style.backgroundImage = `url("${imageSrc}")`;
  }

  startSnow(): void {
    if (this.settings.snow === 'off') {
      this.settings.snow = 'on';
      Settings.snowOn();
    } else if (this.settings.snow === 'on') {
      this.settings.snow = 'off';
      Settings.snowOff();
    }
  }

  static snowOn(): void {
    const snowContainer = <HTMLElement>document.querySelector('.main-tree__snowflakes-container');
    const snowButton = <HTMLElement>document.querySelector('.effects__snow');
    snowContainer.classList.remove('hide');
    snowButton.classList.add('active');
    Snowflake.snowfall();
  }

  static snowOff(): void {
    const snowContainer = <HTMLElement>document.querySelector('.main-tree__snowflakes-container');
    const snowButton = <HTMLElement>document.querySelector('.effects__snow');
    snowContainer.classList.add('hide');
    snowButton.classList.remove('active');
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
