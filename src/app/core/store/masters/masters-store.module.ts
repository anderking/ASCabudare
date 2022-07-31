import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ComboEffects } from "./effects/combo.effects";
import { reducers, mastersFeatureKey } from "./index";

@NgModule({
  imports: [
    StoreModule.forFeature(mastersFeatureKey, reducers),
    EffectsModule.forFeature([ComboEffects]),
  ],
  exports: [],
  providers: [],
})
export class MastersStoreModule {}
