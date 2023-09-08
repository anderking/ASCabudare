import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { IngresoEgresoEffects } from "@store/management/effects/ingreso-egreso.effects";
import { LendingEffects } from "@store/management/effects/lending.effects";
import { reducers, managementFeatureKey } from "./index";

@NgModule({
  imports: [
    StoreModule.forFeature(managementFeatureKey, reducers),
    EffectsModule.forFeature([IngresoEgresoEffects]),
    EffectsModule.forFeature([LendingEffects]),
  ],
  exports: [],
  providers: [],
})
export class ManagementStoreModule {}
