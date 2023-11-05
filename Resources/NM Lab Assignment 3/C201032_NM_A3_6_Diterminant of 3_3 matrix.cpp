#include<bits/stdc++.h>
using namespace std;
// C201032 - Sorowar Mahabub

int main()
{
    int det[3][3], i, j, Ans;

    cout << "Enter the 3*3 matrix elements: " << endl;
    for(i= 0; i<3; i++)
        for(j= 0; j<3; j++)
            cin >> det[i][j];

    // method: 01
    //Ans = (det[0][0] * ((det[1][1] * det[2][2]) - (det[2][1] * det[1][2]))) - (det[0][1] * ((det[1][0] * det[2][2]) - (det[2][0] * det[1][2]))) + (det[0][2] * ((det[1][0] * det[2][1]) - (det[2][0] * det[1][1])));

    // method: 02
    for(int k = 0; k<3; k++)
        Ans = Ans + (det[0][k] * (det[1][(k+1)%3] * det[2][(k+2)%3] - det[1][(k+2)%3] * det[2][(k+1)%3]));
    cout << "The d of given matrix is " << Ans << endl;

    return 0;
}
