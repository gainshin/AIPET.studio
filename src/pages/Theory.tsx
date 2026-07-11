import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  UserIcon,
  LightBulbIcon,
  MicrophoneIcon,
  PaintBrushIcon,
  ArrowPathIcon,
  EyeIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const Theory: React.FC = () => {
  const { t } = useTranslation();

  const aipetFramework = [
    {
      key: 'agency',
      letter: 'A',
      title: t('theory.framework.agency.title'),
      description: t('theory.framework.agency.description'),
      principles: [
        'User Control & Autonomy',
        'Transparent AI Decision Making',
        'Customizable AI Behavior',
        'Clear Opt-in/Opt-out Options'
      ]
    },
    {
      key: 'interaction',
      letter: 'I',
      title: t('theory.framework.interaction.title'),
      description: t('theory.framework.interaction.description'),
      principles: [
        'Natural Language Processing',
        'Intuitive Interface Design',
        'Multi-modal Interactions',
        'Context-aware Responses'
      ]
    },
    {
      key: 'privacy',
      letter: 'P',
      title: t('theory.framework.privacy.title'),
      description: t('theory.framework.privacy.description'),
      principles: [
        'Data Protection & Encryption',
        'Transparent Data Usage',
        'Minimal Data Collection',
        'User Data Ownership'
      ]
    },
    {
      key: 'experience',
      letter: 'E',
      title: t('theory.framework.experience.title'),
      description: t('theory.framework.experience.description'),
      principles: [
        'Personalized Experiences',
        'Seamless Integration',
        'Emotional Intelligence',
        'Continuous Learning'
      ]
    },
    {
      key: 'trust',
      letter: 'T',
      title: t('theory.framework.trust.title'),
      description: t('theory.framework.trust.description'),
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
    <div className="min-h-screen" data-layer="page" data-name="theory" data-module="theory">
      {/* Hero */}
      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16"
        data-layer="section"
        data-name="hero"
        data-module="theory"
      >
        <p className="font-mono text-xs uppercase tracking-kicker text-faint mb-6">
          {t('theory.subtitle')}
        </p>
        <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight max-w-4xl">
          {t('theory.title')}
        </h1>

        {/* Signature: A·I·P·E·T ring monograms */}
        <div className="flex items-center gap-4 sm:gap-6 mt-14 flex-wrap">
          {aipetFramework.map((pillar) => (
            <a
              key={pillar.key}
              href={`#${pillar.key}`}
              className="group flex flex-col items-center gap-3"
              aria-label={pillar.title}
            >
              <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-accent-dim flex items-center justify-center font-display text-3xl sm:text-4xl text-ink group-hover:border-accent group-hover:text-accent transition-colors">
                {pillar.letter}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-kicker text-faint group-hover:text-muted transition-colors">
                {pillar.key}
              </span>
            </a>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* AIPET Framework */}
        <section className="mb-24" data-layer="section" data-name="framework" data-module="theory">
          <p className="font-mono text-xs uppercase tracking-kicker text-faint mb-4">
            Framework
          </p>
          <h2 className="font-display text-4xl font-normal mb-4">
            The <em>AIPET</em> framework
          </h2>
          <p className="text-muted max-w-2xl leading-relaxed mb-12">
            AIPET is a comprehensive framework for designing AI user experiences that
            prioritize user agency, natural interaction, privacy protection, meaningful
            experiences, and trust building.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {aipetFramework.map((pillar) => (
              <article
                id={pillar.key}
                key={pillar.key}
                className="bg-surface border border-line rounded-card p-7 scroll-mt-24 hover:border-line-strong transition-colors"
                data-layer="card"
                data-name={`pillar-${pillar.key}`}
                data-module="theory"
              >
                <p className="font-mono text-[11px] uppercase tracking-kicker text-accent mb-3">
                  {pillar.letter} · {pillar.key}
                </p>
                <h3 className="font-display text-3xl font-normal leading-tight">
                  {pillar.title}
                </h3>
                <p className="text-muted leading-relaxed mt-4 mb-6">{pillar.description}</p>

                <ul>
                  {pillar.principles.map((principle, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-sm text-muted py-2.5 border-b border-dotted border-line last:border-b-0"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-sage shrink-0"></span>
                      {principle}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* Design Tokens Evolution */}
        <section className="mb-24" data-layer="section" data-name="tokens-evolution" data-module="theory">
          <div className="bg-surface border border-line rounded-card p-8 sm:p-12">
            <p className="font-mono text-xs uppercase tracking-kicker text-faint mb-4">
              {t('theory.design_tokens_evolution')}
            </p>
            <h2 className="font-display text-4xl font-normal mb-6">
              Tokens learned to <em>behave</em>
            </h2>
            <p className="text-muted max-w-3xl leading-relaxed">
              In the AI era, design tokens have evolved beyond traditional visual
              properties to encompass behavioral and experiential aspects of AI
              interactions. Modern design systems now include:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
              <div className="bg-raised border border-line rounded-portrait p-6">
                <h3 className="font-mono text-[11px] uppercase tracking-kicker text-faint mb-4">
                  Traditional tokens
                </h3>
                <ul>
                  {['Colors & Typography', 'Spacing & Layout', 'Shadows & Borders', 'Animation Properties'].map((item) => (
                    <li key={item} className="text-sm text-muted py-2.5 border-b border-dotted border-line last:border-b-0">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-raised border border-line rounded-portrait p-6">
                <h3 className="font-mono text-[11px] uppercase tracking-kicker text-sage mb-4">
                  AI-enhanced tokens
                </h3>
                <ul>
                  {['AI Response Timing', 'Confidence Indicators', 'Interaction Patterns', 'Trust Signals'].map((item) => (
                    <li key={item} className="text-sm text-muted py-2.5 border-b border-dotted border-line last:border-b-0">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-muted max-w-3xl leading-relaxed mt-8">
              This evolution ensures consistent AI experiences across different
              touchpoints while maintaining the core principles of the AIPET framework.
            </p>
          </div>
        </section>

        {/* AI UX Design Patterns */}
        <section data-layer="section" data-name="patterns" data-module="theory">
          <p className="font-mono text-xs uppercase tracking-kicker text-faint mb-4">
            {t('theory.ai_ux_patterns')}
          </p>
          <h2 className="font-display text-4xl font-normal mb-4">
            Patterns the field <em>keeps reaching for</em>
          </h2>
          <p className="text-muted max-w-2xl leading-relaxed mb-12">
            Common interaction patterns that have emerged in AI product design, each
            addressing specific user needs and use cases in the AI experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiUxPatterns.map((pattern) => {
              const Icon = pattern.icon;
              return (
                <article
                  key={pattern.title}
                  className="bg-surface border border-line rounded-card p-6 hover:border-line-strong transition-colors"
                  data-layer="card"
                  data-name={`pattern-${pattern.title.toLowerCase().replace(/\s+/g, '-')}`}
                  data-module="theory"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className="w-5 h-5 text-faint" />
                    <h3 className="font-display text-2xl font-normal">{pattern.title}</h3>
                  </div>
                  <p className="text-sm text-muted leading-relaxed mb-5">{pattern.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {pattern.examples.map((example) => (
                      <span
                        key={example}
                        className="font-mono text-[11px] text-faint border border-line rounded-full px-2.5 py-1"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Theory;
