/**************************            数组              ********************************/
/* //push 弹出数组尾的一个元素
let fruits = ['Apple', 'Orange'];
fruits.push('Pear');

alert(fruits); // Apple, Orange, Pear
console.log(fruits.length);

// 为数组添加元素
let fruits1 = ['Apple'];
// push可以为数组尾添加元素，unshift可以在数组头添加元素
fruits1.push('Orange', 'Peach');
fruits1.unshift('Pineapple', 'Lemon');

// 数组变更为['Pineapple', 'Lemon', 'Apple', 'Orange', 'Peach']
alert(fruits1);
// 数组遍历
for (let fruit of fruits1) {
    alert(fruit);
}
// 数组转换为字符串
// 数组有自己的 toString 方法的实现，会返回以逗号隔开的元素列表。

let arr = [1, 2, 3];

alert(arr); // 1,2,3
alert(String(arr) === '1,2,3'); // true */


/* let numList = [0, 1, 2, 3, 4, 5, 6];
// 简单的头尾添加删除
numList.push('a', 'b');
numList.unshift('AAAA', 'B', 'C');
console.log(numList); //['AAAA', 'B', 'C', 0, 1, 2, 3, 4, 5, 6, 'a', 'b']
console.log(numList.pop()); //b
console.log(numList.shift()); //AAAA
console.log(numList); //['B', 'C', 0, 1, 2, 3, 4, 5, 6, 'a']
//接下来练习splice函数
numList.splice(3, 2);
console.log(numList); //['B', 'C', 0, 3, 4, 5, 6, 'a']
numList.splice(3, 0, 'q', 'd');
console.log(numList); //['B', 'C', 0, 'q', 'd', 3, 4, 5, 6, 'a']

// 使用splice删除的元素可以被统计
let removed = numList.splice(2); //只有第一个参数时，将会删除此后所有元素
console.log(removed);
console.log(numList);
numList.splice(2, 0, removed);
console.log(numList); //['B', 'C', Array(8)]
console.log('numList数组长度为' + numList.length); //数组长度为3，第三项为一个长度为8的数组
// 允许负向索引
let numList1 = [-5, -4, -3, -2, -1];
console.log(numList1.splice(-1, 1)); //移除倒数第一个元素
numList1.push(-1);
console.log(numList1.splice(-3, 2, 'a', 'b'));
console.log(numList1);

// slice更加简洁，会返回一个新的数组，不影响最开始的
let arr1 = [0, 1, 2, 3, 4, 5];
let arr2 = arr1.slice(1, 3); //不会包含末尾的元素
console.log(arr2);
console.log(arr1);
//concat可以用于合并多个数组
console.log(arr1.concat(arr2, 'AAAA'));
console.log(arr2.concat(arr1));
// forEach 为数组中每个元素都执行一次函数
["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
    document.write(`${item} is at index ${index} in ${array}</br>`);
});
// 形如${ }是字符串插值，是一种句法表达式
// =>是箭头函数
// 此处使用模板字面量，用反引号定义，会保留换行符
// document.write 要借助标签 </br>换行
["Bilbo", "Gandalf", "Nazgul"].forEach(function writeDown(item, index, array) {
    document.write(`${item} is at index ${index} in ${array}</br>`);
});

// 在数组中搜索
console.log(arr1);
console.log(arr1.indexOf(2, 1)); //顺序搜索，从索引1开始搜索2
console.log(arr1.lastIndexOf(2, 4)); //逆序搜索
console.log(arr1.includes('A'));
console.log(arr1.find((item) => item > 1));
console.log(arr1.filter((item) => item > 1)); //不太标准，没有设置返回值
console.log(arr1.filter(function(item) {
    if (item > 1)
        return true;
})); //强调返回值

// map对数组中所有元素调用函数，并返回结果
let arr12 = arr1.map((item, index, array) => item * item);
console.log(arr12);
let arr13 = arr1.map(function getDouble(item) {
    return item * 2;
})
console.log(arr13);

[1, -2, 15, 2, 0, 8].sort(function(a, b) {
    document.write(a + " <> " + b);
    return a - b;
});

let arrCompar = [1, 12, 0, -3, 5];
// arrCompar.sort((a, b) => a - b);
function comparNum(a, b) {
    if (a - b > 0) return 1;
    if (a - b == 0) return 0;
    if (a - b < 0) return -1;
}
//只要引入的比较函数能把大小分别用正负表示即可
console.log(arrCompar.sort(comparNum));
console.log(arrCompar.reverse()); //数组倒序
console.log(arrCompar.sort(comparNum));


//字符串排序
let countries = ['Österreich', 'Andorra', 'Vietnam'];
console.log(countries.sort());
// 但是这样容易出错，最好换个方法str.localcompar来比较字符串
console.log(countries.sort((a, b) => a.localeCompare(b))); */

/**************************           函数              ********************************/
// 函数是一个值
function sayHi() {
    document.write('Hi World');
}
let sayHello = function() {
    document.write('Hello');
}
console.log(sayHi);
console.log(sayHello);
// arguments的使用
function learnArguments() {
    console.log(arguments); //以伪数组的形式存储所有传递的实参
    //伪数组：有数组的length属性，按照索引方式存储，没有数组的方法(因此遍历的时候不能用forEach方法)

}
learnArguments(1, 2, 3, 4, 5);