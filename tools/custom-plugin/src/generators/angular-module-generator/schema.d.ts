import { Schema } from '@nx/angular/src/generators/library/schema';

export interface AngularModuleGeneratorSchema extends Schema {
  name: string;
  type: string;
  scope: string;
  fullReadme?: boolean;
}
