var rect = require('./rectangle')

function solveRect(l,b) {
    console.log("Solving for rectangle with l = " + l + "breadth = " + b);
    
    rect(l,b,(err, rectangle) => {
        if(err) {
            console.log("Error: ", err.message);
        } else {

            console.log("Peri: " + rectangle.peri());
            console.log("Area: " + rectangle.area());
            
        }
    });

    console.log("This is after call");
}
solveRect(2, 5)
solveRect(3, 4)
solveRect(1, 8)
solveRect(-3, 6)