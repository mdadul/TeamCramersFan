#include<bits/stdc++.h>
using namespace std;
// C201032 - Sorowar Mahabub

double func(double x)
{
    return exp(sin(x));
}

double simpsons_one_third(double a, double b, int n)
{
    double h, sum, x_i;
    h = (b - a) / n;
    sum = func(a) + func(b);

    for (int i = 1; i < n; i++)
    {
        x_i = a + i * h;
        sum += (i % 2 == 0) ? 2 * func(x_i) : 4 * func(x_i);
    }

    return sum * h / 3.0;
}

int main()
{
    double a, b, Area;
    a = M_PI / 2.0;  // lower limit (π/2)
    b = M_PI;        // upper limit (π)
    int n = 6;       // no. of intervals

    //cout << "Enter no. of intervals (n): " << endl;
    //cin >> n;

    Area = simpsons_one_third(a, b, n);
    cout << "Answer: " << Area << endl;

    return 0;
}
