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
    for(i= 0; i<n; i++)
        for(j= 0; j<m; j++)
            cin >> A_Mat[i][j];

    /* for n equations there will be n unknowns which will be stored in array 'res' */
    double Ans[n];

    for(i=0; i<n; i++)
    {
        for(j=i+1; j<n; j++)
        {
            if(abs(A_Mat[i][i]) < abs(A_Mat[j][i]))
            {
                for(k=0; k<n+1; k++)
                {
                    A_Mat[i][k]=A_Mat[i][k]+A_Mat[j][k];
                    A_Mat[j][k]=A_Mat[i][k]-A_Mat[j][k];
                    A_Mat[i][k]=A_Mat[i][k]-A_Mat[j][k];
                }
            }
        }
    }

    /* performing Gaussian elimination */
    for(int row= 0; row<n-1; row++)
        for(int col= row+1; col<n; col++)
        {
            double frac= A_Mat[col][row]/A_Mat[row][row];
            for(k= 0; k<n+1; k++)
            {
                double temp= frac*A_Mat[row][k];
                A_Mat[col][k]-= temp;
            }
        }


    /* Backward substitution for discovering values of unknowns */
    for(i= n-1; i>=0; i--)
    {
        Ans[i]= A_Mat[i][n];
        for(j= i+1; j<n; j++)
        {
            if(i!=j)
                Ans[i]-= A_Mat[i][j]*Ans[j];
        }
        Ans[i]/= A_Mat[i][i];
    }
    /*
    (i = 2):
    Ans[2] = A_Mat[2][3] >> Z=  A_Mat[2][3]
    (i = 1):
    Ans[1] = A_Mat[1][3]
    Ans[1] = Ans[1] - A_Mat[1][2] * Ans[2] >> Y= Y - A_Mat[1][2]*Z
    (i = 0):
    Ans[0] = A_Mat[0][3]
    Ans[0] = Ans[0] - A_Mat[0][1] * Ans[1] - A_Mat[0][2] * Ans[2] >> X= X - A_Mat[0][1]*Z - A_Mat[0][2] *Z
    */

    cout << endl << "X= " << Ans[0] << ", Y= " << Ans[1] << ", Z= " << Ans[2] <<endl;
    for(i=0; i<n; i++)
    {
        cout << Ans[i]<<"\n";
    }

    return 0;
}
