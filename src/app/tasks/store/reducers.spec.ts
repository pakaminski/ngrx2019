import { initialTasksState, tasksReducer } from "./reducers";
import { Task, Status } from '../model/models';
import { UpdateTask } from './actions';


describe('Task reducer', () => {

    const state = {
        loading: false,
        items:[]
    }
    it('should default to initial state', () => {
      const stateBefore = undefined;
      const action = { type: '@ngrx/store/init' };
      const expectedState = initialTasksState;
      const stateAfter = tasksReducer(stateBefore, action);
      expect(stateAfter).toEqual(expectedState);
    });

    it('should update task', () => {
        const task = new Task('Write test', Status.TODO);
        const updatedTask = {...task, status: Status.DONE}
        const action = new UpdateTask(updatedTask);
        const initialState = {
            ...state,
            items : [task]
        }
        const expectedState = {
            ...state,
            items : [updatedTask]
        }
        const stateAfter = tasksReducer(initialState, action);
        expect(stateAfter).toEqual(expectedState);
    })
  });
