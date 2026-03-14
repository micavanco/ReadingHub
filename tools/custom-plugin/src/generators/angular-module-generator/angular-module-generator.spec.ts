import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { angularModuleGeneratorGenerator } from './angular-module-generator';
import { AngularModuleGeneratorGeneratorSchema } from './schema';

describe('angular-module-generator generator', () => {
  let tree: Tree;
  const options: AngularModuleGeneratorGeneratorSchema = { name: 'test', description: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await angularModuleGeneratorGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
