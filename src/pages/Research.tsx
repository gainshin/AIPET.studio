import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  DocumentTextIcon,
  CalendarIcon,
  UserGroupIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/outline';
import { ResearchPaperEntity, ResearchPaper, ResearchCategory, FrameworkRelevance } from '../entities';

const Research: React.FC = () => {
  const { t } = useTranslation();
  const [papers, setPapers] = useState<ResearchPaper[]>([]);
  const [filteredPapers, setFilteredPapers] = useState<ResearchPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFramework, setSelectedFramework] = useState<string>('all');

  useEffect(() => {
    loadResearchPapers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [papers, searchTerm, selectedCategory, selectedFramework]);

  const loadResearchPapers = async () => {
    try {
      // Create sample papers if none exist
      const existingPapers = await ResearchPaperEntity.list();
      if (existingPapers.length === 0) {
        await createSamplePapers();
      }
      const paperList = await ResearchPaperEntity.list('-year');
      setPapers(paperList);
    } catch (error) {
      console.error('Error loading research papers:', error);
    } finally {
      setLoading(false);
    }
  };

  const createSamplePapers = async () => {
    const samplePapers = [
      {
        title: 'Human-Centered AI: The Need for User Agency in AI-Assisted Decision Making',
        authors: ['Sarah Chen', 'Michael Rodriguez', 'Dr. Jennifer Kim'],
        journal: 'ACM Transactions on Computer-Human Interaction',
        year: 2024,
        category: 'agentive_ux' as ResearchCategory,
        framework_relevance: 'Agency' as FrameworkRelevance,
        abstract: 'This paper explores the critical importance of maintaining user agency in AI-assisted decision-making systems. Through a series of user studies, we demonstrate how design tokens can be used to communicate levels of AI involvement and user control.',
        key_insights: [
          'Users prefer graduated control over binary AI on/off switches',
          'Visual indicators of AI confidence improve user trust',
          'Customizable AI behavior increases user satisfaction by 40%'
        ],
        doi: '10.1145/3585088.3589123',
        url: 'https://dl.acm.org/doi/10.1145/3585088.3589123'
      },
      {
        title: 'Design Tokens for Conversational AI: Establishing Visual Language for Human-AI Interaction',
        authors: ['Dr. Amanda Liu', 'Robert Johnson'],
        journal: 'Design Studies',
        year: 2024,
        category: 'design_tokens' as ResearchCategory,
        framework_relevance: 'Interaction' as FrameworkRelevance,
        abstract: 'We present a comprehensive framework for creating design tokens specifically for conversational AI interfaces. Our research identifies key visual elements that facilitate natural human-AI communication.',
        key_insights: [
          'Typing indicators reduce user anxiety by 25%',
          'Consistent visual language improves conversation flow',
          'Progressive disclosure patterns enhance comprehension'
        ],
        doi: '10.1016/j.destud.2024.101098',
        url: 'https://www.sciencedirect.com/science/article/pii/S0142694X24000987'
      },
      {
        title: 'Privacy by Design in AI Systems: A Framework for Transparent Data Handling',
        authors: ['Dr. Elena Vasquez', 'Thomas Wright', 'Dr. Raj Patel'],
        journal: 'IEEE Security & Privacy',
        year: 2023,
        category: 'trust_building' as ResearchCategory,
        framework_relevance: 'Privacy' as FrameworkRelevance,
        abstract: 'This study presents a comprehensive approach to implementing privacy-first design in AI systems, with particular focus on visual communication of data usage and user consent mechanisms.',
        key_insights: [
          'Clear data flow visualization increases user understanding by 60%',
          'Granular privacy controls improve user satisfaction',
          'Real-time privacy indicators build long-term trust'
        ],
        doi: '10.1109/MSEC.2023.3287654',
        url: 'https://ieeexplore.ieee.org/document/10234567'
      },
      {
        title: 'Measuring Trust in AI Systems: A Multi-Dimensional Approach',
        authors: ['Dr. Kevin Zhang', 'Lisa Anderson', 'Dr. Maria Santos'],
        journal: 'Journal of AI Research',
        year: 2023,
        category: 'trust_building' as ResearchCategory,
        framework_relevance: 'Trust' as FrameworkRelevance,
        abstract: 'We propose a comprehensive framework for measuring and designing for trust in AI systems, incorporating visual, behavioral, and contextual elements.',
        key_insights: [
          'Trust indicators should be context-dependent',
          'Transparency without overwhelming users is key',
          'Trust builds incrementally through consistent experiences'
        ],
        doi: '10.1613/jair.1.14567',
        url: 'https://www.jair.org/index.php/jair/article/view/14567'
      },
      {
        title: 'Context Engineering in AI UX: Designing for Situational Awareness',
        authors: ['Dr. Priya Sharma', 'Alexander Brown'],
        journal: 'International Journal of Human-Computer Studies',
        year: 2024,
        category: 'context_engineering' as ResearchCategory,
        framework_relevance: 'Experience' as FrameworkRelevance,
        abstract: 'This research examines how contextual information can be systematically integrated into AI user interfaces to improve situational awareness and decision-making effectiveness.',
        key_insights: [
          'Context-aware interfaces reduce cognitive load by 30%',
          'Progressive context revelation improves task completion',
          'Personalized context weights enhance user experience'
        ],
        doi: '10.1016/j.ijhcs.2024.103045',
        url: 'https://www.sciencedirect.com/science/article/pii/S1071581924000123'
      },
      {
        title: 'Agentic AI in Creative Industries: Balancing Automation and Human Creativity',
        authors: ['Dr. Carlos Rodriguez', 'Nina Petrov', 'Dr. James Wilson'],
        journal: 'Creativity and Cognition',
        year: 2024,
        category: 'agentic_ai' as ResearchCategory,
        framework_relevance: 'Multi-Framework' as FrameworkRelevance,
        abstract: 'This study explores the integration of agentic AI systems in creative workflows, examining how design tokens can facilitate collaborative human-AI creative processes.',
        key_insights: [
          'Co-creative interfaces require distinct interaction patterns',
          'Clear AI capability boundaries enhance collaboration',
          'Version control for AI-human iterations is crucial'
        ],
        doi: '10.1080/10400419.2024.2312345',
        url: 'https://www.tandfonline.com/doi/full/10.1080/10400419.2024.2312345'
      }
    ];

    for (const paper of samplePapers) {
      await ResearchPaperEntity.create(paper);
    }
  };

  const applyFilters = () => {
    let filtered = papers;

    if (searchTerm) {
      filtered = filtered.filter(paper =>
        paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paper.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
        paper.abstract.toLowerCase().includes(searchTerm.toLowerCase()) ||
        paper.key_insights.some(insight => insight.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(paper => paper.category === selectedCategory);
    }

    if (selectedFramework !== 'all') {
      filtered = filtered.filter(paper => paper.framework_relevance === selectedFramework);
    }

    setFilteredPapers(filtered);
  };

  const getCategoryColor = (category: ResearchCategory) => {
    const colors: Record<ResearchCategory, string> = {
      agentive_ux: 'bg-purple-100 text-purple-800',
      agentic_ai: 'bg-indigo-100 text-indigo-800',
      design_tokens: 'bg-blue-100 text-blue-800',
      hci: 'bg-green-100 text-green-800',
      trust_building: 'bg-emerald-100 text-emerald-800',
      context_engineering: 'bg-amber-100 text-amber-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getFrameworkColor = (framework: FrameworkRelevance) => {
    const colors: Record<FrameworkRelevance, string> = {
      Agency: 'bg-purple-500',
      Interaction: 'bg-cyan-500',
      Privacy: 'bg-red-500',
      Experience: 'bg-amber-500',
      Trust: 'bg-emerald-500',
      'Multi-Framework': 'bg-gradient-to-r from-purple-500 to-cyan-500'
    };
    return colors[framework] || 'bg-gray-500';
  };

  const categories = [
    { value: 'all', label: t('common.all') },
    { value: 'agentive_ux', label: t('research.categories.agentive_ux') },
    { value: 'agentic_ai', label: t('research.categories.agentic_ai') },
    { value: 'design_tokens', label: t('research.categories.design_tokens') },
    { value: 'hci', label: t('research.categories.hci') },
    { value: 'trust_building', label: t('research.categories.trust_building') },
    { value: 'context_engineering', label: t('research.categories.context_engineering') }
  ];

  const frameworks = [
    { value: 'all', label: t('common.all') },
    { value: 'Agency', label: 'Agency' },
    { value: 'Interaction', label: 'Interaction' },
    { value: 'Privacy', label: 'Privacy' },
    { value: 'Experience', label: 'Experience' },
    { value: 'Trust', label: 'Trust' },
    { value: 'Multi-Framework', label: 'Multi-Framework' }
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
            <h1 className="text-3xl font-bold text-gray-900">{t('research.title')}</h1>
            <p className="text-gray-600 mt-2">{t('research.subtitle')}</p>
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
                placeholder="Search papers, authors, or keywords..."
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
              {filteredPapers.length} of {papers.length} papers
            </div>
          </div>
        </div>

        {/* Papers List */}
        {filteredPapers.length > 0 ? (
          <div className="space-y-6">
            {filteredPapers.map((paper) => (
              <div
                key={paper.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 leading-tight">
                      {paper.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <UserGroupIcon className="w-4 h-4 mr-1" />
                        {paper.authors.join(', ')}
                      </div>
                      <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        {paper.year}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className={`px-2 py-1 text-xs rounded-md ${getCategoryColor(paper.category)}`}>
                        {t(`research.categories.${paper.category}`)}
                      </span>
                      <div className={`w-3 h-3 rounded-full ${getFrameworkColor(paper.framework_relevance)}`}></div>
                      <span className="text-sm text-gray-600">{paper.framework_relevance}</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <DocumentTextIcon className="w-8 h-8 text-primary-500" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  {/* Journal */}
                  <div className="text-sm text-gray-600 italic">
                    Published in: {paper.journal}
                  </div>

                  {/* Abstract */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Abstract</h4>
                    <p className="text-gray-600 leading-relaxed">{paper.abstract}</p>
                  </div>

                  {/* Key Insights */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Key Insights</h4>
                    <ul className="space-y-1">
                      {paper.key_insights.map((insight, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-xs text-gray-500">
                      DOI: {paper.doi}
                    </div>
                    <a
                      href={paper.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
                    >
                      Read Paper
                      <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <DocumentTextIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No papers found</h3>
            <p className="text-gray-500">
              {papers.length === 0 
                ? "Research papers are being loaded. Please check back soon."
                : "No papers match your current search criteria. Try adjusting your filters."
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Research;