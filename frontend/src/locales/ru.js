const ruLocales = {
  translation: {
    notFound: 'Not Found Page',
    signupPage: {
      title: 'Регистрация',
      placeholderUsername: 'Имя пользователя',
      placeholderPassword: 'Пароль',
      placeholderconfirmPassword: 'Подтвердите пароль',
      buttonSubmit: 'Зарегистрироваться'
    },
    loginPage: {
      title: 'Войти',
      placeholderUsername: 'Ваш ник',
      placeholderPassword: 'Пароль',
      buttonSubmit: 'Войти',
      linkSugnup: 'Регистрация',
      spanNotAccaunt: 'Нет аккаунта?'
    },
    errorValidation: {
      minName: 'От 3 до 20 символов',
      minPassword: 'Не менее 6 символов',
      maxName: 'От 3 до 20 символов',
      required: 'Обязательное поле',
      oneof: 'Пароли должны совпадать',
      uniqNameChanel: 'Введите уникальное имя канала'
    },
    errorFetch: {
      noValidUsername: 'Неверные имя пользователя или пароль',
      duplicate: 'Такой пользователь уже существует',
    },
    navBar: {
      hexlet: 'Hexlet Chat',
      exit: 'Выход',
    },
    chatHome: {
      chanel: 'Каналы',
      loading: 'Loading',
      delete: 'Удалить',
      edit: 'Переименовать',
      messages_one: 'Сообщение',
      messages_few: 'Сообщения',
      messages_many: 'Сообщений',
      sendMessage: 'Отправить',
      messageFormPlaceholder: 'Введите сообщение...',
    },
    modal: {
      send: 'Отправить',
      delete: 'Удалить',
      close: 'Закрыть',
      isDelete: 'Уверрены?',
      addChanel: 'Добавить канал',
      editChanel: 'Переименовать канал',
      removeChanel: 'Удалить канал',
    },
    toastMessage: {
      add: 'Канал создан',
      remove: 'Канал удален',
      edit: 'Канал переименован',
      error: 'Ошибка соединения',
    }
  },
};

export default ruLocales;
