export const activeClassButton = (flag) => (flag ? 'active' : 'disabled');

export const getToken = () => {
  const authorizationTokenLocalStorage = JSON.parse(
    window.localStorage.getItem('auth')
  );
  return authorizationTokenLocalStorage.token;
};

export const clearInput = (e) => {
  e.target.form.message.value = '';
};
