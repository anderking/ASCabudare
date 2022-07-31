import { NgModule } from "@angular/core";

import { AuthStoreModule } from "./auth/auth-store.module";
import { IngresoEgresoStoreModule } from "./ingreso-egreso/ingreso-egreso-store.module";
import { MastersStoreModule } from "./masters/masters-store.module";
import { SharedStoreModule } from "./shared/shared-store.module";

@NgModule({
  declarations: [],
  imports: [AuthStoreModule, SharedStoreModule, IngresoEgresoStoreModule, MastersStoreModule],
  exports: [AuthStoreModule, SharedStoreModule, IngresoEgresoStoreModule, MastersStoreModule],
})
export class StoreModule {}
