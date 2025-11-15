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
// -----------------------------------------
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
// ------------------------------------------
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
// -------------------------------------------------
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
// ------------Деструктуризация------------------
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
// -------------------------------------------
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
// -------------------------------
// const report = (finalists: Array<string>) => {
//   const [firstParticipant, secondParticipant, thirdParticipant, ...otherParticipants] = finalists;
//   console.log(`Первое место: ${firstParticipant}`);
//   console.log(`Второе место: ${secondParticipant}`);
//   console.log(`Второе место: ${thirdParticipant}`);
//   console.log(`Остальные участники:`, otherParticipants);
// };
//
// report(['Александр', 'Михаил', 'Валентин', 'Сергей', 'Артур']);
// ----------------------------------
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
// ------------операторы слияния------------
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
// --------------------------------------
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
// -----------Чек-------------------------
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
//   const separator = '-------------';
//   const lines = [];
//
//   lines.push(` Заказ #${order.id}`, separator, 'Клиент:');
//
//   if (!order.user) {
//     lines.push('Не указан');
//    } else {
//     const { id, name = 'Не указано', email } = order.user;
//     lines.push(`id: ${id}`, `имя: ${name}`, `email: ${email}`);
//   }
//
//   lines.push(separator, `Скидочная карта: `);
//   if (!order.card) {
//     lines.push('Не применена');
//    } else {
//     const { id, series } = order.card;
//     lines.push(`id: ${id}`, `номер: ${series}`);
//   }
//   lines.push(separator, `Список покупок:`);
//
//   let sumPrice = 0;
//   let totalCount = 0;
//   for (const item of order.items) {
//     const { name, price, count = 1 } = item;
//     lines.push(` - ${name} ${price}руб ${count}шт`);
//
//     sumPrice += price * count;
//     totalCount += count;
//   }
//   lines.push(separator, `Итого ${totalCount} позиций на ${sumPrice}руб`);
//
//   console.log(lines.join('\n'));
// }
//
// const order1: Order = {
//   id: 1,
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
// const order2: Order = {
//   id: 2,
//   user: null,
//   card: null,
//   items: [
//     { id: 6, name: 'Хлеб', price: 75, count: 3 },
//     { id: 9, name: 'Вафли', price: 95.9, count: 1 },
//     { id: 12, name: 'Набор конфет', price: 350 },
//   ],
// };
//
// const order3: Order = {
//   id: 3,
//   user: {
//     id: 5,
//     name: 'Алексей',
//     email: 'example@domain.com',
//   },
//   card: { id: 8, series: 6374634 },
//   items: [
//     { id: 6, name: 'Хлеб', price: 75, count: 3 },
//     { id: 9, name: 'Вафли', price: 95.9, count: 1 },
//     { id: 12, name: 'Набор конфет', price: 350 },
//   ],
// };
//
// printCheque(order1);
// printCheque(order2);
// printCheque(order3);
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
// const countChars = (text: string) => {
//   const resultCountChars: Record<string, number> = {};
//
//   for (const symbol of text) {
//     if (resultCountChars[symbol]) {
//       resultCountChars[symbol]++;
//     } else {
//       resultCountChars[symbol] = 1;
//     }
//   }
//   return resultCountChars;
// };
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
//
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
/*
Пропущенные числа
Напишите функцию, которая получает на вход отсортированный массив чисел от 1 до N и возвращает пропущенные числа.
Если массив, полученный на вход, не отсортирован, необходимо вернуть null.
*/
// function getMissingDigits(array: number[]) {
//   const missNumbers: number[] = [];
//
//   for (let i = 0; i < array.length - 1; i++) {
//     if (array[i] > array[i + 1]) {
//       return null;
//     }
//
//     for (let j = array[i] + 1; j < array[i + 1]; j++) {
//       missNumbers.push(j);
//
//     }
//   }
//   return missNumbers;
// }
// const result0 = getMissingDigits([1, 2, 3]); // []
//
// const result1 = getMissingDigits([1, 2, 3, 5, 8, 10, 11, 13]); // [4, 6, 7, 9, 12]
// //
// const result2 = getMissingDigits([1, 2, 5, 3]); // null
//
// const result3 = getMissingDigits([1, 5]); // [2, 3, 4]
// console.log(result0, result1, result2, result3);
/*
Напишите программу для снятия наличных денег из банкомата.

После 3х ПОДРЯД неверных вводов пин кода карта блокируется и дальнейшие операции с ней невозможны.
Обратите внимание - именно ПОДРЯД, если человек ввёл PIN дважды неправильно, а потом правильно - счётчик обнуляется.

При успешном снятии денег необходимо вывести сумму снятия и оставшийся баланс.
Сумма снятия реально должна списываться - баланс карты должен уменьшаться.

Если на карте недостаточно средств - выводите "Недостаточно средств"
Если произошёл 3-й подряд ввод неверного PIN - выводите "Карта заблокирована"
Если происходит операция с заблокированной или несуществующей картой - выводите "Карта не обслуживается"

Для вывода успешного сообщения используйте ф-цию logGreen, передав её как колбек внутрь ф-ции withdraw.
Для вывода сообщения с ошибкой используйте ф-цию logRed, передав её как колбек внутрь ф-ции withdraw.

Так же создайте типы для описания:
* Card - описывает информацию о карте
* CallbackFn - описывает переданные колбек функции

Часть данных вам уже дана.
Вы должны повторить вывод программы так, как показано на скриншоте ниже.
 */
