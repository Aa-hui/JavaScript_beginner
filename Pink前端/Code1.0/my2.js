/**************************            数组              ********************************/
//push 弹出数组尾的一个元素
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