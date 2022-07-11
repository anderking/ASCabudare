import { NgModule } from "@angular/core";
import { StoreModule } from "./store/store.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthService } from "./services/auth/auth.service";
import { ApiService } from "@services/api.service";
import { HttpErrorInterceptor } from "./interceptors/http-error.interceptor";
import { ConfiUriInterceptor } from "./interceptors/config-url.interceptor";
import { AuthGuard } from "@services/guard/auth.guard";
import { AuthRedirectGuard } from "@services/guard/auth-redirect.guard";
import { EffectsModule } from "@ngrx/effects";

@NgModule({
  declarations: [],
  imports: [StoreModule, EffectsModule.forRoot([])],
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [
        { provide: "ApiService", useClass: ApiService },
        { provide: "AuthService", useClass: AuthService },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorInterceptor,
          multi: true,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ConfiUriInterceptor,
          multi: true,
        },
        AuthGuard,
        AuthRedirectGuard,
      ],
    };
  }
}
