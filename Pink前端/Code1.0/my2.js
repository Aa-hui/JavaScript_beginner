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