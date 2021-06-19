import React, { useState, useEffect } from 'react';
import Nav from './Nav';

import { useHistory } from 'react-router-dom';
import { Grid, Paper, TextField, Button } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

const paperStyle = {
    padding: '20px 20px',
    width: 300,
    margin: "30px auto",
};

const buttonStyle = {
    margin: "20px auto",
};

function Login() {
    const [tel, setTel] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory()

    const verification = async () => {
        let item = { tel, password };
        let result = await fetch("http://120.114.142.24:8000/api/login", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(item),
        });
        result = await result.json();
        // console.log(result)
        result.error ? console.log("NO MATCH") : local();
        function local() {
            localStorage.setItem('user-info', JSON.stringify(result))
            history.push("/shop")
        };
    }

    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            history.push("/shop")
        }
    }, [])

    return (
        <>
            <Nav />
            <Grid>
                <Paper elevation={20} style={paperStyle}>
                    <Grid>
                        <PersonIcon />
                    </Grid>
                    <h2>Login</h2>
                    <form>
                        <TextField value={tel} onChange={(e) => setTel(e.target.value)} fullWidth label='Tel' placeholder="Enter your cell phone" />
                        <TextField value={password} onChange={(e) => setPassword(e.target.value)} fullWidth label='Password' type="password" placeholder="Enter your password" />
                        <Button onClick={verification} style={buttonStyle} variant="contained" color="primary">Login</Button>
                    </form>
                </Paper>
            </Grid>
        </>
    );
}

export default Login;