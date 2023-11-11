import { RecoilRoot } from 'recoil'; // Ditambahkan
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideMenu from './components/SideMenu';
import TaskSummary from './features/components/TaskSummary';
import TaskList from './features/components/TaskLists/TaskList';
import TaskProgress from './features//components/TaskProgress/TaskProgress';



const App: React.FC = () => {
  return (
    <RecoilRoot> {/* Ditambahkan */}
       <Router basename="/project-akhir-kanban">
        <div style={{ display: 'flex' }}>
          <SideMenu />
          <div style={{ marginLeft: '-20px', padding: '20px', marginTop: '-40px' }}>
            <Routes>
              <Route path="/" element={<TaskSummary />} />
              <Route path="/task-list" element={<TaskList />} />
              <Route path="/task-progress" element={<TaskProgress />} />
            </Routes>
          </div>
        </div>
      </Router>
    </RecoilRoot> 
  );
};

export default App;
