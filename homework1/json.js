//  1. json 객체 실습

var sopt = {
    name: 'oursopt',
    slogan: 'We lead our sopt',
    part: ['plan','design','android','iOS','server'],
    number : 180,
    printName : function () {
        console.log('name: ', this.name)
    },
    printNum: function() {
        console.log('number: ', this.number)
    }
};

console.log('typeof sopt: '+ typeof sopt);

console.log('sopt: '+ sopt);
console.log('sopt:',sopt ) 
console.log('sopt: '+ JSON.stringify(sopt));

sopt.printName();
sopt.number = 190;
sopt.printNum();

// 2. json 배열 실습

var dogs =[
    { name: '식빵', family: '웰시코기', age: 1, weight: 2.14},
    { name: '콩콩', family: '포메라니안', age: 3, weight: 2.5},
    { name: '두팔', family: '푸들', age: 7, weight: 3.1}
];

