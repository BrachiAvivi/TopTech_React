import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();
export default function Customer() {

    const [isLogin, setIsLogin] = React.useState(true);
    const [service, setService] = React.useState("בחר");

    const [user, setUser] = React.useState({
        gmail: "",
        password: ""
    })
    const handleSubmit = (event) => {
        event.preventDefault();

        axios.get(`https://localhost:44382/api/Customer?gmail=${user.gmail}&password=${user.password}`)
            .then(res => {
                console.log(res.data);
                if (res.ok) {
                    setIsLogin(true)
                }
            }).catch(err => console.log(err))
    };
    const sendRequest = (event) => {
        event.preventDefault();

        axios.put(`https://localhost:44382/api/Service/${service}`)
            .then(res => {
                console.log(res.data);
            }).catch(err => console.log(err))
    };

    const handleChange = (event) => {
        setService(event.target.value);
    };
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'lightskyblue' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        התחברות
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="כתובת מייל"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(e) => setUser({ ...user, gmail: e.target.value })}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="סיסמא"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            התחברות
                        </Button>
                    </Box>
                    {isLogin &&
                        <>
                            {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
                            <Box sx={{ minWidth: 200 }}>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    onChange={handleChange}
                                    value={service}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </Box>
                            <h1 align="center">לידיעתך</h1><h3 align="center">
                                החברה מתחייבת לספק שירות תוך שלושה ימי עסקים
                                החברה תיידע אותך יום לפני על הזמן המשוער של הגעת הטכנאי
                            </h3><Button
                                type="button"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={sendRequest}
                            >
                                שלח בקשה
                            </Button>
                        </>}
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}