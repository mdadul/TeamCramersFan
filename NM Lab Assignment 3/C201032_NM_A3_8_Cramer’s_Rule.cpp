#include<bits/stdc++.h>
using namespace std;
// C201032 - Sorowar Mahabub

int main()
{
    int det[3][3], B[3], i, j, k, Ans_D0, Ans_D1, Ans_D2, Ans_D3, x, y, z;

    cout << "Enter the 3*3 matrix elements- A[]: " << endl;
    for(i= 0; i<3; i++)
        for(j= 0; j<3; j++)
            cin >> det[i][j];

    cout << endl << "Enter the 3*1 matrix elements- B[]: " << endl;
    for(k= 0; k<3; k++)
        cin >> B[k];

    //For Main Det:
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
        cout << "X= " << x << ", Y= " <<  y << ", Z= " <<  z << endl;
    }
    else
        cout << "There are Infinite solutions or NO solution." << endl;
    return 0;
}
