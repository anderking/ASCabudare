import { NgModule } from "@angular/core";
import { StoreModule } from "./store/store.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpErrorInterceptor } from "./interceptors/http-error.interceptor";
import { ConfiUriInterceptor } from "./interceptors/config-url.interceptor";
import { AuthGuard } from "@services/guard/auth.guard";
import { AuthRedirectGuard } from "@services/guard/auth-redirect.guard";
import { EffectsModule } from "@ngrx/effects";

@NgModule({
  declarations: [],
  imports: [HttpClientModule, StoreModule, EffectsModule.forRoot([])],
  providers: [
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
})
export class CoreModule {}
