## JavaScript基础语法（二）

> 本笔记的内容安排跟随[Pink老师的视频课](https://www.bilibili.com/video/BV1Sy4y1C7ha?p=97&spm_id_from=pageDriver)，同步参考了[现代JavaScript教程](https://zh.javascript.info/)

### 3.数组方法

#### 3.0总结

数组方法备忘单：

- 添加/删除元素：
  - `push(...items)` —— 向尾端添加元素，
  - `pop()` —— 从尾端提取一个元素，
  - `shift()` —— 从首端提取一个元素，
  - `unshift(...items)` —— 向首端添加元素，
  - `splice(pos, deleteCount, ...items)` —— 从 `pos` 开始删除 `deleteCount` 个元素，并插入 `items`。
  - `slice(start, end)` —— 创建一个新数组，将从索引 `start` 到索引 `end`（但不包括 `end`）的元素复制进去。
  - `concat(...items)` —— 返回一个新数组：复制当前数组的所有元素，并向其中添加 `items`。如果 `items` 中的任意一项是一个数组，那么就取其元素。
- 搜索元素：
  - `indexOf/lastIndexOf(item, pos)` —— 从索引 `pos` 开始搜索 `item`，搜索到则返回该项的索引，否则返回 `-1`。
  - `includes(value)` —— 如果数组有 `value`，则返回 `true`，否则返回 `false`。
  - `find/filter(func)` —— 通过 `func` 过滤元素，返回使 `func` 返回 `true` 的第一个值/所有值。
  - `findIndex` 和 `find` 类似，但返回索引而不是值。
- 遍历元素：
  - `forEach(func)` —— 对每个元素都调用 `func`，不返回任何内容。
- 转换数组：
  - `map(func)` —— 根据对每个元素调用 `func` 的结果创建一个新数组。
  - `sort(func)` —— 对数组进行原位（in-place）排序，然后返回它。
  - `reverse()` —— 原位（in-place）反转数组，然后返回它。
  - `split/join` —— 将字符串转换为数组并返回。
  - `reduce/reduceRight(func, initial)` —— 通过对每个元素调用 `func` 计算数组上的单个值，并在调用之间传递中间结果。
- 其他：
  - `Array.isArray(arr)` 检查 `arr` 是否是一个数组。

请注意，`sort`，`reverse` 和 `splice` 方法修改的是数组本身。

这些是最常用的方法，它们覆盖 99％ 的用例。但是还有其他几个：

- [arr.some(fn)](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Array/some)/[arr.every(fn)](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Array/every) 检查数组。

  与 `map` 类似，对数组的每个元素调用函数 `fn`。如果任何/所有结果为 `true`，则返回 `true`，否则返回 `false`。

  这两个方法的行为类似于 `||` 和 `&&` 运算符：如果 `fn` 返回一个真值，`arr.some()` 立即返回 `true` 并停止迭代其余数组项；如果 `fn` 返回一个假值，`arr.every()` 立即返回 `false` 并停止对其余数组项的迭代。

  我们可以使用 `every` 来比较数组：

  ```javascript
  function arraysEqual(arr1, arr2) {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
  }
  
  alert( arraysEqual([1, 2], [1, 2])); // true
  ```

- [arr.fill(value, start, end)](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Array/fill) —— 从索引 `start` 到 `end`，用重复的 `value` 填充数组。

- [arr.copyWithin(target, start, end)](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin) —— 将从位置 `start` 到 `end` 的所有元素复制到 **自身** 的 `target` 位置（覆盖现有元素）。

- [arr.flat(depth)](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)/[arr.flatMap(fn)](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap) 从多维数组创建一个新的扁平数组。

- [Array.of(element0[, element1[, …[, elementN\]]])](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Array/of) 基于可变数量的参数创建一个新的 `Array` 实例，而不需要考虑参数的数量或类型。

有关完整列表，请参阅 [手册](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Array)。

乍看起来，似乎有很多方法，很难记住。但实际上这比看起来要容易得多。

浏览这个备忘单，以了解这些方法。然后解决本章中的习题来进行练习，以便让你有数组方法的使用经验。

然后，每当你需要对数组进行某些操作，而又不知道怎么做的时候，请回到这儿，查看这个备忘单，然后找到正确的方法。示例将帮助你正确编写它。用不了多久，你就自然而然地记住这些方法了，根本不需要你死记硬背。

#### 3.1添加移除数组元素

- `arr.push(...items)` —— 从尾端添加元素，
- `arr.pop()` —— 从尾端提取元素，
- `arr.shift()` —— 从首端提取元素，
- `arr.unshift(...items)` —— 从首端添加元素。

##### 3.1.1 splice

数组是对象，所以我们可以尝试使用 `delete`：

```javascript
let arr = ["I", "go", "home"];

delete arr[1]; // remove "go"

alert( arr[1] ); // undefined

// now arr = ["I",  , "home"];
alert( arr.length ); // 3
```

元素被删除了，但数组仍然有 3 个元素，我们可以看到 `arr.length == 3`。

这很正常，因为 `delete obj.key` 是通过 `key` 来移除对应的值。对于对象来说是可以的。但是对于数组来说，我们通常希望剩下的元素能够**移动并占据被释放的位置**。我们希望得到一个**更短**的数组。

所以应该使用**特殊**的方法。

[arr.splice](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) 方法可以说是处理数组的瑞士军刀。**它可以做所有事情：添加，删除和插入元素。**

语法

```JavaScript
array.splice(index, howmany, item1, ....., itemX);
/*参数值
参数	       			   描述
index	             	必需。整数，指定在什么位置添加/删除项目，使用负值指定从数组末尾开始的位置。
howmany					可选。要删除的项目数。如果设置为 0，则不会删除任何项目。
item1, ..., itemX		可选。要添加到数组中的新项目。
*/

```

让我们从删除开始：

```javascript
let arr = ["I", "study", "JavaScript"];

arr.splice(1, 1); // 从索引 1 开始删除 1 个元素

alert( arr ); // ["I", "JavaScript"]
```

从索引 `1` 开始删除 `1` 个元素。（译注：当只填写了 `splice` 的 `start` 参数时，将删除从索引 `start` 开始的所有数组项）

下一个例子删除了 3 个元素，并用另外两个元素替换它们：

```javascript
let arr = ["I", "study", "JavaScript", "right", "now"];

// 删除数组的前三项，并使用其他内容代替它们
arr.splice(0, 3, "Let's", "dance");

alert( arr ) // 现在 ["Let's", "dance", "right", "now"]
```

在这里我们可以看到 `splice` 返回了已删除元素的数组：

```javascript
let arr = ["I", "study", "JavaScript", "right", "now"];

// 删除前两个元素
let removed = arr.splice(0, 2);

alert( removed ); // "I", "study" <-- 被从数组中删除了的元素
```

我们可以将 `deleteCount` 设置为 `0`，`splice` 方法就能够插入元素而不用删除任何元素：

```javascript
let arr = ["I", "study", "JavaScript"];

// 从索引 2 开始
// 删除 0 个元素
// 然后插入 "complex" 和 "language"
arr.splice(2, 0, "complex", "language");

alert( arr ); // "I", "study", "complex", "language", "JavaScript"
```

**允许负向索引**

在这里和其他数组方法中，负向索引都是被允许的。它们从数组末尾计算位置，如下所示：

```javascript
let arr = [1, 2, 5];

// 从索引 -1（尾端前一位）
// 删除 0 个元素，
// 然后插入 3 和 4
arr.splice(-1, 0, 3, 4);

alert( arr ); // 1,2,3,4,5
```

##### 3.1.2 slice

[arr.slice](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) 方法比 `arr.splice` 简单得多。

语法是：

```javascript
arr.slice([start], [end])
```

它会返回一个新数组，将所有从索引 `start` 到 `end`**（不包括 `end`）**的数组项复制到一个新的数组。`start` 和 `end` 都可以是负数，在这种情况下，从末尾计算索引。

它和字符串的 `str.slice` 方法有点像，就是把子字符串替换成子数组。

例如：

```javascript
let arr = ["t", "e", "s", "t"];

alert( arr.slice(1, 3) ); // e,s（复制从位置 1 到位置 3 的元素）

alert( arr.slice(-2) ); // s,t（复制从位置 -2 到尾端的元素）
```

我们也可以不带参数地调用它：`arr.slice()` 会创建一个 `arr` 的副本。其通常用于获取副本，以进行不影响原始数组的进一步转换。

##### 3.1.3 concat

[arr.concat](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) 创建一个新数组，其中包含来自于其他数组和其他项的值（即**合并若干个数组**）。

语法：

```javascript
arr.concat(arg1, arg2...)
```

它接受任意数量的参数 —— 数组或值都可以。

结果是一个包含来自于 `arr`，然后是 `arg1`，`arg2` 的元素的新数组。

如果参数 `argN` 是一个数组，那么其中的所有元素都会被复制。否则，将复制参数本身。

例如：

```javascript
let arr = [1, 2];

// create an array from: arr and [3,4]
alert( arr.concat([3, 4]) ); // 1,2,3,4

// create an array from: arr and [3,4] and [5,6]
alert( arr.concat([3, 4], [5, 6]) ); // 1,2,3,4,5,6

// create an array from: arr and [3,4], then add values 5 and 6
alert( arr.concat([3, 4], 5, 6) ); // 1,2,3,4,5,6
```

通常，它**只复制数组中的元素**。其他对象，即使它们看起来像数组一样，但仍然会被作为一个整体添加：

```javascript
let arr = [1, 2];

let arrayLike = {
  0: "something",
  length: 1
};

alert( arr.concat(arrayLike) ); // 1,2,[object Object]
```

……但是，如果类似数组的**对象具有 `Symbol.isConcatSpreadable` 属性**，那么它就会被 `concat` 当作一个数组来处理：此对象中的元素将被添加：

```javascript
let arr = [1, 2];

let arrayLike = {
  0: "something",
  1: "else",
  [Symbol.isConcatSpreadable]: true,
  length: 2
};

alert( arr.concat(arrayLike) ); // 1,2,something,else
```

#### 3.2遍历 forEach

[arr.forEach](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) 方法允许**为数组的每个元素都运行一个函数**。

语法：

```javascript
arr.forEach(function(item, index, array) {
  // ... do something with item
});
/*
item
数组中正在处理的当前元素。
index 可选
数组中正在处理的当前元素的索引。
array 可选
forEach() 方法正在操作的数组。
*/
```

而这段代码更详细地介绍了它们在目标数组中的位置：

```javascript
["Bilbo", "Gandalf", "Nazgul"].forEach((item, index, array) => {
  alert(`${item} is at index ${index} in ${array}`);
});
// 形如${ }是字符串插值，是一种句法表达式
// 上述代码等价于
["Bilbo", "Gandalf", "Nazgul"].forEach(function(item, index, array) {
    alert(`${item} is at index ${index} in ${array}`);
});
```

该函数的**结果（如果它有返回）会被抛弃和忽略**。

#### 3.3数组中搜索

- `indexOf/lastIndexOf(item, pos)` —— 从**索引 `pos`** 开始搜索 `item`，搜索到则**返回该项的索引**，否则返回 `-1`。
- `includes(value)` —— 如果数组有 `value`，则返回 `true`，否则返回 `false`。

上述这些方法使用的是严格相等 `===` 比较

- `find/filter(func)` —— 通过 `func` 过滤元素，返回使 `func` 返回 `true` 的**第一个值/所有值**。
- `findIndex` 和 `find` 类似，但返回索引而不是值。

语法如下：

```javascript
let result = arr.find(function(item, index, array) {
  // 如果返回 true，则返回 item 并停止迭代
  // 对于假值（falsy）的情况，则返回 undefined
});
```

依次对数组中的每个元素调用该函数：

- `item` 是元素。
- `index` 是它的索引。
- `array` 是数组本身。

如果它返回 `true`，则搜索停止，并返回 `item`。如果没有搜索到，则返回 `undefined`。

#### 3.4数组转换

- `map(func)` —— 根据对每个元素调用 `func` 的结果创建一个新数组。

- `sort(func)` —— 对数组进行**原位（in-place）排序**，然后返回它。

- `reverse()` —— 原位（in-place）反转数组，然后返回它。

- `split/join` —— 将字符串转换为数组并返回。

  split用于拆分，join用于粘合

- `reduce/reduceRight(func, initial)` —— 通过对每个元素调用 `func` 计算数组上的单个值，并在调用之间传递中间结果。

##### 3.4.1 sort

[arr.sort](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) 方法对数组进行 **原位（in-place）** 排序，更改元素的顺序。(译注：原位是指在此数组内，而非生成一个新数组。)

它还返回排序后的数组，但是返回值通常会被忽略，因为修改了 `arr` 本身。

语法：

```javascript
let arr = [ 1, 2, 15 ];

// 该方法重新排列 arr 的内容
arr.sort();

alert( arr );  // 1, 15, 2
```

你有没有注意到结果有什么奇怪的地方？

顺序变成了 `1, 15, 2`。不对，但为什么呢？

**这些元素默认情况下被按字符串进行排序。**

从字面上看，所有元素都被转换为字符串，然后进行比较。**对于字符串，按照词典顺序进行排序**，实际上应该是 `"2" > "15"`。

要使用我们自己的排序顺序，我们**需要提供一个函数**作为 `arr.sort()` 的参数。

该函数应该比较两个任意值并返回：

```javascript
function compare(a, b) {
  if (a > b) return 1; // 如果第一个值比第二个值大
  if (a == b) return 0; // 如果两个值相等
  if (a < b) return -1; // 如果第一个值比第二个值小
}
```

例如，按数字进行排序：

```javascript
function compareNumeric(a, b) {
  if (a > b) return 1;
  if (a == b) return 0;
  if (a < b) return -1;
}

let arr = [ 1, 2, 15 ];

arr.sort(compareNumeric);

alert(arr);  // 1, 2, 15
```

现在结果符合预期了。

我们思考一下这儿发生了什么。`arr` 可以是由任何内容组成的数组，对吗？它可能包含数字、字符串、对象或其他任何内容。我们有一组 **一些元素**。要对其进行排序，我们需要一个 **排序函数** 来确认如何比较这些元素。**默认是按字符串进行排序的。**

**实际上，比较函数只需要返回一个正数表示“大于”，一个负数表示“小于”。**

`arr.sort(fn)` 方法实现了通用的排序算法。我们不需要关心它的内部工作原理（大多数情况下都是经过 [快速排序](https://en.wikipedia.org/wiki/Quicksort) 或 [Timsort](https://en.wikipedia.org/wiki/Timsort) 算法优化的）。它将遍历数组，**使用提供的函数比较其元素**并对其重新排序，我们所需要的就是**提供执行比较的函数 `fn`**。

顺便说一句，如果我们想知道要比较哪些元素 —— 那么什么都不会阻止 alert 它们：

```javascript
[1, -2, 15, 2, 0, 8].sort(function(a, b) {
  alert( a + " <> " + b );
  return a - b;
});
```

该算法可以在此过程中，将一个元素与多个其他元素进行比较，但是它会尝试进行尽可能少的比较。

> **比较函数可以返回任何数字**
>
> **实际上，比较函数只需要返回一个正数表示“大于”，一个负数表示“小于”。**
>
> 通过这个原理我们可以编写更短的函数：
>
> ```javascript
> let arr = [ 1, 2, 15 ];
> 
> arr.sort(function(a, b) { return a - b; });
> 
> alert(arr);  // 1, 2, 15
> ```
>
> **箭头函数最好**
>
> 你还记得 [箭头函数](https://zh.javascript.info/arrow-functions-basics) 吗？这里使用箭头函数会更加简洁：
>
> ```javascript
> arr.sort( (a, b) => a - b );
> ```
>
> 这与上面更长的版本完全相同。
>
> **使用 `localeCompare` for strings**
>
> 你记得 [字符串比较](https://zh.javascript.info/string#correct-comparisons) 算法吗？默认情况下，它通过字母的代码比较字母。
>
> 对于许多字母，最好使用 `str.localeCompare` 方法正确地对字母进行排序，例如 `Ö`。
>
> 例如，让我们用德语对几个国家/地区进行排序：
>
> ```javascript
> let countries = ['Österreich', 'Andorra', 'Vietnam'];
> 
> alert( countries.sort( (a, b) => a > b ? 1 : -1) ); // Andorra, Vietnam, Österreich（错的）
> 
> alert( countries.sort( (a, b) => a.localeCompare(b) ) ); // Andorra,Österreich,Vietn
> ```



### 4.函数

#### 4.1**全局变量**

任何函数之外声明的变量，例如上述代码中的外部变量 `userName`，都被称为 **全局** 变量。

全局变量在任意函数中都是可见的（除非被局部变量遮蔽）。

减少全局变量的使用是一种很好的做法。现代的代码有很少甚至没有全局变量。大多数变量存在于它们的函数中。但是有时候，全局变量能够用于存储项目级别的数据。

#### 4.2**默认值**

可以使用 `=` 为函数声明中的参数指定所谓的“默认”（如果对应参数的值**未被传递则使用**）值：

```javascript
function showMessage(from, text = "no text given") {
  alert( from + ": " + text );
}

showMessage("Ann"); // Ann: no text given
```

现在如果 `text` 参数未被传递，它将会得到值 `"no text given"`。

**后备的默认参数**

有些时候，将参数默认值的设置放在函数执行（相较更后期）而不是函数声明时，也行得通。

我们可以通过将参数与 `undefined` 进行比较，来检查该参数是否在函数执行期间被传递进来：

```javascript
function showMessage(text) {
  // ...

  if (text === undefined) { // 如果参数未被传递进来
    text = 'empty message';
  }

  alert(text);
}

showMessage(); // empty message
```

……或者我们可以使用 `||` 运算符：

```javascript
function showMessage(text) {
  // 如果 text 为 undefined 或者为假值，那么将其赋值为 'empty'
  text = text || 'empty';
  ...
}
```

现代 JavaScript 引擎支持 [空值合并运算符](https://zh.javascript.info/nullish-coalescing-operator) `??`，它在大多数假值（例如 `0`）应该被视为“正常值”时更具优势：

```javascript
function showCount(count) {
  // 如果 count 为 undefined 或 null，则提示 "unknown"
  alert(count ?? "unknown");
}

showCount(0); // 0
showCount(null); // unknown
showCount(); // unknown
```

**（此处回顾空值合并运算符及逻辑中断）**

#### 4.3返回值

指令 `return` 可以在函数的任意位置。当执行到达时，**函数停止**，并将值返回给调用代码

> **练习题**
>
> 是否需要 “else”？
>
> 如果参数 `age` 大于 `18`，那么下面的函数将返回 `true`。
>
> 否则它将会要求进行确认，并返回确认结果：
>
> ```javascript
> function checkAge(age) {
>   if (age > 18) {
>     return true;
>   } else {
>     // ...
>     return confirm('Did parents allow you?');
>   }
> }
> ```
>
> 如果 `else` 被删除，函数的工作方式会不同吗？
>
> ```javascript
> function checkAge(age) {
>   if (age > 18) {
>     return true;
>   }
>   // ...
>   return confirm('Did parents allow you?');
> }
> ```
>
> 这两个变体的行为是否有区别？
>
> **解决方案**
>
> 没有区别。

#### 4.4函数表达式

无论函数是如何创建的，**函数都是一个值**。上面的两个示例都在 `sayHi` 变量中存储了一个函数。

我们还可以用 `alert` 打印这个变量的值：

```javascript
function sayHi() {
  alert( "Hello" );
}

alert( sayHi ); // 显示函数代码
```

注意，最后一行代码并不会运行函数，因为 `sayHi` 后没有括号。在某些编程语言中，只要提到函数的名称都会导致函数的调用执行，但 JavaScript 可不是这样。

在 **JavaScript 中，函数是一个值，所以我们可以把它当成值对待**。上面代码显示了一段字符串值，即函数的源码。

的确，在某种意义上说一个函数是一个特殊值，我们可以**像 `sayHi()` 这样调用**它。

但它依然是一个值，所以我们可以像使用其他类型的值一样使用它。

我们可以复制函数到其他变量：

```javascript
function sayHi() {   // (1) 创建
  alert( "Hello" );
}

let func = sayHi;    // (2) 复制

func(); // Hello     // (3) 运行复制的值（正常运行）！
sayHi(); // Hello    //     这里也能运行（为什么不行呢）
```

解释一下上段代码发生的细节：

1. `(1)` 行声明创建了函数，并把它放入到变量 `sayHi`。
2. `(2)` 行将 `sayHi` 复制到了变量 `func`。请注意：`sayHi` 后面没有括号。**如果有括号**，`func = sayHi()` 会把 `sayHi()` 的调用结果写进`func`，而不是 `sayHi` **函数** 本身。
3. 现在函数可以通过 `sayHi()` 和 `func()` 两种方式进行调用。

#### 4.5函数表达式和函数声明

- 函数是值。它们可以在代码的任何地方被分配，复制或声明。
- 如果函数在主代码流中被声明为单独的语句，则称为“**函数声明**”。
- 如果该函数是作为表达式的一部分创建的，则称其“**函数表达式**”。
- 在执行代码块之前，**内部算法会先处理函数声明**。所以函数声明在其被声明的代码块内的**任何位置**都是可见的。
- **函数表达式在执行流程到达时创建**。

在大多数情况下，当我们需要声明一个函数时，最好使用函数声明，因为函数在被声明之前也是可见的。这使我们在代码组织方面更具灵活性，通常也会使得代码可读性更高。



### 5JavaScript的预解析

- JavaScript引擎运行js代码需要进行两步，**预解析和代码执行**。
  - **预解析**        js引擎会把js里面所有的var，还有function提升到当前作用域的最前面
  - **代码执行**    按照代码书写的顺序从上往下执行
- 预解析分为**变量预解析(变量提升**) 和**函数预解析(函数提升)**
  - 变量提升就是把所有的**变量声明**提升到当前的作用域最前面，**不提升赋值操作**
  - 函数提升就是把所有的**函数声明**提升到当前作用域的最前面，**不调用**函数

