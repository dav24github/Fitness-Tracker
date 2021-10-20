import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppStateInterface } from '../appState.interface';
import { isTrainingSelector } from './store/selectors';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
})
export class TrainingComponent implements OnInit {
  ongoingTraining$!: Observable<boolean>;

  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {
    this.ongoingTraining$ = this.store.pipe(select(isTrainingSelector));
  }
}
