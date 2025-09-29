import chalk from 'chalk';
import { faker, simpleFaker } from '@faker-js/faker';
import { fakerRU, ru } from '@faker-js/faker';
import { log } from 'eslint-import-resolver-typescript/lib/logger';
import deepEqual from 'deep-equal';
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
[['Саша']]


Например, для seatVisitors(['Саша', 'Максим']) может быть такой вывод:
[
  ['-', 'Максим'],
  ['Саша', '-']
]

А для seatVisitors(['Саша', 'Максим', 'Алексей', 'Валентин', 'Андрей']) может быть такой вывод:
[['-', 'Саша', '-'],
  ['-', 'Алексей', 'Максим'],
  ['Андрей', 'Валентин', '-']]
 */

//
// function seatVisitors(visitors: string[]) {
//   const size = Math.ceil(Math.sqrt(visitors.length));
//
//   const seats: string[][] = [];
//
//   for (let i = 0; i < size; i++) {
//     seats.push([]);
//     for (let j = 0; j < size; j++) {
//       seats[i].push('-');
//     }
//   }
//
//   for (let i = 0; i < visitors.length; i++) {
//     // let randomIndex = Math.floor(Math.random() * visitors.length);
//     let row = Math.floor(size * Math.random());
//     let col = Math.floor(size * Math.random());
//     while (seats[row][col] !== '-') {
//       row = Math.floor(size * Math.random());
//       col = Math.floor(size * Math.random());
//     }
//
//     seats[row][col] = visitors[i];
//   }
//   console.log(seats);
// }
//
// seatVisitors(['Саша', 'Максим', 'Алексей', 'Валентин', 'Андрей', 'Констанин', 'Игорь', 'Денис', 'Владимиир', 'Вадим']);

// const matrix: string[][] = [];
// const size = 2;

// for (let i = 0; i < size; i++) {
//   matrix.push([]);

//   for (let j = 0; j < size; j++) {
//     matrix[i].push("-");
//   }
// }
// console.log(matrix);

/*
Напишите функцию, которая получает на вход число,
а возвращает наибольший делитель (НД) для этого числа.

Наибольшим делителем для числа A называется наибольшее число,
на которое A делится без остатка, но при этом не само число A (исключение - число 1)

Например:

у 18 наибольшим делителем является число 9
для числа 21 наибольший делитель - 7
1 - 1
10 - 5
11 - 1
12 - 6
21 - 7
61 - 1
85 - 17
123 - 41
*/

// md => max divider

// let c = 0;
//
// function md(num: number) {
//   if (num % 2 === 0) {
//     return num / 2;
//   }
//   for (let i = 9; i > 1; i = i - 2) {
//     if (num % i === 0) {
//       return num / i;
//     }
//     c++;
//   }
//
//   /*
//   for (let i = Math.round(num / 2); i > 1; i--) {
//     if (num % i === 0) {
//       return i;
//     }
//     c++;
//   }
//   */
//
//   return 1;
// }
//
// console.log(md(3399999), c);

//-----------------------------------------

// type Order = {
//   id: number;
//   amount: number;
//   status: orderStatus;
// };
//
// enum orderStatus {
//   accepted = 'Принят',
//   processed = 'Обрабатывается',
//   executed = 'Передан в работу',
//   ready = 'Готов',
//   dilivery = 'В доставке',
// }
//
// function printOrder(order: Order) {
//   let messageForUser = '';
//   switch (order.status) {
//     case orderStatus.accepted:
//       messageForUser = chalk.yellow(order.status);
//       break;
//     case orderStatus.processed:
//       messageForUser = chalk.blueBright(order.status);
//       break;
//     case orderStatus.executed:
//       messageForUser = chalk.cyanBright(order.status);
//       break;
//     case orderStatus.ready:
//       messageForUser = chalk.green(order.status);
//       break;
//     case orderStatus.dilivery:
//       messageForUser = chalk.gray(order.status);
//       break;
//   }
//   console.log(`Заказ #${order.id}: ${messageForUser}`);
// }
//
// const firstOrder: Order = {
//   id: 1,
//   amount: 1200,
//   status: orderStatus.ready,
// };
//
// console.log(printOrder(firstOrder));
//------------------------------------------

