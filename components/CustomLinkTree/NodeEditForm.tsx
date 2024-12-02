import { Box, Dialog, Text } from '@sanity/ui';
import React from 'react';
import { ArrayOfObjectsInputProps, FormInput, Path } from 'sanity';

interface Props {
  parentProps: ArrayOfObjectsInputProps;
  onClose?: () => void;
  paths?: Path;
}

export const NodeEditForm: React.FC<Props> = ({
  parentProps,
  paths,
  onClose,
}) => {
  return (
    <Dialog
      header="Edit Link"
      id="edit-link"
      animate
      width={600}
      onClose={onClose}
      zOffset={1000}
    >
      <Box padding={4}>
        {paths && (
          <Box padding={3}>
            <Box paddingBottom={3}>
              <Text>
                <label>Label</label>
              </Text>
            </Box>

            <FormInput
              {...parentProps}
              absolutePath={[...paths, 'label']}
              includeField
            />
          </Box>
        )}
        {paths && (
          <Box padding={3}>
            <Box paddingBottom={3}>
              <Text>
                <label htmlFor="url">Url</label>
              </Text>
            </Box>
            <FormInput
              {...parentProps}
              absolutePath={[...paths, 'url']}
              includeField
            />
            <FormInput
              {...parentProps}
              absolutePath={[...paths, 'isTargetBlank']}
              includeField
            />
          </Box>
        )}
        {paths && (
          <Box padding={3}>
            <Box paddingBottom={3}>
              <Text>
                <label htmlFor="sublinks">Sublinks</label>
              </Text>
            </Box>
            <FormInput
              {...parentProps}
              absolutePath={[...paths, 'sublinks']}
              includeField
            />
          </Box>
        )}
      </Box>
    </Dialog>
  );
};
