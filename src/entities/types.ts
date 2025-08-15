// Entity type definitions based on the database structure

export interface BaseEntity {
  id: string;
  created_date: string;
  updated_date: string;
  created_by: string;
}

export type TokenCategory = 'color' | 'typography' | 'spacing' | 'radius' | 'shadow' | 'agency' | 'interaction' | 'privacy' | 'experience' | 'trust';

export type AIPETFramework = 'Agency' | 'Interaction' | 'Privacy' | 'Experience' | 'Trust' | 'Traditional';

export interface Token extends BaseEntity {
  name: string;
  category: TokenCategory;
  value: string;
  description: string;
  figma_key: string;
  aipet_framework: AIPETFramework;
  usage_context: string;
  css_variable: string;
}

export type ExerciseLevel = 'beginner' | 'intermediate' | 'advanced';
export type ExerciseCategory = 'foundation' | 'aipet_framework' | 'pattern_library' | 'workflow';

export interface Exercise extends BaseEntity {
  title: string;
  level: ExerciseLevel;
  category: ExerciseCategory;
  description: string;
  instructions: string;
  expected_tokens: string[];
  figma_template_url: string;
  learning_objectives: string[];
}

export type ResearchCategory = 'agentive_ux' | 'agentic_ai' | 'design_tokens' | 'hci' | 'trust_building' | 'context_engineering';
export type FrameworkRelevance = 'Agency' | 'Interaction' | 'Privacy' | 'Experience' | 'Trust' | 'Multi-Framework';

export interface ResearchPaper extends BaseEntity {
  title: string;
  authors: string[];
  journal: string;
  year: number;
  category: ResearchCategory;
  framework_relevance: FrameworkRelevance;
  abstract: string;
  key_insights: string[];
  doi: string;
  url: string;
}

export interface AIPETImplementation {
  agency: string;
  interaction: string;
  privacy: string;
  experience: string;
  trust: string;
}

export interface CaseStudyResults {
  quantitative: string[];
  qualitative: string[];
}

export type ComplexityLevel = 'basic' | 'intermediate' | 'advanced' | 'expert';

export interface CaseStudy extends BaseEntity {
  title: string;
  company: string;
  challenge: string;
  solution_approach: string;
  aipet_implementation: AIPETImplementation;
  results: CaseStudyResults;
  tokens_created: string[];
  lessons_learned: string[];
  complexity_level: ComplexityLevel;
}

export type PatternType = 'canvas_workflow' | 'voice_interface' | 'generative_interface' | 'iterative_prompting' | 'contextual_ui' | 'ai_assistant' | 'multi_agent_workflow';

export interface DesignPattern extends BaseEntity {
  name: string;
  pattern_type: PatternType;
  description: string;
  when_to_use: string;
  aipet_focus: AIPETFramework;
  design_considerations: string[];
  token_examples: string[];
  implementation_guide: string;
  case_studies: string[];
}

export interface User extends BaseEntity {
  full_name: string;
  email: string;
  role: 'admin' | 'user';
}