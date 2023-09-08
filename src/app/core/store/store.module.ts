import { NgModule } from "@angular/core";
import { AuthStoreModule } from "./auth/auth-store.module";
import { ConfigurationStoreModule } from "./configuration/configuration-store.module";
import { MastersStoreModule } from "./masters/masters-store.module";
import { SharedStoreModule } from "./shared/shared-store.module";
import { ManagementStoreModule } from "./management/management-store.module";

@NgModule({
  declarations: [],
  imports: [
    AuthStoreModule,
    SharedStoreModule,
    MastersStoreModule,
    ConfigurationStoreModule,
    ManagementStoreModule,
  ],
  exports: [
    AuthStoreModule,
    SharedStoreModule,
    MastersStoreModule,
    ConfigurationStoreModule,
    ManagementStoreModule,
  ],
})
export class StoreModule {}
