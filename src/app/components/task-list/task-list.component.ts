import {Component, OnInit} from '@angular/core';
import {Task} from '../../interfaces/task.interface';
import {TaskService} from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  public taskListCompleted: any[];
  public taskListPending: any[];
  public showInputTask: boolean;
  public errorInput: boolean;
  public showTaskCompleted: boolean;

  constructor(private _taskService: TaskService) {
  }

  ngOnInit() {
    this.showInputTask = false;
    this.errorInput = false;
    this.showTaskCompleted = true;

    // Inicializa desde el servicio listas pendientes y completadas
    this.getTaskList();
  }

  addTask(description: string) {
    if (description !== null && description !== '') {
      this.errorInput = false;
      this.createTask('taskListPending', description);
    } else {
      this.errorInput = true;
    }
  }

  createTask(type: string, description, taskCompleted?: Task) {
    const task: Task = {
      date: (taskCompleted) ? taskCompleted.date : new Date(),
      description: (taskCompleted) ? taskCompleted.description : description,
      completed: (taskCompleted) ? true : false
    };
    if (type === 'taskListPending') {
      this.taskListPending.push(task);
      this._taskService.setTaskPending(this.taskListPending);
    } else {
      this.taskListCompleted.push(task);
      this._taskService.setTaskCompleted(this.taskListCompleted);
    }
  }

  receiveEmitEvent(type, eventIndex) {
    // Si es complete pusehamos al otro arreglo de completados la actual tarea
    if (type === 'completed') {
      this.createTask('taskListCompleted', this.taskListPending[eventIndex].description, this.taskListPending[eventIndex]);
    }
    // Cortamos en una posicion el arreglo .splice(position_initial, cantidad_posiciones)
    this.taskListPending.splice(eventIndex, 1);
    // Ejecuta la actualizcion en local y realiza la emision del update
    this.updateTasksList();
  }

  getTaskList() {
    // Subscripciones para traer cualquier emicion del cambio sobre los sujetos
    this._taskService.tasksPendingSubject$.subscribe(
      (tasks) => {
        this.taskListPending = tasks;
      }
    );

    this._taskService.tasksCompletedSubject$.subscribe(
      (tasks) => {
        this.taskListCompleted = tasks;
      }
    );
  }

  updateTasksList() {
    this._taskService.setTaskCompleted(this.taskListCompleted);
    this._taskService.setTaskPending(this.taskListPending);
  }

  deleteAllTasks() {
    this.taskListPending = [];
    this.taskListCompleted = [];
    this._taskService.deleteTaskLocal();
    this._taskService.setTaskPending(this.taskListPending);
    this._taskService.setTaskCompleted(this.taskListCompleted);
  }


}
