import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { SharedEffects } from "@store/shared/effects/shared.effects";
import { reducers, sharedFeatureKey } from "./index";

@NgModule({
  imports: [
    StoreModule.forFeature(sharedFeatureKey, reducers),
    EffectsModule.forFeature([SharedEffects]),
  ],
  exports: [],
  providers: [],
})
export class SharedStoreModule {}
