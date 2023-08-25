import { useForm } from '@mantine/form';
import { useEffect } from 'react';
import { TextInput, TextInputProps, ActionIcon, Group } from '@mantine/core';
import { useRouter } from 'next/router';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';
import useStyles from '../style/MenuCss.style';
interface FormValus {
  searchr: string | null ;
}
export function MenuGroup() {
    const { classes } = useStyles();
    const form = useForm<FormValus>({
    initialValues: {
      searchr: null,
    },
  });
  const router = useRouter()
  const handleSearch = async(values: FormValus) => {
    if (typeof values.searchr === 'string'){
    console.log(values);
    router.push('/search/'+values.searchr)
    } else{
      form.setErrors({ searchr: 'Search Input Empty'});
      form.errors;
    }
  }
  useEffect(() => {
    if (typeof router.query.address === 'string') {
        form.setValues({
              searchr: router.query.address,
            })
    }
}, [router.query.address])
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
      placeholder="Search NFT By ENS OR Wallet Address"
      rightSectionWidth={42}
      {...form.getInputProps('searchr')}
    />
            </form>
    </Group>
);
}
