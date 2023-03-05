import p5 from 'p5';

export const circleTest = (p: p5) => {

  p.setup = () => {
    p.createCanvas(640, 480);
    p.background(128, 0, 0, 255);
  }

  p.draw = () => {
    p.ellipse(50, 50, 80, 80);
  }

}
