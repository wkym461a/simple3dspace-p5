import p5 from 'p5';
import { Player } from './player';
import { Ray2D } from './ray2d';
import { Vector2D } from './vector2d';

// 参考: https://editor.p5js.org/AosagiHeron/sketches/w5wnTmc71
export const simpleFPS = (p: p5) => {

  p.setup = () => {
    p.createCanvas(640, 360);

    Player.shared.overwrite({
      position: new Vector2D({ x: 100, y: 200 }),
      angle_rad: -p.PI / 2,
    });
  }

  p.draw = () => {
    p.background(60);

    p.strokeWeight(3);
    p.stroke('white');

    const pointA = new Vector2D({ x: 50, y: 50 });
    const pointB = new Vector2D({ x: 100, y: 300 });
    const pointC = new Vector2D({ x: 250, y: 200 });

    // 壁の描画
    const walls = [
      Ray2D.createFrom2Points({ begin: pointA, end: pointB }),
      Ray2D.createFrom2Points({ begin: pointB, end: pointC }),
      Ray2D.createFrom2Points({ begin: pointC, end: pointA }),
    ];
    walls.forEach(w => { p.line(w.begin.x, w.begin.y, w.end.x, w.end.y) });

    // Playerの描画
    p.stroke('yellow');
    p.strokeWeight(20);
    p.point(Player.shared.position.x, Player.shared.position.y);

    // キー入力
    if (p.keyIsDown(p.LEFT_ARROW)) {
      Player.shared.overwrite({ angle_rad: Player.shared.angle_rad - p.PI / 120 });
    }
    if (p.keyIsDown(p.RIGHT_ARROW)) {
      Player.shared.overwrite({ angle_rad: Player.shared.angle_rad + p.PI / 120 });
    }

    const moveStep = 0.5;
    const moveAngle_rad = Player.shared.angle_rad;
    if (p.keyIsDown(87)) { // W
      Player.shared.position.overwrite({
        x: Player.shared.position.x + p.cos(moveAngle_rad) * moveStep,
        y: Player.shared.position.y + p.sin(moveAngle_rad) * moveStep,
      });
    }
    if (p.keyIsDown(65)) { // A
      Player.shared.position.overwrite({
        x: Player.shared.position.x + p.cos(-p.PI / 2 + moveAngle_rad) * moveStep,
        y: Player.shared.position.y + p.sin(-p.PI / 2 + moveAngle_rad) * moveStep,
      });
    }
    if (p.keyIsDown(83)) { // S
      Player.shared.position.overwrite({
        x: Player.shared.position.x + p.cos(p.PI + moveAngle_rad) * moveStep,
        y: Player.shared.position.y + p.sin(p.PI + moveAngle_rad) * moveStep,
      });
    }
    if (p.keyIsDown(68)) { // D
      Player.shared.position.overwrite({
        x: Player.shared.position.x + p.cos(p.PI / 2 + moveAngle_rad) * moveStep,
        y: Player.shared.position.y + p.sin(p.PI / 2 + moveAngle_rad) * moveStep,
      });
    }

    // プレイヤーの視界を描画
    const fov = p.PI / 2;
    const centerAngle_rad = Player.shared.angle_rad;
    const leftAngle_rad = centerAngle_rad - fov / 2;
    const rightAngle_rad = centerAngle_rad + fov / 2;
    const beamTotal = 30;
    let beamIndex = -1;
    for (let angle_rad = leftAngle_rad; angle_rad < rightAngle_rad + 0.01; angle_rad += fov / beamTotal) {
      beamIndex++;
      const unitVector = new Vector2D({ x: p.cos(angle_rad), y: p.sin(angle_rad) });
      let beam = new Ray2D({
        origin: Vector2D.copy(Player.shared.position),
        direction: unitVector.scaled(100),
      });

      p.stroke('yellow');
      p.strokeWeight(2);
      p.line(beam.begin.x, beam.begin.y, beam.end.x, beam.end.y);

      for (let wall of walls) {
        let hitPos = beam.intersection(wall);
        if (hitPos === null) { continue }

        p.stroke('yellow');
        p.strokeWeight(10);
        p.point(hitPos.x, hitPos.y);

        // 3Dビューに描画
        let viewRoot = new Vector2D({ x: 320, y: 180 });
        let wallDist = hitPos.subtracted(beam.begin).magunitude;
        let wallPerpDist = wallDist * p.cos(angle_rad - centerAngle_rad);
        let lineHeight = 2800 / wallPerpDist;
        let lineBegin = viewRoot.added(new Vector2D({
          x: 300 / beamTotal * beamIndex,
          y: -lineHeight / 2
        }));
        let lineEnd = lineBegin.added(new Vector2D({ x: 0, y: lineHeight }));

        p.stroke('white');
        p.strokeWeight(4);
        p.line(lineBegin.x, lineBegin.y, lineEnd.x, lineEnd.y);
      }
    }
  }

}
