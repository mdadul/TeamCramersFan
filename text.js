function jacobiMethod(coefficients, constants, initialGuess, tolerance, maxIterations) {
    const n = coefficients.length;
    let x = initialGuess.slice();

    for (let iteration = 0; iteration < maxIterations; iteration++) {
        const xNext = [];

        for (let i = 0; i < n; i++) {
            let sum = constants[i];
            for (let j = 0; j < n; j++) {
                if (i !== j) {
                    sum -= coefficients[i][j] * x[j];
                }
            }
            xNext[i] = sum / coefficients[i][i];
        }

        // Check for convergence
        let maxDiff = 0;
        for (let i = 0; i < n; i++) {
            const diff = Math.abs(xNext[i] - x[i]);
            if (diff > maxDiff) {
                maxDiff = diff;
            }
        }

        if (maxDiff < tolerance) {
            console.log(`Converged in ${iteration + 1} iterations`);
            return xNext;
        }

        x = xNext.slice();
    }

    console.log(`Did not converge within ${maxIterations} iterations`);
    return null;
}

// Example usage:
const coefficients = [
    [4, -1, 0],
    [-1, 4, -1],
    [0, -1, 4]
];

const constants = [15, 10, 10];
const initialGuess = [0, 0, 0];
const tolerance = 0.0001;
const maxIterations = 100;

const solution = jacobiMethod(coefficients, constants, initialGuess, tolerance, maxIterations);
console.log("Solution:", solution);


