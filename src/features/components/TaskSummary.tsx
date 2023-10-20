import { useRecoilValue } from 'recoil';
import {
  completedTasksSelector,
  notStartedTasksSelector,
  inProgressTasksSelector,
  waitingTasksSelector,
} from '../tasks/TaskSelectors';
import type { Task, CSSProperties } from '../.././types';
import { Link } from 'react-router-dom';

const TaskSummary = (): JSX.Element => {
  const completedTasks = useRecoilValue<Task[]>(completedTasksSelector);
  const notStartedTasks = useRecoilValue<Task[]>(notStartedTasksSelector);
  const inProgressTasks = useRecoilValue<Task[]>(inProgressTasksSelector);
  const waitingTasks = useRecoilValue<Task[]>(waitingTasksSelector);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Summary of Your Tasks</h1>
      <div style={styles.list}>
        <span className="material-icons">check_circle</span>
        <h2>
          You have completed {completedTasks.length}{' '}
          {completedTasks.length <= 1 ? 'task' : 'tasks'}
        </h2>
      </div>
      <div style={styles.list}>
        <span className="material-icons">list</span>
        <h2>
          You still have {notStartedTasks.length + inProgressTasks.length + waitingTasks.length}{' '}
          {notStartedTasks.length + inProgressTasks.length + waitingTasks.length <= 1 ? 'task' : 'tasks'} left
        </h2>
      </div>
      <div style={styles.list}>
        <span className="material-icons">arrow_right</span>
        <h2>
          Not Started: {notStartedTasks.length}{' '}
          {notStartedTasks.length <= 1 ? 'task' : 'tasks'}
        </h2>
      </div>
      <div style={styles.list}>
        <span className="material-icons">arrow_right</span>
        <h2>
          In Progress: {inProgressTasks.length}{' '}
          {inProgressTasks.length <= 1 ? 'task' : 'tasks'}
        </h2>
      </div>
      <div style={styles.list}>
        <span className="material-icons">arrow_right</span>
        <h2>
          Waiting/In Review: {waitingTasks.length}{' '}
          {waitingTasks.length <= 1 ? 'task' : 'tasks'}
        </h2>
      </div>
      <div style={styles.links}>
        <Link to="/task-list" style={styles.link}>
          See Your Task List
        </Link>
        <Link to="/task-progress" style={styles.link}>
          Manage Your Task Progress
        </Link>
      </div>
    </div>
  );
};


const styles: CSSProperties = {
  container: {
    padding: '40px',
  },
  heading: {
    color: '#55C89F',
    marginBottom: '60px',
  },
  list: {
    color: '#fff',
    backgroundColor: '#55C89F',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '40px',
    width: '200%',
  },
  links: {
    display: 'flex',
  },
  link: {
    padding: '16px',
    marginRight: '24px',
    backgroundColor: '#55ACC8',
    color: '#fff',
    borderRadius: '8px',
    textDecoration: 'none',
  },
}

export default TaskSummary