import type { Task, CSSProperties } from '../../../types';
import {
  TASK_PROGRESS_STATUS,
  TASK_PROGRESS_ID,
} from '../../../constants/app';
import { useTasksAction } from '../../hooks/Tasks';

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
  
  const { completeTask} = useTasksAction();

  return (
    <div style={styles.tableBody}>
      <div style={styles.taskTitleContainer}>
        <span
           className="material-icons"
           style={getIconStyle(task.progressOrder)}
           onClick={() => {
             completeTask(task.id)
           }}
        >
          check_circle
        </span>
        <div style={styles.taskTitle}>{task.title}</div>
      </div>
      <div style={styles.tableBodyDetail}>{task.detail}</div>
      <div style={styles.tableBodyDueDate}>{task.dueDate}</div>
      <div style={styles.tableBodyProgress}>{getProgressCategory(task.progressOrder)}</div>
      <div style={styles.menuIconContainer}>
        <span className="material-icons" style={styles.menuIcon}>
          more_horiz
        </span>
      </div>
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
