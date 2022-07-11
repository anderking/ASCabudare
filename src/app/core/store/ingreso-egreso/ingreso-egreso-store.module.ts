import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { IngresoEgresoEffects } from "./effects/ingreso-egreso.effects";
import { reducers, ingresoEgresoFeatureKey } from "./index";

@NgModule({
  imports: [
    StoreModule.forFeature(ingresoEgresoFeatureKey, reducers),
    EffectsModule.forFeature([IngresoEgresoEffects]),
  ],
  exports: [],
  providers: [],
})
export class IngresoEgresoStoreModule {}
