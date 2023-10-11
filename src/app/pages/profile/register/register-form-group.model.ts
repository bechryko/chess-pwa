import { FormControl, FormGroup } from "@angular/forms";

export type RegisterFormGroup = FormGroup<{
   email: FormControl<string>;
   username: FormControl<string>;
   password: FormControl<string>;
   confirmPassword: FormControl<string>;
}>;
