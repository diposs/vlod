import { Header } from '@mantine/core';
import  useStyles  from '../style/header.style'
import { HeaderContainer } from '../container/HeaderContainer';
import {MenuGroup} from '../inputs/MenuGroup';

export function  FirstHeader({ address }:{address?: string | string[] | undefined;}) {
  const { classes } = useStyles();
  console.log('aad',{ address });
  return (
<Header height="0dvh" className={classes.styles21}>
<HeaderContainer searchbar ={<MenuGroup addressed ={{ address }?.address }/>} />
</Header>
  );
};  