// -------------------Снятие наличных------------
// type Card = {
//   no: string;
//   pin: number;
//   balance: number;
//   badTries: number;
//   active: boolean;
// };
//
// type CallbackFn = (msg: string) => void;
//
// type WithDrawFn = (no: string, pin: number, balance: number, logGreen: CallbackFn, logRed: CallbackFn) => void;
//
// const database: Card[] = [
//   { no: '4276 1234 5678 9101', pin: 1234, balance: 15000, badTries: 0, active: true },
//   { no: '4214 5678 9101 1121', pin: 5678, balance: 23000, badTries: 0, active: true },
//   { no: '4376 1111 2222 3333', pin: 4321, balance: 5000, badTries: 0, active: true },
//   { no: '4276 4444 5555 6666', pin: 8765, balance: 12000, badTries: 0, active: true },
//   { no: '4214 7777 8888 9999', pin: 1357, balance: 32000, badTries: 0, active: true },
// ];
//
// const separator = () => console.log('----------------------\n');
//
// const logRed: CallbackFn = (msg: string) => {
//   console.log(chalk.blue(new Date().toISOString()), chalk.magenta('ERROR'), chalk.red(msg));
// };
//
// const logGreen: CallbackFn = (msg: string) => {
//   console.log(chalk.blue(new Date().toISOString()), chalk.magenta('INFO'), chalk.green(msg));
// };
//
// export const withdraw: WithDrawFn = (no, pin, amount, logGreen, logRed) => {
//
//   let card: Card | null = null;
//   for (const cardDb of database) {
//     if (cardDb.no === no) {
//       card = cardDb;
//       break;
//     }
//   }
//
//   if (!card) {
//     logRed('Карта не поддерживается');
//     return;
//   }
//
//   if (!card.active) {
//     logRed('Карта заблокирована!');
//     return;
//   }
//
//   if (card.pin !== pin) {
//     logRed(card.badTries < 3 ? 'PIN не верный' : 'Карта заблокирована!')
//     card.badTries += 1;
//     card.active = card.badTries !== 3;
//   } else {
//     if (amount > card.balance) {
//       logRed('Недостаточно средств');
//       return;
//     }
//     card.balance -= amount;
//     card.badTries = 0;
//     logGreen(`Снятие наличных ${amount} руб. Баланс: ${card.balance} руб`);
//   }
// };
//
// // Проверка на реальное снятие баланса
// console.log('Проверка на реальное снятие баланса');
// withdraw('4276 1234 5678 9101', 1234, 14000, logGreen, logRed); // Снятие наличных 14000 руб. Баланс: 1000 руб
// withdraw('4276 1234 5678 9101', 1234, 500, logGreen, logRed); // Снятие наличных 500 руб. Баланс: 500 руб
// withdraw('4276 1234 5678 9101', 1234, 501, logGreen, logRed); // Недостаточно средств
//
// separator();
//
// // Проверка на несуществующую карту
// console.log('Проверка на несуществующую карту');
// withdraw('1111 2222 3333 4444', 1234, 501, logGreen, logRed); // Карта не обслуживается!
//
// separator();
//
// // Проверка, что карта блокируется после трех неправильных вводов PIN
// console.log('Проверка, что карта блокируется после трех неправильных вводов PIN');
// withdraw('4276 4444 5555 6666', 1111, 1, logGreen, logRed); // PIN неверный!
// withdraw('4276 4444 5555 6666', 1111, 1, logGreen, logRed); // PIN неверный!
// withdraw('4276 4444 5555 6666', 1111, 1, logGreen, logRed); // Карта заблокирована!
// withdraw('4276 4444 5555 6666', 8765, 1, logGreen, logRed); // Карта не обслуживается!
//
// separator();
//
// // Проверка, что счётчик неправильных попыток сбрасывается после правильного PIN
// console.log('Проверка, что счётчик неправильных попыток сбрасывается после правильного PIN');
// const a = 16000;
// withdraw('4214 7777 8888 9999', 1111, a, logGreen, logRed); // PIN неверный!
// withdraw('4214 7777 8888 9999', 1111, a, logGreen, logRed); // PIN неверный!
// withdraw('4214 7777 8888 9999', 1357, a, logGreen, logRed); // Снятие наличных 16000 руб. Баланс: 16000 руб
// withdraw('4214 7777 8888 9999', 1111, a, logGreen, logRed); // PIN неверный!
// withdraw('4214 7777 8888 9999', 1111, a, logGreen, logRed); // PIN неверный!
// withdraw('4214 7777 8888 9999', 1357, a, logGreen, logRed); // Снятие наличных 16000 руб. Баланс: 0 руб
// -----Самопроверка------
// const arrays = [
//   [1, 9, 9],
//   [2, 3, 6],
//   [5, 5, 25],
//   [8, 3, 25],
//   [0, 0, 0],
// ];
//
// const multiply = (a: number, b: number) => a * b;
//
// function multiplyCheck(arrays: number[][]) {
//   for (const testCase of arrays) {
//     const [a, b, expectedResult] = testCase;
//     const result = multiply(a, b) === expectedResult;
//     console.log(result, `Умножение двух первых аргументов ${result ? '' : 'не'} равно третьему значению в массиве`);
//   }
/*
  for (let i = 0; i < arrays.length; i++) {
    if (multiply(arrays[i][0], arrays[i][1]) !== arrays[i][2]) {
      console.log(false, 'Умножение двух первых аргументов не равно третьему значению в массиве');
    } else {
      console.log(true, 'Умножение двух первых аргументов равно третьему значению в массиве');
    }
  }
*/
// }
//
// multiplyCheck(arrays);
// --------Время скачивания файлов-----------
/*
Создайте функцию downloadTimeCalculator, которая умеет рассчитывать время в секундах, необходимое для загрузки файла.
Функция на вход принимает информацию о файле и информацию о скорости скачивания.

--- Система измерений ---
Для расчётов скорости и/или объёма выделяет две системы - двоичную и десятеричную, мы будем использовать последнюю.
В десятеричной новая единица измерения означает 1000 предыдущих единиц:
  * KB = 1000 B
  * MB = 1000 KB
  * GB = 1000 MB
Эти единицы называются байты (B), килобайты (KB), мегабайты (MB), гигабайты (GB)

--- Точность измерений ---
Точность измерений - 1 секунда, считать миллисекунды не нужно.
Кол-во секунд округляется наверх, то есть:
* Если для скачивания нужно 0.00001 сек времени, то ответ должен быть 1 сек.
* Если для скачивания нужно 1 час 1 минута 30.7349 сек времени, то ответ должен быть 3691 секунд.

--- Рекомендация ---
Не пытайтесь вместить весь алгоритм в одну функцию - код получится похожим на кашу.
Создавайте столько дополнительных типов и вспомогательных функций, сколько посчитаете нужным.

Например, моё решение потребовало:
* 3 дополнительных типа
* 3 дополнительные функции

Да, вы не ошиблись, формулировка "создайте функцию X" разрешает создавать не только X,
но и любую другую функцию Y, Z, C, D, которая вам может пригодиться.

--- Тесты ---
Внизу расположены тест-кейсы для проверки работоспособности вашей функции.

В тест-кейсах лежит - файл, скорость, ожидаемый ответ.
Тест-кейсы по очереди в цикле проверяют, что вызов вашей функции с этим файлом
и этой скоростью даст ответ, который совпадает с ожидаемым.
 */
/**
 * Конкретные тестовые кейсы
 * Их редактировать запрещено!
 * Дебажить, конечно же, можно.
 */
