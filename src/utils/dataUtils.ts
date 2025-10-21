// Function to calculate Pearson correlation coefficient
// function calculateCorrelation(x: number[], y: number[]) {
//     const n = x.length;

//     // Calculate means
//     let sumX = 0,
//         sumY = 0;
//     for (let i = 0; i < n; i++) {
//         sumX += x[i];
//         sumY += y[i];
//     }
//     const meanX = sumX / n;
//     const meanY = sumY / n;

//     // Calculate covariance and variances
//     let covar = 0,
//         varX = 0,
//         varY = 0;
//     for (let i = 0; i < n; i++) {
//         const dx = x[i] - meanX;
//         const dy = y[i] - meanY;
//         covar += dx * dy;
//         varX += dx * dx;
//         varY += dy * dy;
//     }

//     return covar / Math.sqrt(varX * varY);
// }

// // Function to difference a time series
// function difference(arr: number[]) {
//     return arr.slice(1).map((val, i) => val - arr[i]);
// }

// // Example usage with random walk data
// const nPoints = 20;
// const series1 = Array(nPoints)
//     .fill('')
//     .map(() => Math.random());
// const series2 = Array(nPoints)
//     .fill('')
//     .map(() => Math.random());

// // Calculate raw correlation

// // Calculate correlation after differencing
// const diff1 = difference(series1);
// const diff2 = difference(series2);

export function getLinearRegressionLine(xyArray: string[][]): string[][] {
  const [xArray, yArray] = xyArray.reduce(
    (acc, curr) => {
      acc[0].push(Number(curr[0]));
      acc[1].push(Number(curr[1]));
      return acc;
    },
    [[], []] as number[][],
  );
  // Calculate Sums
  let xSum = 0,
    ySum = 0,
    xxSum = 0,
    xySum = 0;
  const count = xArray.length;
  for (let i = 0; i < count; i++) {
    xSum += xArray[i];
    ySum += yArray[i];
    xxSum += xArray[i] * xArray[i];
    xySum += xArray[i] * yArray[i];
  }

  // Calculate slope and intercept
  const slope = (count * xySum - xSum * ySum) / (count * xxSum - xSum * xSum);
  const intercept = ySum / count - (slope * xSum) / count;

  // Generate values
  const xValues: number[] = [];
  const yValues: number[] = [];
  const xMin = Math.round(Math.min(...xArray));
  const xMax = Math.round(Math.max(...xArray));
  for (let x = xMin; x <= xMax; x += 1) {
    xValues.push(x);
    yValues.push(x * slope + intercept);
  }
  const returnXyArray = [] as string[][];
  xValues.forEach((value, index) => {
    returnXyArray.push([`${value}`, `${yValues[index]}`]);
  });
  return returnXyArray;
}
export function getSlope(arrayIn: number[]): number {
  const [xArray, yArray] = arrayIn
    .filter((val) => val !== 0)
    .reduce(
      (acc, curr, index, arr) => {
        acc[0].push(index);
        acc[1].push((curr / arr[0]) * 100);
        return acc;
      },
      [[], []] as number[][],
    );
  // Calculate Sums
  let xSum = 0,
    ySum = 0,
    xxSum = 0,
    xySum = 0;
  const count = xArray.length;
  for (let i = 0; i < count; i++) {
    xSum += xArray[i];
    ySum += yArray[i];
    xxSum += xArray[i] * xArray[i];
    xySum += xArray[i] * yArray[i];
  }

  // Calculate slope and intercept
  return (count * xySum - xSum * ySum) / (count * xxSum - xSum * xSum);
}

export function getOffsetSlope(arrayIn: number[]): number {
  const min = Math.min(...arrayIn);
  const minIsNegative = min < 0;
  const offset = minIsNegative ? Math.abs(min) : 0;
  const [xArray, yArray] = arrayIn
    .filter((val) => val !== 0)
    .reduce(
      (acc, curr, index, arr) => {
        acc[0].push(index);
        acc[1].push(((curr + offset) / (arr[0] + offset)) * 100);
        return acc;
      },
      [[], []] as number[][],
    );
  // Calculate Sums
  let xSum = 0,
    ySum = 0,
    xxSum = 0,
    xySum = 0;
  const count = xArray.length;
  for (let i = 0; i < count; i++) {
    xSum += xArray[i];
    ySum += yArray[i];
    xxSum += xArray[i] * xArray[i];
    xySum += xArray[i] * yArray[i];
  }

  // Calculate slope and intercept
  return (count * xySum - xSum * ySum) / (count * xxSum - xSum * xSum);
}
