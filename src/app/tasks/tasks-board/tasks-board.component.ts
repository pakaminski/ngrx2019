import {Component, OnInit} from '@angular/core';
import {TasksService} from '../services/tasks.service';
import {Task, Status} from '../model/models';
import {Router, ActivatedRoute} from '@angular/router';
import {NgrxModuleState} from '../store';
import {Store, select} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {selectLoadingState, selectStatus, selectTaskItemsByStatus} from '../store/selectors';
import {UpdateTask, LoadTasks, AddTasks} from '../store/actions';

@Component({
  selector: 'app-tasks-board',
  templateUrl: './tasks-board.component.html',
  styleUrls: ['./tasks-board.component.scss']
})
export class TasksBoardComponent implements OnInit {

  loading$ = this.store$.pipe(select(selectLoadingState));
  mode$ = this.store$.pipe(
    select(selectStatus),
    map(mode => mode ? mode : Status.ALL)
  );
  tasks$ = this.store$.pipe(
    select(selectTaskItemsByStatus),
  );
  title$ = this.mode$.pipe(
    map(this.getTitleBasedOnStatus)
  );
  status = Status;


  constructor(private taskService: TasksService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private store$: Store<NgrxModuleState>) {
  }

  ngOnInit() {

  }

  getTitleBasedOnStatus(status: Status) {
    switch (status) {
      case Status.TODO: {
        return 'Tasks ToDo';
      }
      case Status.WIP: {
        return 'Tasks in progress';
      }
      case Status.DONE: {
        return 'Tasks done';
      }
      default: {
        return 'Kanban board';
      }
    }
  }

  fetchTasks() {
    this.store$.dispatch(new LoadTasks());
  }

  onTaskStatusChange({task, newStatus}) {
    this.store$.dispatch(new UpdateTask({
      ...task,
      status: newStatus,
    }));
  }

  onNewTask(task: Task) {
    this.store$.dispatch(new AddTasks(task));
  }
}
