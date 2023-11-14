import * as yup from "yup";

export const registerSchema = yup.object().shape({
  name: yup.string().required("O nome é obrigatório"),
  email: yup
    .string()
    .email("Formato de email inválido")
    .required("O email é obrigatório"),
  password: yup
    .string()
    .min(6, "A senha deve ter no mínimo 6 caracteres")
    .required("A senha é obrigatória"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas não coincidem"),
});

export const loginSchema = yup.object().shape({
  email: yup.string().required("Email Obrigatório"),
  password: yup.string().required("Senha Obrigatória"),
});
