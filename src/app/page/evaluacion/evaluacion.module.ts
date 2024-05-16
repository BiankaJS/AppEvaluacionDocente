import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EvaluacionPageRoutingModule } from './evaluacion-routing.module';

import { EvaluacionPage } from './evaluacion.page';
import { Router } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EvaluacionPageRoutingModule
  ],
  declarations: [EvaluacionPage]
})
export class EvaluacionPageModule {}
