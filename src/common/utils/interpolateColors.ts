/* https://codenebula.io/javascript/frontend/dataviz/2019/04/18/automatically-generate-chart-colors-with-chart-js-d3s-color-scales/ */
import { interpolateRainbow } from 'd3-scale-chromatic';

interface IColorRange {
  colorStart: number;
  colorEnd: number;
  useEndAsStart: boolean;
}

function interpolateColors(
  dataLength: number,
  colorScale = interpolateRainbow,
  colorRangeInfo = {
    colorStart: 0,
    colorEnd: 1,
    useEndAsStart: false,
  },
) {
  const { colorStart, colorEnd } = colorRangeInfo;
  const colorRange = colorEnd - colorStart;
  const intervalSize = colorRange / dataLength;
  let colorPoint;
  const colorArray = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < dataLength; i++) {
    colorPoint = calculatePoint(i, intervalSize, colorRangeInfo);
    colorArray.push(colorScale(colorPoint));
  }

  return colorArray;
}

function calculatePoint(idx: number, intervalSize: number, colorRangeInfo: IColorRange) {
  const { colorStart, colorEnd, useEndAsStart } = colorRangeInfo;
  return useEndAsStart ? colorEnd - idx * intervalSize : colorStart + idx * intervalSize;
}

export default interpolateColors;
