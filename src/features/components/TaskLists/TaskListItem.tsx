import type { Task, CSSProperties } from '../../../types';
import {
  TASK_PROGRESS_STATUS,
  TASK_PROGRESS_ID,
} from '../../../constants/app';
import { useTasksAction } from '../../hooks/Tasks';
import { useState } from 'react';
import TaskMenu from '../shared/TaskMenu';
import TaskModal from '../shared/TaskModal'; 
import { TASK_MODAL_TYPE } from '../../../constants/app'; 


interface TaskListItemProps {
  task: Task;
}

const getIconStyle = (progressOrder: number): React.CSSProperties => {
  const color: '#55C89F' | '#C5C5C5' =
    progressOrder === TASK_PROGRESS_ID.COMPLETED ? '#55C89F' : '#C5C5C5';

  const cursor: 'default' | 'pointer' =
    progressOrder === TASK_PROGRESS_ID.COMPLETED ? 'default' : 'pointer';

  return {
    color,
    cursor,
    fontSize: '28px',
    marginRight: '6px',
  };
};

const getProgressCategory = (progressOrder: number): string => {
  switch (progressOrder) {
    case TASK_PROGRESS_ID.NOT_STARTED:
      return TASK_PROGRESS_STATUS.NOT_STARTED;
    case TASK_PROGRESS_ID.IN_PROGRESS:
      return TASK_PROGRESS_STATUS.IN_PROGRESS;
    case TASK_PROGRESS_ID.WAITING:
      return TASK_PROGRESS_STATUS.WAITING;
    case TASK_PROGRESS_ID.COMPLETED:
      return TASK_PROGRESS_STATUS.COMPLETED;
    default:
      return TASK_PROGRESS_STATUS.NOT_STARTED;
  }
};

const TaskListItem = ({ task }: TaskListItemProps): JSX.Element => {
  const { completeTask, editTask, deleteTask } = useTasksAction();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);


  const handleCompleteTask = (): void => {
    if (!isMenuOpen) {
      completeTask(task.id);
    }
  };

  const handleEditTask = (
    newTitle: string,
    newDetail: string,
    newDueDate: string,
    newProgressOrder: number
  ): void => {
    if (task.id) {
      editTask?.(task.id, newTitle, newDetail, newDueDate, newProgressOrder);
      setIsMenuOpen(false);
      setIsEditFormOpen(false);
    }
  };

  const handleDeleteTask = (): void => {
    deleteTask(task.id);
    setIsMenuOpen(false); 
  };

  return (
    <div style={styles.tableBody}
      data-testid="task-list-item" // Ditambahkan
      >
      <div style={styles.taskTitleContainer}>
          <span
          className="material-icons"
          style={getIconStyle(task.progressOrder)}
          onClick={handleCompleteTask}
          >
          check_circle
          </span>
          <div 
            style={styles.taskTitle}
            data-testid="title-input" 
            >
            {task.title}
          </div>
        </div>
      <div 
      style={styles.tableBodyDetail}
      data-testid="detail-input"
      >
      {task.detail}
      </div>
      <div 
      style={styles.tableBodyDueDate}
      data-testid="due-date-input"
      >
      {task.dueDate}
      </div>
      <div 
      style={styles.tableBodyProgress}
      data-testid="progress-select"
      >
      {getProgressCategory(task.progressOrder)}
      </div>
      <div 
        style={styles.menuIconContainer}>
        <span
          className="material-icons"
          style={styles.menuIcon}
          onClick={(): void => {
            setIsMenuOpen(true);
          }}
          data-testid="task-menu-button" // Ditambahkan
        >
          more_horiz
        </span>
      </div>
     {isMenuOpen && (
        <TaskMenu
          setIsMenuOpen={setIsMenuOpen}
          task={task}
          initialTitle={task.title}
          initialDetail={task.detail}
          initialDueDate={task.dueDate}
          initialProgressOrder={task.progressOrder}
          editTask={handleEditTask}
          deleteTask={handleDeleteTask} 
          openEditForm={() => setIsEditFormOpen(true)} 
        />
      )}
      {isEditFormOpen && (
        <TaskModal
          headingTitle="Edit your task"
          type={TASK_MODAL_TYPE.EDIT} 
          setIsModalOpen={setIsEditFormOpen}
          defaultProgressOrder={task.progressOrder}
          task={task}
          editTask={handleEditTask}
          modalType={TASK_MODAL_TYPE}
        />
      )}
    </div>
  );
};

const styles: CSSProperties = {
  tableBody: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #D8D8D8',
    fontSize: '20px',
    position: 'relative',
    padding: '10px',
  },
  taskTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    overflowWrap: 'anywhere',
    width: '25%'
  },
  taskTitle: {
    marginLeft: '10px',
    flex: 1,
    minWidth: 0,
    borderRight: '1px solid #D8D8D8',
  },
  tableBodyDetail: {
    flex: 2,
    padding: '10px',
    overflowWrap: 'anywhere',
    borderRight: '1px solid #D8D8D8',
  },
  tableBodyDueDate: {
    width: '15%',
    padding: '10px',
    borderRight: '1px solid #D8D8D8',
  },
  tableBodyProgress: {
    width: '15%',
    padding: '10px',
  },
  menuIconContainer: {
    marginLeft: 'auto',
  },
  menuIcon: {
    cursor: 'pointer',
  },
};


export default TaskListItem;
