import {AbstractControl, ValidationErrors} from "@angular/forms";

// если валидатор возвращает null это значит что control прошел проверку
export function checkPassword(control: AbstractControl): ValidationErrors | null {
  // value -> значение введенное в input
  const value = control.value;
  const specSymbols = ['!', '@', '#', '&'];
  let result: any = {checkPassword: true};
  if (control.value) {
    specSymbols.forEach(symbol => {
      if (value.includes(symbol)) {
        result = null;
      }
    })
  }
  return result;
}
