import { SharedModule } from "@root/shared/shared.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ErrorPagesRoutingModule } from "./pages-routing.module";
import { PagesComponent } from "./pages.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { NotAllowedComponent } from "./not-allowed/not-allowed.component";
import { NotVerifyComponent } from "./not-verify/not-verify.component";

@NgModule({
  declarations: [
    PagesComponent,
    NotFoundComponent,
    NotAllowedComponent,
    NotVerifyComponent,
  ],
  imports: [SharedModule, CommonModule, ErrorPagesRoutingModule],
})
export class PagesModule {}