// type User = {
//   id: number;
//   email: string;
//   password: string | number;
//   role: userRole;
// };
//
// enum userRole {
//   admin = 'admin',
//   user = 'user',
//   guest = 'guest',
//   manager = 'manager',
// }
//
// function generateRandomUsers(qtty: number) {
//   const users: User[] = [];
//
//   for (let i = 0; i < qtty; i++) {
//     const user: User = {
//       id: simpleFaker.number.int(100),
//       email: faker.internet.email(),
//       password: faker.internet.password(),
//       role: faker.helpers.enumValue(userRole),
//     };
//     users.push(user);
//   }
//   return users;
// }
//
// function filterByRole(users: User[], role: userRole) {
//   const filteredUsers = users.filter((user) => user.role === role);
//   return filteredUsers;
// }
//
// const users = generateRandomUsers(20);
// console.log(users);
// console.log(`---------------------------------`);
// console.log(`Фильтрация по роли`);
// console.log(filterByRole(users, userRole.admin));

//-------------------------------------------------

// type Payment = {
//   id: number;
//   month: string;
//   amount: number;
//   ignoreTaxes: boolean;
// };
//
// type TaxInfo = number;
//
// const payments: Payment[] = [
//   { id: 1, month: 'Январь', amount: 265_000, ignoreTaxes: false },
//   { id: 2, month: 'Февраль', amount: 320_000, ignoreTaxes: false },
//   { id: 3, month: 'Февраль', amount: 50_000, ignoreTaxes: true },
//   { id: 4, month: 'Март', amount: 253_000, ignoreTaxes: false },
//   { id: 5, month: 'Апрель', amount: 295_000, ignoreTaxes: false },
//   { id: 6, month: 'Май', amount: 250_000, ignoreTaxes: false },
//   { id: 7, month: 'Июнь', amount: 350_000, ignoreTaxes: true },
//   { id: 8, month: 'Июнь', amount: 245_000, ignoreTaxes: false },
//   { id: 9, month: 'Август', amount: 215_000, ignoreTaxes: false },
//   { id: 10, month: 'Сентябрь', amount: 50_000, ignoreTaxes: false },
//   { id: 11, month: 'Октябрь', amount: 350_000, ignoreTaxes: false },
//   { id: 12, month: 'Октябрь', amount: 450_000, ignoreTaxes: true },
//   { id: 13, month: 'Ноябрь', amount: 330_000, ignoreTaxes: false },
//   { id: 14, month: 'Декабрь', amount: 220_000, ignoreTaxes: false },
// ];
//
// const calculateTax = (payments: Payment[]): TaxInfo => {
//   let totalAmount = 0;
//   let totalTax = 0;
//   const maxTax13per = 312_000;
//   for (const payment of payments) {
//     if (payment.ignoreTaxes) {
//       continue;
//     }
//     totalAmount += payment.amount;
//   }
//   console.log('Полученный доход за период:', totalAmount);
//   if (totalAmount > 2_400_000) {
//     totalTax = ((totalAmount - 2_400_000) * 15) / 100 + maxTax13per;
//     return totalTax;
//   }
//   totalTax = (totalAmount * 13) / 100;
//   return totalTax;
// };
//
// const taxResult = calculateTax(payments);
// console.log('Результат расчета налога:', taxResult);

//------------Деструктуризация------------------

// type User = {
//   name: string;
//   age: number;
// };
//
// type Diplom = {
//   degree: string;
//   university: string;
//   department: string;
// };
//
// const user: User = { name: 'Коля', age: 9 };
// const diplom = { degree: 'Магистр', university: 'МГУ', department: 'Кафедра информационных технологий' };
//
// function mergeToNewObject(user: User, diplom: Diplom): object {
//   return { ...user, ...diplom };
// }
//
// const obj3 = mergeToNewObject(user, diplom);
//
// console.log(obj3);
/*
{
  name: 'Коля',
  age: 9,
  degree: 'Магистр',
  university: 'МГУ',
  department: 'Кафедра информационных технологий'
}
 */
