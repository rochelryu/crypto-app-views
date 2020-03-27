import React from 'react';
import { Container, BottomNavigation, BottomNavigationAction, makeStyles, Grid, Paper, Card, CardContent, TextField, IconButton } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import BugReportOutlinedIcon from '@material-ui/icons/BugReportOutlined';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { coreDecode, coreEncode } from 'crypto-core'

interface Props {
  tabsIndicator: string;
}
const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FFC107 30%, #FFECB3 90%)',
    border: 0,
    fontSize: 16,
    borderRadius: 3,
    boxShadow: '0 -3px 5px 1px #ffc10770',
    color: 'white',
    padding: '0 30px',
  },
  container: {
    height: '100vh',
    paddingTop: 20,
    backgroundColor: '#EEE'
  },
  otherWidth: {
    width: '100%'
  },
  paper: {
    padding: 20,
    textAlign: 'center',
    color: '#F5F5F5',
    height: '80vh',
    marginBottom: 10
    
  },
  maxWidth: {
    width: '73%',
    marginBottom: 20,
    marginRight: 20,
  },
  minWidth: {
    width: '15%'
  },
  margin: {
    margin: 10,
  },
  center: {
    display: 'flex',
    flex: 1,
    height: '70vh',
    alignItems: 'center',
    justifyContent: 'center',
    color: "#555"
  },
  papper: {
    textDecoration: 'none',
    letterSpacing: 2,
  }
});
function App() {
  const classes = useStyles();
  const [value, setValue] = React.useState('crypter');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className={classes.container}>
      <Container fixed >
        <Container maxWidth="sm" className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
            <Container fixed >
              <ContainerItem tabsIndicator={value} />
            </Container>
            </Paper>
          </Grid>
        </Grid>
        <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
          <BottomNavigationAction label="Encription" value="crypter" icon={<LockOutlinedIcon />} />
          <BottomNavigationAction label="Decription" value="decrypter" icon={<LockOpenOutlinedIcon />} />
          <BottomNavigationAction label="Contribute" value="contribuer" icon={<BugReportOutlinedIcon />} />
        </BottomNavigation>
        </Container>
    </Container>
    </div>
  );
}

function ContainerItem(props: Props){
  const [crypter, setCrypter] = React.useState('');
  const [decrypter, setDeCrypter] = React.useState('');
  const [digest, setDigest] = React.useState(0);
  // Convert
  const [code, setCoded] = React.useState('');
  const [decoded, setDecoded] = React.useState('');

  const handleCrypter = () => {
    const newDigest = (digest.toString() === 'NaN' || digest.toString() === '0') ? 6:digest 
    const newValue = coreEncode(crypter, newDigest);
    setCoded(newValue);
  };
  const handleDecrypter = () => {
    const newDigest = (digest.toString() === 'NaN' || digest.toString() === '0') ? 6:digest 
    const newValue = coreDecode(decrypter, newDigest);
    setDecoded(newValue);
  };
  const classes = useStyles();
  switch (props.tabsIndicator) {
    case 'crypter':
      return (
        <div>
          <form noValidate autoComplete="off">
            <div>
              <TextField
                id="outline-search"
                label="String to encode" type="search"
                onChange={(e) => {setCrypter(e.target.value)}}
                variant="outlined"
                multiline rowsMax="5" className={classes.maxWidth} />
              <TextField
                  id="standard-number"
                  label="Key"
                  type="number"
                  defaultValue={0}
                  onChange={(e) => {setDigest(parseInt(e.target.value, 10))}}
                  className={classes.minWidth}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            </form>
          <IconButton aria-label="coompile" className={classes.margin} onClick={handleCrypter} >
            <ArrowDownwardIcon fontSize="large" color='primary' />
          </IconButton>
          <Card>
            <CardContent>
            <TextField
              className={classes.otherWidth}
              id="filled-read-only-input"
              label="keyword crypted"
              value={code}
              multiline rowsMax="5"
              InputProps={{
                readOnly: true,
              }}
              variant="filled"
            />
            </CardContent>
          </Card>
        </div>
      );
    case 'decrypter':
        return (
          <div>
            <form noValidate autoComplete="off">
            <div>
              <TextField
                id="outline-search"
                label="String to encode" type="search"
                onChange={(e) => {setDeCrypter(e.target.value)}}
                variant="outlined"
                multiline rowsMax="5" className={classes.maxWidth} />
              <TextField
                  id="standard-number"
                  label="Key"
                  type="number"
                  defaultValue={0}
                  onChange={(e) => {setDigest(parseInt(e.target.value, 10))}}
                  className={classes.minWidth}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            </form>
          
            <IconButton aria-label="coompile" className={classes.margin} onClick={handleDecrypter} >
              <ArrowDownwardIcon fontSize="large" color='primary' />
            </IconButton>
            <Card>
              <CardContent>
              <TextField
                className={classes.otherWidth}
                id="filled-read-only-input"
                label="keyword decrypted"
                value={decoded}
                multiline rowsMax="5"
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
              />
              </CardContent>
            </Card>
          </div>
        );
  
    default:
      return (
        <div className={classes.center}>
          <a className={classes.papper} target='_bank' href="https://github.com/rochelryu/crypto-core/issues">Contribue in issue</a>
        </div>
      );
  }
}

export default App;
