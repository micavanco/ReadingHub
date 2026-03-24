import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import angularDomainGenerator from './angular-domain';
import { AngularDomainGeneratorSchema } from './schema';

describe('angular-domain generator', () => {
  let tree: Tree;
  const options: AngularDomainGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await angularDomainGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
