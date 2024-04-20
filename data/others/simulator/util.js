/**
 * create time interval
 * @milliseconds {number} milliseconds
 */
function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

/**
 * create random number by input range
 * @min {number} min number
 * @max {number} max number
 */
function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * get y axis value from smoothstep function (0 <= x <= 1)
 * graph: https://www.desmos.com/calculator/xodggesqsk
 * @x {number} x axis value of smoothstep function (0 <= x <= 1)
 */
function smoothstep(x) {
  return x * x * (3 - 2 * x);
}

/**
 * create smooth curve array data from smoothstep function
 * @max {number} max value of array
 * @length {number} length of array
 * @isReverse {boolean} reverse array if set to true
 */
// Create smoothstep values from 0 to max
function createCurveData(max, length, isReverse) {
  const xMin = 0;
  const xMax = 1;

  var values = [];

  for (let i = xMin; i <= xMax; i += 1 / length) {
    const x = i;
    const y = smoothstep(x);

    values.push(y * max);
  }

  if (isReverse) {
    return values.reverse();
  } else {
    return values;
  }
}
