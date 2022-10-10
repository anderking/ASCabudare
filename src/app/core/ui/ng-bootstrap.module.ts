import { NgModule } from "@angular/core";
import {
  NgbPaginationModule,
  NgbAlertModule,
} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [NgbPaginationModule, NgbAlertModule],
  exports: [NgbPaginationModule, NgbAlertModule],
  providers: [],
})
export class NgBoostrapModule {}
