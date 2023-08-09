import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { CategoryEffects } from "./effects/category.effects";
import { reducers, configurationFeatureKey } from "./index";
import { ClientEffects } from "./effects/client.effects";

@NgModule({
  imports: [
    StoreModule.forFeature(configurationFeatureKey, reducers),
    EffectsModule.forFeature([CategoryEffects]),
    EffectsModule.forFeature([ClientEffects]),
  ],
  exports: [],
  providers: [],
})
export class ConfigurationStoreModule {}
