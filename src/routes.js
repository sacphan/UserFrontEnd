import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import ListGameView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/Game/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import RegisterView from 'src/views/auth/RegisterView';
import ConfirmAccount from 'src/views/auth/ConfirmAccount';
import SettingsView from 'src/views/settings/SettingsView';
import BoardDetailView from 'src/views/DetailBoard/BoardDetailView';
import GameHistoryView from 'src/views/RoomGame/GameHistory'
const routes = (isLoggedIn)=>{
  
  return [
  {
    path: 'app',
    element: isLoggedIn ? <DashboardLayout />: <Navigate to="/login" />,
    children: [
      { path: 'account', element: <ListGameView /> },
      { path: 'customers', element: <CustomerListView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'products', element: <ProductListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path : 'BoardGame/:id', element: <BoardDetailView /> },
      { path : 'GameHistory/:id', element: <GameHistoryView /> },
      { path: '*', element: <Navigate to="/404" /> }
    
    ]
  },
  {
    path: '/',
    element: !isLoggedIn ?<MainLayout />: <Navigate to="/app/dashboard" />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'confirmAccount/:id', element: <ConfirmAccount /> },
      { path: 'register', element: <RegisterView /> },

      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
]};

export default routes;
