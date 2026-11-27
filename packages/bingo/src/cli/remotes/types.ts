export interface PartialRepositoryLocator {
  owner?: string;
  repository: string;
}

export type RemoteRepositoryVisibility = 'public' | 'private';
