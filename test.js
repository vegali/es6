function sum(...nums){
    var su = 0;
    for (var val of nums){
        su += val;
    }
    return su;
}

sum(1,2,3,4,5,6,7,8,9,10)