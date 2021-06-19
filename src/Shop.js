import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import { Container, Grid, Paper, Typography } from '@material-ui/core';
// import test from './toothbrushs/01.jpg';

function Shop() {
    const [shopinventory, setShopinventory] = useState([]);
    const inventory = () => {
        fetch("http://120.114.142.24:8000/api/shops", {
            method: 'GET',
            headers: {
                "Accept": "application/json"
            },
        })
            .then((response) => response.json())
            .then((data) => {
                const row = data.data
                // console.log(row)
                setShopinventory(row)
            });
    }

    useEffect(() => {
        inventory();
    }, []);

    // let sname = shopinventory.map((list) => <li>{list.sname}</li>)
    // console.log(shopinventory[2].img)
    return (
        <>
            <Nav />
            <Container maxWidth="md" style={{ backgroundColor: '#cfe8fc' }}>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <Paper>
                            {/* <img src={"http://120.114.142.24:8000/api/shops/" + shopinventory[2].img} style={{ width: '100%' }} /> */}
                            <Typography color="textSecondary">
                                牙刷
                            </Typography>
                            <Typography color="textSecondary">
                                200
                            </Typography>
                            <Typography color="textSecondary">
                                10
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper>xs=3</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper >xs=3</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper>xs=3</Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default Shop;