import Snowflake from './snowfake';

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
    if (target.closest('.tree')) this.changeTree(target.id);
    if (target.closest('.bg')) this.changeBg(target.id);
    if (target.closest('.effects__snow')) this.startSnow();
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

  changeTree(id: string): void {
    const treeElement = <HTMLElement>document.querySelector('.main-tree__img');
    const imgNumber: string = id.split('-')[1];
    this.treeImage = imgNumber;
    const imageSrc = `../../../assets/tree/${this.treeImage}.png`;
    treeElement.setAttribute('src', imageSrc);
  }

  changeBg(id: string): void {
    const mainContainer = <HTMLElement>document.querySelector('.main-tree-container');
    const imgNumber: string = id.split('-')[1];
    this.bgImage = imgNumber;
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
}

export default Settings;