// const testCases = [
//   [10000, { name: 'День рождения.mp4', size: 1, units: 'gb' }, { speedPerSecond: 100, units: 'kb' }],
//   [1024, { name: 'Отчёт.docx', size: 1023443, units: 'kb' }, { speedPerSecond: 1, units: 'mb' }],
//   [1, { name: 'Голосовое сообщение.mp3', size: 1, units: 'b' }, { speedPerSecond: 1000, units: 'gb' }],
//   [86402, { name: 'Корги.png', size: 100.45, units: 'mb' }, { speedPerSecond: 1162.6, units: 'b' }],
//   [100450000000, { name: 'GTA V', size: 100.45, units: 'gb' }, { speedPerSecond: 1, units: 'b' }],
// ] as const;
//
// type Units = 'b' | 'kb' | 'mb' | 'gb';
//
// type MyFile = {
//   name: string;
//   size: number;
//   units: Units;
// };
//
// type Speed = {
//   speedPerSecond: number;
//   units: Units;
// };
//
// type ConvertFileSizeFn = (fileSize: number, fileUnits: string, unitOfSpeed: string) => number;
//
// const convertToBytes = (fileSize: number, units: Units): number => {
//   const powers: Record<Units, number> = {
//     b: 0,
//     kb: 1,
//     mb: 2,
//     gb: 3,
//   };
//
//   return fileSize * 1000 ** powers[units];
// };
//
// function downloadTimeCalculator(file: MyFile, speed: Speed): number {
//   const fileToBytes = convertToBytes(file.size, file.units);
//   const speedToBytes = convertToBytes(speed.speedPerSecond, speed.units);
//   return Math.ceil(fileToBytes / speedToBytes);
// }
// /**
//  * Цикл для проверки каждого тест-кейса по очереди
//  */
//
// for (const testCase of testCases) {
//   const [expected, file, speed] = testCase;
//
//   const result = downloadTimeCalculator(file, speed);
//
//   if (result === expected) {
//     console.log(`Расчеты верны для файла "${file.name}"! \tРезультат: ${result}  | Ожидаемый: ${expected}`);
//   } else {
//     console.log(`Расчеты НЕВЕРНЫ для файла "${file.name}"! \tРезультат: ${result}  | Ожидаемый: ${expected}`);
//   }
// }
/*
Скобки

Написать ф-цию, которая будет проверять правильность в последовательности скобок.
Скобки должны закрываться в том же порядке, в котором и открываются.

check('(){}[]'); // true
check('([{}{}(){}[]][])'); // true


check('(()'); // false

*/
/*
())........................

buffer = '(';


*/
// function check(brackets: string) {
//   const bracketArray = brackets.split('');
//
//   const closeBrackets = [')', '}', ']'];
//
//   const varietyBrackets = {
//     round: ['(', ')'],
//     square: ['[', ']'],
//     bracers: ['{', '}'],
//   };
//   const { round, square, bracers } = varietyBrackets;
//
//   const bufferBracket: string[] = [];
//   const lastElementBuffer = bufferBracket[bufferBracket.length - 1];
//
//   for (const bracket of bracketArray) {
//     if (closeBrackets.includes(bracket)) {
//       if (bufferBracket.length === 0) {
//         return console.log(false);
//       }
//       if (![round, square, bracers].some((arr) => arr.includes(bracket) && arr.includes(lastElementBuffer))) {
//         return console.log(false);
//       }
//       bufferBracket.pop();
//       continue;
//     }
//     bufferBracket.push(bracket);
//   }
//
//   return console.log(bufferBracket.length === 0);
// }
//
// function check(brackets: string): void {
//   const stack: ('(' | '[' | '{')[] = [];
//   const pairs = { '(': ')', '[': ']', '{': '}' } as const;
//
//   for (const bracket of brackets) {
//     if (bracket in pairs) {
//       stack.push(bracket as '(' | '[' | '{');
//     } else {
//       const last = stack.pop();
//       if (last && pairs[last] !== bracket) {
//         return console.log(false);
//       }
//     }
//   }
//
//   return console.log(stack.length === 0);
// }
// check(')()('); // false
// check('({}[])'); // true
// check('()'); // true
// check('(((((((((([{}]))))))))))'); // true
// check('((((((((((([{}])))())))))))'); // false
// check('((()})'); // false
// check('([{}{}(){}[]][])'); // true
// ==================================
// ---1----
// const storage = [
//   { age: 10, name: 'Alex' },
//   { age: 20, name: 'Max' },
//   { age: 30, name: 'Jake' },
//   { age: 40, name: 'Lilo' },
// ];
//
// const smartSearch = (arr: any[], property: any, value: any) => {
//   return arr.find((person) => person[property] === value);
// };
//
// const person1 = smartSearch(storage, 'age', 30);
// // { age: 30, name: 'Jake' }
//
// const person2 = smartSearch(storage, 'age', 10);
// // { age: 10, name: 'Alex' }
//
// const person3 = smartSearch(storage, 'name', 'Lilo');
// // { age: 40, name: 'Lilo' }
//
// console.log(person1);
// console.log(person2);
// console.log(person3);
// ---2----
// const randomArray: number[] = [];
// const randomLengthForArray = faker.number.int(20);
//
// for (let i = 0; i < randomLengthForArray; i++) {
//   randomArray.push(faker.number.int(20));
// }
// console.log(randomArray);
// const filterWithChance = (arr: number[], chance: number) => {
//   const chanceNum = (100 - chance) * 0.01;
//   return arr.filter(() => Math.random() > chanceNum);
// };
//
// console.log(filterWithChance(randomArray, 80));
// ---3---
// enum Team {
//   red = 'red',
//   blue = 'blue',
// }
//
// type User = {
//   id: number;
//   name: string;
//   age: number;
// };
//
// type ProcessedUser = {
//   name: string;
//   isAdult: boolean;
//   team: Team;
// };
//
// const users: User[] = [
//   { id: 7, name: 'Александр Сильвестрович', age: 17 },
//   { id: 17, name: 'Райан Сергеевич Гослинг', age: 18 },
//   { id: 27, name: 'Джейсон Райанович Стетхем', age: 19 },
//   { id: 37, name: 'Имя не указано', age: 8 },
// ];
//
// const processUsers = (users: User[]): ProcessedUser[] => {
//   // ... здесь ваш код
//   return users
//     .filter((user) => user.age >= 18)
//     .map((user) => {
//       const randomTeam = Math.random() > 0.5 ? Team.red : Team.blue;
//       return {
//         name: user.name,
//         isAdult: true,
//         team: randomTeam,
//       };
//     });
// };
//
// const processed: ProcessedUser[] = processUsers(users);
//
// console.log(processed);
/*
Пример вывода! Команды будут случайными!
[
 { name: 'Райан Сергеевич Гослинг', isAdult: true, team: 'red' },
 { name: 'Джейсон Райанович Стетхем', isAdult: true, team: 'blue' },
]
 */
