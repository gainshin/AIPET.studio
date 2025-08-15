import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeftIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  SparklesIcon,
  HandRaisedIcon,
  LightBulbIcon,
  MicrophoneIcon,
  PaintBrushIcon,
  ArrowPathIcon,
  EyeIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';

const Theory: React.FC = () => {
  const { t } = useTranslation();

  const aipetFramework = [
    {
      key: 'agency',
      title: t('theory.framework.agency.title'),
      description: t('theory.framework.agency.description'),
      icon: UserIcon,
      color: 'purple',
      principles: [
        'User Control & Autonomy',
        'Transparent AI Decision Making',
        'Customizable AI Behavior',
        'Clear Opt-in/Opt-out Options'
      ]
    },
    {
      key: 'interaction',
      title: t('theory.framework.interaction.title'),
      description: t('theory.framework.interaction.description'),
      icon: ChatBubbleLeftRightIcon,
      color: 'cyan',
      principles: [
        'Natural Language Processing',
        'Intuitive Interface Design',
        'Multi-modal Interactions',
        'Context-aware Responses'
      ]
    },
    {
      key: 'privacy',
      title: t('theory.framework.privacy.title'),
      description: t('theory.framework.privacy.description'),
      icon: ShieldCheckIcon,
      color: 'red',
      principles: [
        'Data Protection & Encryption',
        'Transparent Data Usage',
        'Minimal Data Collection',
        'User Data Ownership'
      ]
    },
    {
      key: 'experience',
      title: t('theory.framework.experience.title'),
      description: t('theory.framework.experience.description'),
      icon: SparklesIcon,
      color: 'amber',
      principles: [
        'Personalized Experiences',
        'Seamless Integration',
        'Emotional Intelligence',
        'Continuous Learning'
      ]
    },
    {
      key: 'trust',
      title: t('theory.framework.trust.title'),
      description: t('theory.framework.trust.description'),
      icon: HandRaisedIcon,
      color: 'emerald',
      principles: [
        'Reliability & Consistency',
        'Explainable AI Decisions',
        'Error Handling & Recovery',
        'Ethical AI Practices'
      ]
    }
  ];

  const aiUxPatterns = [
    {
      title: 'Canvas Workflow',
      description: 'Visual interface for creating and manipulating AI-generated content',
      icon: PaintBrushIcon,
      examples: ['Figma AI', 'Adobe Firefly', 'Canva AI']
    },
    {
      title: 'Voice Interface',
      description: 'Natural language interaction through speech',
      icon: MicrophoneIcon,
      examples: ['Alexa', 'Google Assistant', 'Siri']
    },
    {
      title: 'Generative Interface',
      description: 'UI that generates content based on user input',
      icon: LightBulbIcon,
      examples: ['ChatGPT', 'Midjourney', 'GitHub Copilot']
    },
    {
      title: 'Iterative Prompting',
      description: 'Progressive refinement of AI output through dialogue',
      icon: ArrowPathIcon,
      examples: ['Claude', 'GPT Chat', 'Perplexity']
    },
    {
      title: 'Contextual UI',
      description: 'Interface that adapts based on user context and behavior',
      icon: EyeIcon,
      examples: ['Notion AI', 'Grammarly', 'Spotify DJ']
    },
    {
      title: 'AI Assistant',
      description: 'Persistent helper that provides guidance and automation',
      icon: UserIcon,
      examples: ['GitHub Copilot', 'Microsoft Clippy 2.0', 'Notion AI']
    },
    {
      title: 'Multi-Agent Workflow',
      description: 'Multiple AI agents working together on complex tasks',
      icon: UserGroupIcon,
      examples: ['AutoGPT', 'LangChain Agents', 'CrewAI']
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              {t('common.back')}
            </Link>
          </div>
          <div className="mt-4">
            <h1 className="text-3xl font-bold text-gray-900">{t('theory.title')}</h1>
            <p className="text-gray-600 mt-2">{t('theory.subtitle')}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* AIPET Framework */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">The AIPET Framework</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              AIPET is a comprehensive framework for designing AI user experiences that prioritize
              user agency, natural interaction, privacy protection, meaningful experiences, and trust building.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {aipetFramework.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.key}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-12 h-12 bg-${pillar.color}-100 rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 text-${pillar.color}-600`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{pillar.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{pillar.description}</p>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Key Principles:</h4>
                    <ul className="space-y-2">
                      {pillar.principles.map((principle, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <div className={`w-2 h-2 bg-${pillar.color}-500 rounded-full mr-3`}></div>
                          {principle}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Design Tokens Evolution */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-purple-50 to-cyan-50 rounded-xl p-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('theory.design_tokens_evolution')}</h2>
              <div className="prose max-w-none text-gray-600">
                <p className="mb-4">
                  In the AI era, Design Tokens have evolved beyond traditional visual properties to encompass
                  behavioral and experiential aspects of AI interactions. Modern design systems now include:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-white rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Traditional Tokens</h3>
                    <ul className="text-sm space-y-1">
                      <li>• Colors & Typography</li>
                      <li>• Spacing & Layout</li>
                      <li>• Shadows & Borders</li>
                      <li>• Animation Properties</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">AI-Enhanced Tokens</h3>
                    <ul className="text-sm space-y-1">
                      <li>• AI Response Timing</li>
                      <li>• Confidence Indicators</li>
                      <li>• Interaction Patterns</li>
                      <li>• Trust Signals</li>
                    </ul>
                  </div>
                </div>
                
                <p className="mt-6">
                  This evolution ensures consistent AI experiences across different touchpoints while
                  maintaining the core principles of the AIPET framework.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* AI UX Design Patterns */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('theory.ai_ux_patterns')}</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Common interaction patterns that have emerged in AI product design, each addressing
              specific user needs and use cases in the AI experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiUxPatterns.map((pattern, index) => {
              const Icon = pattern.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-cyan-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{pattern.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{pattern.description}</p>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Examples:</h4>
                    <div className="flex flex-wrap gap-2">
                      {pattern.examples.map((example, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-12">
          <div className="bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl p-8 text-white text-center">
            <WrenchScrewdriverIcon className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Ready to Apply What You've Learned?</h2>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Now that you understand the AIPET framework, start practicing with hands-on exercises
              to create your own AI-enhanced design tokens.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/exercises"
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Start Exercises
              </Link>
              <Link
                to="/tokens"
                className="bg-purple-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-800 transition-colors"
              >
                Manage Tokens
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Theory;