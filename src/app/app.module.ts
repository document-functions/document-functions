import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { appReducer } from './+state/app.reducer';
import { sessionStorageSyncReducer } from './+state/app.meta-reducers';
import { Appffects } from './+state/app.effects';
import { AngularMaterialModule } from './angular-material/angular-material.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    StoreModule.forRoot(
      {
        state: appReducer,
      },
      {
        metaReducers: [sessionStorageSyncReducer],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([Appffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
