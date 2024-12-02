import { NodeApi } from 'react-arborist';
import { Path } from 'sanity';
import { TreeNode } from './TreeNodeComponent';
// import { Link, Maybe } from '~/gql/types.generated';
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type Link = {
  __typename?: 'Link';
  _key?: Maybe<Scalars['String']['output']>;
  _type?: Maybe<Scalars['String']['output']>;
  isTargetBlank?: Maybe<Scalars['Boolean']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  sublinks?: Maybe<Array<Maybe<Link>>>;
  url?: Maybe<Scalars['String']['output']>;
};
export type Maybe<T> = T | null;

export const transformToSanityPath = (ids: string[]): Path => {
  const result: (string | { _key: string })[] = [];

  if (ids.length === 0) {
    return result;
  }
  result.push('links', { _key: ids[0] ?? '' });

  for (let i = 1; i < ids.length; i++) {
    result.push('sublinks', { _key: ids[i] ?? '' });
  }

  return result;
};

export const getTreeNodePath = (n: NodeApi<TreeNode>): string[] => {
  if (n.parent === null) {
    return [];
  }
  return [...getTreeNodePath(n.parent), n.id];
};

export const transformToTreeNode = (data: Maybe<Link>): TreeNode => {
  return {
    id: data?._key ?? '',
    name: data?.label ?? '',
    children: data?.sublinks?.map((node) => transformToTreeNode(node)),
    url: data?.url,
    isTargetBlank: data?.isTargetBlank ?? false,
  };
};

export const transformFromTreeNode = (data: TreeNode): Maybe<Link> => {
  return {
    _key: data.id,
    label: data.name,
    _type: 'link',
    url: data.url,
    isTargetBlank: data.isTargetBlank,
    sublinks: data?.children?.map((node) => transformFromTreeNode(node)),
  };
};
