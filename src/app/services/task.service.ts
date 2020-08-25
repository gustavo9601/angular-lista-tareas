import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Task} from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public tasksPendingBehaviourSubject = new BehaviorSubject<Task[]>([]);
  public tasksPendingSubject$ = this.tasksPendingBehaviourSubject.asObservable();

  public tasksCompletedBehaviourSubject = new BehaviorSubject<Task[]>([]);
  public tasksCompletedSubject$ = this.tasksCompletedBehaviourSubject.asObservable();

  constructor() {

    // Obteniendo valores del local
    // Los emite al iniciar la suscripcion
    this.setTaskPending(this.getTaskPending());
    this.setTaskCompleted(this.getTaskCompleted());
  }

  getTaskPending(): Task[] {
    const tasksPendingLocal = localStorage.getItem('tasksPendingLocal');
    return JSON.parse(tasksPendingLocal);
  }

  getTaskCompleted(): Task[] {
    const tasksCompletedLocal = localStorage.getItem('tasksCompletedLocal');
    return JSON.parse(tasksCompletedLocal);
  }

  setTaskPending(tasks: Task[]) {
    localStorage.setItem('tasksPendingLocal', JSON.stringify(tasks));
    this.tasksPendingBehaviourSubject.next(this.getTaskPending());
  }

  setTaskCompleted(tasks: Task[]) {
    localStorage.setItem('tasksCompletedLocal', JSON.stringify(tasks));
    this.tasksCompletedBehaviourSubject.next(this.getTaskCompleted());
  }

  deleteTaskLocal() {
    localStorage.removeItem('tasksPendingLocal');
    localStorage.removeItem('tasksCompletedLocal');
  }

}
