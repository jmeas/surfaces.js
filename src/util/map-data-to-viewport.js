import twoRotations from 'two-rotations';
import mapPoints from './map-points';
import LinearScale from './linear-scale';

// Scale the data according to the scale of the visualization,
// then rotate the points according to the visualization's orientation
export default function(options) {
  var {
    data, zoom, rotationMatrix,
    range, zScale,
    xResolution, xScale,
    yResolution, yScale
  } = options;
  var orientedPoint;

  var zLinearScale = new LinearScale({
    domain: range,
    range: [0, zScale]
  });

  var xLinearScale = new LinearScale({
    domain: [0, xResolution],
    range: [-xScale/2, xScale/2]
  });

  var yLinearScale = new LinearScale({
    domain: [0, yResolution],
    range: [-yScale/2, yScale/2]
  });

  return mapPoints(data, (t, x, y) => {

    // Because of the way the viewport axes are specified, we want our
    // z value to be along the negative y-axis
    orientedPoint = [
      xLinearScale.transformTo(x) * zoom,
      -zLinearScale.transformTo(data[x][y]) * zoom,
      yLinearScale.transformTo(y) * zoom
    ];

    t.push(twoRotations.rotate(orientedPoint, rotationMatrix));
  });
}
