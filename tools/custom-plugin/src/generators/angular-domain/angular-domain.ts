import { formatFiles, names, Tree } from '@nx/devkit';
import { libraryGenerator, UnitTestRunner } from '@nx/angular/generators';


interface DomainSchema {
  name: string;
}

export default async function angularDomainGenerator(
  tree: Tree,
  schema: DomainSchema,
) {
  const domain = names(schema.name).fileName; // e.g. "Orders" -> "orders"
  const scopeTag = `scope:${domain}`;

  // 1) Feature lib (smart / container)
  await libraryGenerator(tree, {
    name: `feature-${domain}`,
    directory: `libs/${domain}/feature-${domain}`,
    tags: `${scopeTag},type:feature`,
    standalone: true,
    changeDetection: 'OnPush',
    style: 'scss',
    strict: true,
    unitTestRunner: UnitTestRunner.Jest,
  });

  // 2) UI lib (dumb components)
  await libraryGenerator(tree, {
    name: `ui-${domain}`,
    directory: `libs/${domain}/ui-${domain}`,
    tags: `${scopeTag},type:ui`,
    standalone: true,
    changeDetection: 'OnPush',
    style: 'scss',
    strict: true,
    unitTestRunner: UnitTestRunner.Jest,
  });

  // 3) Data-access lib (services/state/api clients)
  await libraryGenerator(tree, {
    name: `data-access-${domain}`,
    directory: `libs/${domain}/data-access-${domain}`,
    tags: `${scopeTag},type:data-access`,
    unitTestRunner: UnitTestRunner.Jest,
    strict: true,
    standalone: true,
    style: 'scss',
    changeDetection: 'OnPush',
  });

  await formatFiles(tree);
}