// ---4---
//
// const sort = (array: User[], key: keyof User, direction: 'asc' | 'desc' = 'asc') => {
//   return [...array].sort((a, b) => {
//     const valueA = a[key];
//     const valueB = b[key];
//
//     // Приводим к строке для безопасного сравнения
//     const strA = String(valueA).toUpperCase();
//     const strB = String(valueB).toUpperCase();
//
//     const result = 0;
//
//     if (strA < strB) {
//       return -1;
//     }
//     if (strA > strB) {
//       return 1;
//     }
//     return direction === 'desc' ? -result : result;
//   });
// };
//
// type User = { id: number; age: number; name: string };
//
// const users: User[] = [
//   { id: 1, age: 10, name: 'zxc' },
//   { id: 3, age: 20, name: 'juk' },
//   { id: 6, age: 2, name: 'aa' },
//   { id: 9, age: 1, name: 'ab' },
//   { id: 2, age: 5, name: 'zz' },
// ];
//
// const sortedByIdAsc = sort(users, 'id');
// console.log(sortedByIdAsc);
// /* Отсортированы по увеличению id
// [
//   { id: 1, age: 10, name: 'zxc' },
//   { id: 2, age: 5, name: 'zz' },
//   { id: 3, age: 20, name: 'juk' },
//   { id: 6, age: 2, name: 'aa' },
//   { id: 9, age: 1, name: 'ab' }
// ]
//  */
//
// const sortedByNameDesc = sort(users, 'name', 'desc');
// console.log(sortedByNameDesc);
// /* Отсортированы по уменьшению имени
// [
//   { id: 2, age: 5, name: 'zz' },
//   { id: 1, age: 10, name: 'zxc' },
//   { id: 3, age: 20, name: 'juk' },
//   { id: 9, age: 1, name: 'ab' },
//   { id: 6, age: 2, name: 'aa' }
// ]
//  */
//
// const sortedByAgeDesc = sort(users, 'age', 'desc');
// console.log(sortedByAgeDesc);
// /* Отсортированы по уменьшению возраста
// [
//   { id: 3, age: 20, name: 'juk' },
//   { id: 1, age: 10, name: 'zxc' },
//   { id: 2, age: 5, name: 'zz' },
//   { id: 6, age: 2, name: 'aa' },
//   { id: 9, age: 1, name: 'ab' }
// ]
//  */
//
// console.log(users);
// /* ПЕРВОНАЧАЛЬНЫЙ МАССИВ USERS ОСТАЛСЯ НЕ ТРОНУТЫМ!
// [
//   { id: 1, age: 10, name: 'zxc' },
//   { id: 3, age: 20, name: 'juk' },
//   { id: 6, age: 2, name: 'aa' },
//   { id: 9, age: 1, name: 'ab' },
//   { id: 2, age: 5, name: 'zz' }
// ]
//  */
// ---5---
// const wordsArray = ['asdasdasd', 'asd', 'asddddv', 'fdfgdfgdf'];
//
// const getLongWord = (words: string[]): string => {
//   return words.reduce((acc, word) => {
//     return word.length > acc.length ? word : acc;
//   }, '');
// };
//
// console.log(getLongWord(wordsArray));
// ---6---
// const deduplicate = (word: string) => {
//
//   return word.split('').reduce((acc: string, letter) => {
//     if (acc[acc.length - 1] !== letter) {
//       acc += letter;
//     }
//     return acc;
//   }, '');
// };
//
// const result = deduplicate('uuunbbeliaaaaveeabbbblllllee');
// console.log(result); // unbeliaveable
// ---7---
// const countTypes = (...types: (string | number | boolean | object | undefined)[]) => {
//   return types.reduce((acc: Record<string, number>, type) => {
//     const typeName = typeof type;
//     acc[typeName] = (acc[typeName] || 0) + 1;
//     return acc;
//   }, {});
// };
//
// console.log(countTypes(3, true, 'a', 1, {}, () => {}, 4, [], undefined, false, 0, undefined, {}, ''));
//
// // Ожидаемый вывод:
// // { number: 4, boolean: 2, string: 2, object: 3, function: 2, undefined: 2 }
// ---8---
/*
Вам даны 2 пользователя банковской системы.
У каждого пользователя есть список проведенных операций по банковской карте.
Каждая операция может быть как положительной (пополнение), так и отрицательной (снятие).

При открытии счета у пользователя есть стартовый баланс - он может быть как отрицательным, так и положительным.

Напишите функцию calculateBalanceForUser(user: User): number, которая принимает на вход объект типа User,
а возвращает число - текущий баланс пользователя.
С помощью reduce просто просуммируйте стартовый баланс и все операции.
 */
//
// type Transaction = {
//   id: number;
//   diff: number;
// };
//
// type User = {
//   id: number;
//   name: string;
//   startBalance: number;
//   transactions: Transaction[];
// };
//
// const alexander: User = {
//   id: 37,
//   name: 'AleX',
//   startBalance: 0,
//   transactions: [
//     { id: 8, diff: 100 },
//     { id: 30, diff: -50 },
//     { id: 23, diff: 250 },
//   ],
// };
//
// const max: User = {
//   id: 40,
//   name: 'MaX',
//   startBalance: -3,
//   transactions: [
//     { id: 4, diff: 9 },
//     { id: 5, diff: -18 },
//     { id: 5, diff: 3 },
//   ],
// };
//
// const calculateBalanceForUser = (user: User): number => {
//   const userDiffs = user.transactions.map((transaction) => transaction.diff);
//   return userDiffs.reduce((acc: number, amount: number): number => {
//     return acc + amount;
//   }, user.startBalance);
// };
//
// const alexanderBalance = calculateBalanceForUser(alexander); // Его история операция: 0 + 100 - 50 + 250
// console.log(alexanderBalance); // 300
//
// const maxBalance = calculateBalanceForUser(max); // Его история операция: -3 + 9 - 18 + 3
// console.log(maxBalance); // -9
// ---9---
// const values = [
//   [1, 100],
//   [2, 200],
//   [3, 300],
//   [1, 2],
//   [3, 400],
//   [4, 500],
//   [1, 99],
// ];
//
// type Counter = {
//   count: number;
//   sum: number;
// };
//
// const result = values.reduce((acc, [score, value]): Record<string, Counter> => {
//   if (!acc[score]) {
//     acc[score] = { count: 0, sum: 0 };
//   }
//   acc[score].count++;
//   acc[score].sum += value;
//
//   return acc;
// }, {});
// console.log(result);
/*
{
  '1': { count: 3, sum: 201 },
  '2': { count: 1, sum: 200 },
  '3': { count: 2, sum: 700 },
  '4': { count: 1, sum: 500 }
}

(Объяснение) Если не поняли, это означает, что:
Оценка 1 встретилась 3 раза - [1, 100], [1, 2] и [1, 99] и всего = 201 чел (100+2+99)
Оценка 2 встретилась 1 раз - [2, 200] и всего 200 чел
Оценка 3 встретилась 2 раза - [3, 300] и [3, 400] и всего 700 чел
Оценка 4 встретилась 1 раз - [4, 500] и всего 500 чел
 */
