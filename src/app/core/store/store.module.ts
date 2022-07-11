import { NgModule } from "@angular/core";

import { AuthStoreModule } from "./auth/auth-store.module";
import { IngresoEgresoStoreModule } from "./ingreso-egreso/ingreso-egreso-store.module";
import { SharedStoreModule } from "./shared/shared-store.module";

@NgModule({
  declarations: [],
  imports: [AuthStoreModule, SharedStoreModule, IngresoEgresoStoreModule],
  exports: [AuthStoreModule, SharedStoreModule, IngresoEgresoStoreModule],
})
export class StoreModule {}
