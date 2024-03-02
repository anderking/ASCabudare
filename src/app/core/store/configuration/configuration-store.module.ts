import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { reducers, configurationFeatureKey } from "./index";

@NgModule({
  imports: [
    StoreModule.forFeature(configurationFeatureKey, reducers),
  ],
  exports: [],
  providers: [],
})
export class ConfigurationStoreModule {}
