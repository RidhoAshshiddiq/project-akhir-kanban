import React from 'react';

interface TaskFilterProps {
  filterType: string;
  setFilterType: React.Dispatch<React.SetStateAction<string>>;
  applyFilter: (selectedFilter: string) => void; // Tambahkan argumen selectedFilter di sini
}

const TaskFilter: React.FC<TaskFilterProps> = ({
  filterType,
  setFilterType,
  applyFilter,
}: TaskFilterProps): JSX.Element => {
  const handleFilterClick = (selectedFilter: string) => {
    // Set filterType langsung saat opsi dipilih
    setFilterType(selectedFilter);

    // Panggil applyFilter dengan argumen selectedFilter
    applyFilter?.(selectedFilter);
  };

  return (
    <div>
      <div style={styles.filterOptions}>
        <div
          style={filterType === 'all' ? styles.selectedOption : styles.filterOption}
          onClick={() => handleFilterClick('all')}
        >
          All Tasks
        </div>
        <div
          style={filterType === 'completed' ? styles.selectedOption : styles.filterOption}
          onClick={() => handleFilterClick('completed')}
        >
          Completed Tasks
        </div>
        <div
          style={filterType === 'uncompleted' ? styles.selectedOption : styles.filterOption}
          onClick={() => handleFilterClick('uncompleted')}
        >
          Uncompleted Tasks
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  filterOptions: {
    display: 'flex',
    flexDirection: 'column',
  },
  filterOption: {
    cursor: 'pointer',
    padding: '8px',
  },
  selectedOption: {
    cursor: 'pointer',
    padding: '8px',
    backgroundColor: '#ccc',
  },
};

export default TaskFilter;
