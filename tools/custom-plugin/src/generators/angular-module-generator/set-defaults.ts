import { AngularModuleGeneratorSchema } from './schema';
import { UnitTestRunner } from '@nx/angular/generators';

const DEFAULTS: Partial<AngularModuleGeneratorSchema> = {
  fullReadme: true,
  publishable: false,
  buildable: false,
  skipFormat: false,
  addModuleSpec: false,
  skipPackageJson: false,
  routing: false,
  lazy: false,
  unitTestRunner: UnitTestRunner.Jest,
  strict: true,
  linter: 'eslint',
  setParserOptionsProject: false,
  addTailwind: false,
  skipModule: true,
  standalone: true,
  displayBlock: false,
  inlineStyle: false,
  inlineTemplate: false,
  changeDetection: 'OnPush',
  style: 'scss',
  skipTests: false,
  skipSelector: false,
  flat: true,
  spec: false,
  compilationMode: 'full',
  viewEncapsulation: 'Emulated',
  commonModule: false,
  skipTsConfig: false
};

export function setDefaults(
  schema: AngularModuleGeneratorSchema
): AngularModuleGeneratorSchema {
  return { ...DEFAULTS, ...schema };
}
