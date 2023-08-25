import { Header } from '@mantine/core';
import  useStyles  from '../style/header.style'
import { HeaderContainer } from '../container/HeaderContainer';
import {MenuGroup} from '../inputs/MenuGroup';

export function  FirstHeader() {
  const { classes } = useStyles();
  return (
<Header height="0dvh" className={classes.styles21}>
<HeaderContainer searchbar ={<MenuGroup />} />
</Header>
  );
};  
