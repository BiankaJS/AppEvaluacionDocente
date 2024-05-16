import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VotesPageRoutingModule } from './votes-routing.module';

import { VotesPage } from './votes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VotesPageRoutingModule
  ],
  declarations: [VotesPage]
})
export class VotesPageModule {}
