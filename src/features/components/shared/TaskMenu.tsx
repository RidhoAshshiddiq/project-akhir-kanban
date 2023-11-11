import type { Dispatch, SetStateAction } from 'react';
import type { Task, CSSProperties } from '../../../types';

interface TaskMenuProps {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  task: Task;
  initialTitle: string;
  initialDetail: string;
  initialDueDate: string;
  initialProgressOrder: number;
  editTask: (
    title: string,
    detail: string,
    dueDate: string,
    progressOrder: number
  ) => void;
  openEditForm: () => void; 
  deleteTask: () => void; 
}

const TaskMenu = ({
  setIsMenuOpen,
  task,
  initialTitle,
  initialDetail,
  initialDueDate,
  initialProgressOrder,
  editTask,
  openEditForm,
  deleteTask,
}: TaskMenuProps): JSX.Element => {
  const handleEditClick = (): void => {
    openEditForm(); 
    setIsMenuOpen(false);
    console.log(task, initialTitle, initialDetail, initialDueDate, initialProgressOrder, editTask);
  };

  const handleDelete = (): void => {
    deleteTask();
    setIsMenuOpen(false); 
  };

  return (
    <div style={styles.menu}
    data-testid="task-menu" // Ditambahkan
    >
      <div 
        style={styles.menuItem} 
        onClick={handleEditClick}
        data-testid="edit-button"
        >
        <span className="material-icons">edit</span>Edit
      </div>
      <div 
        style={styles.menuItem} 
        onClick={handleDelete}
        data-testid="delete-button" //Ditambahkkan
        >
        <span 
        className="material-icons">delete</span>Delete
      </div>
      <span
        className="material-icons"
        style={styles.closeIcon}
        onClick={(): void => {
          setIsMenuOpen(false);
        }}
      >
        close
      </span>
    </div>
  );
};

const styles: CSSProperties = {
  menu: {
    backgroundColor: '#fff',
    border: '1px solid gray',
    padding: '8px 16px',
    position: 'absolute',
    top: '-10px',
    right: '4%',
    zIndex: 10,
  },
  menuItem: {
    display: 'flex',
    marginBottom: '8px',
    cursor: 'pointer',
  },
  closeIcon: {
    position: 'absolute',
    top: '0px',
    right: '2px',
    cursor: 'pointer',
  },
}

export default TaskMenu