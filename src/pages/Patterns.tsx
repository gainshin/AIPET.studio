import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeftIcon,
  Squares2X2Icon,
  MicrophoneIcon,
  PaintBrushIcon,
  ArrowPathIcon,
  EyeIcon,
  UserIcon,
  UserGroupIcon,
  InformationCircleIcon,
  CubeTransparentIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';
import { DesignPatternEntity, DesignPattern, PatternType, AIPETFramework } from '../entities';

const Patterns: React.FC = () => {
  const { t } = useTranslation();
  const [patterns, setPatterns] = useState<DesignPattern[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPattern, setSelectedPattern] = useState<DesignPattern | null>(null);

  useEffect(() => {
    loadDesignPatterns();
  }, []);

  const loadDesignPatterns = async () => {
    try {
      // Create sample patterns if none exist
      const existingPatterns = await DesignPatternEntity.list();
      if (existingPatterns.length === 0) {
        await createSamplePatterns();
      }
      const patternList = await DesignPatternEntity.list('name');
      setPatterns(patternList);
    } catch (error) {
      console.error('Error loading design patterns:', error);
    } finally {
      setLoading(false);
    }
  };

  const createSamplePatterns = async () => {
    const samplePatterns = [
      {
        name: 'Canvas Workflow',
        pattern_type: 'canvas_workflow' as PatternType,
        description: 'Visual interface for creating and manipulating AI-generated content through direct manipulation and spatial organization.',
        when_to_use: 'Best for creative applications where users need to iterate on AI-generated content, organize multiple outputs, or combine AI assistance with manual editing.',
        aipet_focus: 'Agency' as AIPETFramework,
        design_considerations: [
          'Provide clear visual distinction between AI-generated and user-created content',
          'Enable easy comparison between multiple AI variations',
          'Support undo/redo for both AI operations and manual edits',
          'Show AI processing states clearly without blocking the workflow',
          'Allow users to guide AI generation through visual constraints'
        ],
        token_examples: [
          'canvas.ai-generated-indicator',
          'canvas.selection-tool',
          'canvas.generation-progress',
          'canvas.variation-container',
          'canvas.user-constraint-guide'
        ],
        implementation_guide: 'Start with a clear canvas metaphor where users can place, move, and edit elements. Implement visual feedback for AI operations including loading states, confidence indicators, and generation progress. Provide tools for constraining AI generation (masks, guides, style references) and ensure all AI operations are undoable.',
        case_studies: ['Figma AI', 'Adobe Firefly Canvas', 'Canva Magic Design']
      },
      {
        name: 'Voice Interface',
        pattern_type: 'voice_interface' as PatternType,
        description: 'Natural language interaction through speech, enabling hands-free AI communication with contextual awareness.',
        when_to_use: 'Ideal for accessibility needs, hands-busy scenarios, or when natural conversation is more efficient than visual interface manipulation.',
        aipet_focus: 'Interaction' as AIPETFramework,
        design_considerations: [
          'Design for varying speech clarity and accents',
          'Provide visual feedback for speech recognition accuracy',
          'Handle interruptions and corrections gracefully',
          'Support both voice and visual confirmation for critical actions',
          'Design for noise environments and privacy concerns'
        ],
        token_examples: [
          'voice.listening-indicator',
          'voice.recognition-confidence',
          'voice.processing-state',
          'voice.error-correction',
          'voice.privacy-mode'
        ],
        implementation_guide: 'Implement clear audio and visual feedback for all voice interaction states. Design conversation flows that handle ambiguity and provide clarification prompts. Include fallback options for when voice recognition fails and ensure privacy controls for voice data.',
        case_studies: ['Amazon Alexa Skills', 'Google Assistant Actions', 'Apple Siri Shortcuts']
      },
      {
        name: 'Generative Interface',
        pattern_type: 'generative_interface' as PatternType,
        description: 'UI that generates content based on user input, providing immediate results with options for refinement and iteration.',
        when_to_use: 'Perfect for content creation tasks where users want to quickly generate multiple options and refine through iteration rather than starting from scratch.',
        aipet_focus: 'Experience' as AIPETFramework,
        design_considerations: [
          'Show generation progress and estimated completion times',
          'Present multiple variations simultaneously for comparison',
          'Enable quick iteration cycles with minimal friction',
          'Provide clear controls for refining generation parameters',
          'Handle generation failures gracefully with helpful alternatives'
        ],
        token_examples: [
          'generation.progress-bar',
          'generation.variation-grid',
          'generation.parameter-slider',
          'generation.retry-button',
          'generation.quality-indicator'
        ],
        implementation_guide: 'Design for rapid iteration with clear progress feedback. Implement parameter controls that are intuitive and provide real-time previews when possible. Create graceful error handling for failed generations and provide users with actionable next steps.',
        case_studies: ['ChatGPT Interface', 'Midjourney Discord Bot', 'GitHub Copilot Completions']
      },
      {
        name: 'Iterative Prompting',
        pattern_type: 'iterative_prompting' as PatternType,
        description: 'Progressive refinement of AI output through conversational dialogue, allowing users to guide AI toward desired results.',
        when_to_use: 'Best for complex tasks where the desired outcome is difficult to specify upfront, or when users need to explore possibilities through dialogue.',
        aipet_focus: 'Agency' as AIPETFramework,
        design_considerations: [
          'Maintain clear conversation history with branching options',
          'Show how each prompt iteration affects the output',
          'Provide suggested follow-up prompts based on context',
          'Enable users to backtrack to previous iterations',
          'Display AI reasoning and interpretation of prompts'
        ],
        token_examples: [
          'chat.message-bubble',
          'chat.iteration-branch',
          'chat.suggestion-chip',
          'chat.context-indicator',
          'chat.backtrack-control'
        ],
        implementation_guide: 'Create a conversational interface that preserves context and enables branching conversations. Implement smart suggestions for follow-up prompts and provide clear visual hierarchy for conversation threads. Include version control for iterations.',
        case_studies: ['Claude Conversations', 'GPT-4 Chat Interface', 'Perplexity AI Search']
      },
      {
        name: 'Contextual UI',
        pattern_type: 'contextual_ui' as PatternType,
        description: 'Interface that adapts based on user context, behavior patterns, and environmental factors to provide relevant AI assistance.',
        when_to_use: 'Suitable for applications where context significantly impacts user needs, or when reducing cognitive load through adaptive assistance is valuable.',
        aipet_focus: 'Experience' as AIPETFramework,
        design_considerations: [
          'Clearly communicate when and why the interface is adapting',
          'Provide controls for users to override contextual adaptations',
          'Respect user privacy when gathering contextual information',
          'Ensure adaptations enhance rather than disrupt user workflow',
          'Design fallbacks for when contextual data is unavailable'
        ],
        token_examples: [
          'context.adaptation-indicator',
          'context.override-control',
          'context.privacy-status',
          'context.suggestion-relevance',
          'context.manual-fallback'
        ],
        implementation_guide: 'Implement context detection that respects privacy while providing useful adaptations. Create clear visual indicators for when context is being used and provide easy override mechanisms. Ensure the system degrades gracefully without context.',
        case_studies: ['Notion AI Context', 'Grammarly Tone Detection', 'Spotify Daily Mix']
      },
      {
        name: 'AI Assistant',
        pattern_type: 'ai_assistant' as PatternType,
        description: 'Persistent helper that provides ongoing guidance, automation, and support throughout user workflows.',
        when_to_use: 'Ideal for complex applications where users benefit from ongoing assistance, task automation, or learning support.',
        aipet_focus: 'Trust' as AIPETFramework,
        design_considerations: [
          'Balance helpfulness with user autonomy and control',
          'Provide clear ways to customize or disable assistant behavior',
          'Show assistant confidence levels and reasoning',
          'Handle task handoffs between AI and human seamlessly',
          'Maintain consistent personality and capabilities'
        ],
        token_examples: [
          'assistant.avatar-indicator',
          'assistant.confidence-badge',
          'assistant.task-handoff',
          'assistant.customization-panel',
          'assistant.availability-status'
        ],
        implementation_guide: 'Design a consistent assistant persona that users can trust and customize. Implement clear task delegation patterns and provide transparency about assistant capabilities and limitations. Ensure smooth handoffs when tasks exceed AI capabilities.',
        case_studies: ['GitHub Copilot', 'Microsoft Cortana', 'Notion AI Assistant']
      },
      {
        name: 'Multi-Agent Workflow',
        pattern_type: 'multi_agent_workflow' as PatternType,
        description: 'Multiple AI agents working together on complex tasks, with clear coordination and user oversight capabilities.',
        when_to_use: 'Best for complex workflows that benefit from specialized AI capabilities, or when tasks require coordination between different AI models or systems.',
        aipet_focus: 'Agency' as AIPETFramework,
        design_considerations: [
          'Provide clear visualization of agent roles and responsibilities',
          'Show inter-agent communication and coordination',
          'Enable user oversight and intervention at any workflow stage',
          'Handle agent failures and coordination breakdowns gracefully',
          'Maintain overall workflow coherence despite multiple agents'
        ],
        token_examples: [
          'workflow.agent-status',
          'workflow.coordination-line',
          'workflow.intervention-point',
          'workflow.failure-recovery',
          'workflow.overall-progress'
        ],
        implementation_guide: 'Design clear workflow visualization showing agent relationships and current states. Implement intervention points where users can redirect or override agent decisions. Create robust error handling for when agents cannot coordinate effectively.',
        case_studies: ['AutoGPT Workflow', 'LangChain Agents', 'CrewAI Multi-Agent Systems']
      }
    ];

    for (const pattern of samplePatterns) {
      await DesignPatternEntity.create(pattern);
    }
  };

  const getPatternIcon = (patternType: PatternType) => {
    const icons = {
      canvas_workflow: PaintBrushIcon,
      voice_interface: MicrophoneIcon,
      generative_interface: Squares2X2Icon,
      iterative_prompting: ArrowPathIcon,
      contextual_ui: EyeIcon,
      ai_assistant: UserIcon,
      multi_agent_workflow: UserGroupIcon
    };
    return icons[patternType] || Squares2X2Icon;
  };

  const getAIPETColor = (framework: AIPETFramework) => {
    const colors = {
      Agency: 'bg-purple-500',
      Interaction: 'bg-cyan-500',
      Privacy: 'bg-red-500',
      Experience: 'bg-amber-500',
      Trust: 'bg-emerald-500',
      Traditional: 'bg-gray-500'
    };
    return colors[framework] || 'bg-gray-500';
  };

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
          <Link
            to="/"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            {t('common.back')}
          </Link>
          <div className="flex items-center space-x-3">
            <Squares2X2Icon className="w-8 h-8 text-primary-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{t('patterns.title')}</h1>
              <p className="text-gray-600 mt-1">{t('patterns.subtitle')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Patterns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-8">
          {patterns.map((pattern) => {
            const Icon = getPatternIcon(pattern.pattern_type);
            
            return (
              <div
                key={pattern.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 cursor-pointer"
                onClick={() => setSelectedPattern(pattern)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-cyan-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{pattern.name}</h3>
                      <span className="text-sm text-gray-500">
                        {t(`patterns.types.${pattern.pattern_type}`)}
                      </span>
                    </div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${getAIPETColor(pattern.aipet_focus)}`}></div>
                </div>

                {/* Content */}
                <p className="text-gray-600 mb-4 line-clamp-3">{pattern.description}</p>

                {/* Footer */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Focus: {pattern.aipet_focus}</span>
                  <span className="text-primary-600 hover:text-primary-700 font-medium">
                    View Details →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pattern Detail Modal */}
      {selectedPattern && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-cyan-100 rounded-lg flex items-center justify-center">
                  {React.createElement(getPatternIcon(selectedPattern.pattern_type), {
                    className: "w-6 h-6 text-purple-600"
                  })}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedPattern.name}</h2>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className="text-sm text-gray-500">
                      {t(`patterns.types.${selectedPattern.pattern_type}`)}
                    </span>
                    <div className={`w-3 h-3 rounded-full ${getAIPETColor(selectedPattern.aipet_focus)}`}></div>
                    <span className="text-sm text-gray-600">AIPET Focus: {selectedPattern.aipet_focus}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedPattern(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-8">
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-600 leading-relaxed">{selectedPattern.description}</p>
              </div>

              {/* When to Use */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <InformationCircleIcon className="w-5 h-5 mr-2 text-blue-500" />
                  When to Use
                </h3>
                <p className="text-gray-600 leading-relaxed">{selectedPattern.when_to_use}</p>
              </div>

              {/* Design Considerations */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <WrenchScrewdriverIcon className="w-5 h-5 mr-2 text-amber-500" />
                  Design Considerations
                </h3>
                <ul className="space-y-3">
                  {selectedPattern.design_considerations.map((consideration, idx) => (
                    <li key={idx} className="flex items-start text-gray-600">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                      {consideration}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Token Examples */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <CubeTransparentIcon className="w-5 h-5 mr-2 text-blue-500" />
                  Example Design Tokens
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPattern.token_examples.map((token, idx) => (
                    <code key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md">
                      {token}
                    </code>
                  ))}
                </div>
              </div>

              {/* Implementation Guide */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <WrenchScrewdriverIcon className="w-5 h-5 mr-2 text-green-500" />
                  Implementation Guide
                </h3>
                <p className="text-gray-600 leading-relaxed">{selectedPattern.implementation_guide}</p>
              </div>

              {/* Case Studies */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Related Case Studies</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPattern.case_studies.map((caseStudy, idx) => (
                    <span key={idx} className="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-md">
                      {caseStudy}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Patterns;