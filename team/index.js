
function analyzeMatrix(matrixValues, b) 
{

  if (matrixValues.length !== 9) {
    console.error(
      "Invalid number of elements in the matrixValues array. It should have exactly 9 elements."
    );
    return;
  }
  const det = [];
  for (let i = 0; i < 3; i++) {
    det.push(matrixValues.slice(i * 3, (i + 1) * 3));
  }
  const extra = det;
  
  for (let i = 0; i < 3; i++) 
  {
    extra[i].push(b[i]);
  }


  const matrixB = [
    [b[0]],
    [b[1]],
    [b[2]]
  ];




  let extras = extra;
  console.info("INverse matrix ");
  console.table(inverseMatrixs(extras,matrixB));
  
  crammer(det, b);
  console.info("Gauesssian ");
  console.table( gaussElimination(extra));
  
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
    console.info("Crammmer answer");
    console.table(x + " " + y + " " + z);
  } else {
    console.error("There are Infinite solutions or NO solution.");
  }
}

function gaussElimination(matrix) {
  // eita kaaj krotese
  const n = matrix.length;
  // for(let i = 0;i<n;i++)
  // {
  //   for(let j = 0;j<n;j++)
  //   {
  //     console.table(matrix[i][j]);
  //   }
  // }
 
  
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
  if (matrix1.length !== 3 || matrix1[0].length !== 3 || matrix2.length !== 3 || matrix2[0].length !== 1) {
    console.error("Invalid matrix dimensions for multiplication.");
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



function inverseMatrixs(det,b) {
  const n = det.length;
 console.table(b);
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
  if (d !== 0) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        inverseMatrix[i][j] =
          (det[(j + 1) % n][(i + 1) % n] * det[(j + 2) % n][(i + 2) % n] -
            det[(j + 1) % n][(i + 2) % n] * det[(j + 2) % n][(i + 1) % n]) /d;
      }
    }
  //  console.table("Inverse Matrix:");
    //console.table(inverseMatrix);
  } else {
    console.table("Inverse doesn't exist for this matrix");
  }
  // X = A-1 * B;
 // console.table(b);
  return multiply(inverseMatrix,b);
}


