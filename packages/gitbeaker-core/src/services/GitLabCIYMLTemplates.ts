import { BaseServiceOptions } from '@gitbeaker/requester-utils';
import { ResourceTemplates } from '../templates';

export class GitLabCIYMLTemplates<C extends boolean = false> extends ResourceTemplates<C> {
  constructor(options: BaseServiceOptions<C>) {
    /* istanbul ignore next */
    super('gitlab_ci_ymls', options);
  }
}
