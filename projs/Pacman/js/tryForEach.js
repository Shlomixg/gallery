

var nums = [12, 4, 7, 11]

// for (var i = 0; i < nums.length; i++) {
//     var num = nums[i]
//     console.log('Num', num);
// }

function printVal(val, idx) {
    console.log('Val: ', val, idx);
}

nums.forEach(printVal);