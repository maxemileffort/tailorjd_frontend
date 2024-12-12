import { useState } from 'react';
import AdminCharts from '../components/admin/AdminCharts';
import AdminUsers from '../components/admin/AdminUsers';
import AdminLogs from '../components/admin/AdminLogs';
import AdminAffiliates from '../components/admin/AdminAffiliates';

const useAdminComponentRenderer = () => {
  const [selectedComponent, setSelectedComponent] = useState('home');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'charts':
        return <AdminCharts />;
      case 'users':
        return <AdminUsers />;
      case 'logs':
        return <AdminLogs />;
      case 'affiliates':
        return <AdminAffiliates />;
      case 'home':
      default:
        return <AdminCharts />;
    }
  };

  return { selectedComponent, setSelectedComponent, renderComponent };
};

export default useAdminComponentRenderer;
