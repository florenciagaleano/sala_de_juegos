import { AbstractControl, ValidationErrors } from "@angular/forms";

export class CustomValidators {
    static edadValidator(control: AbstractControl): ValidationErrors | null {
        const edad = control.value;
        if (isNaN(edad) || edad < 18 || edad > 98) {
          return { edadInvalida: true };
        }
        return null;
    }

    static soloLetras(control: AbstractControl): ValidationErrors | null {
        const string = control.value;
        const regex = /^[A-Za-z]+$/; 
    
        if (string && !regex.test(string)) {
          return { soloLetras: true }; 
        }
        
        return null;    
    }

    static telefonoValidator(control: AbstractControl): ValidationErrors | null {
        const telefono = control.value;
        if (isNaN(telefono) || telefono.toString().length != 10) {
          return { telefonoInvalido: true };
        }
        return null;
    }
    
}
