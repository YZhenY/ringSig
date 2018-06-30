var modulus = (num, prime) => {
    if (num < 0) {
        var tempNum = -num;
        tempNum = tempNum % prime;
        num = prime - tempNum
    } else {
        num = num % prime;
    }
    return num;
}

var lambdaAddition = (point1, point2, prime) => {
    var top = point1.y - point2.y
    top = modulus(top, prime);

    var bottom = point1.x - point2.x
    bottom = modulus(bottom, prime)

    return top * findInverse(bottom, prime) % prime;
}

var lambdaDoubling = (point1, prime) => {
    var a = 1;
    var top = 3 * Math.pow(point1.x,2) + a
    var bottom = 2 * point1.y;

    return top * findInverse(bottom, prime) % prime;
}


var findInverse = (num, prime) => {
    num = num % prime;
    for (var i = 1; i < prime; i++) {
        if ((i * num) % prime === 1) return i;
    }
}

var computePoint = (point1, point2, prime) => {
    var lambda;
    if (point1.x === point2.x && point1.y === point2.y) {
        lambda = lambdaDoubling(point1, prime);
    } else {
        lambda = lambdaAddition(point1, point2, prime);
    }
    console.log('Lambda: ', lambda);
    var ex = modulus(lambda * lambda - point1.x - point2.x, prime);
    var why = modulus((point1.x - ex) * lambda - point1.y, prime);
    return {
        x: ex,
        y: why
    }
}

var computePoints = (generator, prime) => {
    var res = [];
    res.push(generator);
    res.push(computePoint(generator, generator, prime));
    for (var i = 0; i < 14; i++) {
        res.push(computePoint(res[res.length - 1], generator, prime));
        if (isNaN(res[res.length - 1].x)) console.log(i, 'IS NAN')
    }
    return res;
}

// console.log(findInverse(14, 11));
// console.log(lambdaDoubling({
//     x: 69,
//     y: 22
// }, 97));
// console.log(lambdaAddition(
//     {
//         x: 2,
//         y: 7
//     },
//     {
//         x: 5,
//         y: 2
//     },
// 11));

// console.log(computePoint({
//     x: 2,
//     y: 7
// },{
//     x: 2,
//     y: 7
// }, 11));

console.log(computePoints({
    x: 2,
    y: 7
}, 11))

// console.log(computePoints({
//     x: 69,
//     y: 22
// }, 97))