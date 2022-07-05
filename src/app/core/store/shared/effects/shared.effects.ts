import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap } from "rxjs/operators";
import { ApiService } from "@services/api.service";
import { LoginModel } from "@models/auth/login.model";

@Injectable()
export class SharedEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService<LoginModel>
  ) {}
}
