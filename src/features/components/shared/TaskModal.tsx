
import type { Dispatch, SetStateAction } from 'react';
import type { Task, CSSProperties } from '../../../types';
import TaskForm from './TaskForm';

interface TaskModalProps {
  headingTitle: string;
  type: string;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  defaultProgressOrder: number;
  task?: Task;
  editTask: (
    newTitle: string,
    newDetail: string,
    newDueDate: string,
    newProgressOrder: number
  ) => void;
}

const TaskModal = ({
  headingTitle,
  type,
  setIsModalOpen,
  defaultProgressOrder,
  task,
  editTask,
}: TaskModalProps): JSX.Element => {
  const handleFormSubmit = (
    newTitle: string,
    newDetail: string,
    newDueDate: string,
    newProgressOrder: number
  ): void => {
    if (task) {
      editTask(newTitle, newDetail, newDueDate, newProgressOrder);
      setIsModalOpen(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.modalTop}>
        <h1>{headingTitle}</h1>
        <span
          className="material-icons"
          style={styles.icon}
          onClick={() => {
            setIsModalOpen(false);
          }}
        >
          close
        </span>
      </div>
      <TaskForm
        type={type}
        defaultProgressOrder={defaultProgressOrder}
        setIsModalOpen={setIsModalOpen}
        task={task}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};


const styles: CSSProperties = {
  container: {
    border: '1px solid gray',
    position: 'fixed',
    top: '20%',
    left: '40%',
    width: '25%',
    backgroundColor: '#fff',
    padding: '28px',
    zIndex: 10,
  },
  modalTop: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  icon: {
    cursor: 'pointer',
  },
}

export default TaskModal