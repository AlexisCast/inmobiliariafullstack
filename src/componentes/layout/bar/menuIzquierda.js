import React from "react";
import { List,Link, ListItem,ListItemText, Divider } from "@material-ui/core";


export const MenuIzquierda=({classes})=>(
    <div className={classes.list}>
        <List>
            <ListItem component={Link} button to=''>
                <i className='material-icons'>account_box</i>
                <ListItemText classes={{primary: classes.ListItemText}} primary='Perfil'/>
            </ListItem>
            <Divider/>
            <ListItem component={Link} botton to="">
                <i className='material-icons'>add_box</i>
                <ListItemText classes={{primary:classes.ListItemText}} primary='Nuevo Inmueble'/>
            </ListItem>  
            <ListItem component={Link} botton to="">
                <i className='material-icons'>business</i>
                <ListItemText classes={{primary:classes.ListItemText}} primary='Inmuebles'/>
            </ListItem>  
            <ListItem component={Link} botton to="">
                <i className='material-icons'>mail_outline</i>
                <ListItemText classes={{primary:classes.ListItemText}} primary='Mensajes'/>
            </ListItem>  
        </List>
    </div>
)