export const TASK_PROGRESS_STATUS = {
    NOT_STARTED: 'Not Started',
    IN_PROGRESS: 'In Progress',
    WAITING: 'Waiting/In Review',
    COMPLETED: 'Completed',
  }
  
  export const TASK_PROGRESS_ID = {
    NOT_STARTED: 1,
    IN_PROGRESS: 2,
    WAITING: 3,
    COMPLETED: 4,
  }

  // Ditambahkan
export const TASK_MODAL_TYPE = {
  ADD: 'add' as const,
  EDIT: 'edit' as const,
  FILTER: 'filter' as const,
} 

export type TaskModalType = typeof TASK_MODAL_TYPE[keyof typeof TASK_MODAL_TYPE];