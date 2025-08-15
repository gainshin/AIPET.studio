import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeftIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PencilIcon,
  TrashIcon,
  CubeTransparentIcon
} from '@heroicons/react/24/outline';
import { TokenEntity, Token, TokenCategory, AIPETFramework } from '../entities';
import TokenEditor from '../components/TokenEditor';

const Tokens: React.FC = () => {
  const { t } = useTranslation();
  const [tokens, setTokens] = useState<Token[]>([]);
  const [filteredTokens, setFilteredTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingToken, setEditingToken] = useState<Token | null>(null);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFramework, setSelectedFramework] = useState<string>('all');

  useEffect(() => {
    loadTokens();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [tokens, searchTerm, selectedCategory, selectedFramework]);

  const loadTokens = async () => {
    try {
      const tokenList = await TokenEntity.list('-updated_date');
      setTokens(tokenList);
    } catch (error) {
      console.error('Error loading tokens:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = tokens;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(token =>
        token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        token.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        token.value.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(token => token.category === selectedCategory);
    }

    // Framework filter
    if (selectedFramework !== 'all') {
      filtered = filtered.filter(token => token.aipet_framework === selectedFramework);
    }

    setFilteredTokens(filtered);
  };

  const handleCreateToken = () => {
    setEditingToken(null);
    setIsEditorOpen(true);
  };

  const handleEditToken = (token: Token) => {
    setEditingToken(token);
    setIsEditorOpen(true);
  };

  const handleSaveToken = async (tokenData: Omit<Token, 'id' | 'created_date' | 'updated_date' | 'created_by'>) => {
    try {
      if (editingToken) {
        await TokenEntity.update(editingToken.id, tokenData);
      } else {
        await TokenEntity.create(tokenData);
      }
      await loadTokens();
    } catch (error) {
      console.error('Error saving token:', error);
      throw error;
    }
  };

  const handleDeleteToken = async (tokenId: string) => {
    if (window.confirm('Are you sure you want to delete this token?')) {
      try {
        await TokenEntity.delete(tokenId);
        await loadTokens();
      } catch (error) {
        console.error('Error deleting token:', error);
      }
    }
  };

  const getCategoryColor = (category: TokenCategory) => {
    const colors: Record<TokenCategory, string> = {
      color: 'bg-blue-100 text-blue-800',
      typography: 'bg-green-100 text-green-800',
      spacing: 'bg-purple-100 text-purple-800',
      radius: 'bg-yellow-100 text-yellow-800',
      shadow: 'bg-gray-100 text-gray-800',
      agency: 'bg-purple-100 text-purple-800',
      interaction: 'bg-cyan-100 text-cyan-800',
      privacy: 'bg-red-100 text-red-800',
      experience: 'bg-amber-100 text-amber-800',
      trust: 'bg-emerald-100 text-emerald-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getFrameworkColor = (framework: AIPETFramework) => {
    const colors: Record<AIPETFramework, string> = {
      Traditional: 'bg-gray-500',
      Agency: 'bg-purple-500',
      Interaction: 'bg-cyan-500',
      Privacy: 'bg-red-500',
      Experience: 'bg-amber-500',
      Trust: 'bg-emerald-500'
    };
    return colors[framework] || 'bg-gray-500';
  };

  const categories: { value: string; label: string }[] = [
    { value: 'all', label: t('common.all') },
    { value: 'color', label: t('tokens.categories.color') },
    { value: 'typography', label: t('tokens.categories.typography') },
    { value: 'spacing', label: t('tokens.categories.spacing') },
    { value: 'radius', label: t('tokens.categories.radius') },
    { value: 'shadow', label: t('tokens.categories.shadow') },
    { value: 'agency', label: t('tokens.categories.agency') },
    { value: 'interaction', label: t('tokens.categories.interaction') },
    { value: 'privacy', label: t('tokens.categories.privacy') },
    { value: 'experience', label: t('tokens.categories.experience') },
    { value: 'trust', label: t('tokens.categories.trust') }
  ];

  const frameworks: { value: string; label: string }[] = [
    { value: 'all', label: t('common.all') },
    { value: 'Traditional', label: t('tokens.frameworks.Traditional') },
    { value: 'Agency', label: t('tokens.frameworks.Agency') },
    { value: 'Interaction', label: t('tokens.frameworks.Interaction') },
    { value: 'Privacy', label: t('tokens.frameworks.Privacy') },
    { value: 'Experience', label: t('tokens.frameworks.Experience') },
    { value: 'Trust', label: t('tokens.frameworks.Trust') }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link
                to="/"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
              >
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                {t('common.back')}
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">{t('tokens.title')}</h1>
              <p className="text-gray-600 mt-1">{t('tokens.subtitle')}</p>
            </div>
            <button
              onClick={handleCreateToken}
              className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              {t('tokens.add_token')}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={t('common.search')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <FunnelIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Framework Filter */}
            <div className="relative">
              <select
                value={selectedFramework}
                onChange={(e) => setSelectedFramework(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
              >
                {frameworks.map((fw) => (
                  <option key={fw.value} value={fw.value}>
                    {fw.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-sm text-gray-500">
              {filteredTokens.length} of {tokens.length} tokens
            </div>
          </div>
        </div>

        {/* Tokens List */}
        {filteredTokens.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredTokens.map((token) => (
              <div
                key={token.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{token.name}</h3>
                      <div className={`w-3 h-3 rounded-full ${getFrameworkColor(token.aipet_framework)}`}></div>
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 text-xs rounded-md ${getCategoryColor(token.category)}`}>
                        {t(`tokens.categories.${token.category}`)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {t(`tokens.frameworks.${token.aipet_framework}`)}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEditToken(token)}
                      className="p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteToken(token.id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Value</span>
                      {token.category === 'color' && (
                        <div
                          className="w-6 h-6 rounded border border-gray-300"
                          style={{ backgroundColor: token.value }}
                        ></div>
                      )}
                    </div>
                    <code className="text-sm text-gray-900 bg-gray-100 px-2 py-1 rounded">
                      {token.value}
                    </code>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-gray-700">Description</span>
                    <p className="text-sm text-gray-600 mt-1">{token.description}</p>
                  </div>

                  {token.usage_context && (
                    <div>
                      <span className="text-sm font-medium text-gray-700">Usage Context</span>
                      <p className="text-sm text-gray-600 mt-1">{token.usage_context}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
                    {token.figma_key && (
                      <div>
                        <span className="text-xs font-medium text-gray-500">Figma Key</span>
                        <code className="block text-xs text-gray-700">{token.figma_key}</code>
                      </div>
                    )}
                    {token.css_variable && (
                      <div>
                        <span className="text-xs font-medium text-gray-500">CSS Variable</span>
                        <code className="block text-xs text-gray-700">{token.css_variable}</code>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <CubeTransparentIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tokens found</h3>
            <p className="text-gray-500 mb-6">
              {tokens.length === 0 
                ? "Start building your design token library by creating your first token."
                : "No tokens match your current filters. Try adjusting your search criteria."
              }
            </p>
            {tokens.length === 0 && (
              <button
                onClick={handleCreateToken}
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Create Your First Token
              </button>
            )}
          </div>
        )}
      </div>

      {/* Token Editor Modal */}
      <TokenEditor
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        token={editingToken}
        onSave={handleSaveToken}
      />
    </div>
  );
};

export default Tokens;