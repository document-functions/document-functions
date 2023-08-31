import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';

@Injectable()
export class Appffects {
  constructor(private actions$: Actions, private store: Store) {}
}
