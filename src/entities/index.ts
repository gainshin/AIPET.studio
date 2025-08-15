// Entity managers using Base44 SDK
import { createEntityManager } from '../utils/base44SDK';
import { Token, Exercise, ResearchPaper, CaseStudy, DesignPattern } from './types';

// Create entity managers
export const TokenEntity = createEntityManager<Token>('Token');
export const ExerciseEntity = createEntityManager<Exercise>('Exercise');
export const ResearchPaperEntity = createEntityManager<ResearchPaper>('ResearchPaper');
export const CaseStudyEntity = createEntityManager<CaseStudy>('CaseStudy');
export const DesignPatternEntity = createEntityManager<DesignPattern>('DesignPattern');

// Re-export types for convenience
export * from './types';