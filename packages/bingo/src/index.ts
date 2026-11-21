// CLI
export { runBingoCli } from './cli/runBingoCli.ts';
export { runTemplateCli } from './cli/runTemplateCli.ts';

// Creators
export {
  createInput,
  type InputDefinition,
  type InputDefinitionWithArgs,
  type InputDefinitionWithoutArgs,
} from './creators/createInput.ts';
export { createTemplate } from './creators/createTemplate.ts';

// Preparation
export {
  type HasOptionsAndMaybePrepare,
  prepareOptions,
  type PrepareOptionsSettings,
} from './preparation/prepareOptions.ts';

// Producers
export { produceTemplate, type ProduceTemplateSettings } from './producers/produceTemplate.ts';

// Runners
export { type ApplyCreationSettings, runCreation } from './runners/runCreation.ts';
export { runInput, type RunInputSettings } from './runners/runInput.ts';
export { runTemplate, type RunTemplateSettings } from './runners/runTemplate.ts';

// Runtime (Miscellaneous)
export { createSystemContext, type SystemContextSettings } from './contexts/createSystemContext.ts';
export { createSystemContextWithAuth } from './contexts/createSystemContextWithAuth.ts';
export { mergeCreations } from './mergers/mergeCreations.ts';
export { applyFilesToSystem } from './runners/applyFilesToSystem.ts';

// Types
export type { AboutBase } from './types/about.ts';
export type {
  CreateTemplateConfig,
  TemplateConfig,
  TemplateCreateConfigSettings,
} from './types/configs.ts';
export type { CreatedScript, CreatedScriptWithOptions, Creation } from './types/creations.ts';
export type {
  Input,
  InputContextWithArgs,
  InputContextWithoutArgs,
  InputProducerWithArgs,
  InputWithArgs,
  InputWithoutArgs,
  ProvidedInputArgs,
  TakeInput,
} from './types/inputs.ts';
export type { ProductionMode } from './types/modes.ts';
export type { LazyOptionalOption, LazyOptionalOptions, OptionsContext } from './types/options.ts';
export type { AnyOptionalShape, AnyShape, InferredObject } from './types/shapes.ts';
export type { SystemContext } from './types/system.ts';
export type {
  ContextLog,
  PromiseOrSync,
  RepositoryLocator,
  Template,
  TemplateAbout,
  TemplateContext,
  TemplateDefinition,
  TemplatePrepare,
  TemplatePrepareContext,
  TemplateProduce,
} from './types/templates.ts';
