import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { CategoryEffects } from "@store/configuration/effects/category.effects";
import { ClientEffects } from "@store/configuration/effects/client.effects";
import { reducers, configurationFeatureKey } from "./index";

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
