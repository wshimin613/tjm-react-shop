import React, { useState } from 'react';
import Nav from './Nav';
import { useHistory } from 'react-router-dom';
import { Grid, Paper, TextField, Button } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';

const paperStyle = {
    padding: '20px 20px',
    width: 300,
    margin: "30px auto",
};
const buttonStyle = {
    margin: "20px auto",
};

function AddShop() {
    const [sname, setSname] = useState("")
    const [sprice, setSprice] = useState("")
    const [inventory, setInventory] = useState("")
    const [file, setFile] = useState("")
    const history = useHistory()

    const add = () => {
        const formData = new FormData()
        formData.append('sname', sname)
        formData.append('sprice', sprice)
        formData.append('snum', inventory)
        formData.append('img', file)
        let result = fetch("http://120.114.142.24:8000/api/shops", {
            method: 'POST',
            body: formData,
            headers: {
                "Accept": 'application/json'
            }
        })
        result ? alert("OK") : console.log("false")
    };

    return (
        <>
            <Nav />
            <Grid>
                <Paper elevation={20} style={paperStyle}>
                    <h2>New product</h2>
                    <form>
                        <TextField onChange={(e) => setSname(e.target.value)} fullWidth label='商品名稱' placeholder="Enter your product" multiline rows={0} required />
                        <TextField onChange={(e) => setSprice(e.target.value)} fullWidth label='商品價格' placeholder="Enter your product price" multiline rows={0} required />
                        <TextField onChange={(e) => setInventory(e.target.value)} fullWidth label='庫存' placeholder="Enter your inventory" type="number" required />
                        <TextField onChange={(e) => setFile(e.target.files[0])} type="file" />
                        <Button startIcon={<PublishIcon />} onClick={add} style={buttonStyle} variant="contained" color="primary">upload</Button>
                    </form>
                </Paper>
            </Grid >
        </>
    );
}

export default AddShop;