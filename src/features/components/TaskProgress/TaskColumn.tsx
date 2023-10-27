import TaskCard from './TaskCard';
import type { Task, CSSProperties } from '../../../types';
import { useState } from 'react' // useState ditambahkan
import TaskModal from '../../components/shared/TaskModal' //Ditambahkan
import {TASK_PROGRESS_ID, TASK_MODAL_TYPE} from '../../../constants/app' // Ditambahkan

interface TaskColumnProps {
  columnTitle: string;
  tasks: Task[];
  moveTaskCard: (taskId: number, directionNumber: 1 | -1) => void;
  completeTask: (taskId: number) => void;
  defaultProgressOrder: typeof TASK_PROGRESS_ID[keyof typeof TASK_PROGRESS_ID]; 
}



const TaskColumn: React.FC<TaskColumnProps> = ({ columnTitle, tasks, moveTaskCard, completeTask, defaultProgressOrder }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false) 

  return (
    <div style={styles.categoryColumn}>
      <div style={styles.columnTitleWrapper}>
        <h2 style={styles.categoryTitle}>{columnTitle}</h2>
          <div className="material-icons" style={styles.plusIcon}>
          <button
          style={styles.plusIcon}
          onClick={(): void => {
            setIsModalOpen(true) // Ditambahkan
          }}
          >
          <span className="material-icons">add</span>
          </button>
          </div>
      </div>
      <div>
      {tasks.map((task) => (
      <TaskCard key={task.id} task={task} moveTaskCard={moveTaskCard} completeTask={completeTask} />
      ))}
      </div>
      {isModalOpen && (
        <TaskModal
          headingTitle="Add your task"
          type={TASK_MODAL_TYPE.ADD} // Ditambahkan
          setIsModalOpen={setIsModalOpen}
          defaultProgressOrder={defaultProgressOrder}
        />
      )}
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
