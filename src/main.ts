/*
type A = {
  age?: number | string;
  nick: string;
  info: (number | string)[] | { id?: number };
  photo?: null | string;
};

const a1: A = {
  age: 10,
  nick: 'mynick',
  info: [1, 100],
  photo: 'string',
};

const a2: A = {
  age: '10 years',
  nick: '',
  info: { id: 100 },
  photo: null,
};

const a3: A = {
  nick: '       ',
  info: ['secret', 'key'],
};

const a4: A = {
  nick: '',
  info: {},
};

type myObj = Record<string, number>;

type myObjArray = myObj[];

function sumAllValuesInObjArray(objArray: myObjArray) {
  let result: number = 0;
  for (const value of objArray) {
    const obj: number[] = Object.values(value);
    const sumValues = obj.reduce(function (currentSum, currentNumber) {
      return currentSum + currentNumber;
    }, 0);
    result += sumValues;
  }
  return result;
}

console.log(sumAllValuesInObjArray([{ a: 20, b: 30 }, {}, { a: 3 }, { x: 5 }])); // 58
*/

/*
Напишите функцию, которая получает на вход семью и выводит в консоль список покупок этой семьи.
Если название продукта имеет чётное количество знаков - выведите название ЗАГЛАВНЫМИ БУКВАМИ, например

Опишите типы:
* Product
* Person
* Family

Часть данных вам уже дана, осталось доработать функцию.
Вывод программы должен быть таким же, как в скриншоте ниже.

 */
/*
type Product = {
  name: string;
  count: number;
};

type Person = {
  name: string;
  products: Product[];
};

type Family = {
  name: string;
  persons: Person[];
};

function familyShoppingList(family: Family) {
  console.log(`Список покупок семьи "${family.name}"`);
  console.log('');
  for (const person of family.persons) {
    console.log(`Покупки ${person.name}:`);

    for (const product of person.products) {
      console.log(`${product.name} : (${product.count})`);
    }
    console.log(' ');
  }
}

const family: Family = {
  name: 'Алексеевы',
  persons: [
    {
      name: 'Отец',
      products: [
        { name: 'Кофе', count: 2 },
        { name: 'Колбаса', count: 3 },
        { name: 'Огурцы', count: 3 },
      ],
    },
    {
      name: 'Мать',
      products: [
        { name: 'Молоко', count: 1 },
        { name: 'Сыр', count: 74 },
      ],
    },
    {
      name: 'Дочь',
      products: [
        { name: 'Конфеты', count: 29 },
        { name: 'Лимонад', count: 30 },
        { name: 'Салат', count: 3 },
        { name: 'Помидоры', count: 3 },
      ],
    },
    {
      name: 'Сын',
      products: [{ name: 'Чипсы', count: 1 }],
    },
  ],
};

familyShoppingList(family);
 */

/*
Помогите администрации театра выбрать зал и в рандомном порядке рассадить посетителей.

Особенность этого театра в том, что он имеет бесконечное количество различных залов (партеров),
но все они имеют посадку "квадрат", то есть, например есть залы:
* 1x1 - 1 ряда с 1 сиденьем, вместимость 1 чел
* 2x2 - 2 ряда по 2 сиденья в каждом, вместимость 4 чел
* 3x3 - 3 ряда по 3 сиденья в каждом, вместимость 9 чел
* 4x4 - 4 ряда по 4 сиденья в каждом, вместимость 16 чел
...
* 9x9 - 9 рядов по 9 сидений в каждом, вместимость 81 чел
...
* 15x15 - 5 ряда по 5 сиденья в каждом, вместимость 225 чел
и так далее до бесконечности...

Администрация выделяет минимальный зал, который вместит всех посетителей, купивших билет.
Например, если продан:
* 2, 3 или 4 билета - хватит зала 2x2
* от 5 до 9 билетов - все посетители вместятся в зал 3x3
* от 10 до 16 билетов - хватит зала 4x4
* 17-25 билетов - подойдёт зал 5x5
и так далее до бесконечности...

Ваша функция seatVisitors получается на вход список имён посетителей, а возвращает матрицу строк (массив с массивами строк),
где выбран подходящий размер зала (размер матрицы), а посетители рассажены абсолютно в рандомном порядке,
пустые места зала отмечены символом "-".

То есть, допустим получили на вход 5 имён - значит зала 2x2 не хватит, тк он вмещает только 4 человека, нужно брать зал 3x3,
создаём матрицу 3x3 и всю её для начала заполняем символами "-", а потом проходимся по всему списку посетителей,
и имя каждого посетителя вписываем на случайное место в нашем зале (в матрице).

Учтите этот момент - например "Алексею" случайным образом достаётся место, на котором уже кто-то сидит (там стоит не "-"),
значит для Алексея нужно повторно выбирать случайное место в зале.

Так же учтите, что ваша функция должна корректно работать для любого количества посетителей, даже
если посетителей будет 727867323834576 - ваша функция должна будет выбрать зал (матрицу) 26979017x26979017 и рассадить их в этом зале.

Если всего 1 билет куплен - seatVisitors(['Саша']) вывод будет такой:
[ [ 'Саша' ] ]


Например, для seatVisitors(['Саша', 'Максим']) может быть такой вывод:
[
  [ '-', 'Максим' ],
  [ 'Саша', '-' ]
]

А для seatVisitors(['Саша', 'Максим', 'Алексей', 'Валентин', 'Андрей']) может быть такой вывод:
[
  [ '-', 'Саша', '-' ],
  [ '-', 'Алексей', 'Максим' ],
  [ 'Андрей', 'Валентин', '-' ]
]
 */



function seatVisitors(visitors: string[]) {
  const size = Math.ceil(Math.sqrt(visitors.length));

  const seats: string[][] = [];

  for (let i = 0; i < size; i++) {
    seats.push([]);
    for (let j = 0; j < size; j++) {
      seats[i].push('-');
    }
  }

  for (let i = 0; i < visitors.length; i++) {
    // let randomIndex = Math.floor(Math.random() * visitors.length);
    let row = Math.floor(size * Math.random());
    let col = Math.floor(size * Math.random());
    while (seats[row][col] !== '-') {
      row = Math.floor(size * Math.random());
      col = Math.floor(size * Math.random());
    }

    seats[row][col] = visitors[i];
  }
  console.log(seats);
}

seatVisitors(['Саша', 'Максим', 'Алексей', 'Валентин', 'Андрей', 'Констанин', 'Игорь', 'Денис', 'Владимиир', 'Вадим']);




// const matrix: string[][] = [];
// const size = 2;

// for (let i = 0; i < size; i++) {
//   matrix.push([]);

//   for (let j = 0; j < size; j++) {
//     matrix[i].push("-");
//   }
// }
// console.log(matrix);