/*
Найти в первом числе все пары цифр, произведение которых равно второму аргументу,
и вернуть строку с индексами этих цифр, записанными подряд.
Если таких пар несколько, достаточно вернуть первую попавшуюся.

Если ни одной подходящей пары нет, вернуть строку “-1-1”.

findMultiply(1234567890, 18) => 18
👆18, потому что по индексу [1] лежит цифра "2", а по индексу [8] лежит "9", 2 и 9 в сумме даёт 18

findMultiply(1234567890, 12) => 23
👆23, потому что по индексу [2] число 3, а по индексу [3] число 4, а 3*4 = 12

findMultiply(592729, 81) => 15
findMultiply(123, 5) => -1-1
findMultiply(55, 25) => 01
 */
// ---циклы---
//
// const findMultiply = (value: number, multiplyNumbers: number): string => {
//   const valueArray = value.toString().split('');
//   for (let i = 0; i < valueArray.length; i++) {
//     for (let j = 0; j < valueArray.length; j++) {
//       const multiply = Number(valueArray[i]) * Number(valueArray[j]);
//       if (multiply === multiplyNumbers && i !== j) {
//         return `${i}${j}`;
//       }
//     }
//   }
//   return `-1 -1`;
// };
//
// console.log(findMultiply(592729, 81)); // => 15
// console.log(findMultiply(123, 5)); // => -1-1
// console.log(findMultiply(55, 25)); // => 01
/*


Написать 2 функции:
1. Для сокращения ссылки
2. Для получения полной ссылки по короткой

Для хранения данных между вызовами функций используйте просто массив в переменной.


Для самого "сокращения" вы просто генерируйте рандомную короткую строку.

Опишите все типы TypeScript.

 */
//
// type Link = string;
// type ShortLink = string;
// type LongLink = {
//   clickingCount: number;
//   link: Link;
// };
// type Links = Record<ShortLink, LongLink>;
// type Database = Links[];
//
// const database: Database = [];
//
// const link1 = 'https://backend-mentor.tech/articles/javascript?level=newbee';
// const link2 =
//   'https://market.yandex.ru/card/kreslo-meshok-grusha-laavi-home-razmer-khxxxl-mebelnyy-velyur-seryy/103666480842?do';
// const link3 =
//   'https://market.yandex.ru/card/zerkalo-pryamougolnoye-s-podsvetkoy-luminor-11080-s-vyklyuchatelem-na-vzmakh-s-podsvetkoy-3000k/102990889179?do-waremd5=qe';
//
// const createShortLink = (link: Link): ShortLink => {
//   let shortLink: ShortLink;
//
//   do {
//     shortLink = faker.string.nanoid(6);
//     // eslint-disable-next-line no-loop-func
//   } while (database.some((short) => shortLink in short));
//
//   database.push({
//     [shortLink]: {
//       clickingCount: 0,
//       link: link,
//     },
//   });
//   return shortLink;
// };
//
// const getFullLink = (shortLink: ShortLink): Link => {
//   const linkToFind = database.find((linksToFind) => shortLink in linksToFind);
//   if (linkToFind) {
//     linkToFind[shortLink].clickingCount++;
//     return linkToFind[shortLink].link;
//   }
//   return 'Ссылка не найдена';
// };
//
// const s1 = createShortLink(link1); // Какая-то короткая ссылка
// const s2 = createShortLink(link2); // Какая-то короткая ссылка
// const s3 = createShortLink(link3); // Какая-то короткая ссылка
//
// const full = getFullLink(s1); // Здесь полная ссылка
// const full2 = getFullLink(s1); // Здесь полная ссылка
// const full3 = getFullLink(s2); // Здесь полная ссылка
// const full4 = getFullLink(s2); // Здесь полная ссылка
// const full5 = getFullLink(s2); // Здесь полная ссылка
// const full6 = getFullLink(s3); // Здесь полная ссылка
//
// console.log(database);
//
// const getTopByViews = (count: number) => {
//   if (count < 1) {
//     return 'Топ не сформирован';
//   }
//   const getClickingCount = (item: Links): number => {
//     return Object.values(item)[0].clickingCount;
//   };
//
//   const sortedDatabaseDesc = [...database].sort((a, b) => getClickingCount(b) - getClickingCount(a));
//
//   const topLinks = []; // пока длинна массива меньше count пушить объекты по убыванию
//
//   for (let i = 0; i < count; i++) {
//     // const topClicking = sortedDatabaseDesc.reduce((acc: Record<string, number>, links: Links): Record<string, number> => {}
//     topLinks.push(sortedDatabaseDesc[i]);
//   }
//   return topLinks;
// };
// const topViews = getTopByViews(5);
// console.log(topViews);
// ---Задание с паролями---
/*
Вам необходимо разработать сервис для авторизации пользователей.
Примерно такие же сервисы используются в большинстве Backend приложений.

Вам нужно реализовать 2 функции:
* register() - получает на вход данные типа RegisterData с указанием почты, пароля и имени человека.
* login() - получает на вход данные типа LoginData с указанием почты и пароля.

Каждый новый зарегистрированный пользователь получает свой id, используя faker.string.nanoid

Данные пусть будут храниться в массиве database, представим что это наша "база данных"

Пароль хранить в базе данных в "открытом" виде НЕБЕЗОПАСНО и на самом деле никто так не делает.
Пароли всегда хранятся в захешированном виде (напр. библиотека bcrypt), но пока хватит примитивных
методов хеширования - будем использовать sha256, я уже оставил вам функцию generateHash,
в неё вы можете передать строку, а в ответе получите эту строку в захешированном виде.

Если пользовать регистрируется, ему должно вывестись сообщение.
Если происходит попытка входа для несуществующего пользователя, должно вывестить сообщение

При 3-х ПОДРЯД неверный попытках ввода дальнейшие входы блокируются.

Если пользователь ввел пароль неверный в первый или второй раз - вывести сообщение
Если пользователь ввел пароль неверно в третий раз ПОДРЯД - сообщение с информацией о блокировке
 */
