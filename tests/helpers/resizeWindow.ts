const resizeWindow = (x: number, y: number) => {
  window.innerWidth = x;
  window.innerHeight = y;

  window.dispatchEvent(new Event('resize'));
};

export default resizeWindow;
