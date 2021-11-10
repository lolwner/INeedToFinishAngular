import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, share } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FormValidationService {
    //TODO: mobe strings to file

    private defaultRules = {
        required: () => 'Required field',
        email: () => 'Invalid email format',
        mustMatch: () => 'Confirm password does not match',
        unique: () => 'Shared.Validation.Unique',
        step: (step: number) => 'Shared.Validation.Step' + step,
        min: (min: number) => 'Minimun value is ' + min,
        max: (max: number) => 'Shared.Validation.Max' + max,
        minlength: (minLength: number) => 'Minimun ' + minLength + ' characters',
        maxlength: (maxLength: number) => 'Shared.Validation.MaxLength'
            + maxLength + 'Shared.Validation.CharactersPrefix',
        minError: (min: number) => 'Shared.Validation.Min' + min,
        maxError: (max: number) => 'Shared.Validation.Max' + max,
        noWhiteSpace: () => 'Shared.Validation.NoWhiteSpace',
        whitespaceAtTheBeginning: () => 'Shared.Validation.WhitespaceAtTheBeginning',
        whitespaceAtTheEnd: () => 'Shared.Validation.WhitespaceAtTheEnd',
        multipleWhitespaces: () => 'Shared.Validation.MultipleWhitespaces'
    };

    constructor() {
    }

    error$ = (control: AbstractControl, extraRules?: any): Observable<string> =>
        control.valueChanges.pipe(
            debounceTime(50),
            map(() => this.errorMessage(control, extraRules)),
            share())

    asyncError$ = (control: AbstractControl, extraRules?: any): Observable<string> =>
        control.statusChanges.pipe(
            distinctUntilChanged(),
            map(() => this.errorMessage(control, extraRules)),
            share())

    validateForm(group: FormGroup | FormArray): void {
        Object.keys(group.controls as { [key: string]: AbstractControl; }).forEach((key: string) => {
            const abstractControl = group.controls[key];

            if (abstractControl instanceof FormGroup || abstractControl instanceof FormArray) {
                this.validateForm(abstractControl);
            } else {
                abstractControl.markAsDirty();
                abstractControl.updateValueAndValidity();
            }
        });
    }

    fetchAllFormErrors(control: AbstractControl): any | null {
        return Object.assign({}, this.controlsErrors(control), control.errors ? { form: control.errors } : {});
    }

    private controlsErrors(control: AbstractControl): any | null {
        const controls = (control as FormGroup).controls;
        if (controls) {
            return Object.entries(controls).reduce((acc, [key, childControl]) => {
                const childErrors = this.controlsErrors(childControl);
                if (childErrors) {
                    acc = { ...acc, [key]: childErrors };
                }
                return acc;
            }, null);
        } else {
            return control.errors;
        }
    }

    private errorMessage = (c: AbstractControl, extraRules: any): string => {
        if ((c.touched || c.dirty) && c.errors) {
            const result = Object.keys(c.errors).map(key => {
                let inputValue = '';
                switch (key) {
                    case ErrorKey.required:
                        inputValue = c.errors[key][ValueKeys.required];
                        break;
                    case ErrorKey.min:
                        inputValue = c.errors[key][ValueKeys.min];
                        break;
                    case ErrorKey.minError:
                        inputValue = c.errors[key][ValueKeys.minValue];
                        break;
                    case ErrorKey.max:
                        inputValue = c.errors[key][ValueKeys.max];
                        break;
                    case ErrorKey.maxError:
                        inputValue = c.errors[key][ValueKeys.maxValue];
                        break;
                    case ErrorKey.minlength:
                        inputValue = c.errors[key][ValueKeys.requiredLength];
                        break;
                    case ErrorKey.maxlength:
                        inputValue = c.errors[key][ValueKeys.requiredLength];
                        break;
                    case ErrorKey.step:
                        inputValue = c.errors[key][ValueKeys.step];
                        break;
                    case ErrorKey.noWhiteSpace:
                        inputValue = c.errors[key][ValueKeys.noWhiteSpace]
                        break;
                    case ErrorKey.whitespaceAtTheBeginning:
                        inputValue = c.errors[key][ValueKeys.whitespaceAtTheBeginning]
                        break;
                    case ErrorKey.whitespaceAtTheEnd:
                        inputValue = c.errors[key][ValueKeys.whitespaceAtTheEnd]
                        break;
                    case ErrorKey.multipleWhitespaces:
                        inputValue = c.errors[key][ValueKeys.multipleWhitespaces]
                        break;
                }

                const rule = Object.assign({}, this.defaultRules, extraRules)[key];
                // get value from prepared functions (default or extra) or fetch from error object
                return rule ? rule(inputValue) : c.errors[key] || '';
            });

            // in case of intersection of kendo and angular validation rules (e.x. [min] and [minError]) remove duplicates
            return [...new Set(result)].join('. ');
        }
        return '';
    }
}

enum ErrorKey {
    required = "required",
    min = 'min',
    max = 'max',
    minlength = 'minlength',
    maxlength = 'maxlength',
    minError = 'minError',
    maxError = 'maxError',
    step = 'step',
    noWhiteSpace = 'noWhiteSpace',
    whitespaceAtTheBeginning = 'whitespaceAtTheBeginning',
    whitespaceAtTheEnd = 'whitespaceAtTheEnd',
    multipleWhitespaces = 'multipleWhitespaces'
}

enum ValueKeys {
    required = "required",
    min = 'min',
    max = 'max',
    minValue = 'minValue',
    maxValue = 'maxValue',
    requiredLength = 'requiredLength',
    step = 'stepValue',
    noWhiteSpace = 'noWhiteSpace',
    whitespaceAtTheBeginning = 'whitespaceAtTheBeginnings',
    whitespaceAtTheEnd = 'whitespaceAtTheEnd',
    multipleWhitespaces = 'multipleWhitespaces'
}