export const validateLogin = (login) => login.length >= 3;

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  const passwordRegex = /^.{6,}$/;
  return passwordRegex.test(password);
};
