import {
  formatFiles,
  generateFiles, joinPathFragments,
  ProjectConfiguration,
  Tree,
  updateJson,
} from '@nx/devkit';
import { AngularModuleGeneratorSchema } from './schema';
import { setDefaults } from './set-defaults';
import { libraryGenerator } from '@nx/angular/generators';
import { promisify } from 'node:util';
import { exec } from 'node:child_process';

function extractDirectory(schema: AngularModuleGeneratorSchema) {
  const currentTags = schema.tags?.split(',') || [];
  const newTags = [
    ...currentTags,
    `directory:${schema.directory}`,
  ];

  schema.tags = newTags.join(',');
}

function upsertTags(schema: AngularModuleGeneratorSchema) {
  const currentTags = schema.tags?.split(',') || [];
  const newTags = [
    ...currentTags,
    `type:${schema.type}`,
    `scope:${schema.scope}`,
  ];

  schema.tags = newTags.join(',');
}

function processConfiguration(tree: Tree, { directory }: AngularModuleGeneratorSchema) {
  updateJson(
    tree,
    `${directory}/project.json`,
    (configuration: ProjectConfiguration) => {
      const libraryTargets = configuration.targets;

      libraryTargets.stylelint = { command: `stylelint ${directory}/src/**/*.{scss,css} --aei` };

      return configuration;
    },
  );
}

function generateRegularFiles(tree: Tree, { directory, ...rest }: AngularModuleGeneratorSchema) {
  generateFiles(
    tree,
    joinPathFragments(__dirname, '../../files/regular'),
    directory,
    { name: rest.name, fullReadme: rest.fullReadme },
  )
}

const LIBRARY_TYPE_TO_GROUPING_FOLDERS: Record<string, string[]> = {
  feature: ['containers', 'services'],
  ui: ['components', 'directives'],
  'data-access': ['services', 'models'],
  util: ['utils', 'constants'],
}

function generateGroupingFolders(tree: Tree, { type, directory }: AngularModuleGeneratorSchema) {
  for (const groupingFolder of LIBRARY_TYPE_TO_GROUPING_FOLDERS[type]) {
    generateFiles(
      tree,
      joinPathFragments(__dirname, '../../files/grouping-folders'),
      `${directory}/src/lib/${groupingFolder}`,
      {}
    )
  }
}

const execAsPromise = promisify(exec);

async function printAffectedProjects() {
  const { stdout } = await execAsPromise('nx show projects --affected');

  console.log(`Affected projects with:\n ${stdout}`);
}

export async function angularModuleGeneratorGenerator(
  tree: Tree,
  options: AngularModuleGeneratorSchema,
) {
  const schemaWithDefaults = setDefaults(options);

  extractDirectory(schemaWithDefaults);
  upsertTags(schemaWithDefaults);

  await libraryGenerator(tree, schemaWithDefaults);

  processConfiguration(tree, schemaWithDefaults);
  generateRegularFiles(tree, schemaWithDefaults);
  generateGroupingFolders(tree, schemaWithDefaults);

  await formatFiles(tree);

  return printAffectedProjects;
}

export default angularModuleGeneratorGenerator;