//
// import { createHash } from 'node:crypto';
//
// /**
//  * Функция для генерации хеша, на вход получает строку, на выход даёт её в хешированном виде
//  */
// function generateHash(rawText: string): string {
//   return createHash('sha256') // выбираем алгоритм SHA-256
//     .update(rawText) // обновляем хеш данными
//     .digest('hex'); // выводим результат в шестнадцатеричном формате
// }
//
// type User = {
//   id: number | string;
//   name: string;
//   email: string;
//   password: string;
//   badTries?: number;
// };
//
// type LoginData = {
//   name?: string;
//   email: string;
//   password: string;
// };
//
// type RegisterData = {
//   name: string;
//   email: string;
//   password: string;
// };
//
// const database: User[] = [];
//
// const register = (data: RegisterData) => {
//   const { name, email, password } = data;
//   const generateUserId = faker.string.nanoid(8);
//   const hashedUserPassword = generateHash(password);
//   const user: User = {
//     id: generateUserId,
//     name,
//     email,
//     password: hashedUserPassword,
//   };
//   database.push(user);
//   console.log(`${name}, вы успешно зарегистрированы, ваш id - ${generateUserId}`);
// };
//
// const login = (data: LoginData) => {
//   const { name, email, password } = data;
//   const hashedUserPassword = generateHash(password);
//   let user: User | null = null;
//
//   for (const userDb of database) {
//     if (userDb.email === email) {
//       user = userDb;
//       break;
//     }
//   }
//
//   if (!user) {
//     console.log('Пользователь не найден');
//     return;
//   }
//
//   if (user.badTries === undefined) {
//     user.badTries = 0;
//   }
//
//   if (user.password !== hashedUserPassword) {
//     user.badTries += 1;
//     console.log(user.badTries >= 3 ? 'Пользователь заблокирован' : 'Неверный пароль');
//     return;
//   }
//   if (user.badTries >= 3) {
//     console.log('Пользователь заблокирован');
//     return;
//   }
//
//   user.badTries = 0;
//   console.log(`Добро пожаловать, ${name}`);
// };
//
// /**
//  * Ниже идут примеры использования ваших функций
//  */
//
// /* создать пользователей с типом RegisterData более правильно ?
// const maxim: LoginData = { name: 'maxim', email: 'maxim@gmail.com', password: '123456' };
// const mihail: LoginData = { name: 'mihail', email: 'mihail@gmail.com', password: '223223' };
// */
//
// const maxim: RegisterData = { name: 'maxim', email: 'maxim@gmail.com', password: '123456' };
// const mihail: RegisterData = { name: 'mihail', email: 'mihail@gmail.com', password: '223223' };
//
// register(maxim); // maxim, вы успешно зарегистрированы, ваш id - jYhvZ!
// register(mihail); // mihail, вы успешно зарегистрированы, ваш id - oPgxU!
//
// /**
//  * Проверяем Максима, он должен на первый раз успешно войти,
//  * а дальше за 3 неверных входа заблокироваться
//  */
// console.log('Проверка Максима:');
// const maximLoginData: LoginData = { ...maxim };
//
// login(maximLoginData); // Добро пожаловать, maxim
//
// maximLoginData.password = '--';
//
// login(maximLoginData); // Неверный пароль!
// login(maximLoginData); // Неверный пароль!
// login(maximLoginData); // Неверный пароль! Вы заблокированы!
//
// maximLoginData.password = '123456';
// login(maximLoginData); // Вы заблокированы!
// login(maximLoginData); // Вы заблокированы!
//
// /**
//  * Проверяем Михаила, счетчик его неверных попыток входа должен сбрасываться
//  * Блокировка не должна происходить
//  */
// console.log('\n\nПроверка Михаила:');
// // const mihailLoginData: RegisterData = { ...mihail }; // вероятно опечатка?
// const mihailLoginData: LoginData = { ...mihail };
//
// login(mihailLoginData); // Добро пожаловать, mihail
//
// mihailLoginData.password = '-';
// login(mihailLoginData); // Неверный пароль!
// login(mihailLoginData); // Неверный пароль!
//
// mihailLoginData.password = mihail.password;
//
// login(mihailLoginData); // Добро пожаловать, mihail
//
// mihailLoginData.password = '-';
// login(mihailLoginData); // Неверный пароль!
// login(mihailLoginData); // Неверный пароль!
//
// mihailLoginData.password = mihail.password;
//
// login(mihailLoginData); // Добро пожаловать, mihail
//
// /**
//  * Проверяем несуществующего пользователя
//  */
// console.log('Проверяем несуществующего пользователя:');
// login({ email: 'a@a.a', password: 'a' }); // Пользователь не найден!

/*
Вам дан список сотрудников компании.
У каждого сотрудника, кроме генерального директора, есть начальник.

Описание полей:
id - id самого сотрудника
name - имя самого сотрудника
title - должность текущего сотрудника
chiefId - id сотрудника, который является начальником текущего сотрудника


Ваша задача - вывести цепочку сотрудников согласно их подчинению.
Например, Алексей Иванов является генеральным директором, потому что у него нет начальник (chiefId=null),
далее ищем его подчиненного, то есть такого сотрудника, у которого в chiefId указан гендир (chiefId=42).
И так далее, пока не выведем всех сотрудников компании.

Гарантируется, что цепочка подчинения линейная, то есть у каждого человека может быть
только один другой сотрудник в подчинении, и у каждого сотрудника может быть только один начальник.

Вывод должен быть таким:

Алексей Иванов (Chief Executive Officer)
Ирина Петрова (co-Chief Executive Officer)
Дмитрий Соколов (Chief Operating Officer)
Екатерина Смирнова (Chief Product and Technology Officer)
Сергей Кузнецов (Chief Technical Officer)
Ольга Васильева (Tech Lead)
Николай Михайлов (Team Lead)
Марина Федорова (Backend Developer)
 */
//
// type User = {
//   // Опишите поля
// };
// const employees: User[] = [
//   { id: 59, name: 'Екатерина Смирнова', chiefId: 12, title: 'Chief Product and Technology Officer' },
//   { id: 4, name: 'Николай Михайлов', chiefId: 34, title: 'Team Lead' },
//   { id: 12, name: 'Дмитрий Соколов', chiefId: 87, title: 'Chief Operating Officer' },
//   { id: 96, name: 'Марина Федорова', chiefId: 4, title: 'Backend Developer' },
//   { id: 71, name: 'Сергей Кузнецов', chiefId: 59, title: 'Chief Technical Officer' },
//   { id: 34, name: 'Ольга Васильева', chiefId: 71, title: 'Tech Lead' },
//   { id: 42, name: 'Алексей Иванов', chiefId: null, title: 'Chief Executive Officer' },
//   { id: 87, name: 'Ирина Петрова', chiefId: 42, title: 'co-Chief Executive Officer' },
// ];

// ------------------------

