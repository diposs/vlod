import { useForm } from '@mantine/form';
import { IconSearch } from '@tabler/icons-react';
import { Input } from '@mantine/core';
import { useRouter } from 'next/router';
import { Searchiconright } from '../icons/searchIcon'
interface FormValus {
  search: string | undefined | null;
}
export function SearchBar() {
  const form = useForm<FormValus>({
    initialValues: {
      search: '',
    },
  });
  const router = useRouter()
  const handleSearch = async(values: FormValus) => {
    console.log(values);
    router.push('/search/'+values.search)
    form.reset();
    console.log(values);
  }

  return (
    <form onSubmit={form.onSubmit(handleSearch)}  >
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
