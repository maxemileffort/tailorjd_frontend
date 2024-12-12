import { useState } from 'react';
import Profile from '../components/Profile';
import DocCollections from '../components/DocCollections';
import Workspace from '../components/Workspace';
import Learning from '../components/Learning';
import Settings from '../components/Settings';
import Support from '../components/Support';
import DashboardHome from '../components/user/DashboardHome';

const useDynamicComponentRenderer = () => {
  const [selectedComponent, setSelectedComponent] = useState('home');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'profile':
        return <Profile />;
      case 'docCollections':
        return <DocCollections />;
      case 'workspace':
        return <Workspace />;
      case 'learning':
        return <Learning />;
      case 'settings':
        return <Settings />;
      case 'support':
        return <Support />;
      case 'home':
      default:
        return <DashboardHome />;
    }
  };

  return { selectedComponent, setSelectedComponent, renderComponent };
};

export default useDynamicComponentRenderer;
