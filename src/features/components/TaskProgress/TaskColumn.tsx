import TaskCard from './TaskCard';
import type { Task, CSSProperties } from '../../../types';

interface TaskColumnProps {
  columnTitle: string;
  tasks: Task[];
  moveTaskCard: (taskId: number, directionNumber: 1 | -1) => void;
  completeTask: (taskId: number) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ columnTitle, tasks, moveTaskCard, completeTask }) => {
  return (
    <div style={styles.categoryColumn}>
      <div style={styles.columnTitleWrapper}>
        <h2 style={styles.categoryTitle}>{columnTitle}</h2>
          <div className="material-icons" style={styles.plusIcon}>
            add
          </div>
      </div>
      <div>
      {tasks.map((task) => (
      <TaskCard key={task.id} task={task} moveTaskCard={moveTaskCard} completeTask={completeTask} />
      ))}
      </div>
    </div>
  );
}

const styles: CSSProperties = {
  plusIcon: {
    cursor: 'pointer',
  },
  categoryColumn: {
    width: '22%',
  },
  columnTitleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 4px',
  },
}

export default TaskColumn
