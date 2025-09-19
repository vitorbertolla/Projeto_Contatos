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

// formata no padrão internacional 
export const formatarNumber = (numero, pais = "BR") => {
  try {
    const parsed = phoneUtil.parse(numero, pais)
    if (phoneUtil.isValidNumber(parsed)) {
      return phoneUtil.format(parsed, PhoneNumberFormat.NATIONAL)
    //   o formato que você quer que retorne
    }
    return null
  } catch {
    return null
  }
}