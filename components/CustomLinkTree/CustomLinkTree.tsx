import { Box, Button, Card, TabList, Tab, TabPanel } from '@sanity/ui';
import { ArrayOfObjectsInputProps, Path, set } from 'sanity';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MoveHandler, NodeApi, Tree } from 'react-arborist';

import { TreeNode, TreeNodeComponent } from './TreeNodeComponent';
import {
  getTreeNodePath,
  transformFromTreeNode,
  transformToSanityPath,
  transformToTreeNode,
} from './utils';
import { NodeEditForm } from './NodeEditForm';
import { useDynamicTree } from './use-dynamic-tree';

export function CustomLinkTree(props: ArrayOfObjectsInputProps) {
  const [viewType, setViewType] = useState<'default' | 'tree'>('tree');
  const [open, setOpen] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [paths, setPaths] = useState<Path | undefined>(undefined);
  const onClose = useCallback(() => setOpen(false), []);
  const onOpen = useCallback(() => setOpen(true), []);

  const treeRef = useRef();

  const initialData = useMemo(
    () => props?.value?.map((node) => transformToTreeNode(node)),
    [props.value],
  );

  const { data, controllers, setData } = useDynamicTree<TreeNode>();

  useEffect(() => {
    if (initialData) {
      setData(initialData);
    }
  }, [initialData]);

  const handleSave = () => {
    const transformed = data.map((node) => transformFromTreeNode(node));
    props.onChange(set(transformed));
    setIsChanged(false);
  };

  const handleEditOpen = (n: NodeApi<TreeNode>) => {
    const treeNodePath = transformToSanityPath(getTreeNodePath(n));

    setPaths(treeNodePath);
    onOpen();
  };

  const handleMove: MoveHandler<TreeNode> = (...args) => {
    setIsChanged(true);
    controllers.onMove(...args);
  };

  return (
    <>
      <TabList space={1}>
        <Tab
          aria-controls="content-panel"
          id="content-tab"
          label="Tree View"
          onClick={() => setViewType('tree')}
          selected={viewType === 'tree'}
        />
        <Tab
          aria-controls="preview-panel"
          id="preview-tab"
          label="Default View"
          onClick={() => setViewType('default')}
          selected={viewType === 'default'}
        />
      </TabList>

      <TabPanel
        aria-labelledby="content-tab"
        hidden={viewType !== 'tree'}
        id="content-panel"
      >
        <Card shadow={1}>
          <Tree
            ref={treeRef}
            width="100%"
            height={250}
            indent={24}
            rowHeight={36}
            openByDefault={false}
            data={data}
            onMove={handleMove}
          >
            {(p) => (
              // have to use any here, types for react-arborist not checked
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              <TreeNodeComponent {...(p as any)} onNameClick={handleEditOpen} />
            )}
          </Tree>
          <Box padding={3}>
            {isChanged && (
              <Button
                onClick={handleSave}
                mode="default"
                fontSize={2}
                padding={2}
              >
                Save Order of Items
              </Button>
            )}
          </Box>
        </Card>
      </TabPanel>

      <TabPanel
        aria-labelledby="preview-tab"
        hidden={viewType !== 'default'}
        id="preview-panel"
      >
        {viewType === 'default' &&
          props.renderDefault({
            ...props,
          })}
      </TabPanel>

      {open && (
        <NodeEditForm parentProps={props} paths={paths} onClose={onClose} />
      )}
    </>
  );
}
