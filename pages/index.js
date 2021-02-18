import React from 'react';

import Head from 'next/head'
import Link from 'next/link'
import Styles from '@material-ui/core/styles'
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { borders } from '@material-ui/system';
import { createMuiTheme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { display } from '@material-ui/system';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';

import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


let theme = createMuiTheme();
theme.spacing(2);

const drawerWidth = 240;

const styles = {
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    // style rule
    foo: props => ({
        backgroundColor: props.backgroundColor,
    }),
    bar: {
        // CSS property
        color: props => props.color,
    },
    highlightColour: {
        borderColor: props => props.borderColor,
    },
    container: {
        display: 'flex',
    },
    paper: {
        margin: theme.spacing(1),
    },
    svg: {
        width: 100,
        height: 100,
    },
    polygon: {
        fill: theme.palette.common.white,
        stroke: theme.palette.divider,
        strokeWidth: 1,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    card: {
        width: 300,
    },
    rootDrawer: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));
export default function Home() {
    const props = { backgroundColor: '#707070', color: 'black', highlightColour:'#E86B00'};
    // Pass the props as the first argument of useStyles()
    const classes = useStyles(props);
    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
        setChecked((prev) => !prev);
    };
  return (
      <div>
          <Box className={`${classes.foo}`} border={5} borderColor="orange" m={3} p={2}>
        <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          {/*<Container maxWidth="sm" className={`${classes.foo}  ${classes.bar}`}>*/}
            <Container maxWidth="sm">
                <h1 align="center">
                Read{' '}
                <Link href="/posts/first-post">
                    <a>this page!</a>
                </Link>
                </h1>
          </Container>

          <Container maxWidth="lg">
            <p className="description" spacing={2}>
              Get started by editing <code>pages/index.js</code>
            </p>
              <a href="https://nextjs.org/docs" className="card">
              <h3>Documentation &rarr;</h3>
              <p>Find in-depth information about Next.js features and API.</p>
              </a>
          </Container>

      <Container maxWidth="lg">
          <a href="https://nextjs.org/learn" className="card">
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>
      </Container>


      <Container maxWidth="lg">

        <a href="https://github.com/vercel/next.js/tree/master/examples" className="card" >
          <h3>Examples &rarr;</h3>
          <p>Discover and deploy boilerplate example Next.js projects.</p>
        </a>
      </Container>

      <Container maxWidth="lg">

        <a href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          className="card">
              <h3>Deploy &rarr;</h3>
            <p> Instantly deploy your Next.js site to a public URL with Vercel.</p>
          </a>
      </Container>
            <Box border={1}>
                <p>This is the inside of a box
                </p>
            </Box>


                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <p align="center">Simulation</p>
                    </Grid>
                    <Grid item xs={6}>
                        <p align="center">Task Management</p>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="additional-actions1-content" id="additional-actions1-header">
                                <FormControlLabel
                                    aria-label="Acknowledge"
                                    onClick={(event) => event.stopPropagation()}
                                    onFocus={(event) => event.stopPropagation()}
                                    control={<Checkbox />}
                                /><Typography className={classes.heading}>Accordion 1</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,  sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
                                <Typography className={classes.heading}>Accordion 2</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion disabled>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
                                <Typography className={classes.heading}>Disabled Accordion</Typography>
                            </AccordionSummary>
                        </Accordion>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <div className={classes.container}>
                            <Fade in={checked}>
                                <Paper elevation={4} className={classes.paper}>
                                    <svg className={classes.svg}>
                                        <polygon points="0,100 50,00, 100,100" className={classes.polygon} />
                                    </svg>
                                </Paper>
                            </Fade>
                        </div>
                    </Grid>
                    <Grid item xs={6} style={{ width: 200, whiteSpace: 'nowrap'}}>
                        <Box component="div" my={2} overflow="auto" bgcolor="background.paper" display="flex"
                             flexWrap="nowrap">
                            <Box component="div" my={2} m={4}>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        Word of the Day
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        <FormControlLabel
                                            control={<Switch checked={checked} onChange={handleChange} />}
                                            label="Show"
                                        />
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        adjective
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        well meaning and kindly.
                                        <br />
                                        {'"a benevolent smile"'}
                                    </Typography>
                            </Box>
                            <Box component="div" my={2} m={4}>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        Word of the Day
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        <FormControlLabel
                                            control={<Switch checked={checked} onChange={handleChange} />}
                                            label="Show"
                                        />
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        adjective
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        well meaning and kindly.
                                        <br />
                                        {'"a benevolent smile"'}
                                    </Typography>
                            </Box>
                            <Box component="div" my={2} m={4}>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        Word of the Day
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        <FormControlLabel
                                            control={<Switch checked={checked} onChange={handleChange} />}
                                            label="Show"
                                        />
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        adjective
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        well meaning and kindly.
                                        <br />
                                        {'"a benevolent smile"'}
                                    </Typography>
                            </Box>
                            <Box component="div" my={2} m={4}>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        Word of the Day
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        <FormControlLabel
                                            control={<Switch checked={checked} onChange={handleChange} />}
                                            label="Show"
                                        />
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        adjective
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        well meaning and kindly.
                                        <br />
                                        {'"a benevolent smile"'}
                                    </Typography>
                            </Box>
                            <Box component="div" my={2} m={4}>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        Word of the Day
                                    </Typography>
                                    <Typography variant="h5" component="h2">
                                        <FormControlLabel
                                            control={<Switch checked={checked} onChange={handleChange} />}
                                            label="Show"
                                        />
                                    </Typography>
                                    <Typography className={classes.pos} color="textSecondary">
                                        adjective
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                        well meaning and kindly.
                                        <br />
                                        {'"a benevolent smile"'}
                                    </Typography>
                            </Box>
                            Overflow Auto.
                            Overflow Auto.
                            Overflow Auto.
                            Overflow Auto.

                        </Box>
                    </Grid>
                </Grid>
    </main>

      <footer>
    <Container maxWidth="sm">
        <h1 className="title" align="center">
            <Link href="/about/about">
                <a>About</a>
            </Link>
         </h1>
        </Container>
      </footer>
          </Box>
          <div className={classes.rootDrawer}>
              <CssBaseline />
              <AppBar position="fixed" className={classes.appBar}>
                  <Toolbar>
                      <Typography variant="h6" noWrap>
                          Permanent drawer
                      </Typography>
                  </Toolbar>
              </AppBar>
              <Drawer
                  className={classes.drawer}
                  variant="permanent"
                  classes={{
                      paper: classes.drawerPaper,
                  }}
                  anchor="left"
              >
                  <div className={classes.toolbar} />
                  <Divider />
                  <List>
                      {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                          <ListItem button key={text}>
                              <ListItemText primary={text} />
                          </ListItem>
                      ))}
                  </List>
                  <Divider />
                  <List>
                      {['All mail', 'Trash', 'Spam'].map((text, index) => (
                          <ListItem button key={text}>
                              <ListItemText primary={text} />
                          </ListItem>
                      ))}
                  </List>
              </Drawer>
              <main className={classes.content}>
                  <div className={classes.toolbar} />
                  <Typography paragraph>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                      ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                      facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                      gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
                      donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                      adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
                      Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
                      imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
                      arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
                      donec massa sapien faucibus et molestie ac.
                  </Typography>
                  <Typography paragraph>
                      Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
                      facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
                      tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
                      consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
                      vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
                      hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
                      tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
                      nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
                      accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
                  </Typography>
              </main>
          </div>
      </div>
  )
}
