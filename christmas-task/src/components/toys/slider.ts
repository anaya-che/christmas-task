import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

class Slider {
  count: (string | number)[];

  constructor() {
    this.count = ['1', '12'];
  }

  start(): void {
    const slider = <noUiSlider.target>document.querySelector('.count-slider');
    noUiSlider.create(slider, {
      start: [1, 12],
      connect: true,
      step: 1,
      range: {
        min: 1,
        max: 12,
      },
    });

    this.getValues();
  }

  getValues(): void {
    const lowerValue = <HTMLElement>document.querySelector('.count-value_lower');
    const upperValue = <HTMLElement>document.querySelector('.count-value_upper');
    const slider = <noUiSlider.target>document.querySelector('.count-slider');
    this.count = [];
    (<noUiSlider.API>slider.noUiSlider).on('change', (values: (string | number)[]) => {
      lowerValue.textContent = <string>values[0];
      upperValue.textContent = <string>values[1];
      this.count = values;
    });
  }
}

export default Slider;
