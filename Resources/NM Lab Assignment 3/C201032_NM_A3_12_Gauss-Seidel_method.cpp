#include<bits/stdc++.h>
using namespace std;
// C201032 - Sorowar Mahabub

/*
Given system of linear equations:
10x1 + x2 + x3 = 12
2x1 + 10x2 + x3 = 13
2x1 + 2x2 + 10x3 = 14
*/
#define func1(x, y, z) (12 - x - z) / 10
#define func2(x, y, z) (13 - 2 * x - z) / 10
#define func3(x, y, z) (14 - 2 * x - 2 * y) / 10

int main() {
    double x0 = 0, y0 = 0, z0 = 0, x1, y1, z1, e1, e2, e3, e = 0.005;
    cout << "Enter guess for X0, Y0, Z0: " << endl;
    cin >> x0 >> y0 >> z0;
    cout << "Enter Error limit, e: " << endl;
    cin >> e;

    cout << setprecision(4) << fixed;
    cout << endl << "Iteration\tX\t\tY\t\tZ" << endl;
    int i = 1;
    do {
        x1 = func1(x0, y0, z0);
        y1 = func2(x1, y0, z0);  // Using the updated x1
        z1 = func3(x1, y1, z0);  // Using the updated x1 and y1
        cout << i << "\t" << x1 << "\t" << y1 << "\t" << z1 << endl;

        e1 = fabs(x0 - x1);
        e2 = fabs(y0 - y1);
        e3 = fabs(z0 - z1);

        x0 = x1;
        y0 = y1;
        z0 = z1;
        i++;
    } while (e1 > e && e2 > e && e3 > e);

    cout << endl << "Answer: X= " << x1 << ", Y= " << y1 << ", Z= " << z1 << endl;
    return 0;
}
