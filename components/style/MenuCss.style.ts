import { createStyles } from '@mantine/core';


export default createStyles ((theme) => ({
    links: {
    [theme.fn.smallerThan('sm')]: {
    display: 'none',
    width: '50dvw',
    },
  },
})
)