//-------------------------------------------
//
// type User = {
//   name: string;
//   age: number;
//   notes: string;
// };
//
// type Work = {
//   address: string;
//   department: string;
//   notes: string;
// };
//
// const user = { name: 'Коля', age: 9, notes: 'Заметка от Коли!' };
// const work = { address: 'Строительная 4', department: 'Шпаклёвщик', notes: 'Рабочая заметка' };
//
// function merge(user: User, work: Work, course?: number): object {
//   return course ? { ...user, ...work } : { ...work, ...user };
// }
//
// console.log(merge(user, work));
// /* Обратите внимание на поле "notes" ⭐️
// {
//   address: 'Строительная 4',
//   department: 'Шпаклёвщик',
//   notes: 'Заметка от Коли!',
//   name: 'Коля',
//   age: 9
// }
//  */
//
// console.log(merge(user, work, 0));
// /* Обратите внимание на поле "notes" ⭐️
// {
//   address: 'Строительная 4',
//   department: 'Шпаклёвщик',
//   notes: 'Заметка от Коли!',
//   name: 'Коля',
//   age: 9
// }
//  */
//
// console.log(merge(user, work, 1));
// /* Обратите внимание на поле "notes" ⭐️
// {
//   name: 'Коля',
//   age: 9,
//   notes: 'Рабочая заметка',
//   address: 'Строительная 4',
//   department: 'Шпаклёвщик'
// }
//  */
//-------------------------------

// const report = (finalists: Array<string>) => {
//   const [firstParticipant, secondParticipant, thirdParticipant, ...otherParticipants] = finalists;
//   console.log(`Первое место: ${firstParticipant}`);
//   console.log(`Второе место: ${secondParticipant}`);
//   console.log(`Второе место: ${thirdParticipant}`);
//   console.log(`Остальные участники:`, otherParticipants);
// };
//
// report(['Александр', 'Михаил', 'Валентин', 'Сергей', 'Артур']);
//----------------------------------
/*
Напишите функцию showInfo, которая принимает на вход объект пользователя и выводит в консоль его карточку:
* Имя
* Фамилия
* Отчество
* Возраст
* Совершеннолетний или нет
* Пол
* Фото

Поля - отчество, пол, фото являются опциональными, их может не быть в объекте.
Если отчества или пола не указано - напишите "Не указано"
Если фото нет - укажите фото по умолчанию "https://photos.com/default.jpg"

Для работы с полями объекта, внутри функции используйте деструктуризацию и деструктуризацию со значением по умолчанию.
 */
//
// type User = {
//   name: string;
//   surname: string;
//   partronymic?: string;
//   age: number;
//   gender?: string;
//   photo?: string;
// };
//
// const ryan = {
//   name: 'Райан',
//   age: 28,
//   surname: 'Гослинг',
//   gender: 'Мужчина',
//   photo: 'https://photos.com/photo.jpg',
// };
//
// const jason = {
//   name: 'Джейсон',
//   age: 5,
//   surname: 'Стетхем',
//   patronymic: 'Александрович',
// };
//
// function showInfo(user: User) {
//   const emptyPlaceholder = 'Не указано';
//   const defaultPhotoLink = 'https://photos.com/photo.jpg';
//   // const parseAge = typeof user.age === 'string' ? parseFloat(user.age) : user.age;
//   const ageCheck = user.age < 18 ? 'Нет' : 'Да';
//   const {
//     name,
//     surname,
//     partronymic = emptyPlaceholder,
//     age,
//     // adult = ageCheck,
//     gender = emptyPlaceholder,
//     photo = defaultPhotoLink,
//   } = user;
//
//   console.log(`Карточка пользователя
// Имя : ${name}
// Фамилия : ${surname}
// Отчество : ${partronymic}
// Возраст : ${age}
// Совершеннолетний : ${ageCheck}
// Пол : ${gender}
// Фото : ${photo}
// `);
// }
//
// showInfo(ryan);
// /*
// Карточка пользователя
// Имя: Райан
// Фамилия: Гослинг
// Отчество: Не указано
// Возраст: 28
// Совершеннолетний: Да
// Пол: Мужчина
// Фото: https://photos.com/photo.jpg
//
//  */
//
// showInfo(jason);
// /*
// Карточка пользователя
// Имя: Джейсон
// Фамилия: Стетхем
// Отчество: Александрович
// Возраст: 5
// Совершеннолетний: Нет
// Пол: Не указано
// Фото: https://photos.com/default.jpg
//
//  */

