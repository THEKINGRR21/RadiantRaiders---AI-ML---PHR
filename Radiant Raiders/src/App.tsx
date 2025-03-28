import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Session } from '@supabase/supabase-js';
import { supabase } from './lib/supabase';
import { useAuthStore } from './store/authStore';
import ChatInterface from './components/ChatInterface';
import HealthDashboard from './components/HealthDashboard';
import Auth from './components/Auth';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const { user, setUser, setSession } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <Auth />
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            AI Health Assistant 🏃‍♂️
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 dark:text-gray-300">{user.email}</span>
            <button
              onClick={() => useAuthStore.getState().signOut()}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
            >
              Sign Out
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
            >
              {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
            <ChatInterface />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
            <HealthDashboard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;