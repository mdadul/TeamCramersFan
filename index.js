function analyzeMatrix(matrixValues, b) {
  if (matrixValues.length !== 9) {
    document.getElementById("errorMsg").innerHTML = "Invalid matrix size.";
    return;
  }
  const det = [];
  for (let i = 0; i < 3; i++) {
    det.push(matrixValues.slice(i * 3, (i + 1) * 3));
  }

  const extra = det;

  for (let i = 0; i < 3; i++) {
    extra[i].push(b[i]);
  }

  const matrixB = [[b[0]], [b[1]], [b[2]]];

  let extras = extra;

  showLogMsg("Inverse Matrix sol: ", [inverseMatrixs(extras, matrixB)]);

  crammer(det, b);

  gaussElimination(extra);

  // jacobi
  const x = [0, 0, 0];

  const maxIterations = 1000;
  const tolerance = 1e-6;

  jacobiMethod(det, b, x, maxIterations, tolerance);
}

function crammer(det, B) {
  /// perfectly choltese
  Ans_D0 =
    det[0][0] * (det[1][1] * det[2][2] - det[2][1] * det[1][2]) -
    det[0][1] * (det[1][0] * det[2][2] - det[2][0] * det[1][2]) +
    det[0][2] * (det[1][0] * det[2][1] - det[2][0] * det[1][1]);
  //For X:
  Ans_D1 =
    B[0] * (det[1][1] * det[2][2] - det[2][1] * det[1][2]) -
    det[0][1] * (B[1] * det[2][2] - B[2] * det[1][2]) +
    det[0][2] * (B[1] * det[2][1] - B[2] * det[1][1]);
  //For Y:
  Ans_D2 =
    det[0][0] * (B[1] * det[2][2] - B[2] * det[1][2]) -
    B[0] * (det[1][0] * det[2][2] - det[2][0] * det[1][2]) +
    det[0][2] * (det[1][0] * B[2] - det[2][0] * B[1]);
  //For Z:
  Ans_D3 =
    det[0][0] * (det[1][1] * B[2] - det[2][1] * B[1]) -
    det[0][1] * (det[1][0] * B[2] - det[2][0] * B[1]) +
    B[0] * (det[1][0] * det[2][1] - det[2][0] * det[1][1]);

  if (Ans_D0 != 0) {
    x = Ans_D1 / Ans_D0;
    y = Ans_D2 / Ans_D0;
    z = Ans_D3 / Ans_D0;
    //cout << Ans_D0 <<  " "  << Ans_D1 <<  " " <<  Ans_D2 <<  " "  <<  Ans_D3 << endl; // to check
    const solution = [x, y, z];

    showLogMsg("Cramer's Rule", [solution]);
  } else {
    const errorMsg = document.getElementById("errorMsg");
    errorMsg.innerHTML = "There are Infinite solutions or NO solution.";
  }
}

function gaussElimination(matrix) {
  const n = matrix.length;

  for (let i = 0; i < n; i++) {
    let divisor = matrix[i][i];
    for (let j = i; j < n + 1; j++) {
      matrix[i][j] /= divisor;
    }
    for (let k = 0; k < n; k++) {
      if (k !== i) {
        let factor = matrix[k][i];
        for (let j = i; j < n + 1; j++) {
          matrix[k][j] -= factor * matrix[i][j];
        }
      }
    }
  }
  let solution = new Array(n);
  for (let i = 0; i < n; i++) {
    solution[i] = matrix[i][n];
  }

  showLogMsg("Gauss Elimination : ", [solution]);

  return solution;
}

function matrixMultiplication(matrixA, matrixB) {
  let result = [];
  for (let i = 0; i < 3; i++) {
    result[i] = [];
    for (let j = 0; j < 3; j++) {
      result[i][j] = 0;
      for (let k = 0; k < 3; k++) {
        result[i][j] += matrixA[i][k] * matrixB[k][j];
      }
    }
  }
  return result;
}

function multiply(matrix1, matrix2) {
  if (
    matrix1.length !== 3 ||
    matrix1[0].length !== 3 ||
    matrix2.length !== 3 ||
    matrix2[0].length !== 1
  ) {
    document.getElementById("logMsg").innerHTML =
      "Invalid matrix dimensions for multiplication.";
    return null;
  }

  let result = [[0], [0], [0]];

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      result[i][0] += matrix1[i][j] * matrix2[j][0];
    }
  }

  return result;
}