//------------операторы слияния------------

// type Video = {
//   id: number;
//   name: string;
//   subs?: string | null;
// };
//
// const firstVideo: Video = {
//   id: 1,
//   name: 'Kotik',
// };
//
// const secondVideo: Video = {
//   id: 2,
//   name: 'memes',
//   subs: null,
// };
//
// const thirdVideo: Video = {
//   id: 3,
//   name: 'stream',
//   subs: '',
// };
//
// const fourthVideo: Video = {
//   id: 4,
//   name: 'reals',
//   subs: 'rus',
// };
//
// const missingValue = 'Не обнаружено';
// const emptyValue = 'Пусто';
//
// console.log(
//   firstVideo.subs ?? missingValue,
//   secondVideo.subs || missingValue,
//   thirdVideo.subs || emptyValue,
//   fourthVideo.subs,
// );
//--------------------------------------

// const possibleTasks = ['Купить кота', 'Продать кота', 'Помыть кота', 'Купить арбуз'];
//
// type User = {
//   id: string; // nanoid длиной 6 символов, используйте faker.string.nanoid
//   name: string; // обязательно русское
//   email: string;
//   company: string; // название компании (использовать .company)
//   tasks: string[]; // От 0 до 2х рандомных задач из массива possibleTasks (взять используя faker.helpers)
// };
// const qtyUsers = Math.floor(5 * Math.random() + 2);
// const users: User[] = [];
//
// for (let i = 0; i < qtyUsers; i++) {
//   const user: User = {
//     id: faker.string.nanoid(5),
//     name: fakerRU.person.fullName(),
//     email: faker.internet.email(),
//     company: fakerRU.company.name(),
//     tasks: faker.helpers.arrayElements(possibleTasks, { min: 0, max: 2 }),
//   };
//   users.push(user);
// }
// // console.log(users);
//
// function taskCount(user: User) {
//   const coloredGreenValue = (value: string) => {
//     return chalk.green(`"${value}"`);
//   };
//   console.log(
//     `Пользователь ${coloredGreenValue(user.name)} (id=${coloredGreenValue(user.id)}): ${user.tasks.length || 'Нет'} дел на сегодня`,
//   );
// }
// for (const user of users) {
//   taskCount(user);
// }

//------------------------------------

// type User = {
//   id: number;
//   name?: string;
//   email: string;
// };
//
// type Item = {
//   id: number;
//   name: string;
//   price: number;
//   count?: number; // Если count не указан, по умолчанию считать количество 1
// };
//
// type DiscountCard = {
//   id: number;
//   series: number;
// };
//
// type Order = {
//   id: number;
//   user: User | null;
//   card: DiscountCard | null;
//   items: Item[];
// };
//
// function printCheque(order: Order) {
//   const userInfo = order.user
//     ? `id: ${order.user.id}
//     имя: ${order.user.name || 'Не указано'}
//     email: ${order.user.email}`
//     : null;
//   console.log(`
//   Заказ #${order.id}
//   ------------
//   Клиент:
//   ${userInfo || 'Не указан'}
//   `);
// }
//
// const order: Order = {
//   id: 3,
//   user: {
//     id: 5,
//     email: 'example@domain.com',
//   },
//   card: null,
//   items: [
//     { id: 6, name: 'Хлеб', price: 75, count: 3 },
//     { id: 9, name: 'Вафли', price: 95.9, count: 1 },
//     { id: 12, name: 'Набор конфет', price: 350 },
//   ],
// };
//
// // const order: Order = {
// //   id: 3,
// //   user: null,
// //   card: null,
// //   items: [
// //     { id: 6, name: 'Хлеб', price: 75, count: 3 },
// //     { id: 9, name: 'Вафли', price: 95.9, count: 1 },
// //     { id: 12, name: 'Набор конфет', price: 350 },
// //   ],
// // };
//
// printCheque(order);



