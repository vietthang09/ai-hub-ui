export const validateEmail = (email: string): string => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) return "Email is required";
  if (!emailRegex.test(email)) return "Invalid email format";
  return "";
};

export const validatePassword = (password: string): string => {
  if (!password.trim()) return "Password is required";
  if (password.length < 3) return "Password must be at least 6 characters";
  return "";
};

export const validateName = (name: string): string => {
  if (!name.trim()) return "Name is required";
  if (name.length < 2) return "Name must be at least 2 characters";
  return "";
};

export const validateLoginForm = (email: string, password: string) => {
  return {
    email: validateEmail(email),
    password: validatePassword(password),
  };
};

export const validateRegisterForm = (
  email: string,
  password: string,
 ) => {
  return {
     email: validateEmail(email),
    password: validatePassword(password),
  };
};
