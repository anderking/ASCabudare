import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IngresoEgresoComponent } from "./ingreso-egreso.component";
import { IngresosEgresosComponent } from "./ingresos-egresos/ingresos-egresos.component";
import { IngresoEgresoCreateComponent } from "./ingreso-egreso-form/ingreso-egreso-form.component";

const routes: Routes = [
  {
    path: "",
    component: IngresoEgresoComponent,
    canActivate: [],
    children: [
      { path: "", component: IngresosEgresosComponent },
      { path: "form", component: IngresoEgresoCreateComponent },
      { path: "**", redirectTo: "", pathMatch: "full" },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresoEgresoRoutingModule {}
