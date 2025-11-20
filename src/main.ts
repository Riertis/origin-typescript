/*
В интернете существует множество различных генераторов паролей, например https://passwordsgenerator.net/

Вам необходимо реализовать один из таких генераторов - функцию generatePassword.
При этом функция должна поддерживать разные конфигурации пароля (каждая настройка опциональна):
1. length - длина пароля (кол-во символов), по умолчанию 16
2. allows - разрешенные наборы значений
  * lowerCase - разрешено использовать нижний регистр (по умолчанию true).
  * upperCase - разрешено использовать верхний регистр (по умолчанию true).
  * numbers - разрешено использовать цифры (по умолчанию true).
  * specialSymbols - разрешено использовать специальные символы (по умолчанию true).
  * duplicates - разрешено использовать дубликаты (по умолчанию true).
  * sequentials - разрешено использовать последовательности (по умолчанию true).

При этом:
* Специальные символы: !@#$%^&*()-_=+[]{}|;:'",.<>/?`~
* Дубликат - ситуация, когда в строке один и тот же символ повторяется несколько раз.
Регистрозависимо, то есть "Aba" и "abA" - валидно, но "AbA" и "aba" - нет
* Последовательность - ситуация, когда рядом идут два или более одинаковых символа подряд.
Регистрозависимо, то есть "Aa" и "aA" - валидно, но "AA" или "aa" - нет

Ошибки
В случае, если по заданным настройкам невозможно создать пароль, функция должна кинуть любую ошибку.
В ошибке должно быть описание почему нельзя сгенерировать пароль с такой конфигурацией.

Внизу программы есть блок с проверками сгенерированных паролей с различными конфигами.
Если ваша функция работает правильно, в логах вы увидите успехи.
Если ваша функция работает неправильно, в логах вы увидите ошибку.
 */

type MyOptions = {
  length?: number;
  allows?: {
    lowerCase?: boolean;
    upperCase?: boolean;
    numbers?: boolean;
    specialSymbols?: boolean;
    duplicates?: boolean;
    sequentials?: boolean;
  };
};

// const parameters: Options = {
//   length
// }

const generatePassword = (options?: MyOptions): string => {
  const { length = 17, allows = {} } = options ?? {};
  const {
    lowerCase = true,
    upperCase = true,
    numbers = true,
    specialSymbols = true,
    duplicates = true,
    sequentials = true,
  } = allows || {};

  if (length === 0) {
    return 'Не задано количество символов';
  }

  let chars = ''; // создаем переменную куда будем записывать наборы символов

  if (lowerCase) chars += 'abcdefghijklmnopqrstuvwxyz'; // если true записываем буквы с низким регистром
  if (upperCase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // если true записываем буквы с Заглавным регистром
  if (numbers) chars += '0123456789'; // если true записываем цифры
  if (specialSymbols) chars += '!@#$%^&*()-_=+[]{}|;:\'",.<>/?`~'; // если true записываем специальные символы

  if (length > chars.length) {
    return 'Заданное количество символов не должно превышать длину алфавита';
  }
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars.charAt(randomIndex);
  }
  return result;
};

// ================ Текст ниже изменять запрещено! Там проверка работоспособности вашей функции!
/*
 Проверяет, что переданный пароль соответствует конфигу
 */
const verifyPassword = (password: string, ops?: MyOptions): boolean => {
  const config = {
    length: 16,
    ...ops,
    allows: {
      lowerCase: true,
      upperCase: true,
      numbers: true,
      specialSymbols: true,
      duplicates: true,
      sequentials: true,
      ...ops?.allows,
    },
  };

  if (password.length !== config.length) {
    return false;
  }

  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[^a-zA-Z0-9]/.test(password);

  // Проверка наличия запрещенных символов
  if (!config.allows.lowerCase && hasLowercase) {
    return false;
  }
  if (!config.allows.upperCase && hasUppercase) {
    return false;
  }
  if (!config.allows.numbers && hasNumbers) {
    return false;
  }
  if (!config.allows.specialSymbols && hasSymbols) {
    return false;
  }

  // Проверка наличия дубликатов
  if (!config.allows.duplicates) {
    const charSet = new Set<string>();
    for (const char of password) {
      if (charSet.has(char)) {
        return false;
      }
      charSet.add(char);
    }
  }

  // Проверка наличия последовательных символов
  if (!config.allows.sequentials) {
    for (let i = 0; i < password.length - 1; i++) {
      if (password[i] === password[i + 1]) {
        return false;
      }
    }
  }

  return true;
};

type ShouldThrowError = boolean;
const options: [MyOptions | undefined, ShouldThrowError][] = [
  [undefined, false],
  [{ length: 12 }, false],
  [{ length: 1024 }, false],
  [{ allows: {} }, false],
  [{ allows: { lowerCase: false } }, false],
  [{ allows: { upperCase: false } }, false],
  [{ allows: { numbers: false } }, false],
  [{ allows: { specialSymbols: false } }, false],
  [{ allows: { duplicates: false } }, false],
  [{ allows: { sequentials: false } }, false],
  [{ length: 1024, allows: { duplicates: false } }, true],
  [{ length: 92, allows: { duplicates: false } }, false],
  [
    {
      allows: {
        lowerCase: false,
        upperCase: true,
        numbers: false,
        specialSymbols: true,
        duplicates: false,
        sequentials: false,
      },
    },
    false,
  ],
  [
    {
      length: 10,
      allows: {
        lowerCase: false,
        upperCase: false,
        numbers: true,
        specialSymbols: false,
        duplicates: false,
        sequentials: false,
      },
    },
    false,
  ],
  [{ length: -1 }, true],
  [
    {
      allows: {
        lowerCase: false,
        upperCase: false,
        numbers: false,
        specialSymbols: false,
        duplicates: false,
        sequentials: false,
      },
    },
    true,
  ],
  [
    {
      length: 12,
      allows: {
        lowerCase: false,
        upperCase: false,
        numbers: true,
        specialSymbols: false,
        duplicates: false,
        sequentials: false,
      },
    },
    true,
  ],
];

for (let i = 0; i < options.length; i++) {
  const [option, shouldThrowError] = options[i];
  console.log(`=== Попытка №${i} ===`);

  let password: string;

  try {
    password = generatePassword(option);
  } catch (e) {
    if (!shouldThrowError) {
      throw Error('Генерация пароля кинула ошибку, хотя не должна была!');
    }

    console.log(`Пароль удовлетворяет критериям: Ожидаемая ошибка\n`);
    continue;
  }

  console.log(`Сгенерированный пароль: ${password}`);

  const isValid = verifyPassword(password, option);
  console.log(`Пароль удовлетворяет критериям: ${isValid}`);

  if (!isValid) {
    throw Error('Пароль не удовлетворяет критериям');
  }

  console.log('\n');
}

console.log('Поздравляю! Всё успешно!');

// const myOptions: MyOptions = {
//   length: 17,
// };
//
// console.log(generatePassword(myOptions));
