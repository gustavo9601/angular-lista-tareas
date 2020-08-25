import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from '../../../interfaces/task.interface';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input('task') task: Task;
  @Input('index') index: number;

  @Output('completed') completed = new EventEmitter<number>();
  @Output('remove') remove = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit() {
  }

  emitEvent(type: string) {
    if (type === 'completed') {
      this.completed.emit(this.index);
    } else {
      this.remove.emit(this.index);
    }
  }

}
