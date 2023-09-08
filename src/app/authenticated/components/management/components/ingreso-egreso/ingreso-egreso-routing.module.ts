import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { IngresoEgresoComponent } from "./ingreso-egreso.component";
import { IngresosEgresosComponent } from "./ingresos-egresos/ingresos-egresos.component";
import { IngresoEgresoFormComponent } from "./ingreso-egreso-form/ingreso-egreso-form.component";

export const routes: Routes = [
  {
    path: "",
    component: IngresoEgresoComponent,
    canActivate: [],
    children: [
      { path: "", component: IngresosEgresosComponent },
      { path: "form", component: IngresoEgresoFormComponent },
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
