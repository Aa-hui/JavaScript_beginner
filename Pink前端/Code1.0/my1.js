/********************          数据类型        ***********************/

/* 
alert('这是一个全新的练习');
// 输入框 使用promot获得的数据默认是字符串
const word = prompt('请输入您想输入的任何文字');
let longWord = '您刚输入\n的文字是:' + word;
// alert 弹出警示框
alert('您刚输入\n的文字是:' + word + '\n' + '验证一下换行');
// 展示字符串长度
console.log('输入文字的长度是' + word.length);

// 字符串拼接
console.log(12 + 12); //计算12+12=24
console.log('12' + 12); //字符串拼接 '1212'

// 区分一下undefined和NULL
let aUndefined = undefined;
console.log('未定义+' + aUndefined); //输出结果为“未定义+undefined”
console.log(aUndefined + 1); //输出结果为NaN

let space = null;
console.log('空+' + space);
console.log(1 + space); //空+1 结果为1

//测试数据类型
console.log(typeof longWord);

// 转换数据类型
// 转换成字符串，两种方法，括号别漏了
// 此外可以使用隐式转换，即使用字符串拼接，和一个空字符拼接
let num = 10
let str = num.toString();
let str2 = String(num);
console.log(typeof num);
console.log(typeof str);
console.log(typeof str2);
// 隐式转换
console.log(num + '');


// praseInt的具体用法在《红宝书》P37有细节讲解，比视频中讲的好
// 转换成整型 
console.log(parseInt(str));
console.log(typeof parseInt(str));
// perseInt 直接截取整数部分
console.log(parseInt(3.1));
console.log(parseInt(3.9));
// 接下来复现一下《红宝书》此处例子
console.log(parseInt('1234blue')); //1234
console.log(parseInt('')); //NaN
//八进制
console.log(parseInt('077')); //77  注意，此处若为非严格模式，将被解释为八进制
console.log(parseInt('77', 8)); //77
// 十六进制的标志为0x
console.log(parseInt('0xAF')); //175
console.log(parseInt('0xAF', 16)); //175
console.log(parseInt('AF', 16)); //函数可以有两个参数，第二个参数是进制，则可以省略0x

// 转化成浮点型
// 括号里参数应该为字符串
// paseFloat 只解析为十进制，0x将直接解析为0，不可以输入底数参数
// 始终忽略最开头的0，可以实现科学计数法
console.log(parseFloat('3.1')); //3.1
console.log(parseFloat('3.9')); //3.9
console.log(parseFloat('012.1')); //12.1
console.log(parseFloat('0xAF')); //0
console.log(parseFloat('3.14e7')); //31400000

//隐式转换 借助-和*
console.log('3' - 0);
console.log('3' * 1);
// 注意，用+是不可行的，这样会默认字符串拼接
// 同样的，在进行计算的时候，要注意一下数据类型，例如：promote引入的均被认为是字符串，用+会默认拼接
// 此外，-可以用作计算
console.log('125' - '120'); //3

// 转换为布尔型
// 使用函数Boolean()，表示空的未定义的，转化后为false。其余均为true
console.log(Boolean(''));
console.log(Boolean(NaN));
console.log(Boolean(undefined));
console.log(Boolean(null));
console.log(Boolean(0));
// 以上均为false
console.log(Boolean('任意字符'));

 */


/********************           运算符         ***********************/

// 不能用浮点数直接比较大小
let aFloat = 0.1 + 0.2;
console.log(aFloat);
console.log(aFloat == 0.3); //false

//前置运算符
let a = 10,
    b = 10;
let c = ++a + b; //21
let d = a + b; //21
console.log(c);
console.log(d);

//后置运算符
let a1 = 10,
    b1 = 10;
let c1 = a1++ + b1; //20
let d1 = a1 + b1; //21
console.log(c1);
console.log(d1);

// 判断运算符 == 默认转换数据类型
console.log(12 == 12); //true
console.log(12 == '12'); //true

// 全等运算符
console.log(12 === 12); //true
console.log(12 === '12'); //false
console.log(12 !== '12'); //true

// 逻辑中断
// 运算原理：当有多个表达式/值时，左边的表达式可以确定结果时，就不再计算右边表达式的值
//逻辑与的逻辑中断
/* 
表达式1		&& 		表达式2
从左往右数，哪个表达式是false就返回谁的原值，并且中断停止不再继续。
如果全都是true就返回最后一个表达式2的原值。 
*/
console.log(123 && 456); //返回值为456
console.log(0 && 456); //返回值为0
console.log(0 && 1 + 2 && 456 * 56789); //返回值为0
console.log('' && 1 + 2 && 456 * 56789); //返回值为空白（空的字符串）
// 逻辑或的判定方式类似，总结如下：
console.log('接下来输出逻辑或');
console.log(123 || 456); //返回值为123
console.log(123 || 456 || 456 + 123); //返回值为123
console.log(0 || 456 || 456 + 123); //返回值为456

// 一个易错案例
console.log('接下来将展示一个逻辑中断的应用');
let testNum = 0;
console.log(123 || testNum++); //123
console.log(testNum); //0