/*
Напишите функцию, которая принимает на вход текст и набор символов.
И возвращает true/false - содержатся ли символы в любом порядке в полученном тексте

Например, если символы - "abc", то тогда нужно проверить, нет ли в тексте таких сочетаний:
abc
acb
bac
bca
cab
cba


*/

/*
Напишите функцию, которая принимает на вход текст и набор символов.
И возвращает true/false - содержатся ли символы в любом порядке в полученном тексте

Например, если символы - "abc", то тогда нужно проверить, нет ли в тексте таких сочетаний:
abc
acb
bac
bca
cab
cba


*/

// привет => {п:1, р:1, ...}
const countChars = (text: string) => {
  const resultCountChars: Record<string, number> = {};

  for (const symbol of text) {
    if (resultCountChars[symbol]) {
      resultCountChars[symbol]++;
    } else {
      resultCountChars[symbol] = 1;
    }
  }
  return resultCountChars;
};

// function isKeysEqual(obj1: Record<string, number>, obj2: Record<string, number>): boolean {
//   const keys1 = Object.keys(obj1);
//   const keys2 = Object.keys(obj2);
//
//   // if (keys1.length != keys2.length) {
//   //   return false;
//   // }
//
//   for (const key of keys1) {
//     if (!keys2.includes(key)) {
//       return false;
//     }
//   }
//   return true;
// }

const includes = (text: string, symbols: string) => {
  const countSymbolsAsObject = countChars(symbols);
  console.log(countSymbolsAsObject);
  let partOfTextAsObjectWithCount: Record<string, number> = {};
  for (let i = 0; i < (text.length - symbols.length || 1); i++) {
    const partOfTextEqualLengthOfSymbols = text.slice(i, symbols.length + i);

    partOfTextAsObjectWithCount = countChars(partOfTextEqualLengthOfSymbols);
    if (deepEqual(countSymbolsAsObject, partOfTextAsObjectWithCount)) {
      break;
    }
  }
  console.log(partOfTextAsObjectWithCount);
  console.log(deepEqual(countSymbolsAsObject, partOfTextAsObjectWithCount));
};

console.log(includes('example', 'pml')); // true, ищем 'pml' и находим 'mpl'
console.log(includes('server', 'revers')); // true, ищем 'revers' и находим 'server'
console.log(includes('automati', 'amtto')); // true, ищем 'amtto' и находим 'tomat'

/*

0. Используя ф-кцию countChars "анализируем" символы "pml" и получаем {p:1, m:1, l:1}
1. Смотрим длину символов (напр 3 штуки для pml)
2. Берем для начала первые 3 символа (напр exa из слова example)
3. Используя ф-кцию countChars считаем сколько букв в exa и получаем ответ {e:1, x:1, a: 1}
4. Используя ф-кцию compareObjects сравниваем {p:1, m:1, l:1} и {e:1, x:1, a: 1}, получаем false
5. Идём дальше, двигаемся на 1 символ вправо и берет 2-4 символы - "xam"
6. "Анализируем" с помощью countChars "xam" и получаем {x:1, a:1, m:1}, сравниваем - false
7. Идём дальше - amp, это {a:1, m:1, p:1} - не подходит
8. Дальше - mpl, это {m: 1, p: 1, l:1}, сравниваем с нужным {p:1, m:1, l:1} - найдено! true!

*/
