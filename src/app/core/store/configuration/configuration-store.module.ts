import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { CategoryEffects } from "./effects/category.effects";
import { reducers, configurationFeatureKey } from "./index";

@NgModule({
  imports: [
    StoreModule.forFeature(configurationFeatureKey, reducers),
    EffectsModule.forFeature([CategoryEffects]),
  ],
  exports: [],
  providers: [],
})
export class ConfigurationStoreModule {}
