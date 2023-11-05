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

    int d= Ans;
    if(d!=0)
    {
        cout<<"\nThe Inverse matrix is:" << endl;
        for(int i = 0; i < 3; i++)
        {
            for(int j = 0; j < 3; j++)
                cout<<((det[(j+1)%3][(i+1)%3] * det[(j+2)%3][(i+2)%3]) - (det[(j+1)%3][(i+2)%3] * det[(j+2)%3][(i+1)%3]))/ d<<"\t";
            cout << endl;
        }
    }
    else
        cout<<"Inverse does'nt exist for this matrix";

    return 0;
}
