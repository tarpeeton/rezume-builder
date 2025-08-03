type Lang = "uz" | "ru" | "en";

export const LOGIN_ERRORS: Record<Lang, Record<string, string>> = {
  uz: {
    email_not_confirmed: "Email tasdiqlanmagan",
    invalid_credentials: "Login yoki parol noto‘g‘ri",
  },
  ru: {
    email_not_confirmed: "Электронная почта не подтверждена",
    invalid_credentials: "Неверный логин или пароль",
  },
  en: {
    email_not_confirmed: "Email not confirmed",
    invalid_credentials: "Invalid login or password",
  },
};
