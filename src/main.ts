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

const visitors: string[] = ['Саша', 'Максим', 'Алексей', 'Валентин', 'Андрей'];

function setVisitors(visitors: string[]) {
  console.log(visitors.length);
}

setVisitors(visitors);