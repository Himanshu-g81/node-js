var rect = require('./rectangle.js')

function solveRect(l,b) {
    console.log("Solving for rectangle with l = " + l + "breadth = " + b);
    if(l<=0 || b<=0) {
        console.log("Rectangle dimensions should be greater than 0");
    } else {
        console.log("Area of rectangle is " + rect.area(l,b));
        console.log("Peri of rectangle is " + rect.peri(l,b));
    }
}
solveRect(2, 5)
solveRect(3, 4)
solveRect(1, 8)
solveRect(-3, 6)