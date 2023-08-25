import { useForm } from '@mantine/form';
import { useEffect } from 'react';
import { TextInput, TextInputProps, ActionIcon, Group } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';
import useStyles from '../style/MenuCss.style';
interface FormValus {
  searchr: string | undefined | null;
}
export function MenuGroup({ addressed }:{addressed?: string | string[] | undefined | null;}) {
    const { classes } = useStyles();
    const form = useForm<FormValus>({
    initialValues: {
      searchr: '',
    },
  });
  const handleSearch = async(values: FormValus) => {
    if (typeof values.searchr === 'string'){
    console.log(values);
    router.push('/search/'+values.searchr)
    form.reset();
    console.log(values);
    } else{
      form.setErrors({ searchr: 'Search Input Empty'});
      form.errors;
    }
  }
  useEffect(() => {
    if (addressed) {
        form.setValues({
              searchr: addressed,
            })
    }
}, [addressed])
return (
    <Group spacing="xs" className={classes.links} grow>
        <form onSubmit={form.onSubmit(handleSearch)} >
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
