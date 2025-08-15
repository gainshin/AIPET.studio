import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ArrowLeftIcon,
  AcademicCapIcon,
  ClockIcon,
  PlayIcon,
  CheckCircleIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';
import { ExerciseEntity, Exercise, ExerciseLevel, ExerciseCategory } from '../entities';

const Exercises: React.FC = () => {
  const { t } = useTranslation();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadExercises();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [exercises, selectedLevel, selectedCategory]);

  const loadExercises = async () => {
    try {
      // Create sample exercises if none exist
      const existingExercises = await ExerciseEntity.list();
      if (existingExercises.length === 0) {
        await createSampleExercises();
      }
      const exerciseList = await ExerciseEntity.list('level');
      setExercises(exerciseList);
    } catch (error) {
      console.error('Error loading exercises:', error);
    } finally {
      setLoading(false);
    }
  };

  const createSampleExercises = async () => {
    const sampleExercises = [
      {
        title: 'Creating Your First Color Token',
        level: 'beginner' as ExerciseLevel,
        category: 'foundation' as ExerciseCategory,
        description: 'Learn the basics of design tokens by creating a primary color token for your design system.',
        instructions: 'In this exercise, you\'ll create a primary color token that can be used across your design system. Start by defining the color value, naming convention, and usage guidelines.',
        expected_tokens: ['color.primary.500', 'color.primary.400', 'color.primary.600'],
        figma_template_url: 'https://figma.com/template/color-tokens',
        learning_objectives: ['Understand token naming conventions', 'Learn color token structure', 'Apply semantic naming principles']
      },
      {
        title: 'Building a Typography Scale',
        level: 'intermediate' as ExerciseLevel,
        category: 'foundation' as ExerciseCategory,
        description: 'Create a complete typography scale using design tokens that includes font sizes, line heights, and weights.',
        instructions: 'Build a modular typography system using mathematical ratios. Define tokens for headings, body text, and supporting text sizes.',
        expected_tokens: ['typography.heading.xl', 'typography.heading.lg', 'typography.body.md', 'typography.caption.sm'],
        figma_template_url: 'https://figma.com/template/typography-tokens',
        learning_objectives: ['Understand type scales', 'Learn responsive typography', 'Master hierarchical naming']
      },
      {
        title: 'AI Agency Design Tokens',
        level: 'advanced' as ExerciseLevel,
        category: 'aipet_framework' as ExerciseCategory,
        description: 'Create design tokens that support user agency in AI interactions, including control states and feedback mechanisms.',
        instructions: 'Design tokens that enhance user control in AI systems. Focus on states like AI-processing, user-override-available, and confidence-levels.',
        expected_tokens: ['ai.agency.control-available', 'ai.agency.override-active', 'ai.agency.user-preference'],
        figma_template_url: 'https://figma.com/template/ai-agency-tokens',
        learning_objectives: ['Apply AIPET principles', 'Design for AI transparency', 'Create behavioral tokens']
      },
      {
        title: 'Trust Signals in AI UX',
        level: 'advanced' as ExerciseLevel,
        category: 'aipet_framework' as ExerciseCategory,
        description: 'Develop design tokens that communicate AI reliability, confidence levels, and trustworthiness to users.',
        instructions: 'Create visual and behavioral tokens that help users understand AI confidence, sources, and limitations.',
        expected_tokens: ['ai.trust.confidence-high', 'ai.trust.source-verified', 'ai.trust.uncertainty-indicator'],
        figma_template_url: 'https://figma.com/template/ai-trust-tokens',
        learning_objectives: ['Design trust indicators', 'Communicate AI limitations', 'Build transparent systems']
      },
      {
        title: 'Component Pattern Library',
        level: 'intermediate' as ExerciseLevel,
        category: 'pattern_library' as ExerciseCategory,
        description: 'Build design tokens for common AI UX patterns like conversational interfaces and progressive disclosure.',
        instructions: 'Create tokens that support AI interaction patterns including chat bubbles, typing indicators, and response confidence.',
        expected_tokens: ['pattern.chat.bubble', 'pattern.typing-indicator', 'pattern.confidence-bar'],
        figma_template_url: 'https://figma.com/template/ai-patterns',
        learning_objectives: ['Design conversation UI', 'Apply progressive disclosure', 'Create reusable patterns']
      },
      {
        title: 'Design System Workflow',
        level: 'expert' as ExerciseLevel,
        category: 'workflow' as ExerciseCategory,
        description: 'Establish a complete workflow for managing AI-enhanced design tokens from creation to implementation.',
        instructions: 'Create a comprehensive workflow that includes token creation, validation, documentation, and distribution processes.',
        expected_tokens: ['workflow.approval-state', 'workflow.version-control', 'workflow.sync-status'],
        figma_template_url: 'https://figma.com/template/workflow-tokens',
        learning_objectives: ['Manage token lifecycle', 'Establish governance', 'Automate workflows']
      }
    ];

    for (const exercise of sampleExercises) {
      await ExerciseEntity.create(exercise);
    }
  };

  const applyFilters = () => {
    let filtered = exercises;

    if (selectedLevel !== 'all') {
      filtered = filtered.filter(exercise => exercise.level === selectedLevel);
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(exercise => exercise.category === selectedCategory);
    }

    setFilteredExercises(filtered);
  };

  const getLevelColor = (level: ExerciseLevel) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-orange-100 text-orange-800'
    };
    return colors[level];
  };

  const getLevelIcon = (level: ExerciseLevel) => {
    const icons = {
      beginner: '🟢',
      intermediate: '🟡',
      advanced: '🟠'
    };
    return icons[level];
  };

  const getEstimatedTime = (level: ExerciseLevel) => {
    const times = {
      beginner: '15-30 min',
      intermediate: '45-60 min',
      advanced: '1-2 hours'
    };
    return times[level];
  };

  const levels = [
    { value: 'all', label: t('common.all') },
    { value: 'beginner', label: t('exercises.levels.beginner') },
    { value: 'intermediate', label: t('exercises.levels.intermediate') },
    { value: 'advanced', label: t('exercises.levels.advanced') }
  ];

  const categories = [
    { value: 'all', label: t('common.all') },
    { value: 'foundation', label: t('exercises.categories.foundation') },
    { value: 'aipet_framework', label: t('exercises.categories.aipet_framework') },
    { value: 'pattern_library', label: t('exercises.categories.pattern_library') },
    { value: 'workflow', label: t('exercises.categories.workflow') }
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
            <h1 className="text-3xl font-bold text-gray-900">{t('exercises.title')}</h1>
            <p className="text-gray-600 mt-2">{t('exercises.subtitle')}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <FunnelIcon className="w-5 h-5 text-gray-400 sm:order-first" />
            
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('exercises.difficulty')}
                </label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {levels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('exercises.category')}
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="text-sm text-gray-500">
              {filteredExercises.length} exercises available
            </div>
          </div>
        </div>

        {/* Exercises Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredExercises.map((exercise) => (
            <div
              key={exercise.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {exercise.title}
                  </h3>
                  <div className="flex items-center space-x-3 mb-3">
                    <span className={`px-2 py-1 text-xs font-medium rounded-md ${getLevelColor(exercise.level)}`}>
                      {getLevelIcon(exercise.level)} {t(`exercises.levels.${exercise.level}`)}
                    </span>
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-md">
                      {t(`exercises.categories.${exercise.category}`)}
                    </span>
                  </div>
                </div>
                <AcademicCapIcon className="w-8 h-8 text-primary-500 flex-shrink-0" />
              </div>

              {/* Content */}
              <p className="text-gray-600 mb-4 line-clamp-3">
                {exercise.description}
              </p>

              {/* Expected Tokens */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Expected Tokens:</h4>
                <div className="flex flex-wrap gap-1">
                  {exercise.expected_tokens.slice(0, 3).map((token, idx) => (
                    <code key={idx} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                      {token}
                    </code>
                  ))}
                  {exercise.expected_tokens.length > 3 && (
                    <span className="px-2 py-1 text-xs text-gray-500">
                      +{exercise.expected_tokens.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Learning Objectives */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Learning Objectives:</h4>
                <ul className="space-y-1">
                  {exercise.learning_objectives.slice(0, 2).map((objective, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-600">
                      <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      {objective}
                    </li>
                  ))}
                  {exercise.learning_objectives.length > 2 && (
                    <li className="text-sm text-gray-500">
                      +{exercise.learning_objectives.length - 2} more objectives
                    </li>
                  )}
                </ul>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center text-sm text-gray-500">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  {getEstimatedTime(exercise.level)}
                </div>
                <button
                  className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  onClick={() => {
                    // In a real app, this would open the exercise runner
                    alert('Exercise runner would open here. This is a demo implementation.');
                  }}
                >
                  <PlayIcon className="w-4 h-4 mr-2" />
                  Start Exercise
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredExercises.length === 0 && (
          <div className="text-center py-12">
            <AcademicCapIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No exercises found</h3>
            <p className="text-gray-500">
              No exercises match your current filters. Try adjusting your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Exercises;