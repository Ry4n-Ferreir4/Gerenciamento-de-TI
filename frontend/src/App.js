import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Gestor from './pages/Profile';
import Admin from './pages/Admin';
import Register from './pages/Register';
import Profile from './pages/Profile';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/login" element={<ProtectedRoute element={<Login />} redirectPath="/login" />} />
                    <Route 
                        path="/dashboard" 
                        element={<ProtectedRoute element={<Dashboard />} roles={['Admin', 'Gestor', 'User']} />} 
                    />
                    <Route 
                        path="/gestor" 
                        element={<ProtectedRoute element={<Gestor />} roles={['Admin', 'Gestor']} />} 
                    />
                    <Route 
                        path="/admin" 
                        element={<ProtectedRoute element={<Admin />} roles={['Admin']} />} 
                    />
                    <Route 
                        path="/register" 
                        element={<ProtectedRoute element={<Register />} roles={['Admin', 'Gestor']} />} 
                    />
                    <Route 
                        path="/profile" 
                        element={<ProtectedRoute element={<Profile />} roles={['User', 'Admin', 'Gestor']} />} 
                    />
                </Routes>   
            </Router>
        </AuthProvider>
    );
};

export default App;
