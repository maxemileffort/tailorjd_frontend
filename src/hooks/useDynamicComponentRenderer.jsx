import { useState } from 'react';
import Profile from '../components/user/Profile';
import DocCollections from '../components/user/DocCollections';
import Workspace from '../components/user/Workspace';
import Learning from '../components/user/Learning';
import Settings from '../components/user/Settings';
import Support from '../components/user/Support';
import DashboardHome from '../components/user/DashboardHome';

const useDynamicComponentRenderer = () => {
  const [selectedComponent, setSelectedComponent] = useState('home');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'profile':
        return <Profile />;
      case 'docCollections':
        return <DocCollections />;
        case 'doc-collections': // this is the snack bar link
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
