import { useForm } from '@mantine/form';
import { useRouter } from "next/router";
import { TextInput, TextInputProps, ActionIcon, Group } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';
import useStyles from '../style/MenuCss.style';
interface FormValues {
  searchr: string | string[] | undefined | null;
}
export function MenuGroup({ addressed }:{addressed?: string | string[] | undefined | null;}) {
    const { classes } = useStyles();
    const form = useForm<FormValues>({
    initialValues: {
      searchr: '',
    },
  });
  console.log('dds',addressed);
  const router = useRouter();
        form.setValues({
              searchr: router.query.address.toString(),
            })
    
return (
    <Group spacing="xs" className={classes.links} grow>
        <form onSubmit={form.onSubmit((values) => console.log(values))} >
      <TextInput
      icon={<IconSearch size="1.1rem" stroke={1.5} />}
      radius="xl"
      size="md"
      rightSection={
        <ActionIcon size={32} radius="xl" color="blue" variant="filled" type="submit" >
            <IconArrowRight size="1.1rem" stroke={1.5} />
        </ActionIcon>
      }
      placeholder="Search ENS or Address"
      rightSectionWidth={42}
      {...form.getInputProps('searchr')}
    />
            </form>
    </Group>
);
}
