import p5 from 'p5'

export const mouseTest = (p: p5) => {

  p.setup = () => {
    p.createCanvas(640, 480);
    p.background(128, 128, 0, 255);
  }

  p.draw = () => {
    p.fill((p.mouseIsPressed) ? 0 : 255);
    p.ellipse(p.mouseX, p.mouseY, 80, 80);
  }

}
