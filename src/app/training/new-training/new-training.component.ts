import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TrainingService } from '../training.service';
import { Observable } from 'rxjs';
import { Exercise } from '../exercise.model';
import { select, Store } from '@ngrx/store';
import { AppStateInterface } from 'src/app/appState.interface';
import { isLoadingSelector } from 'src/app/shared/store/selectors';
import { availableExercisesSelector } from '../store/selectors';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  exercises$!: Observable<Exercise[]>;

  constructor(
    private trainingService: TrainingService,
    private store: Store<AppStateInterface>
  ) {}

  ngOnInit() {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.exercises$ = this.store.pipe(select(availableExercisesSelector));
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
