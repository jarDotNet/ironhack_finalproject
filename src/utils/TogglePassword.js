export const togglePassword = (passwordCtrl, togglePasswordIcon) => {
  const type =
    passwordCtrl.getAttribute("type") === "password" ? "text" : "password";

  passwordCtrl.setAttribute("type", type);

  togglePasswordIcon.classList.toggle("bi-eye");
};

export default {
  togglePassword,
};
