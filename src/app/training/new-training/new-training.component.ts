import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';
import { Unsubscribe } from '@firebase/firestore';
import { UIService } from 'src/app/shared/iu.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises!: Exercise[];
  isLoading = true;
  unSubscribe!: Unsubscribe;
  exerciseSubscription!: Subscription;
  loadingSubscription!: Subscription;

  constructor(
    private trainingService: TrainingService,
    private uiService: UIService
  ) {}

  ngOnInit() {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      (isLoading) => {
        this.isLoading = isLoading;
      }
    );
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      (exercises) => {
        this.exercises = exercises;
      }
    );
    this.fetchExercises();
  }

  fetchExercises() {
    this.unSubscribe = this.trainingService.fetchAvailableExercises();
  }

  ngOnDestroy() {
    if (this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
    if (this.unSubscribe) {
      this.unSubscribe();
    }
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
    this.loadingSubscription.unsubscribe();
  }
}
