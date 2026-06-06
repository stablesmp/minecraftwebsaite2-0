import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import htm from 'htm';
import { Navbar } from './Navbar.js';
import { Home } from './Home.js';
import { Rules } from './Rules.js';
import { ApplicationPage } from './Application.js';
import { AdminPage } from './Admin.js';
import * as Lucide from 'lucide-react';

const html = htm.bind(React.createElement);

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('applications');
    return saved ? JSON.parse(saved) : [];
  });
  const [modSuggestions, setModSuggestions] = useState(() => {
    const saved = localStorage.getItem('modSuggestions');
    return saved ? JSON.parse(saved) : [];
  });
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminCode, setAdminCode] = useState('');

  useEffect(() => {
    localStorage.setItem('applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('modSuggestions', JSON.stringify(modSuggestions));
  }, [modSuggestions]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      if (hash === 'admin' && !isAdmin) {
        setShowAdminModal(true);
        window.location.hash = currentPage;
      } else {
        setCurrentPage(hash);
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isAdmin, currentPage]);

  const handleNavigate = (page) => {
    if (page === 'admin' && !isAdmin) {
      setShowAdminModal(true);
    } else {
      window.location.hash = page;
    }
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    if (adminCode === '654321') {
      setIsAdmin(true);
      setShowAdminModal(false);
      setAdminCode('');
      window.location.hash = 'admin';
    } else {
      alert('Invalid admin code');
    }
  };

  const addApplication = (appData) => {
    const newApp = {
      ...appData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'Pending',
      submittedAt: Date.now()
    };
    setApplications([newApp, ...applications]);
  };

  const addModSuggestion = (suggestionData) => {
    const newSuggestion = {
      ...suggestionData,
      id: Math.random().toString(36).substr(2, 9),
      submittedAt: Date.now()
    };
    setModSuggestions([newSuggestion, ...modSuggestions]);
  };

  const updateAppStatus = (id, status) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status } : app
    ));
  };

  const deleteApp = (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      setApplications(applications.filter(app => app.id !== id));
    }
  };

  const deleteModSuggestion = (id) => {
    if (window.confirm('Are you sure you want to delete this suggestion?')) {
      setModSuggestions(modSuggestions.filter(mod => mod.id !== id));
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return html`<${Home} onNavigate=${handleNavigate} />`;
      case 'rules': return html`<${Rules} />`;
      case 'application': return html`<${ApplicationPage} onSubmit=${addApplication} />`;
      case 'admin':
        return isAdmin
          ? html`<${AdminPage}
              applications=${applications}
              onUpdateStatus=${updateAppStatus}
              onDelete=${deleteApp}
            />`
          : null;
      default: return html`<${Home} onNavigate=${handleNavigate} />`;
    }
  };

  return html`
    <div className="min-h-screen bg-white text-gray-900 selection:bg-blue-500/30">
      <${Navbar} currentPage=${currentPage} onNavigate=${handleNavigate} />
      
      <main>
        ${renderPage()}
      </main>

      ${showAdminModal && html`
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick=${() => setShowAdminModal(false)}></div>
          <div className="relative bg-white w-full max-w-md p-10 rounded-[2.5rem] border border-gray-100 shadow-2xl">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <${Lucide.Lock} className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-black text-center text-gray-900 uppercase tracking-tight mb-8">Admin Access</h2>

            <form onSubmit=${handleAdminSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-widest">Access Code</label>
                <input
                  autoFocus
                  type="password"
                  value=${adminCode}
                  onChange=${e => setAdminCode(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 text-gray-900 focus:outline-none focus:border-blue-500 transition-all text-center text-2xl tracking-[0.5em] font-black"
                  placeholder="••••••"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl transition-all shadow-md uppercase tracking-widest text-xs"
              >
                Authenticate
              </button>
            </form>
          </div>
        </div>
      `}

      <footer className="py-12 px-6 border-t border-gray-100 text-center">
        <p className="text-gray-400 text-[10px] font-bold tracking-[0.2em] uppercase">
          © 2026 Stable SMP • A PvP Survival Community
        </p>
      </footer>
    </div>
  `;
};

export default App;

const root = createRoot(document.getElementById('root'));
root.render(html`<${App} />`);
