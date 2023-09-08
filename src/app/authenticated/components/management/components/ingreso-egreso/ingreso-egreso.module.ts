import { NgModule } from "@angular/core";
import { IngresoEgresoRoutingModule } from "./ingreso-egreso-routing.module";
import { IngresoEgresoComponent } from "./ingreso-egreso.component";
import { IngresosEgresosComponent } from "./ingresos-egresos/ingresos-egresos.component";
import { IngresoEgresoFormComponent } from "./ingreso-egreso-form/ingreso-egreso-form.component";
import { SharedModule } from "@root/shared/shared.module";

@NgModule({
  declarations: [
    IngresoEgresoComponent,
    IngresosEgresosComponent,
    IngresoEgresoFormComponent,
  ],
  imports: [IngresoEgresoRoutingModule, SharedModule],
})
export class IngresoEgresoModule {}
