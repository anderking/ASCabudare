import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { PayEffects } from "@store/management/effects/pay.effects";
import { reducers, managementFeatureKey } from "./index";

@NgModule({
  imports: [
    StoreModule.forFeature(managementFeatureKey, reducers),
    EffectsModule.forFeature([PayEffects]),
  ],
  exports: [],
  providers: [],
})
export class ManagementStoreModule {}
