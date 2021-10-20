import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { MaterialModule } from '../material.module';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { TrainingComponent } from './training.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../shared/shared.module';
import { TrainingRoutingModule } from './training-routing.module';

@NgModule({
  declarations: [
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    TrainingComponent,
    StopTrainingComponent,
  ],
  imports: [SharedModule, TrainingRoutingModule],
  exports: [],
})
export class TrainingModule {}
