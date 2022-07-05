import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AuthEffects } from "./effects/auth.effects";
import { reducers, authFeatureKey } from "./index";

@NgModule({
  imports: [
    StoreModule.forFeature(authFeatureKey, reducers),
    EffectsModule.forFeature([AuthEffects]),
  ],
  exports: [],
  providers: [],
})
export class AuthStoreModule {}
