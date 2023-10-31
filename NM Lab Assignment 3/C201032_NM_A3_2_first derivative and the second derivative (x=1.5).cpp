#include<bits/stdc++.h>
using namespace std;
// C201032 - Sorowar Mahabub

int main()
{
    int n;
    cout << "Enter the number of data points: ";
    cin >> n;

    double x[n], y[n][n];
    int i, j;

    cout << "Enter the values of x and y: (with space)" << endl << endl;
    cout << "x " << "y" << endl;
    for(i = 0; i < n ; i++)
        cin >> x[i] >>  y[i][0];

    int row, col;
    for(row= 1; row < n; row++)
        for(col= 0; col < n-row; col++)
            y[col][row]= y[col+1][row-1] - y[col][row-1];

    cout << endl << "Difference Table- " << endl;
    for(i= 0; i < n; i++)
    {
        cout << x[i];
        for(j= 0; j < n-i ; j++)
            cout << "\t" << y[i][j];

        cout << endl;
    }

    double X= 1.5, h, u;
    //cout << "Enter the X: ";
    //cin >> X;
    h = x[1] - x[0];
    u = (X - x[0]) / h;

    double fD = y[0][1] + (2 * u - 1) * (y[0][2] / 2) + (3 * u * u - 6 * u + 2) * (y[0][3] / 6) + (4 * u * u * u - 18 * u * u + 22 * u - 6) * (y[0][4] / 24);
    double sD = y[0][2] + (6 * u - 6) * (y[0][3] / 6) + (12 * u * u - 36 * u + 22) * (y[0][4] / 24);


    cout << "First Derivative = " << fD/h << "\n";
    cout << "Second Derivative = " <<  sD/(h*h) << "\n";

    return 0;
}
