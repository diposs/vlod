import { useForm } from '@mantine/form';
import { IconSearch } from '@tabler/icons-react';
import { Input } from '@mantine/core';
import { Searchiconright } from '../icons/searchIcon'
interface FormValues {
  search: string | number | undefined | null;
}
export function SearchBar() {
  const form = useForm<FormValues>({
    initialValues: {
      search: '',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))} >
    <Input
      icon={< IconSearch size="2.125rem" />}
      rightSection={< Searchiconright type="submit" /> }
      miw="60dvw"
      data-autofocus
      placeholder="Search"
      variant="filled"
      radius="xl"
      size="xl"
      {...form.getInputProps('search')}
    />
    </form>
  );
}
