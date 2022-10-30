import { NgModule } from "@angular/core";
import { CommonModule, DecimalPipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IngresoEgresoRoutingModule } from "./ingreso-egreso-routing.module";
import { IngresoEgresoComponent } from "./ingreso-egreso.component";
import { IngresosEgresosComponent } from "./ingresos-egresos/ingresos-egresos.component";
import { IngresoEgresoCreateComponent } from "./ingreso-egreso-form/ingreso-egreso-form.component";
import { NgBoostrapModule } from "src/app/core/ui/ng-bootstrap.module";
import { SharedModule } from "@root/shared/shared.module";

@NgModule({
  declarations: [
    IngresoEgresoComponent,
    IngresosEgresosComponent,
    IngresoEgresoCreateComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IngresoEgresoRoutingModule,
    NgBoostrapModule,
    SharedModule,
  ],
  providers: [
    DecimalPipe,
  ],
})
export class IngresoEgresoModule {}
