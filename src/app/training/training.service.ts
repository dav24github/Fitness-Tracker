import { Injectable } from '@angular/core';

import {
  Firestore,
  addDoc,
  collection,
  DocumentData,
  onSnapshot,
  QuerySnapshot,
  Unsubscribe,
} from '@angular/fire/firestore';

import { Subject } from 'rxjs';
import { UIService } from '../shared/iu.service';
import { Exercise } from './exercise.model';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise | null>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = [];
  private runningExercise!: Exercise | null;
  private finishedExercises: Exercise[] = [];
  private fbSubs: Unsubscribe[] = [];

  constructor(private firestore: Firestore, private uiService: UIService) {}

  fetchAvailableExercises() {
    this.uiService.loadingStateChanged.next(true);
    const db = collection(this.firestore, 'availableExercises');
    const availableExercises: Unsubscribe = onSnapshot(
      db,
      (snapshot) => {
        this.availableExercises = this.getExercisesFromSnapshot(snapshot);
        this.uiService.loadingStateChanged.next(false);
        this.exercisesChanged.next([...this.availableExercises]);
      },
      (error) => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar(
          'Fetching Exercises failed, please try again later',
          undefined,
          3000
        );
        this.exerciseChanged.next(null);
      }
    );
    this.fbSubs.push(availableExercises);
    return availableExercises;
  }

  startExercise(selectedId: string) {
    const selectedExercise = this.availableExercises.find(
      (ex) => ex.id === selectedId
    );
    this.runningExercise = selectedExercise!;
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  completeExercise() {
    this.addDataToDataase({
      ...this.runningExercise!,
      date: new Date(),
      state: 'completed',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDataase({
      ...this.runningExercise!,
      duration: this.runningExercise!.duration * (progress / 100),
      calories: this.runningExercise!.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  fetchCompletedOrCancelledExercises() {
    const db = collection(this.firestore, 'finishedExercises');
    const availableExercises: Unsubscribe = onSnapshot(db, (snapshot) => {
      this.finishedExercises = this.getExercisesFromSnapshot(snapshot);
      this.finishedExercisesChanged.next([...this.finishedExercises]);
    });
    this.fbSubs.push(availableExercises);
    return availableExercises;
  }

  cancelSubscriptions() {
    this.fbSubs.forEach((sub) => sub());
  }

  private addDataToDataase(exercise: Exercise) {
    const db = collection(this.firestore, 'finishedExercises');
    addDoc(db, exercise);
  }

  private getExercisesFromSnapshot(snapshot: QuerySnapshot<DocumentData>) {
    return snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        name: doc.data().name,
        duration: doc.data().duration,
        calories: doc.data().calories,
        state: doc.data().state,
        date: doc.data().date ? doc.data().date.toDate() : '',
      };
    });
  }
}
