import { NgModule } from "@angular/core";
import {
  NgbPaginationModule,
  NgbAlertModule,
  NgbToastModule,
} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [NgbPaginationModule, NgbAlertModule, NgbToastModule],
  exports: [NgbPaginationModule, NgbAlertModule, NgbToastModule],
  providers: [],
})
export class NgBoostrapModule {}
