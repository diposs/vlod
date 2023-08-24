import { TextInput, TextInputProps, ActionIcon, Group } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';
import useStyles from '../style/MenuCss.style';

export function MenuGroup() {
    const { classes } = useStyles();
return (
    <Group spacing="xs" className={classes.links} >
      <TextInput
      icon={<IconSearch size="1.1rem" stroke={1.5} />}
      radius="xl"
      size="md"
      rightSection={
        <ActionIcon size={32} radius="xl" color="blue" variant="filled">
            <IconArrowRight size="1.1rem" stroke={1.5} />
        </ActionIcon>
      }
      placeholder="Search ENS or Address"
      rightSectionWidth={42}
    />
    </Group>
);
}

