import { selector } from 'recoil'
import { tasksState } from './TaskAtoms'
import type { Task } from '../../types'
import {SelectorKeys} from '../../constants/recoilKeys'

export const notStartedTasksSelector = selector<Task[]>({
  // key: 'notStarted_tasks', //Raw String
  key: SelectorKeys.NOT_STARTED_TASKS,
  get: ({ get }) => {
    return get(tasksState).filter((task) => {
      return task.progressOrder === 1;
    });
  },
})

export const inProgressTasksSelector = selector<Task[]>({
  // key: 'inProgress_tasks', //Raw String
  key: SelectorKeys.IN_PROGRESS_TASKS,
  get: ({ get }) => {
    return get(tasksState).filter((task) => {
      return task.progressOrder === 2;
    });
  },
})

export const waitingTasksSelector = selector<Task[]>({
  // key: 'waiting_tasks', //Raw String
  key: SelectorKeys.WAITING_TASKS,
  get: ({ get }) => {
    return get(tasksState).filter((task) => {
      return task.progressOrder === 3;
    });
  },
})

export const completedTasksSelector = selector<Task[]>({
  // key: 'completed_tasks', //Raw String
  key: SelectorKeys.COMPLETED_TASKS,
  get: ({ get }) => {
    return get(tasksState).filter((task) => {
      return task.progressOrder === 4;
    });
  },
})