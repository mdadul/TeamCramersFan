#include<bits/stdc++.h>
using namespace std;
// C201032 - Sorowar Mahabub

int main()
{
    int i, j, k, n, m;

    cout << "Enter the no. of rows and cols of the augmented matrix: " << endl;
    cin >> n >> m; // m must be greater than n, m= n+1

    double A_Mat[n][m];
    cout << endl << "Enter the augmented matrix elements: " << endl;
    for(i= 1; i<=n; i++)
        for(j= 1; j<=m; j++)
            cin >> A_Mat[i][j];

    // finding diagonal matrix elements
    for (int col = 1; col <= n; col++)
    {
        if (A_Mat[col][col] == 0)
        {
            cout << "Zero on the diagonal, unable to continue." << endl;
            return 0;  // Exit the program if zero on the diagonal
        }

        for (int row = 1; row <= n; row++)
        {
            if (row != col)
            {
                double frac = A_Mat[row][col] / A_Mat[col][col];
                for (k = 1; k <= n + 1; k++)
                    A_Mat[row][k] -= frac * A_Mat[col][k];
            }
        }
    }

    double Ans[n];
    for(i= 1; i<=n; i++)
        Ans[i]= A_Mat[i][n+1]/A_Mat[i][i];

    cout << endl << "X= " << Ans[1] << ", Y= " << Ans[2] << ", Z= " << Ans[3] << endl;

    return 0;
}
