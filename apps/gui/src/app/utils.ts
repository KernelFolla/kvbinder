import { FormControl } from '@angular/forms';

export const jsonValidator = (control: FormControl) => {
  try {
    JSON.parse(control.value);
  } catch (e) {
    return { invalidJson: true };
  }
  return null;
};
