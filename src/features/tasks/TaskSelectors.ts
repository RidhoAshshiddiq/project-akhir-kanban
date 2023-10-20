import { selector } from 'recoil'
import { tasksState } from './TaskAtoms'
import type { Task } from '../../types'

export const notStartedTasksSelector = selector<Task[]>({
  key: 'notStarted_tasks',
  get: ({ get }) => {
    return get(tasksState).filter((task) => {
      return task.progressOrder === 1;
    });
  },
})

export const inProgressTasksSelector = selector<Task[]>({
  key: 'inProgress_tasks',
  get: ({ get }) => {
    return get(tasksState).filter((task) => {
      return task.progressOrder === 2;
    });
  },
})

export const waitingTasksSelector = selector<Task[]>({
  key: 'waiting_tasks',
  get: ({ get }) => {
    return get(tasksState).filter((task) => {
      return task.progressOrder === 3;
    });
  },
})

export const completedTasksSelector = selector<Task[]>({
  key: 'completed_tasks',
  get: ({ get }) => {
    return get(tasksState).filter((task) => {
      return task.progressOrder === 4;
    });
  },
})