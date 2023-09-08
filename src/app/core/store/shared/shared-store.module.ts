import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { AttachmentEffects } from "@store/shared/effects/attachment.effects";
import { reducers, sharedFeatureKey } from "./index";

@NgModule({
  imports: [
    StoreModule.forFeature(sharedFeatureKey, reducers),
    EffectsModule.forFeature([AttachmentEffects]),
  ],
  exports: [],
  providers: [],
})
export class SharedStoreModule {}
