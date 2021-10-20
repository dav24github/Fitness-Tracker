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
import { select, Store } from '@ngrx/store';

import { AppStateInterface } from '../appState.interface';
import { UIService } from '../shared/iu.service';
import { startLoadingAction, stopLoadingAction } from '../shared/store/actions';
import { Exercise } from './exercise.model';
import {
  setAvailableTrainingsAction,
  setFinishedTrainingsAction,
  startTrainingAction,
  stopTrainingsAction,
} from './store/actions';
import { activeTrainingSelector } from './store/selectors';
import { take } from 'rxjs/operators';

@Injectable()
export class TrainingService {
  private fbSubs: Unsubscribe[] = [];

  constructor(
    private firestore: Firestore,
    private uiService: UIService,
    private store: Store<AppStateInterface>
  ) {}

  fetchAvailableExercises() {
    this.store.dispatch(startLoadingAction());
    const db = collection(this.firestore, 'availableExercises');
    const availableExercises: Unsubscribe = onSnapshot(
      db,
      (snapshot) => {
        const availableExercises = {
          availableExercises: this.getExercisesFromSnapshot(snapshot),
        };
        this.store.dispatch(stopLoadingAction());
        this.store.dispatch(setAvailableTrainingsAction(availableExercises));
      },
      (error) => {
        this.store.dispatch(stopLoadingAction());
        this.uiService.showSnackbar(
          'Fetching Exercises failed, please try again later',
          undefined,
          3000
        );
      }
    );
    this.fbSubs.push(availableExercises);
  }

  startExercise(selectedId: string) {
    this.store.dispatch(startTrainingAction({ activetrainingId: selectedId }));
  }

  completeExercise() {
    this.store.pipe(select(activeTrainingSelector), take(1)).subscribe((ex) => {
      this.addDataToDataase({
        ...ex!,
        date: new Date(),
        state: 'completed',
      });
      this.store.dispatch(stopTrainingsAction());
    });
  }

  cancelExercise(progress: number) {
    this.store.pipe(select(activeTrainingSelector), take(1)).subscribe((ex) => {
      this.addDataToDataase({
        ...ex!,
        duration: ex!.duration * (progress / 100),
        calories: ex!.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled',
      });
      this.store.dispatch(stopTrainingsAction());
    });
  }

  fetchCompletedOrCancelledExercises() {
    const db = collection(this.firestore, 'finishedExercises');
    const availableExercises: Unsubscribe = onSnapshot(db, (snapshot) => {
      const finishedExercises = {
        finishedAExercises: this.getExercisesFromSnapshot(snapshot),
      };
      this.store.dispatch(setFinishedTrainingsAction(finishedExercises));
    });
    this.fbSubs.push(availableExercises);
  }

  cancelSubscriptions() {
    this.fbSubs.forEach((sub) => sub());
  }

  private addDataToDataase(exercise: Exercise) {
    const db = collection(this.firestore, 'finishedExercises');
    addDoc(db, exercise);
  }

  private getExercisesFromSnapshot(
    snapshot: QuerySnapshot<DocumentData>
  ): Exercise[] {
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
