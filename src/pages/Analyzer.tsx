import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeftIcon,
  CloudArrowUpIcon,
  DocumentTextIcon,
  SparklesIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { Integrations } from '../utils/base44SDK';

interface AnalysisResult {
  tokens: Array<{
    name: string;
    category: string;
    value: string;
    description: string;
    figma_key: string;
    aipet_framework: string;
    usage_context: string;
    css_variable: string;
  }>;
  analysis: string;
}

const Analyzer: React.FC = () => {
  const { t } = useTranslation();
  const [inputType, setInputType] = useState<'file' | 'text'>('text');
  const [textInput, setTextInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      if (uploadedFile.size > 10 * 1024 * 1024) { // 10MB limit
        setError('File size must be less than 10MB');
        return;
      }
      
      const allowedTypes = [
        'text/html',
        'text/css',
        'application/json',
        'text/plain'
      ];
      
      if (!allowedTypes.includes(uploadedFile.type) && !uploadedFile.name.endsWith('.figma')) {
        setError('Please upload HTML, CSS, JSON, or Figma export files only');
        return;
      }
      
      setFile(uploadedFile);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!textInput.trim() && !file) {
      setError('Please provide input to analyze');
      return;
    }

    setAnalyzing(true);
    setError(null);
    setResults(null);

    try {
      let content = textInput;
      
      if (file && inputType === 'file') {
        content = await file.text();
      }

      const prompt = `
        You are a design system expert specializing in AI UX and design tokens. 
        Analyze the following content and extract potential design tokens.
        
        Focus on identifying:
        1. Colors (hex, rgb, hsl values)
        2. Typography (font-size, font-weight, line-height, font-family)
        3. Spacing (margins, padding, gaps)
        4. Border radius values
        5. Box shadows
        6. AI-specific properties (opacity for loading states, animation durations, etc.)
        
        For each token you identify, consider which AIPET framework category it might belong to:
        - Agency: Colors/styles for user controls, toggles, override indicators
        - Interaction: Hover states, transitions, feedback mechanisms
        - Privacy: Visual indicators for data handling, permissions
        - Experience: Personalization elements, adaptive behaviors
        - Trust: Confidence indicators, verification badges, error states
        - Traditional: Standard design system tokens
        
        Content to analyze:
        ${content}
        
        Provide your analysis in a structured format focusing on actionable design tokens.
      `;

      const result = await Integrations.InvokeLLM({
        prompt,
        add_context_from_internet: false
      });

      setResults(result as AnalysisResult);
    } catch (err) {
      setError('Failed to analyze content. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setAnalyzing(false);
    }
  };

  const sampleContent = {
    css: `.primary-button {
  background-color: #3B82F6;
  color: #FFFFFF;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.ai-confidence-high {
  background-color: #10B981;
  opacity: 0.9;
}

.ai-loading {
  animation-duration: 1.5s;
  opacity: 0.6;
}`,
    json: `{
  "colors": {
    "primary": "#3B82F6",
    "success": "#10B981",
    "warning": "#F59E0B",
    "error": "#EF4444"
  },
  "spacing": {
    "sm": "8px",
    "md": "16px",
    "lg": "24px"
  },
  "typography": {
    "heading": {
      "fontSize": "24px",
      "fontWeight": "600",
      "lineHeight": "1.25"
    }
  }
}`
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            to="/"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            {t('common.back')}
          </Link>
          <div className="flex items-center space-x-3">
            <SparklesIcon className="w-8 h-8 text-primary-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{t('analyzer.title')}</h1>
              <p className="text-gray-600 mt-1">{t('analyzer.subtitle')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Content</h2>
              
              {/* Input Type Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
                <button
                  onClick={() => setInputType('text')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    inputType === 'text'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <DocumentTextIcon className="w-4 h-4 inline mr-2" />
                  Paste Content
                </button>
                <button
                  onClick={() => setInputType('file')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    inputType === 'file'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <CloudArrowUpIcon className="w-4 h-4 inline mr-2" />
                  Upload File
                </button>
              </div>

              {inputType === 'text' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Paste your HTML, CSS, or JSON content
                  </label>
                  <textarea
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    placeholder="Paste your HTML, CSS, or JSON content here..."
                    rows={12}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm"
                  />
                  
                  {/* Sample Content Buttons */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => setTextInput(sampleContent.css)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md transition-colors"
                    >
                      Load CSS Sample
                    </button>
                    <button
                      onClick={() => setTextInput(sampleContent.json)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md transition-colors"
                    >
                      Load JSON Sample
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Figma export or design files
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      accept=".html,.css,.json,.figma,.txt"
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <CloudArrowUpIcon className="w-12 h-12 text-gray-400 mb-4" />
                      <span className="text-sm font-medium text-gray-900">
                        Click to upload or drag and drop
                      </span>
                      <span className="text-xs text-gray-500 mt-1">
                        HTML, CSS, JSON, or Figma files (max 10MB)
                      </span>
                    </label>
                  </div>
                  
                  {file && (
                    <div className="mt-3 flex items-center space-x-2 text-sm text-gray-600">
                      <CheckCircleIcon className="w-4 h-4 text-green-500" />
                      <span>{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </div>
                  )}
                </div>
              )}

              {error && (
                <div className="mt-4 flex items-center space-x-2 text-sm text-red-600">
                  <ExclamationTriangleIcon className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}

              <button
                onClick={handleAnalyze}
                disabled={analyzing || (!textInput.trim() && !file)}
                className="w-full mt-6 flex items-center justify-center px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {analyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <SparklesIcon className="w-5 h-5 mr-2" />
                    {t('analyzer.analyze')}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">{t('analyzer.results')}</h2>
            </div>
            
            <div className="p-6">
              {!results && !analyzing && (
                <div className="text-center py-12">
                  <SparklesIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Analyze</h3>
                  <p className="text-gray-500">
                    Upload your design files or paste content to extract design tokens using AI.
                  </p>
                </div>
              )}

              {analyzing && (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Analyzing Content</h3>
                  <p className="text-gray-500">
                    AI is extracting design tokens from your content...
                  </p>
                </div>
              )}

              {results && (
                <div className="space-y-6">
                  {/* Analysis Summary */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="text-sm font-medium text-blue-900 mb-2">Analysis Summary</h3>
                    <p className="text-sm text-blue-700">{results.analysis}</p>
                  </div>

                  {/* Extracted Tokens */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Extracted Tokens ({results.tokens?.length || 0})
                    </h3>
                    
                    {results.tokens && results.tokens.length > 0 ? (
                      <div className="space-y-4">
                        {results.tokens.map((token, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-medium text-gray-900">{token.name}</h4>
                              <span className={`px-2 py-1 text-xs rounded-md ${
                                token.aipet_framework === 'Traditional'
                                  ? 'bg-gray-100 text-gray-700'
                                  : 'bg-purple-100 text-purple-700'
                              }`}>
                                {token.aipet_framework}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                              <div>
                                <span className="text-gray-500">Category:</span>
                                <span className="ml-2 font-medium">{token.category}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Value:</span>
                                <code className="ml-2 bg-gray-100 px-1 rounded">{token.value}</code>
                              </div>
                            </div>
                            
                            <p className="text-sm text-gray-600 mt-2">{token.description}</p>
                            
                            {token.usage_context && (
                              <div className="text-xs text-gray-500 mt-2">
                                <span className="font-medium">Usage:</span> {token.usage_context}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">
                        No tokens were extracted from the content. Try uploading different content or check the format.
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  {results.tokens && results.tokens.length > 0 && (
                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => {
                          // In a real app, this would add all tokens to the library
                          alert('This would add all extracted tokens to your token library.');
                        }}
                        className="flex-1 flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        <CheckCircleIcon className="w-4 h-4 mr-2" />
                        Add All to Library
                      </button>
                      <button
                        onClick={() => {
                          // Export functionality
                          const dataStr = JSON.stringify(results.tokens, null, 2);
                          const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
                          const exportFileDefaultName = 'design-tokens.json';
                          const linkElement = document.createElement('a');
                          linkElement.setAttribute('href', dataUri);
                          linkElement.setAttribute('download', exportFileDefaultName);
                          linkElement.click();
                        }}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Export JSON
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analyzer;