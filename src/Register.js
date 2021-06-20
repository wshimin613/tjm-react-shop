import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import { useHistory } from 'react-router-dom';
import { Grid, Paper, TextField, Button } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const paperStyle = {
    padding: '20px 20px',
    width: 300,
    margin: "30px auto",
};
const buttonStyle = {
    margin: "20px auto",
};

function Register() {
    const [name, setName] = useState("")
    const [tel, setTel] = useState("")
    const [password, setPassword] = useState("")
    const [address, setAddress] = useState("")
    const history = useHistory()

    async function signUp() {
        let item = { name, tel, password, address }
        let result = await fetch("http://120.114.142.24:8000/api/peoples", {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })
        result = await result.json()
        // result && local()
        // function local() {
        //     history.push("/login")
        // }
    }

    // useEffect(() => {
    //     if (localStorage.getItem('user-info')) {
    //         history.push("/shop")
    //     }
    // }, [])

    return (
        <>
            <Nav />
            <Grid>
                <Paper elevation={20} style={paperStyle}>
                    <Grid>
                        <PersonAddIcon />
                    </Grid>
                    <h2>Sign Up</h2>
                    <form>
                        <TextField value={name} onChange={(e) => setName(e.target.value)} fullWidth label='Name' placeholder="Enter your name" multiline rows={0} required />
                        <TextField value={tel} onChange={(e) => setTel(e.target.value)} fullWidth label='Tel' placeholder="Enter your cell phone" />
                        <TextField value={password} onChange={(e) => setPassword(e.target.value)} fullWidth label='Password' type="password" placeholder="Enter your password" />
                        <TextField value={address} onChange={(e) => setAddress(e.target.value)} fullWidth label='Address' placeholder="Enter your address" />
                        <Button onClick={signUp} style={buttonStyle} variant="contained" color="primary">Sign Up</Button>
                    </form>
                </Paper>
            </Grid >
        </>
    );
}

export default Register;