import { NgModule } from "@angular/core";
import { DecimalPipe } from "@angular/common";
import { IngresoEgresoRoutingModule } from "./ingreso-egreso-routing.module";
import { IngresoEgresoComponent } from "./ingreso-egreso.component";
import { IngresosEgresosComponent } from "./ingresos-egresos/ingresos-egresos.component";
import { IngresoEgresoCreateComponent } from "./ingreso-egreso-form/ingreso-egreso-form.component";
import { SharedModule } from "@root/shared/shared.module";

@NgModule({
  declarations: [
    IngresoEgresoComponent,
    IngresosEgresosComponent,
    IngresoEgresoCreateComponent,
  ],
  imports: [IngresoEgresoRoutingModule, SharedModule],
  providers: [DecimalPipe],
})
export class IngresoEgresoModule {}
