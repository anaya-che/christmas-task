import {
  ISettings,
} from '../../../types';

class Storage {
  settings: ISettings;

  garland: string;

  garlandColor: string;

  constructor() {
    this.settings = {
      music: 'off',
      snow: 'off',
      treeImage: '1',
      bgImage: '1',
    };
    this.garland = 'off';
    this.garlandColor = 'multicolor';
  }

  start(): void {
    this.getLocalStorage();
    const clearButton = <HTMLElement>document.querySelector('.clear-button');
    clearButton.addEventListener('click', this.clearStorage.bind(this));
  }

  setLocalStorage(): void {
    const settingsObj = JSON.stringify(this.settings);
    localStorage.setItem('settings', settingsObj);
    localStorage.setItem('garland', this.garland);
    localStorage.setItem('garlandColor', this.garlandColor);
  }

  getLocalStorage(): void {
    if (localStorage.getItem('settings')) {
      const settingsObj = <string>localStorage.getItem('settings');
      this.settings = JSON.parse(settingsObj);
    }
    if (localStorage.getItem('garland')) {
      this.garland = <string>localStorage.getItem('garland');
    }
    if (localStorage.getItem('garlandColor')) {
      this.garlandColor = <string>localStorage.getItem('garlandColor');
    }
  }

  clearStorage(): void {
    localStorage.clear();
    this.settings.music = 'off';
    this.settings.snow = 'off';
    this.settings.treeImage = '1';
    this.settings.bgImage = '1';
    this.garlandColor = 'multicolor';
    this.garland = 'off';
  }
}

export default Storage;
