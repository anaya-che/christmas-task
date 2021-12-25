import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import './slider.css';

class Slider {
  static start(): void {
    const countSlider = <noUiSlider.target>document.querySelector('.count-slider');
    const yearSlider = <noUiSlider.target>document.querySelector('.year-slider');

    noUiSlider.create(countSlider, {
      start: [1, 12],
      connect: true,
      step: 1,
      range: {
        min: 1,
        max: 12,
      },
      format: {
        to(value) {
          return Math.round(value);
        },
        from(value) {
          return Number(value);
        },
      },
    });

    noUiSlider.create(yearSlider, {
      start: [1940, 2020],
      connect: true,
      step: 10,
      range: {
        min: 1940,
        max: 2020,
      },
      format: {
        to(value) {
          return Math.round(value);
        },
        from(value) {
          return Number(value);
        },
      },
    });
  }
}

export default Slider;
