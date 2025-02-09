import { BaseService, BaseServiceOptions } from '@gitbeaker/requester-utils';
import {
  BaseRequestOptions,
  PaginatedRequestOptions,
  RequestHelper,
  Sudo,
} from '../infrastructure';
import { AccessLevel } from './ResourceAccessRequests';

export interface IncludeInherited {
  includeInherited?: boolean;
}

export interface MembersSchema extends Record<string, unknown> {
  id: number;
  username: string;
  name: string;
  state: string;
  avatar_url: string;
  web_url: string;
  expires_at: string;
  access_level: AccessLevel;
  email: string;
  group_saml_identity: {
    extern_uid: string;
    provider: string;
    saml_provider_id: number;
  };
}

export class ResourceMembers<C extends boolean = false> extends BaseService<C> {
  constructor(resourceType: string, options: BaseServiceOptions<C>) {
    super({ prefixUrl: resourceType, ...options });
  }

  add(
    resourceId: string | number,
    userId: number,
    accessLevel: AccessLevel,
    options?: BaseRequestOptions,
  ) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);

    return RequestHelper.post<MembersSchema>()(this, `${rId}/members`, {
      userId: uId,
      accessLevel,
      ...options,
    });
  }

  all(
    resourceId: string | number,
    { includeInherited, ...options }: IncludeInherited & PaginatedRequestOptions = {},
  ) {
    const rId = encodeURIComponent(resourceId);
    const url = [rId, 'members'];

    if (includeInherited) url.push('all');

    return RequestHelper.get<MembersSchema[]>()(this, url.join('/'), options);
  }

  edit(
    resourceId: string | number,
    userId: number,
    accessLevel: AccessLevel,
    options?: BaseRequestOptions,
  ) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);

    return RequestHelper.put<MembersSchema>()(this, `${rId}/members/${uId}`, {
      accessLevel,
      ...options,
    });
  }

  show(
    resourceId: string | number,
    userId: number,
    { includeInherited, ...options }: IncludeInherited & Sudo = {},
  ) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);
    const url = [rId, 'members'];

    if (includeInherited) url.push('all');

    url.push(uId);

    return RequestHelper.get<MembersSchema>()(
      this,
      url.join('/'),
      options as Record<string, unknown>,
    );
  }

  remove(resourceId: string | number, userId: number, options?: Sudo) {
    const [rId, uId] = [resourceId, userId].map(encodeURIComponent);

    return RequestHelper.del()(this, `${rId}/members/${uId}`, options);
  }
}
