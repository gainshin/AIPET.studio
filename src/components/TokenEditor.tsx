import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Token, TokenCategory, AIPETFramework } from '../entities/types';

interface TokenEditorProps {
  isOpen: boolean;
  onClose: () => void;
  token?: Token | null;
  onSave: (tokenData: Omit<Token, 'id' | 'created_date' | 'updated_date' | 'created_by'>) => Promise<void>;
}

const TokenEditor: React.FC<TokenEditorProps> = ({ isOpen, onClose, token, onSave }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    category: 'color' as TokenCategory,
    value: '',
    description: '',
    figma_key: '',
    aipet_framework: 'Traditional' as AIPETFramework,
    usage_context: '',
    css_variable: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (token) {
        setFormData({
          name: token.name,
          category: token.category,
          value: token.value,
          description: token.description,
          figma_key: token.figma_key,
          aipet_framework: token.aipet_framework,
          usage_context: token.usage_context,
          css_variable: token.css_variable
        });
      } else {
        setFormData({
          name: '',
          category: 'color',
          value: '',
          description: '',
          figma_key: '',
          aipet_framework: 'Traditional',
          usage_context: '',
          css_variable: ''
        });
      }
    }
  }, [isOpen, token]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-generate CSS variable if name changes
    if (field === 'name' && value) {
      const cssVar = `--${value.toLowerCase().replace(/\./g, '-').replace(/[^a-z0-9-]/g, '')}`;
      setFormData(prev => ({ ...prev, css_variable: cssVar }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error saving token:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const categories: { value: TokenCategory; label: string }[] = [
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

  const frameworks: { value: AIPETFramework; label: string }[] = [
    { value: 'Traditional', label: t('tokens.frameworks.Traditional') },
    { value: 'Agency', label: t('tokens.frameworks.Agency') },
    { value: 'Interaction', label: t('tokens.frameworks.Interaction') },
    { value: 'Privacy', label: t('tokens.frameworks.Privacy') },
    { value: 'Experience', label: t('tokens.frameworks.Experience') },
    { value: 'Trust', label: t('tokens.frameworks.Trust') }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {token ? 'Edit Token' : 'Create New Token'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Token Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('tokens.form.name')} *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="e.g., color.primary.500, spacing.lg"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Category and Framework */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('tokens.form.category')} *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('tokens.form.aipet_framework')}
              </label>
              <select
                value={formData.aipet_framework}
                onChange={(e) => handleInputChange('aipet_framework', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {frameworks.map((fw) => (
                  <option key={fw.value} value={fw.value}>
                    {fw.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Value */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('tokens.form.value')} *
            </label>
            <input
              type="text"
              required
              value={formData.value}
              onChange={(e) => handleInputChange('value', e.target.value)}
              placeholder="e.g., #3B82F6, 16px, 1.2rem"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            {formData.category === 'color' && formData.value && (
              <div className="mt-2 flex items-center space-x-2">
                <div
                  className="w-6 h-6 rounded border border-gray-300"
                  style={{ backgroundColor: formData.value }}
                ></div>
                <span className="text-sm text-gray-500">Color preview</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('tokens.form.description')} *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe the purpose and usage of this token"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Figma Key and CSS Variable */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('tokens.form.figma_key')}
              </label>
              <input
                type="text"
                value={formData.figma_key}
                onChange={(e) => handleInputChange('figma_key', e.target.value)}
                placeholder="figma-token-key"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('tokens.form.css_variable')}
              </label>
              <input
                type="text"
                value={formData.css_variable}
                onChange={(e) => handleInputChange('css_variable', e.target.value)}
                placeholder="--token-name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Usage Context */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('tokens.form.usage_context')}
            </label>
            <textarea
              value={formData.usage_context}
              onChange={(e) => handleInputChange('usage_context', e.target.value)}
              placeholder="Describe when and where this token should be used"
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              {t('common.cancel')}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? t('common.loading') : t('common.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TokenEditor;