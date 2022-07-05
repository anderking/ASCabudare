import { NgModule } from "@angular/core";

import { AuthStoreModule } from "./auth/auth-store.module";
import { SharedStoreModule } from "./shared/shared-store.module";

@NgModule({
  declarations: [],
  imports: [AuthStoreModule, SharedStoreModule],
  exports: [AuthStoreModule, SharedStoreModule],
})
export class StoreModule {}
