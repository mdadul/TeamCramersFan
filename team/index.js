// index.js
function analyzeMatrix(matrixValues,b) {
    // Check if the input array has exactly 9 elements
    if (matrixValues.length !== 9) {
        console.error("Invalid number of elements in the matrixValues array. It should have exactly 9 elements.");
        return;
    }
   // console.log(matrixValues);
    const det = [];
    for (let i = 0; i < 3; i++) {
        det.push(matrixValues.slice(i * 3, (i + 1) * 3));
    }
    const extra = det;
    //console.log(extra);
    for(let i = 0;i<3;i++)
    {
        extra[i].push(b[i]);
    }
    //console.log(extra);
    // console.log("Matrix values in index.js:");
  //  console.log(det);
    // Inverse_matrix(det);
    // console.log(b);
    console.log("crammer below ");
    crammer(det,b);


    console.log("gousiaan bellow " + " " +  gaussElimination(extra))
    console.log("inverse   >  " + solve(det,b));
}


function crammer(det,B)
{
    /// perfectly choltese
    Ans_D0 = (det[0][0] * ((det[1][1] * det[2][2]) - (det[2][1] * det[1][2]))) - (det[0][1] * ((det[1][0] * det[2][2]) - (det[2][0] * det[1][2]))) + (det[0][2] * ((det[1][0] * det[2][1]) - (det[2][0] * det[1][1])));
    //For X:
    Ans_D1 = (B[0] * ((det[1][1] * det[2][2]) - (det[2][1] * det[1][2]))) - (det[0][1] * ((B[1] * det[2][2]) - (B[2] * det[1][2]))) + (det[0][2] * ((B[1] * det[2][1]) - (B[2] * det[1][1])));
    //For Y:
    Ans_D2 = (det[0][0] * ((B[1] * det[2][2]) - (B[2] * det[1][2]))) - (B[0] * ((det[1][0] * det[2][2]) - (det[2][0] * det[1][2]))) + (det[0][2] * ((det[1][0] * B[2]) - (det[2][0] * B[1])));
    //For Z:
    Ans_D3 = (det[0][0] * ((det[1][1] * B[2]) - (det[2][1] * B[1]))) - (det[0][1] * ((det[1][0] * B[2]) - (det[2][0] * B[1]))) + (B[0] * ((det[1][0] * det[2][1]) - (det[2][0] * det[1][1])));

    if (Ans_D0 != 0)
    {
        x= (Ans_D1/Ans_D0);
        y= (Ans_D2/Ans_D0);
        z= (Ans_D3/Ans_D0);
        //cout << Ans_D0 <<  " "  << Ans_D1 <<  " " <<  Ans_D2 <<  " "  <<  Ans_D3 << endl; // to check
       console.log(x + " " + y + " " + z);
    }
    else 
    {
        console.error("There are Infinite solutions or NO solution.");
    }
}

function gaussElimination(matrix) {
    // eita kaaj krotese
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

  return solution;
}


