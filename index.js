let X = [];
let Y = [];
let Z = [];

function analyzeMatrix(matrixValues, b) {
  if (matrixValues.length !== 9) {
    document.getElementById("errorMsg").innerHTML = "Invalid matrix size.";
    return;
  }
  const det = [];

  const extra_det = [];
  for (let i = 0; i < 3; i++) {
    det.push(matrixValues.slice(i * 3, (i + 1) * 3));
    extra_det.push(matrixValues.slice(i * 3, (i + 1) * 3));
  }

  const extra = det;

  for (let i = 0; i < 3; i++) {
    extra[i].push(b[i]);
  }
  // console.table(extra)
  const matrixB = [[b[0]], [b[1]], [b[2]]];

  let extras = extra;

  showLogMsg("Inverse Matrix sol: ", inverseMatrixs(extras, matrixB));

  crammer(extra_det, b);

  gaussElimination(extra);

  // jacobi
  const x = [0, 0, 0];

  const tolerance = 0.0001;
  const maxIterations = 5000;

  const jacobi = jacobiMethod(extra_det, b, x, tolerance, maxIterations);

  if (jacobi !== null) {
    X.push(jacobi[0]);
    Y.push(jacobi[1]);
    Z.push(jacobi[2]);
    showLogMsg("Jacobi Method", jacobi);
  } else {
    X.push(0);
    Y.push(0);
    Z.push(0);
  }

  showChart(X, Y, Z);
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

    X.push(x);
    Y.push(y);
    Z.push(z);

    showLogMsg("Cramer's Rule", solution);
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

  X.push(solution[0]);
  Y.push(solution[1]);
  Z.push(solution[2]);

  showLogMsg("Gauss Elimination : ", solution);

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

  X.push(result[0][0]);
  Y.push(result[1][0]);
  Z.push(result[2][0]);

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

function jacobiMethod(matrix, b, initial, tolerance, maxIterations) {
  const n = matrix.length;
  let x = initial.slice();

  for (let iteration = 0; iteration < maxIterations; iteration++) {
    const xNext = [];

    for (let i = 0; i < n; i++) {
      let sum = b[i];
      for (let j = 0; j < n; j++) {
        if (i !== j) {
          sum -= matrix[i][j] * x[j];
        }
      }
      xNext[i] = sum / matrix[i][i];
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
      console.log(`Converged in ${iteration + 1}itr `);
      return xNext;
    }

    x = xNext.slice();
  }
  const logMsg = document.getElementById("logMsg");
  const p = document.createElement("p");
  p.style = "font-weight: bold";
  p.style.color = "red";
  p.innerHTML = "Jacobi: Did not converge within " + maxIterations + " iter";

  logMsg.appendChild(p);

  return null;
}

// Main program

function submitForm(event) {
  event.preventDefault();

  X = [];
  Y = [];
  Z = [];

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

  analyzeMatrix(matrixValues, b);
}

function resetForm() {
  for (let i = 1; i <= 12; i++) {
    document.getElementById(`input${i}`).value = "";
  }
  X = [];
  Y = [];
  Z = [];
  showChart(X, Y, Z);
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
  const row = document.createElement("tr");

  for (let i = 0; i < matrix.length; i++) {
    const col = document.createElement("td");
    col.style = "padding: 6px";
    col.innerHTML = matrix[i];
    row.appendChild(col);
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

function showChart(X, Y, Z) {
  X.map((x, i) => {
    X[i] = x.toFixed(6);
  });

  Y.map((y, i) => {
    Y[i] = y.toFixed(6);
  });

  Z.map((z, i) => {
    Z[i] = z.toFixed(6);
  });

  var options = {
    series: [
      {
        name: "X",
        data: X,
      },
      {
        name: "Y",
        data: Y,
      },
      {
        name: "Z",
        data: Z,
      },
    ],
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Inverse Matrix",
        "Cramer's Rule",
        "Gauss Elimination",
        "Jacobi",
      ],
    },
    yaxis: {
      title: {
        text: "Solution",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  };

  var chart = new ApexCharts(document.getElementById("myChart"), options);
  chart.render();
}