/*
Напишите ф-цию changeCase, которая принимает на вход 2 аргумента:
1. Текст в каком-то заранее не известном регистре
2. В какой регистр (кейс) его нужно перевести


1 Часть
Функция separate, которая принимает на вход строку в каком-то регистре, "анализирует" строку, выделяет из неё слова
Напр. separate("шампур-с-мясом") вернет (к примеру) ["шампур", "с", "мясом"]

2 Часть
Функция join, которая принимает на вход строку и целевой регистр, напр:
join(["красный", "телефон"], "snake_case") вернет красный_телефон

 */

/*
PascalCase
camelCase :
kebab-case : -
snake_case : _
 */
//
const mainWord = 'Эта.стРока+дЛя_  проВерки     реШения-ЗАДАНИЯ';

const separate = (word: string) => {
  return word.split(/\s*[,;\s-_\+\.]\s*/);
};

const validCases = new Set(['snake_case', 'kebab-case', 'PascalCase', 'camelCase']);

const joinWords = (words: string[], typeGraphic: string): string => {
  if (!words || words.length === 0) {
    return 'Пустой массив слов';
  }

  if (!typeGraphic || !validCases.has(typeGraphic)) {
    return 'Не верно введен регистр';
  }
  const lowerRegisterWords = words.map((word) => word.toLowerCase());
  const firstUpperLetter = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  if (typeGraphic === 'snake_case') {
    return lowerRegisterWords.join('_');
  }
  if (typeGraphic === 'kebab-case') {
    return lowerRegisterWords.join('-');
  }
  return lowerRegisterWords
    .map((word, index) => (typeGraphic === 'camelCase' && index === 0 ? word : firstUpperLetter(word)))
    .join('');
};

const printWords = (word: string, typeGraphic: string) => {
  const separatedWords = separate(word);
  return joinWords(separatedWords, typeGraphic);
};

console.log(mainWord);
console.log('snake_case: ', printWords(mainWord, 'snake_case'));
console.log('kebab-case: ', printWords(mainWord, 'kebab-case'));
console.log('PascalCase: ', printWords(mainWord, 'PascalCase'));
console.log('camelCase: ', printWords(mainWord, 'camelCase'));
console.log('unknown: ', printWords(mainWord, 'unknown'));

// ---------------------------------------------

/*
Вам даны 18 человек, которые сдавали ЕГЭ. Каждый человек сдавал от 3-х до 5-и экзаменов.

Теперь все эти 18 человек хотят поступить в университет.

Каждый университет для поступления требует свой набор экзаменов.
Места в университете не бесконечные, поэтому каждый университет готов взять только определённый % лучших кандидатов
от общего количества подходящих кандидатов.

Например, если в университет "Cargo-Corgi Technology" проходят 12/18 человек, а университет готов принять только 45%,
значит что из 12 (НЕ 18!!) потенциальных кандидатов будут зачислены только 5.4 человек.
Так как кол-во человек не может быть дробным, округляем кол-во наверх,
то есть для 12 кандидатов и проходом 45% пройдут лучшие 6 человек.

Лучшие N человек - это топ N человек с наивысшей суммой баллов по ТРЕБУЕМЫМ в этом университете предметам (а не всем предметам!).
Например, если:
* Университет требует физика + русский + химия
* Ваня сдал физика-90, русский-90, математика-90
* Саша сдал физика-30, русский-20, химия-10
* Эдик сдал физика-31, русский-21, химия-11
Тогда у Саши в сумме 60 баллов, у Эдика 63 балла,
а Ваня не может быть зачислен, так как он не сдавал химию, хоть по остальным экзаменам у него много баллов.

Если университет готов принять только 20% кандидатов, это значит он готов принять только 1 чел (2 * 0.2 = 0.4 и округление наверх до 1),
значит в таком случае будет зачислен только Эдик.

Если же университет готов принять 51% кандидатов, то значит он готов принять 2 чел (2 * 0.51 = 1.02, округляем наверх до 2),
в таком случае будут зачислены и Саша и Эдик.


Использование циклов for i, for in, for of, while ЗАПРЕЩЕНО🚫
Вы вправе разделять логику на любое количество функций и разных типов.
Лично у меня вышла всего 1 функция с:
* 1 дополнительным вспомогательным типом
* Сначала 1 reduce
  * Внутри этого reduce были:
  * 1 filter
  * 1 reduce (да, я использовал reduce внутри reduce)
* Затем 1 sort для данных, полученных после прошлого reduce
* После этого 1 slice, для данных, полученных после прошлого sort
* И в конце 1 map, для данных, полученных после прошлого slice


Ваша функция для вызовов:

processCandidates(cyber, users)
processCandidates(chemi, users)

должна вывести следующие сообщения:

---------- Информация о поступлении в Cyberuniversity ----------
Для поступления требуются экзамены: Профильная алгебра, Информатика, Физика
Всего подали документы 18 студентов
Сдавали нужные экзамены 6/18 кандидатов.
Университет готов принять 40% лучших из них, то есть 3 студента(ов)
Будут зачислены следующие студенты:
 * Екатерина (255)
 * Павел (251)
 * Татьяна (236)
----------------------------------------------------------------

---------- Информация о поступлении в Chemiuniversity ----------
Для поступления требуются экзамены: Профильная алгебра, Русский язык, Химия
Всего подали документы 18 студентов
Сдавали нужные экзамены 8/18 кандидатов.
Университет готов принять 35% лучших из них, то есть 3 студента(ов)
Будут зачислены следующие студенты:
 * Татьяна (228)
 * Ольга (222)
 * Владимир (209)
----------------------------------------------------------------

 */

// -------- Описания типов. Можете добавлять свои. --------
enum Ex {
  R = 'Русский язык',
  MP = 'Профильная алгебра',
  C = 'Химия',
  P = 'Физика',
  I = 'Информатика',
}

type ExamResult = {
  name: Ex;
  score: number;
};

type User = {
  id: number;
  name: string;
  exams: ExamResult[];
};

type University = {
  id: number;
  name: string;
  exams: Ex[];
  topPercent: number;
};

type PassedRequireExams = {
  name: Ex[];
  sumScore: number;
};

type AbleStud = {
  id: number;
  name: string;
  exams: Ex[];
  totalScore: number;
};

// -------- Конец описания типов. --------

// -------- Описания университетов. --------
const cyber: University = {
  id: 2077,
  name: 'Cyberuniversity',
  exams: [Ex.MP, Ex.I, Ex.P],
  topPercent: 40,
};

const chemi: University = {
  id: 228,
  name: 'Chemiuniversity',
  exams: [Ex.MP, Ex.R, Ex.C],
  topPercent: 35,
};
// -------- Конец описания университетов. --------

