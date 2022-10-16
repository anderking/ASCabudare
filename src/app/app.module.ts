// Modulos
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
// Modulos personalizados
import { AppRoutingModule } from "./app-routing.module";
import { AuthModule } from "./auth/auth.module";
import { SharedModule } from "./shared/shared.module";
// Firebase
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
// NGRX
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { AppComponent } from "./app.component";
// Shared
import { environment } from "src/environments/environment";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AuthenticatedModule } from "./authenticated/authenticated.module";
import { CoreModule } from "./core/core.module";
// Cookies
import { CookieService } from "ngx-cookie-service";
import { AngularFireStorageModule } from "@angular/fire/storage";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AuthModule,
    AuthenticatedModule,
    SharedModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    CoreModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    NgbModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
