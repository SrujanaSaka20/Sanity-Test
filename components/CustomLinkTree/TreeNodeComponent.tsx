import {
  DocumentIcon,
  DocumentsIcon,
  DragHandleIcon,
  TrashIcon,
} from '@sanity/icons';
import { Box, Button, Card } from '@sanity/ui';
import { CSSProperties, HTMLAttributes, ReactElement } from 'react';
import { NodeApi } from 'react-arborist';

export type TreeNode = {
  id: string;
  name: string;
  children?: TreeNode[];
  url?: string | null;
  isTargetBlank?: boolean;
};

type RowRendererProps<T> = {
  node: NodeApi<T>;
  attrs: HTMLAttributes<T>;
  children: ReactElement;
  style: CSSProperties;
  dragHandle?: ((el: HTMLDivElement | null) => void) | null;
  onNameClick: (n: NodeApi<T>) => void;
  onDeleteClick?: (n: NodeApi<T>) => void;
};

export const TreeNodeComponent: React.FC<RowRendererProps<TreeNode>> = (
  props,
) => {
  const onDeleteClick = props.onDeleteClick;
  return (
    <Card style={props.style} tone="default">
      <Box
        display="flex"
        paddingRight={4}
        style={{ justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Box display="flex" padding={1}>
          <Box display="flex">
            <Box ref={props.dragHandle}>
              <Button
                fontSize={1}
                mode="bleed"
                style={{ cursor: 'ns-resize' }}
                icon={DragHandleIcon}
              ></Button>
            </Box>
            <Box>
              <Button
                mode="bleed"
                fontSize={1}
                onClick={() => props.node.toggle()}
                tone={'default'}
                style={{ pointerEvents: props.node.isLeaf ? 'none' : 'auto' }}
                icon={props.node.isLeaf ? <DocumentIcon /> : <DocumentsIcon />}
              />
            </Box>
          </Box>

          <Button
            mode="bleed"
            fontSize={1}
            padding={1}
            onClick={() => props.onNameClick(props.node)}
          >
            {props.node.data.name}
          </Button>
        </Box>
        {onDeleteClick && (
          <Button
            mode="bleed"
            fontSize={1}
            onClick={() => onDeleteClick(props.node)}
            tone={'critical'}
            icon={<TrashIcon />}
          />
        )}
      </Box>
    </Card>
  );
};
