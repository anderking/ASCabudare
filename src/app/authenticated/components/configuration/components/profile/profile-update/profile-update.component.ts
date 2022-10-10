import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { combineLatest, from, of, Subject } from "rxjs";
import { SharedFacadeService } from "@facades/shared-facade.service";
import {
  filter,
  finalize,
  map,
  switchMap,
  takeUntil,
  tap,
} from "rxjs/operators";
import { Location } from "@angular/common";
import {
  getErrorMessageField,
  isValidField,
} from "@root/core/utilities/form-validations";
import { isNullOrUndefinedEmpty } from "@root/core/utilities/is-null-or-undefined.util";
import { AuthFacadeService } from "@facades/auth-facade.service";
import { LoginResponseModel } from "@models/auth/login.model";
import { AttachmentFacadeService } from "@facades/attachment-facade.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-profile-update",
  templateUrl: "./profile-update.component.html",
  styles: [],
})
export class ProfileUpdateComponent implements OnInit, OnDestroy {
  public finisher$ = new Subject<void>();
  public mainForm: FormGroup;
  public dataForm: LoginResponseModel;
  public currentItem: LoginResponseModel;
  public isLoading: boolean;
  public isLoadingAttachment: boolean;

  public fileName: string = "Subir archivo";
  public isFileValid: boolean = true; //Indica si el proceso de cargar files es valido
  public fileArrayName: object[]; //Arreglo para almacenar los nombres de los files cargados en el html
  public fileArrayDelete: object[]; //Arreglo para almacenar los files restantes luego de borrar alguno
  public currentFile: any = null; //Arreglo para almacenar los files restantes luego de borrar alguno
  public isFileArrayDelete: boolean = false; //Indica si se borro algun file por el usuario

  constructor(
    private _sharedFacadeService: SharedFacadeService,
    private _location: Location,
    private _fb: FormBuilder,
    private _authFacadeService: AuthFacadeService,
    private _attachmentFacadeService: AttachmentFacadeService
  ) {
    this.mainForm = this.initForm();
  }

  ngOnInit() {
    this.dataForm = { ...this.mainForm.getRawValue() };
    this.chargeIndicatorManager();

    const item$ = this._authFacadeService.getCurrentUser$().pipe(
      filter((item: LoginResponseModel) => !isNullOrUndefinedEmpty(item)),
      takeUntil(this.finisher$)
    );

    const mainForm$ = of(this.mainForm);

    const results$ = combineLatest([item$, mainForm$]);

    results$
      .pipe(
        filter((x) => !isNullOrUndefinedEmpty(x)),
        map(([item, mainForm]) => {
          return {
            item,
            mainForm,
          };
        }),
        takeUntil(this.finisher$)
      )
      .subscribe((data) => {
        console.log("DATA", data);
        if (data.item) {
          this.selectCurrentItem(data.item);
        }
      });

    this._attachmentFacadeService
      .getUrlAttachment$()
      .pipe(filter((x) => !isNullOrUndefinedEmpty(x)))
      .subscribe((url) => {
        this.currentFile = null;
        this.fileName = "Subir archivo";
        this.mainForm.get("uploadPhoto").reset();
        this.mainForm.get("photoURL").setValue(url);
      });
  }

  ngOnDestroy() {
    this._sharedFacadeService.reset();
    this.finisher$.next();
  }

  selectCurrentItem(item: LoginResponseModel): void {
    this.currentItem = item;
    this.mainForm.reset(item, { emitEvent: false });
  }

  initForm(): FormGroup {
    return this._fb.group({
      displayName: [""],
      phoneNumber: [""],
      currency: [""],
      photoURL: [""],
      uploadPhoto: [[]],
    });
  }

  onSubmit() {
    this.dataForm = {
      ...this.currentItem,
      ...this.mainForm.getRawValue(),
      uploadPhoto: this.currentFile,
    };
    console.log(this.mainForm.controls);
    if (this.mainForm.valid) {
      console.log(this.dataForm);
      this._authFacadeService.updateProfile(this.dataForm);
    }
  }

  isValidField(field: string): boolean {
    return isValidField(field, this.mainForm);
  }

  getErrorMessageField(field: string): string {
    return getErrorMessageField(field, this.mainForm);
  }

  clean() {
    this.mainForm.reset();
  }

  goBack() {
    this._location.back();
  }

  changeFile(event: any): void {
    //Inicializa las variables que ayudaran a las validaciones de la carga de files
    let jpg = "image/jpg";
    let jpeg = "image/jpeg";
    let png = "image/png";
    let allowed_types = [];
    allowed_types = [jpg, jpeg, png];
    const max_size = 1000000; // 5 Mb

    let filesInput = event.target.files; //Almacena el array de files detectado en el evento

    if (filesInput.length > 0) {
      let arrayFile = []; //Inicializamos un array para almacenar de forma temporal los files cargados

      this.fileArrayName = [];

      /*Leemos los files guardados hasta el momento y los agregamos a los array de
			Archivos cargados temporalmente y el de los nombres que se muestran en el html */
      this.dataForm.uploadPhoto.forEach((element: any) => {
        arrayFile.push(element);
        this.fileArrayName.push(element);
      });

      //Ciclo para realizar el procedimiento de carga y almacenado de files
      for (var i = 0; i < filesInput.length; i++) {
        this.isFileValid = true;
        let currentFile: any = filesInput[i];
        let extension = allowed_types.includes(currentFile.type);
        let isValid = true;

        //Validamos si la extension actual se encuentra en la indicada por el array de extensiones validas
        if (!extension) {
          this.fileName = "Solo se permiten archivos de tipo IMG o PNG";
          isValid = false;
        }

        //Validamos si el tamaño del file actual excede el tamaño del file predefinido
        if (currentFile.size > max_size) {
          this.fileName =
            "Tamaño maximo permitido " + max_size / 1000000 + "Mb";
          isValid = false;
        }
        if (isValid) {
          this.fileName = currentFile.name;
          this.currentFile = currentFile;
        } else {
          this.currentFile = null;
          this.mainForm.get("uploadPhoto").setValue(null);
        }
      }
    }
  }

  public uploadFile() {
    if (this.currentFile) {
      this._attachmentFacadeService.create(this.currentFile);
    } else {
      Swal.fire({
        icon: "error",
        title: "Upload",
        text: "Upload file pleases",
      });
    }
  }

  private chargeIndicatorManager(): void {
    this._attachmentFacadeService
      .getLoading$()
      .subscribe((loading) => (this.isLoadingAttachment = loading));
    const isLoading$ = this._authFacadeService.getLoading$();

    const result$ = combineLatest([isLoading$]).pipe(
      map(([isLoading]) => isLoading),
      takeUntil(this.finisher$)
    );

    result$.pipe(takeUntil(this.finisher$)).subscribe((i) => {
      this.isLoading = i;
    });
  }
}
