import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Layout from './components/Layout';

// Import pages
import Dashboard from './pages/Dashboard';
import Theory from './pages/Theory';
import Exercises from './pages/Exercises';
import Tokens from './pages/Tokens';
import Analyzer from './pages/Analyzer';
import Research from './pages/Research';
import CaseStudies from './pages/CaseStudies';
import Patterns from './pages/Patterns';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/theory" element={<Theory />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/tokens" element={<Tokens />} />
            <Route path="/analyzer" element={<Analyzer />} />
            <Route path="/research" element={<Research />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/patterns" element={<Patterns />} />
          </Routes>
        </Layout>
      </Router>
    </I18nextProvider>
  );
}

export default App;