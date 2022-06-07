import { ProductionQuantityLimitsTwoTone } from '@mui/icons-material';
import { Divider, Drawer, Link, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import React from 'react'

interface LeftDrawerProps {
    open: boolean;
    onClose: () => void;
}

const LeftDrawer = ({open,onClose}:LeftDrawerProps) => {

  return ( 
      <Drawer open={open} onClose={onClose} anchor='left' variant='temporary'>
          <Typography variant='h5' color='primary' >MENU</Typography>
          <List>

          <Divider variant='middle'/>
              <Link href='/products' >
              <ListItem >
                  <ListItemIcon>
                      <ProductionQuantityLimitsTwoTone/>
                  </ListItemIcon>
                  <ListItemText>
                      <Typography variant='h6' color="primary">Productos</Typography>
                  </ListItemText>
              </ListItem>
                </Link>
              <Divider variant='middle'/>

          </List>
      </Drawer>
  )
}

export default LeftDrawer