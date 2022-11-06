import { NgModule } from "@angular/core";
import { StoreModule } from "./store/store.module";
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpErrorInterceptor } from "./interceptors/http-error.interceptor";
import { ConfiUriInterceptor } from "./interceptors/config-url.interceptor";
import { AuthGuard } from "@services/guard/auth.guard";
import { AuthRedirectGuard } from "@services/guard/auth-redirect.guard";
import { EffectsModule } from "@ngrx/effects";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    StoreModule,
    EffectsModule.forRoot([]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
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
    AuthRedirectGuard
  ],
})
export class CoreModule {}
