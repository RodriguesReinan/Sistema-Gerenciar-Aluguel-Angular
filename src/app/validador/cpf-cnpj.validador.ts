// validators/cpf-cnpj.validator.ts
import { AbstractControl, ValidationErrors } from '@angular/forms';

export function cpfCnpjValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value?.replace(/\D/g, '');

  if (!value) return { documentoInvalido: true };

  if (value.length === 11) {
    if (!validarCPF(value)) return { documentoInvalido: true };
  } else if (value.length === 14) {
    if (!validarCNPJ(value)) return { documentoInvalido: true };
  } else {
    return { documentoInvalido: true };
  }

  return null;
}

function validarCPF(cpf: string): boolean {
  if (!cpf || cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += +cpf[i] * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== +cpf[9]) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += +cpf[i] * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === +cpf[10];
}

function validarCNPJ(cnpj: string): boolean {
  if (!cnpj || cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;

  const calc = (base: number[]) => {
    let soma = 0;
    let pos = base.length - 7;
    for (let i = 0; i < base.length; i++) {
      soma += base[i] * pos--;
      if (pos < 2) pos = 9;
    }
    return soma;
  };

  const num = cnpj.split('').map(n => +n);
  const base12 = num.slice(0, 12);
  let soma = calc(base12);
  let dig1 = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (dig1 !== num[12]) return false;

  const base13 = [...base12, dig1];
  soma = calc(base13);
  let dig2 = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  return dig2 === num[13];
}
