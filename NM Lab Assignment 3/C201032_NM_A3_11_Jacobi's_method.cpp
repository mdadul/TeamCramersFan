#include<bits/stdc++.h>
using namespace std;
// C201032 - Sorowar Mahabub

/*
Given system of linear equations:
83x+11y−4z=95
3x+8y+29z=71
7x+52y+13z=104
*/
#define func1(x,y,z)  (95 - 11*y + 4*z) / 83
#define func2(x,y,z)  (71 - 3*x - 29*z) / 8
#define func3(x,y,z)  (104 - 7*x - 52*y) / 13

int main()
{
    double x0 = 0, y0 = 0, z0 = 0, x1, y1, z1, e1, e2, e3, e= 0.005;
    cout << "Enter guess for X0, Y0, Z0: " << endl;
    cin >> x0 >> y0 >> z0;
    cout << "Enter Error limit, e: " << endl;
    cin >> e;

    cout << setprecision(4) << fixed;
    cout << endl << "Iteration\tX\t\tY\t\tZ" << endl;
    int i= 1;
    do
    {
        x1= func1(x0, y0, z0);
        y1= func2(x0, y0, z0);
        z1= func3(x0, y0, z0);
        cout << i << "\t" << x1 << "\t" << y1 << "\t" << z1 << endl;

        e1= fabs(x0 - x1);
        e2= fabs(y0 - y1);
        e3= fabs(z0 - z1);

        x0 = x1;
        y0 = y1;
        z0 = z1;
        i++;
    }
    while (e1 > e and e2 > e and e3 > e);

    cout << endl << "Answer: X= " << x1 << ", Y= " << y1 << ", Z= " << z1 << endl;
    return 0;
}
