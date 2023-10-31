#include<bits/stdc++.h>
using namespace std;
// C201032 - Sorowar Mahabub

double func(double x)
{
    return 5 * log10(x);
}

double trapezoidal_rule(double a, double b, int n)
{
    double h, sum, x_i;
    h= (b - a) / n;
    sum= (func(a) + func(b)) / 2.0;

    for (int i= 1; i<n; i++)
    {
        x_i = a + i * h;
        sum += func(x_i);
    }
    return sum * h;
}

int main()
{
    double a, b, Area;
    a= 1.0;  // lower limit
    b = 10.0; // upper limit
    int n = 6;       // no. of intervals
    //cout << "Enter lower limit (a), upper limit (b), no. of intervals (n): " << endl;
    //cin >> a >> b >> n;

    Area= trapezoidal_rule(a, b, n);
    cout << "Answer: " << Area << endl;

    return 0;
}

