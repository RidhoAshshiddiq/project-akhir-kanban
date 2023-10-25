import { useRecoilValue } from 'recoil';
import TaskColumn from './TaskColumn';
import type { Task, CSSProperties } from '../../../types';
import { TASK_PROGRESS_STATUS } from '../../../constants/app';
import { useTasksAction } from '../../hooks/Tasks';
import {
  notStartedTasksState,
  inProgressTasksState,
  waitingTasksState,
  completedTasksState,
} from '../../tasks/TaskAtoms';

const TaskProgress: React.FC = () => {
  const notStartedTasks: Task[] = useRecoilValue(notStartedTasksState);
  const inProgressTasks: Task[] = useRecoilValue(inProgressTasksState);
  const waitingTasks: Task[] = useRecoilValue(waitingTasksState);
  const completedTasks: Task[] = useRecoilValue(completedTasksState);

  const { moveTaskCard, completeTask } = useTasksAction();

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Task Progress</h1>
      <div style={styles.taskCategories}>
        <TaskColumn
          columnTitle={TASK_PROGRESS_STATUS.NOT_STARTED}
          tasks={notStartedTasks}
          moveTaskCard={moveTaskCard}
          completeTask={completeTask}
        />
        <TaskColumn
          columnTitle={TASK_PROGRESS_STATUS.IN_PROGRESS}
          tasks={inProgressTasks}
          moveTaskCard={moveTaskCard}
          completeTask={completeTask}
        />
        <TaskColumn
          columnTitle={TASK_PROGRESS_STATUS.WAITING}
          tasks={waitingTasks}
          moveTaskCard={moveTaskCard}
          completeTask={completeTask}
        />
        <TaskColumn
          columnTitle={TASK_PROGRESS_STATUS.COMPLETED}
          tasks={completedTasks}
          moveTaskCard={moveTaskCard}
          completeTask={completeTask}
        />
      </div>
    </div>
  );
};

const styles: CSSProperties = {
  container: {
    padding: '20px',
  },
  heading: {
    color: '#55C89F',
    marginBottom: '60px',
  },
  taskCategories: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '-50px'
  },
}

export default TaskProgress


