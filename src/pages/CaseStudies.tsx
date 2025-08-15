import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeftIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  LightBulbIcon,
  CubeTransparentIcon,
  AcademicCapIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import { CaseStudyEntity, CaseStudy, ComplexityLevel } from '../entities';

const CaseStudies: React.FC = () => {
  const { t } = useTranslation();
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [filteredCaseStudies, setFilteredCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedComplexity, setSelectedComplexity] = useState<string>('all');
  const [expandedCase, setExpandedCase] = useState<string | null>(null);

  useEffect(() => {
    loadCaseStudies();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [caseStudies, selectedComplexity]);

  const loadCaseStudies = async () => {
    try {
      // Create sample case studies if none exist
      const existingCases = await CaseStudyEntity.list();
      if (existingCases.length === 0) {
        await createSampleCaseStudies();
      }
      const caseList = await CaseStudyEntity.list('-updated_date');
      setCaseStudies(caseList);
    } catch (error) {
      console.error('Error loading case studies:', error);
    } finally {
      setLoading(false);
    }
  };

  const createSampleCaseStudies = async () => {
    const sampleCases = [
      {
        title: 'Netflix AI-Powered Content Recommendations',
        company: 'Netflix',
        challenge: 'Users were overwhelmed by content choices and needed better personalization while maintaining transparency about AI recommendations.',
        solution_approach: 'Implemented AIPET-based design tokens to create transparent, controllable AI recommendation system with clear user agency.',
        aipet_implementation: {
          agency: 'Users can adjust recommendation preferences, opt-out of specific AI features, and control data usage for recommendations.',
          interaction: 'Natural language explanations for "Why this was recommended" with contextual UI that adapts to viewing patterns.',
          privacy: 'Clear indicators showing which data influences recommendations, with granular privacy controls for different content types.',
          experience: 'Personalized recommendation categories that evolve with user behavior, seamless integration across devices.',
          trust: 'Confidence indicators for recommendations, transparent algorithm updates, and clear error handling for failed predictions.'
        },
        results: {
          quantitative: [
            '35% increase in content engagement',
            '28% reduction in browsing time',
            '42% improvement in user satisfaction scores',
            '15% decrease in subscription cancellations'
          ],
          qualitative: [
            'Users report feeling more in control of their viewing experience',
            'Increased trust in AI recommendations due to transparency',
            'Positive feedback on explanation features',
            'Reduced frustration with irrelevant recommendations'
          ]
        },
        tokens_created: [
          'ai.confidence.high',
          'ai.explanation.tooltip',
          'privacy.data-usage-indicator',
          'agency.opt-out-control',
          'trust.algorithm-transparency'
        ],
        lessons_learned: [
          'Users prefer graduated control over binary AI on/off switches',
          'Transparency features need to be optional to avoid overwhelming users',
          'Cultural differences significantly impact AI trust preferences',
          'Consistent visual language across AI features improves comprehension'
        ],
        complexity_level: 'advanced' as ComplexityLevel
      },
      {
        title: 'Spotify AI DJ and Personalized Playlists',
        company: 'Spotify',
        challenge: 'Creating an AI DJ experience that feels personal yet trustworthy, while giving users control over their music discovery journey.',
        solution_approach: 'Developed a comprehensive AIPET framework for AI-driven music curation with emphasis on user agency and personalized experience.',
        aipet_implementation: {
          agency: 'Users can train the AI DJ by rating recommendations, skip categories, and set mood preferences with real-time feedback.',
          interaction: 'Voice-like AI DJ persona with conversational explanations, gesture-based controls, and contextual music transitions.',
          privacy: 'Transparent listening data usage, option to exclude certain songs/artists from AI analysis, local preference storage.',
          experience: 'Adaptive interface that learns from user behavior, seamless transitions between AI and manual control, contextual recommendations.',
          trust: 'AI DJ explains song choices, shows confidence in recommendations, handles music unavailability gracefully with alternatives.'
        },
        results: {
          quantitative: [
            '67% increase in AI DJ feature usage',
            '23% more time spent listening',
            '31% improvement in playlist completion rates',
            '19% increase in music discovery'
          ],
          qualitative: [
            'Users describe AI DJ as "understanding their taste"',
            'High satisfaction with explanation features',
            'Positive sentiment around control and customization',
            'Increased willingness to explore new music genres'
          ]
        },
        tokens_created: [
          'ai.personality.dj-voice',
          'interaction.music-transition',
          'agency.preference-slider',
          'experience.mood-context',
          'trust.recommendation-confidence'
        ],
        lessons_learned: [
          'Personality in AI interactions significantly improves user engagement',
          'Music preferences are highly personal and require nuanced controls',
          'Real-time feedback loops are crucial for AI training',
          'Context-aware recommendations outperform purely algorithmic approaches'
        ],
        complexity_level: 'expert' as ComplexityLevel
      },
      {
        title: 'Figma AI-Assisted Design Tools',
        company: 'Figma',
        challenge: 'Integrating AI assistance into creative workflows without disrupting designer autonomy or compromising creative control.',
        solution_approach: 'Applied AIPET principles to create AI features that enhance rather than replace human creativity, with strong emphasis on user agency.',
        aipet_implementation: {
          agency: 'Designers can choose when and how to use AI suggestions, with complete override capabilities and version history for AI changes.',
          interaction: 'Contextual AI suggestions appear based on design patterns, with hover states showing AI confidence and reasoning.',
          privacy: 'Design files remain private by default, AI processing happens locally when possible, clear data usage policies.',
          experience: 'AI suggestions integrate seamlessly into existing workflows, learning from team design patterns and style guides.',
          trust: 'AI suggestions show reasoning, provide multiple options, and clearly indicate when assistance is active or inactive.'
        },
        results: {
          quantitative: [
            '45% faster initial wireframing',
            '32% reduction in repetitive tasks',
            '27% improvement in design consistency',
            '18% increase in iteration cycles'
          ],
          qualitative: [
            'Designers feel AI enhances rather than replaces creativity',
            'Positive feedback on contextual suggestions',
            'High trust in AI due to transparency and control',
            'Reduced cognitive load for routine design decisions'
          ]
        },
        tokens_created: [
          'ai.suggestion.contextual',
          'agency.override-control',
          'trust.confidence-indicator',
          'interaction.hover-explanation',
          'privacy.local-processing'
        ],
        lessons_learned: [
          'Creative professionals need maximum control over AI suggestions',
          'Context-aware AI performs better than generic suggestions',
          'Visual indicators of AI involvement should be subtle but clear',
          'AI features should integrate into existing muscle memory'
        ],
        complexity_level: 'advanced' as ComplexityLevel
      },
      {
        title: 'Healthcare AI Decision Support System',
        company: 'Mayo Clinic',
        challenge: 'Implementing AI diagnostic assistance that maintains physician authority while providing reliable decision support.',
        solution_approach: 'Developed AIPET-compliant AI system prioritizing trust, privacy, and physician agency in critical healthcare decisions.',
        aipet_implementation: {
          agency: 'Physicians maintain final decision authority with AI providing supporting evidence and alternative diagnoses to consider.',
          interaction: 'Clinical decision support integrates into existing EHR workflows with clear AI recommendations and reasoning.',
          privacy: 'Patient data remains secure with local AI processing, audit trails for all AI-assisted decisions, HIPAA compliance.',
          experience: 'Personalized to physician specialties and experience levels, learns from hospital protocols and best practices.',
          trust: 'AI shows confidence levels, cites medical literature, provides uncertainty ranges, and explains reasoning transparently.'
        },
        results: {
          quantitative: [
            '22% improvement in diagnostic accuracy',
            '15% faster diagnosis time',
            '31% better patient outcome predictions',
            '89% physician adoption rate'
          ],
          qualitative: [
            'High physician trust in AI recommendations',
            'Improved confidence in complex diagnoses',
            'Reduced decision fatigue for routine cases',
            'Better patient communication about treatment options'
          ]
        },
        tokens_created: [
          'trust.medical-confidence',
          'agency.physician-override',
          'privacy.hipaa-indicator',
          'interaction.clinical-workflow',
          'experience.specialty-context'
        ],
        lessons_learned: [
          'Healthcare AI requires extremely high trust and transparency standards',
          'Integration with existing workflows is critical for adoption',
          'Liability and authority must remain with human professionals',
          'Continuous learning from local protocols improves acceptance'
        ],
        complexity_level: 'expert' as ComplexityLevel
      },
      {
        title: 'Educational AI Tutoring Platform',
        company: 'Khan Academy',
        challenge: 'Creating an AI tutor that adapts to individual learning styles while maintaining educational effectiveness and student privacy.',
        solution_approach: 'Built AIPET-based AI tutoring system focusing on personalized learning experiences with strong privacy protections.',
        aipet_implementation: {
          agency: 'Students can control pacing, choose learning paths, and opt-out of data collection while maintaining personalization.',
          interaction: 'Conversational AI tutor with natural language explanations, visual problem-solving, and encouraging feedback.',
          privacy: 'Minimal data collection, local learning progress storage, transparent data usage for educational improvement.',
          experience: 'Adaptive content difficulty, personalized learning paths, integration with curriculum standards and teacher oversight.',
          trust: 'AI tutor explains concepts clearly, admits when uncertain, provides multiple learning approaches for difficult topics.'
        },
        results: {
          quantitative: [
            '43% improvement in learning outcomes',
            '35% increase in student engagement time',
            '28% better concept retention',
            '52% more completed exercises'
          ],
          qualitative: [
            'Students report feeling more confident in learning',
            'Positive feedback on personalized explanations',
            'Teachers appreciate transparency in AI tutoring methods',
            'Parents trust the educational value and privacy protections'
          ]
        },
        tokens_created: [
          'education.adaptive-difficulty',
          'agency.learning-pace-control',
          'trust.explanation-clarity',
          'privacy.student-data-protection',
          'experience.personalized-feedback'
        ],
        lessons_learned: [
          'Educational AI must balance personalization with privacy',
          'Different learning styles require diverse interaction patterns',
          'Teacher oversight and integration are essential for classroom adoption',
          'Encouraging rather than corrective feedback improves learning outcomes'
        ],
        complexity_level: 'intermediate' as ComplexityLevel
      }
    ];

    for (const caseStudy of sampleCases) {
      await CaseStudyEntity.create(caseStudy);
    }
  };

  const applyFilters = () => {
    let filtered = caseStudies;

    if (selectedComplexity !== 'all') {
      filtered = filtered.filter(caseStudy => caseStudy.complexity_level === selectedComplexity);
    }

    setFilteredCaseStudies(filtered);
  };

  const getComplexityColor = (level: ComplexityLevel) => {
    const colors = {
      basic: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-orange-100 text-orange-800',
      expert: 'bg-red-100 text-red-800'
    };
    return colors[level];
  };

  const complexityLevels = [
    { value: 'all', label: t('common.all') },
    { value: 'basic', label: t('case_studies.complexity.basic') },
    { value: 'intermediate', label: t('case_studies.complexity.intermediate') },
    { value: 'advanced', label: t('case_studies.complexity.advanced') },
    { value: 'expert', label: t('case_studies.complexity.expert') }
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
          <Link
            to="/"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            {t('common.back')}
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('case_studies.title')}</h1>
            <p className="text-gray-600 mt-2">{t('case_studies.subtitle')}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-4">
            <FunnelIcon className="w-5 h-5 text-gray-400" />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Complexity Level
              </label>
              <select
                value={selectedComplexity}
                onChange={(e) => setSelectedComplexity(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {complexityLevels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-sm text-gray-500 ml-auto">
              {filteredCaseStudies.length} case studies available
            </div>
          </div>
        </div>

        {/* Case Studies */}
        {filteredCaseStudies.length > 0 ? (
          <div className="space-y-8">
            {filteredCaseStudies.map((caseStudy) => {
              const isExpanded = expandedCase === caseStudy.id;
              
              return (
                <div
                  key={caseStudy.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
                >
                  {/* Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <BuildingOfficeIcon className="w-6 h-6 text-primary-600" />
                          <span className="text-sm font-medium text-primary-600">{caseStudy.company}</span>
                          <span className={`px-2 py-1 text-xs rounded-md ${getComplexityColor(caseStudy.complexity_level)}`}>
                            {t(`case_studies.complexity.${caseStudy.complexity_level}`)}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{caseStudy.title}</h3>
                        <p className="text-gray-600 mb-4">{caseStudy.challenge}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setExpandedCase(isExpanded ? null : caseStudy.id)}
                      className="w-full mt-4 px-4 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors"
                    >
                      {isExpanded ? 'Show Less' : 'View Full Case Study'}
                    </button>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="p-6 space-y-8">
                      {/* Solution Approach */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <LightBulbIcon className="w-5 h-5 mr-2 text-amber-500" />
                          Solution Approach
                        </h4>
                        <p className="text-gray-600">{caseStudy.solution_approach}</p>
                      </div>

                      {/* AIPET Implementation */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">AIPET Framework Implementation</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {Object.entries(caseStudy.aipet_implementation).map(([key, value]) => (
                            <div key={key} className="bg-gray-50 rounded-lg p-4">
                              <div className="flex items-center mb-2">
                                <div className={`w-3 h-3 rounded-full mr-2 bg-aipet-${key}`}></div>
                                <h5 className="font-medium text-gray-900 capitalize">{key}</h5>
                              </div>
                              <p className="text-sm text-gray-600">{value}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Results */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <ChartBarIcon className="w-5 h-5 mr-2 text-green-500" />
                          Results & Impact
                        </h4>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div>
                            <h5 className="font-medium text-gray-900 mb-3">Quantitative Results</h5>
                            <ul className="space-y-2">
                              {caseStudy.results.quantitative.map((result, idx) => (
                                <li key={idx} className="flex items-start text-sm text-gray-600">
                                  <ChartBarIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                  {result}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-900 mb-3">Qualitative Insights</h5>
                            <ul className="space-y-2">
                              {caseStudy.results.qualitative.map((result, idx) => (
                                <li key={idx} className="flex items-start text-sm text-gray-600">
                                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                                  {result}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Tokens Created */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <CubeTransparentIcon className="w-5 h-5 mr-2 text-blue-500" />
                          Design Tokens Created
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {caseStudy.tokens_created.map((token, idx) => (
                            <code key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-md">
                              {token}
                            </code>
                          ))}
                        </div>
                      </div>

                      {/* Lessons Learned */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                          <AcademicCapIcon className="w-5 h-5 mr-2 text-purple-500" />
                          Lessons Learned
                        </h4>
                        <ul className="space-y-3">
                          {caseStudy.lessons_learned.map((lesson, idx) => (
                            <li key={idx} className="flex items-start text-gray-600">
                              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                              {lesson}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <BuildingOfficeIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No case studies found</h3>
            <p className="text-gray-500">
              No case studies match your current complexity filter. Try adjusting your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseStudies;