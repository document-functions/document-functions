import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { selectActiveCountIfHeaders } from '../+state';

@Injectable({
  providedIn: 'root',
})
export class AppValidatorsService {
  constructor(private store: Store) {}

  checkValueInArray(): (
    control: AbstractControl
  ) => Observable<ValidationErrors | null> {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const valueToCheck = control.value;

      return this.store.select(selectActiveCountIfHeaders).pipe(
        map((yourArray) => {
          const exists = yourArray.includes(valueToCheck);
          console.log(exists); // TODO
          
          return exists ? { existsInArray: true } : null;
        })
      );
    };
  }
}
