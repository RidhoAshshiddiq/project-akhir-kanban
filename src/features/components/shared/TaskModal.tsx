import type { Dispatch, SetStateAction } from 'react';
import type { Task, CSSProperties } from '../../../types';
import TaskForm from './TaskForm';
import TaskFilter from './TaskFilter'; // Import FilterTasksModal
import {TASK_MODAL_TYPE} from '../../../constants/app'; 

interface TaskModalProps {
  headingTitle: string;
  type: string;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  defaultProgressOrder: number;
  task?: Task;
  editTask?: (
    newTitle: string,
    newDetail: string,
    newDueDate: string,
    newProgressOrder: number
  ) => void;
  // Ditambahkan
  applyFilter?: (selectedFilter: string) => void; 
  modalType: typeof TASK_MODAL_TYPE; // Tambahkan properti TASK_MODAL_TYPE
  filterType?: string; // Tambahkan properti filterType
  setFilterType?: Dispatch<SetStateAction<string>> | undefined; // Tambahkan properti setFilterType
  onSubmit?: (
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
  // Ditambahkan
  applyFilter, 
  modalType, 
  filterType = '', 
  setFilterType = () => {}, 
  onSubmit, 
}: TaskModalProps): JSX.Element => {
  const handleFormSubmit = (
    newTitle: string,
    newDetail: string,
    newDueDate: string,
    newProgressOrder: number
  ): void => {
    console.log('Handling form submit in TaskModal with type:', type);
    if (type === modalType.FILTER) {
      applyFilter?.(newTitle); 
    } else if (type === modalType.ADD || (task && type === TASK_MODAL_TYPE.EDIT)) {
      editTask?.(newTitle, newDetail, newDueDate, newProgressOrder);
    }
    onSubmit?.(newTitle, newDetail, newDueDate, newProgressOrder); 
    setIsModalOpen(false);
  };

  console.log('Render TaskModal'); // Tambahkan log ini
  console.log('modalType:', modalType); // Tambahkan log ini

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
      {type === TASK_MODAL_TYPE?.FILTER ? (
        // Tampilkan konten filterTasks jika jenis modal adalah filter
        <TaskFilter
          filterType={filterType}
          setFilterType={setFilterType}
          applyFilter={applyFilter || (() => {})} // Tambahkan pengecekan di sini
        />
      ) : (
        // Tampilkan konten TaskForm jika jenis modal bukan filter
        <TaskForm
          type={type}
          defaultProgressOrder={defaultProgressOrder}
          setIsModalOpen={setIsModalOpen}
          task={task}
          onSubmit={handleFormSubmit}
        />
      )}
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

TaskModal.defaultProps = {
  applyFilter: () => {},
  filterType: '',
  setFilterType: () => {},
}

export default TaskModal