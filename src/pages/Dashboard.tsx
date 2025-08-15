import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  BookOpenIcon,
  AcademicCapIcon,
  CubeTransparentIcon,
  ArrowRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { TokenEntity, ExerciseEntity, ResearchPaperEntity, CaseStudyEntity, Token } from '../entities';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    totalTokens: 0,
    exercisesCompleted: 0,
    researchPapers: 0,
    caseStudies: 0
  });
  const [recentTokens, setRecentTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Load statistics
        const [tokens, exercises, papers, cases] = await Promise.all([
          TokenEntity.list(),
          ExerciseEntity.list(),
          ResearchPaperEntity.list(),
          CaseStudyEntity.list()
        ]);

        setStats({
          totalTokens: tokens.length,
          exercisesCompleted: exercises.length, // In real app, track completed exercises
          researchPapers: papers.length,
          caseStudies: cases.length
        });

        // Load recent tokens
        const recent = await TokenEntity.list('-updated_date', 5);
        setRecentTokens(recent);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const quickStartSteps = [
    {
      title: 'Learn AIPET Framework',
      description: 'Understand the five pillars of AI UX design',
      link: '/theory',
      icon: BookOpenIcon,
      color: 'bg-purple-500'
    },
    {
      title: 'Start with Exercises',
      description: 'Practice creating design tokens step by step',
      link: '/exercises',
      icon: AcademicCapIcon,
      color: 'bg-cyan-500'
    },
    {
      title: 'Manage Your Tokens',
      description: 'Create and organize your design token library',
      link: '/tokens',
      icon: CubeTransparentIcon,
      color: 'bg-emerald-500'
    }
  ];

  const aipetProgress = [
    { name: 'Agency', progress: 75, color: 'bg-purple-500' },
    { name: 'Interaction', progress: 60, color: 'bg-cyan-500' },
    { name: 'Privacy', progress: 45, color: 'bg-red-500' },
    { name: 'Experience', progress: 80, color: 'bg-amber-500' },
    { name: 'Trust', progress: 55, color: 'bg-emerald-500' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-2">
                <SparklesIcon className="w-8 h-8 text-purple-500" />
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                  {t('dashboard.title')}
                </h1>
                <SparklesIcon className="w-8 h-8 text-cyan-500" />
              </div>
            </div>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('dashboard.subtitle')}
            </p>
            <p className="text-gray-500 max-w-4xl mx-auto">
              {t('dashboard.description')}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {quickStartSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Link
                key={index}
                to={step.link}
                className="group relative bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200"
              >
                <div className="flex items-center space-x-4">
                  <div className={`${step.color} rounded-lg p-3 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {step.description}
                    </p>
                  </div>
                  <ArrowRightIcon className="w-5 h-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
            <div className="text-3xl font-bold text-purple-600">{stats.totalTokens}</div>
            <div className="text-gray-600 text-sm mt-1">{t('dashboard.stats.total_tokens')}</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
            <div className="text-3xl font-bold text-cyan-600">{stats.exercisesCompleted}</div>
            <div className="text-gray-600 text-sm mt-1">{t('dashboard.stats.exercises_completed')}</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
            <div className="text-3xl font-bold text-emerald-600">{stats.researchPapers}</div>
            <div className="text-gray-600 text-sm mt-1">{t('dashboard.stats.research_papers')}</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
            <div className="text-3xl font-bold text-amber-600">{stats.caseStudies}</div>
            <div className="text-gray-600 text-sm mt-1">{t('dashboard.stats.case_studies')}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Tokens */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">{t('dashboard.recent_tokens')}</h2>
            </div>
            <div className="p-6">
              {recentTokens.length > 0 ? (
                <div className="space-y-4">
                  {recentTokens.map((token) => (
                    <div key={token.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full bg-aipet-${token.aipet_framework.toLowerCase()}`}></div>
                        <div>
                          <div className="font-medium text-gray-900">{token.name}</div>
                          <div className="text-sm text-gray-500">{token.category} • {token.value}</div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(token.updated_date).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <CubeTransparentIcon className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No tokens created yet. Start by creating your first design token!</p>
                  <Link
                    to="/tokens"
                    className="inline-flex items-center mt-3 text-primary-600 hover:text-primary-500 font-medium"
                  >
                    Create Token <ArrowRightIcon className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* AIPET Mastery Progress */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">AIPET Mastery Progress</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {aipetProgress.map((item) => (
                  <div key={item.name} className="flex items-center space-x-4">
                    <div className="w-20 text-sm font-medium text-gray-700">
                      {item.name}
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div
                          className={`${item.color} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 w-12 text-right">
                      {item.progress}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Start Guide */}
        <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">{t('dashboard.quick_start')}</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 font-bold">1</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Learn the Theory</h3>
                <p className="text-sm text-gray-500">Start with understanding the AIPET framework and its five core principles.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-cyan-600 font-bold">2</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Practice with Exercises</h3>
                <p className="text-sm text-gray-500">Complete guided exercises to create your first design tokens.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-emerald-600 font-bold">3</span>
                </div>
                <h3 className="font-medium text-gray-900 mb-2">Build Your Library</h3>
                <p className="text-sm text-gray-500">Create and manage your comprehensive design token system.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;