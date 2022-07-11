import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IngresoEgresoRoutingModule } from './ingreso-egreso-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { IngresosEgresosComponent } from './ingresos-egresos/ingresos-egresos.component';
import { IngresoEgresoCreateComponent } from './ingreso-egreso-form/ingreso-egreso-form.component';
import { IngresoEgresoShowComponent } from './ingreso-egreso-show/ingreso-egreso-show.component';
import { TokenInterceptorService } from 'src/app/core/services/token-interceptor.service';
import { NgBoostrapModule } from 'src/app/core/ui/ng-bootstrap.module';


@NgModule({
  declarations: [
  	IngresoEgresoComponent,
  	IngresosEgresosComponent,
  	IngresoEgresoCreateComponent,
  	IngresoEgresoShowComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IngresoEgresoRoutingModule,
    NgBoostrapModule
  ],
  providers:
  [
    {
      provide: HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi: true
    },
  ],
})
export class IngresoEgresoModule { }
