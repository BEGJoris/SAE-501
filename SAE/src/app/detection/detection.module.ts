import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetectionPageRoutingModule } from './detection-routing.module';

import { DetectionPage } from './detection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetectionPageRoutingModule
  ],
  declarations: [DetectionPage]
})
export class DetectionPageModule {}
