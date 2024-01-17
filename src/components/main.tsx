import Dashboard from './dashboard/dashboard';
import Home from '../pages/home';
import Navbar from './navbar/navbar';

const Main = () => {
  return (
    <div>
      <Navbar />
      <Dashboard />
      <Home />
    </div>
  );
};
export default Main;