function inverseMatrixs(det, b) {
  const n = det.length;

  let inverseMatrix = [];
  for (let i = 0; i < n; i++) {
    inverseMatrix[i] = [];
    for (let j = 0; j < n; j++) {
      inverseMatrix[i][j] = 0;
    }
  }
  let Ans = 0.0;
  for (let k = 0; k < n; k++) {
    Ans +=
      det[0][k] *
      (det[1][(k + 1) % n] * det[2][(k + 2) % n] -
        det[1][(k + 2) % n] * det[2][(k + 1) % n]);
  }

  let d = Ans;

  document.getElementById("logMsg").innerHTML = "Determinant: " + d;

  if (d !== 0) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        inverseMatrix[i][j] =
          (det[(j + 1) % n][(i + 1) % n] * det[(j + 2) % n][(i + 2) % n] -
            det[(j + 1) % n][(i + 2) % n] * det[(j + 2) % n][(i + 1) % n]) /
          d;
      }
    }
  } else {
    console.table("Inverse doesn't exist for this matrix");
  }
  // X = A-1 * B;
  // console.table(b);
  return multiply(inverseMatrix, b);
}

function jacobiMethod(A, b, x, maxIterations, tolerance) {
  // const n = b.length;
  // const x_new = new Array(n);

  // for (let iter = 0; iter < maxIterations; ++iter) {
  //   for (let i = 0; i < n; ++i) {
  //     x_new[i] = b[i];

  //     for (let j = 0; j < n; ++j) {
  //       if (i !== j) {
  //         x_new[i] -= A[i][j] * x[j];
  //       }
  //     }

  //     x_new[i] /= A[i][i];
  //   }

  //   // Check for convergence
  //   let maxDiff = 0.0;
  //   for (let i = 0; i < n; ++i) {
  //     maxDiff = Math.max(maxDiff, Math.abs(x_new[i] - x[i]));
  //   }

  //   // Update solution
  //   for (let i = 0; i < n; ++i) {
  //     x[i] = x_new[i];
  //   }

  //   // Check for convergence
  //   if (maxDiff < tolerance) {
  //     console.log(`Converged after ${iter + 1} iterations.`);

  //     showLogMsg("Jacobi Method", [x]);
  //     return;
  //   }
  // }

  // document.getElementById("logMsg").innerHTML =
  //   "Maximum number of iterations reached";

  // const n = b.length;
  // const x_new = new Array(n);

  // do {
  //   for (let i = 0; i < n; ++i) {
  //     x_new[i] = b[i];

  //     for (let j = 0; j < n; ++j) {
  //       if (i !== j) {
  //         x_new[i] -= A[i][j] * x[j];
  //       }
  //     }

  //     x_new[i] /= A[i][i];
  //   }

  //   // Calculate errors
  //   const errors = x.map((xi, i) => Math.abs(xi - x_new[i]));

  //   // Update solution
  //   x = x_new.slice();

  //   // Check for convergence
  // } while (errors.some((error) => error > tolerance));

  // return x;
}

// Main program

function submitForm(event) {
  event.preventDefault();

  const matrixValues = [];
  for (let i = 1; i <= 12; i++) {
    if (i === 4 || i === 8 || i === 12) continue;
    const inputValue = document.getElementById(`input${i}`).value;
    matrixValues.push(inputValue);
  }
  const b = [];
  for (let i = 1; i <= 12; i++) {
    if (i !== 4 && i !== 8 && i !== 12) continue;
    const inputValue = document.getElementById(`input${i}`).value;
    b.push(inputValue);
  }

  //  console.log(matrixValues);
  analyzeMatrix(matrixValues, b);
}

function resetForm() {
  for (let i = 1; i <= 12; i++) {
    document.getElementById(`input${i}`).value = "";
  }

  resetLog();
}

function randomize() {
  for (let i = 1; i <= 12; i++) {
    if (i === 4 || i === 8 || i === 12) continue;
    document.getElementById(`input${i}`).value = Math.floor(
      Math.random() * 100
    );
  }
  for (let i = 1; i <= 12; i++) {
    if (i !== 4 && i !== 8 && i !== 12) continue;
    document.getElementById(`input${i}`).value = Math.floor(
      Math.random() * 100
    );
  }
}

function showLogMsg(title, matrix) {
  const logMsg = document.getElementById("logMsg");

  const p = document.createElement("p");

  p.style = "font-weight: bold";

  p.innerHTML = title;

  logMsg.appendChild(p);

  const table = document.createElement("table");
  for (let i = 0; i < matrix.length; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < matrix[i].length; j++) {
      const col = document.createElement("td");
      col.style = "padding: 6px";
      col.innerHTML = matrix[i][j];
      row.appendChild(col);
    }
    table.appendChild(row);
  }

  logMsg.appendChild(table);

  const hr = document.createElement("hr");
  logMsg.appendChild(hr);

  logMsg.scrollTop = logMsg.scrollHeight;
}

function resetLog() {
  const logMsg = document.getElementById("logMsg");
  logMsg.innerHTML = "";
}

function closeModal() {
  document.getElementById("team").style.display = "none";
}

function showTeam() {
  document.getElementById("team").style.display = "block";
}

// chart

const ctx = document.getElementById("myChart");

new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Inverse", "Cramer's", "Gauss El.", "Jaccobi"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

// team