// Кандидаты
// 👇 Отключаем ESLint и Prettier чтобы строки не переносились
/* eslint-disable */
const users: User[] = [
  {
    id: 4321,
    name: 'Максим',
    exams: [{ name: Ex.MP, score: 75 }, { name: Ex.P, score: 68 }, { name: Ex.R, score: 82 }],
  },
  {
    id: 187,
    name: 'Алексей',
    exams: [{ name: Ex.MP, score: 55 }, { name: Ex.I, score: 90 }, { name: Ex.C, score: 40 }, { name: Ex.R, score: 70 }],
  },
  {
    id: 3298,
    name: 'Дмитрий',
    exams: [{ name: Ex.C, score: 45 }, { name: Ex.MP, score: 65 }, { name: Ex.P, score: 72 }, { name: Ex.I, score: 88 }],
  },
  {
    id: 450,
    name: 'Иван',
    exams: [{ name: Ex.R, score: 33 }, { name: Ex.C, score: 71 }, { name: Ex.MP, score: 80 }, { name: Ex.P, score: 59 }],
  },
  {
    id: 2947,
    name: 'Константин',
    exams: [{ name: Ex.MP, score: 90 }, { name: Ex.I, score: 60 }, { name: Ex.C, score: 50 }],
  },
  {
    id: 1376,
    name: 'Анна',
    exams: [{ name: Ex.R, score: 88 }, { name: Ex.MP, score: 70 }, { name: Ex.P, score: 43 }, { name: Ex.C, score: 38 }],
  },
  {
    id: 4999,
    name: 'Татьяна',
    exams: [{ name: Ex.MP, score: 77 }, { name: Ex.R, score: 66 }, { name: Ex.I, score: 95 }, { name: Ex.P, score: 64 }, { name: Ex.C, score: 85 }],
  },
  {
    id: 2103,
    name: 'Владимир',
    exams: [{ name: Ex.C, score: 49 }, { name: Ex.R, score: 70 }, { name: Ex.MP, score: 90 }, { name: Ex.I, score: 55 }],
  },
  {
    id: 765,
    name: 'Елена',
    exams: [{ name: Ex.R, score: 94 }, { name: Ex.MP, score: 67 }, { name: Ex.P, score: 85 }],
  },
  {
    id: 3822,
    name: 'Сергей',
    exams: [{ name: Ex.P, score: 76 }, { name: Ex.MP, score: 82 }, { name: Ex.I, score: 70 }, { name: Ex.C, score: 65 }],
  },
  {
    id: 154,
    name: 'Наталья',
    exams: [{ name: Ex.R, score: 61 }, { name: Ex.C, score: 55 }, { name: Ex.MP, score: 52 }, { name: Ex.P, score: 58 }],
  },
  {
    id: 2678,
    name: 'Екатерина',
    exams: [{ name: Ex.P, score: 86 }, { name: Ex.MP, score: 91 }, { name: Ex.R, score: 72 }, { name: Ex.I, score: 78 }],
  },
  {
    id: 4815,
    name: 'Марина',
    exams: [{ name: Ex.I, score: 99 }, { name: Ex.MP, score: 85 }, { name: Ex.R, score: 63 }],
  },
  {
    id: 394,
    name: 'Михаил',
    exams: [{ name: Ex.P, score: 60 }, { name: Ex.MP, score: 45 }, { name: Ex.R, score: 48 }],
  },
  {
    id: 2567,
    name: 'Андрей',
    exams: [{ name: Ex.C, score: 85 }, { name: Ex.I, score: 88 }, { name: Ex.MP, score: 65 }, { name: Ex.R, score: 55 }],
  },
  {
    id: 3201,
    name: 'Юлия',
    exams: [{ name: Ex.R, score: 72 }, { name: Ex.C, score: 49 }, { name: Ex.P, score: 70 }],
  },
  {
    id: 987,
    name: 'Павел',
    exams: [{ name: Ex.MP, score: 93 }, { name: Ex.P, score: 81 }, { name: Ex.I, score: 77 }],
  },
  {
    id: 4367,
    name: 'Ольга',
    exams: [{ name: Ex.R, score: 88 }, { name: Ex.P, score: 69 }, { name: Ex.C, score: 74 }, { name: Ex.I, score: 50 }, { name: Ex.MP, score: 60 }],
  },
];
/* eslint-enable */
// 👆 Обратно включаем правила форматирования

const processCandidates = (univer: University, users: User[]) => {
  const { name: nameUniver, exams: requireExams, topPercent } = univer; // деструктуризация объектов университетов, получаем переменные

  const requireExamSet = new Set(requireExams); // создаем Set структуру, для будущего поиска

  const ableStudents = users
    // из массива объектов users фильтруем тех, у кого в сданных экзаменах присутствует набор предметов требующихся для поступления
    .filter((user) => {
      const userExamSet = new Set(user.exams.map((exam) => exam.name)); // маплю у узеров сданные экзамены и записываю в отдельный set

      return requireExams.every((exam) => userExamSet.has(exam)); // делаю проверку, что все предметы от универа есть в списке экзаменов
    })
    // второй этап маплю полученных студентов в объекты, с новыми полями.
    .map((user): AbleStud => {
      const relevantExam = user.exams.filter((exam) => requireExamSet.has(exam.name)); // ищу предметы у студента, которые требует университет

      const totalScore = relevantExam.reduce((sum, exam) => sum + exam.score, 0); // подсчитываю количество полученных балов по этим предметам

      const examNames = relevantExam.map((exam) => exam.name); // маплю набор экзаменов для визуальной проверки

      return {
        id: user.id,
        name: user.name,
        exams: examNames,
        totalScore,
      };
    })
    // сортирую полученный массив по баллам, от большего к меньшему
    .sort((a, b) => b.totalScore - a.totalScore);

  const amountPlaces = Math.ceil((ableStudents.length * topPercent) / 100); // расчет свободных мест
  const enrollStudents = ableStudents
    .slice(0, amountPlaces) // от массива забираем нужное количество студентов
    .map((student) => `* ${student.name} (${student.totalScore})`) // Мапим шаблонную строку
    .join('\n'); // Для переноса

  console.log(`---------- Информация о поступлении в ${nameUniver} ----------
Для поступления требуются экзамены: ${requireExams}
Всего подали документы ${users.length} студентов
Сдавали нужные экзамены ${ableStudents.length}/${users.length}  кандидатов.
Университет готов принять ${topPercent}% лучших из них, то есть ${amountPlaces} студента(ов)
Будут зачислены следующие студенты:
${enrollStudents}
----------------------------------------------------------------`);
};

// Вызов функций:
processCandidates(cyber, users);
processCandidates(chemi, users);
