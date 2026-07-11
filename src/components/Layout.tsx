import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: t('navigation.theory'), href: '/theory' },
    { name: t('navigation.style'), href: '/style' },
  ];

  const languages = [
    { code: 'en', name: 'EN' },
    { code: 'fr', name: 'FR' },
    { code: 'zh-TW', name: '中文' }
  ];

  // 中文 em 不斜體的規則掛在 html[lang] 上（見 index.css）
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };

  return (
    <div className="min-h-screen bg-bg text-ink">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-bg/90 backdrop-blur border-b border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Wordmark */}
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <span className="hidden sm:flex w-8 h-8 rounded-full border border-accent-dim items-center justify-center font-display text-lg leading-none pt-0.5">
                A
              </span>
              <span className="font-display text-xl sm:text-2xl tracking-tight whitespace-nowrap">
                AIPET<span className="italic text-accent">.studio</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => {
                const isActive =
                  location.pathname === item.href ||
                  (item.href === '/theory' && location.pathname === '/');
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`font-mono text-xs uppercase tracking-kicker transition-colors ${
                      isActive ? 'text-accent' : 'text-faint hover:text-ink'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Language pills & mobile menu button */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center gap-1.5">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`font-mono text-[11px] tracking-wider rounded-full px-2.5 sm:px-3 py-1.5 border whitespace-nowrap transition-colors ${
                      i18n.language === lang.code
                        ? 'bg-accent text-on-accent border-accent'
                        : 'text-faint border-line hover:text-ink hover:border-faint'
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>

              <button
                className="md:hidden p-2 rounded-md text-faint hover:text-ink"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="menu"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-line bg-bg">
            <div className="px-4 py-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block py-2 font-mono text-xs uppercase tracking-kicker text-faint hover:text-ink"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="col-span-1 md:col-span-2">
              <span className="font-display text-xl">
                AIPET<span className="italic text-accent">.studio</span>
              </span>
              <p className="text-muted text-sm leading-relaxed mt-4 max-w-md">
                A three-column architecture tool for Agentic product designers:
                immutable raw sources, an LLM Wiki as second brain, and dedicated
                UX agents curated by a human Orchestrator.
              </p>
            </div>

            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-kicker text-faint mb-4">
                Learning
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/theory" className="text-muted hover:text-accent text-sm transition-colors">
                    AIPET Framework Theory
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-kicker text-faint mb-4">
                References
              </h3>
              <ul className="space-y-2">
                <li><a href="https://design-tokens.github.io/community-group/" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent text-sm transition-colors">Design Tokens Community</a></li>
                <li><a href="https://www.figma.com" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent text-sm transition-colors">Figma</a></li>
                <li><a href="https://tokens.studio" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent text-sm transition-colors">Tokens Studio</a></li>
                <li><a href="https://pair.withgoogle.com" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent text-sm transition-colors">Google PAIR</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-dotted border-line pt-6 mt-10">
            <p className="font-mono text-[11px] tracking-wider text-faint text-center">
              AIPET.studio · Wiki → Builder → Auditor → Synthesis · © 2026
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
