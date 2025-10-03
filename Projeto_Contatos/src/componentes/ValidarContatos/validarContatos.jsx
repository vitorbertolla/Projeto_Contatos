import { PhoneNumberUtil, PhoneNumberFormat } from "google-libphonenumber";

const phoneUtil = PhoneNumberUtil.getInstance();

// valida se o número é válido
export const validarNumber = (numero, pais = "BR") => {
  try {
    const parsed = phoneUtil.parse(numero, pais)
    return phoneUtil.isValidNumber(parsed)
  } catch {
    return false
  }
}

// formata no padrão nacionall 
export const formatarNumber = (number) => {
  // tira o que não é número
   number = number.replace(/\D/g, "")

  if (number.length > 10) {
    // aqui é o numero todo e o que sobra (*)
    // {aqui é os digitos que vai pegar} ($ isso é cada bloco de digito) e o que esta entre eles e a formatação que voce quer
      number = number.replace(/(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (number.length > 6) {
      number = number.replace(/(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (number.length > 2) {
      number = number.replace(/(\d{2})(\d{0,5})/, "($1) $2");
    } else {
      number = number.replace(/(\d*)/, "($1");
    }

  return number

}