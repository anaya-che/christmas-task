class Snowflake {
  static createSnowFlake(): void {
    const snowFlakeContaiter = <HTMLElement>document.querySelector('.main-tree__snowflakes-container');
    const snowFlake = <HTMLElement>document.createElement('div');
    snowFlake.classList.add('snowflake');
    snowFlake.style.left = `${Math.random() * window.innerWidth}px`;
    snowFlake.style.animationDuration = `${Math.random() * 4 + 2}s`;
    snowFlake.style.opacity = Math.random().toString();
    const size = Math.random() * 10 + 10;
    snowFlake.style.width = `${size}px`;
    snowFlake.style.height = `${size}px`;

    snowFlakeContaiter.appendChild(snowFlake);

    setTimeout(() => {
      snowFlake.remove();
    }, 5000);
  }

  static snowfall() {
    setInterval(Snowflake.createSnowFlake, 50);
  }
}

export default Snowflake;
