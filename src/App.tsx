import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import Layout from './components/Layout';
import Theory from './pages/Theory';
import StyleGuide from './pages/StyleGuide';
import Projects from './pages/Projects';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Theory />} />
            <Route path="/theory" element={<Theory />} />
            <Route path="/style" element={<StyleGuide />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </I18nextProvider>
  );
}

export default App;
