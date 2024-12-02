// taken from there https://github.com/brimdata/react-arborist/pull/172/files

import { useMemo, useState } from 'react';
import {
  type CreateHandler,
  type DeleteHandler,
  type MoveHandler,
  type RenameHandler,
  SimpleTree,
} from 'react-arborist';

let nextId = 0;

type Data = {
  id: string;
  name: string;
  children?: Data[];
};

export function useDynamicTree<T extends Data>() {
  const [data, setData] = useState<T[]>([]);
  const tree = useMemo(() => new SimpleTree<T>(data), [data]);

  const onMove: MoveHandler<T> = (args: {
    dragIds: string[];
    parentId: null | string;
    index: number;
  }) => {
    for (const id of args.dragIds) {
      tree.move({ id, parentId: args.parentId, index: args.index });
    }
    setData(tree.data);
  };

  const onRename: RenameHandler<T> = ({ name, id }) => {
    tree.update({ id, changes: { name } as Partial<T> });
    setData(tree.data);
  };

  const onCreate: CreateHandler<T> = ({ parentId, index, type }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = { id: `simple-tree-id-${nextId++}`, name: '' } as T;
    if (type === 'internal') data.children = [];
    tree.create({ parentId, index, data });
    setData(tree.data);
    return data;
  };

  const onDelete: DeleteHandler<T> = (args: { ids: string[] }) => {
    args.ids.forEach((id) => tree.drop({ id }));
    setData(tree.data);
  };

  const controllers = { onMove, onRename, onCreate, onDelete };

  return { data, setData, controllers } as const;
}
