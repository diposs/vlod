import { useForm } from '@mantine/form';
import { TextInput, TextInputProps, ActionIcon, Group } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';
import useStyles from '../style/MenuCss.style';
interface FormValues {
  search: string | number | undefined | null;
}
export function MenuGroup({ address }:{address?: string;}) {
    const { classes } = useStyles();
    const form = useForm<FormValues>({
    initialValues: {
      searchr: '',
    },
  });
    //console.log( console.log("profiledid", { address }.address?.address);
    if (address!== undefined|| null){
        form.setValues({
              searchr: address,
            })
    }
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

