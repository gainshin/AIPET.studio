import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  HomeIcon,
  BookOpenIcon,
  AcademicCapIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
  DocumentTextIcon,
  PresentationChartLineIcon,
  Squares2X2Icon,
  Bars3Icon,
  XMarkIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: t('navigation.dashboard'), href: '/', icon: HomeIcon, tooltip: 'Main dashboard and overview' },
    { name: t('navigation.theory'), href: '/theory', icon: BookOpenIcon, tooltip: 'AIPET framework theory' },
    { name: t('navigation.exercises'), href: '/exercises', icon: AcademicCapIcon, tooltip: 'Practical exercises' },
    { name: t('navigation.tokens'), href: '/tokens', icon: CubeTransparentIcon, tooltip: 'Design token management' },
    { name: t('navigation.analyzer'), href: '/analyzer', icon: MagnifyingGlassIcon, tooltip: 'AI-powered token analyzer' },
    { name: t('navigation.research'), href: '/research', icon: DocumentTextIcon, tooltip: 'Research library' },
    { name: t('navigation.case_studies'), href: '/case-studies', icon: PresentationChartLineIcon, tooltip: 'Real-world case studies' },
    { name: t('navigation.patterns'), href: '/patterns', icon: Squares2X2Icon, tooltip: 'AI UX design patterns' },
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'zh-TW', name: '繁體中文' },
    { code: 'fr', name: 'Français' }
  ];

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="text-xl font-bold text-gray-900">AIPET Studio</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                
                return (
                  <div key={item.name} className="relative group">
                    <Link
                      to={item.href}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.name}
                    </Link>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                      {item.tooltip}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                );
              })}
            </nav>

            {/* Language Selector & Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="relative group">
                <button className="flex items-center px-3 py-2 text-gray-600 hover:text-primary-600 transition-colors">
                  <GlobeAltIcon className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline text-sm">
                    {languages.find(lang => lang.code === i18n.language)?.name} 
                  </span>
                </button>
                
                {/* Language Dropdown */}
                <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${
                        i18n.language === lang.code ? 'text-primary-600 bg-primary-50' : 'text-gray-700'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Platform Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AI</span>
                </div>
                <span className="text-xl font-bold">AIPET Studio</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                A comprehensive learning platform for designers to master Figma Design Tokens 
                and understand the AIPET framework for AI UX design.
              </p>
            </div>

            {/* Learning Resources */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Learning Resources</h3>
              <ul className="space-y-2">
                <li><Link to="/theory" className="text-gray-300 hover:text-white text-sm transition-colors">AIPET Framework Theory</Link></li>
                <li><Link to="/research" className="text-gray-300 hover:text-white text-sm transition-colors">Academic Research</Link></li>
                <li><Link to="/case-studies" className="text-gray-300 hover:text-white text-sm transition-colors">Industry Case Studies</Link></li>
                <li><Link to="/patterns" className="text-gray-300 hover:text-white text-sm transition-colors">AI UX Pattern Library</Link></li>
              </ul>
            </div>

            {/* Industry References */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Industry References</h3>
              <ul className="space-y-2">
                <li><a href="https://design-tokens.github.io/community-group/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white text-sm transition-colors">Design Tokens Community</a></li>
                <li><a href="https://www.figma.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white text-sm transition-colors">Figma</a></li>
                <li><a href="https://tokens.studio" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white text-sm transition-colors">Tokens Studio</a></li>
                <li><a href="https://pair.withgoogle.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white text-sm transition-colors">Google PAIR</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 mt-8">
            <p className="text-gray-400 text-sm text-center">
              © 2024 AIPET Studio. Built for the design community to advance AI UX practices.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;