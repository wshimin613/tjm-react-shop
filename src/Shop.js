import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import { Container, Grid, Paper, Typography, Button } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const paperStyle = {
    padding: '20px 20px',
    width: 300,
    margin: "30px auto",
};

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

    let item = shopinventory.map((value) =>
        <React.Fragment key={value.id}>
            <Grid item xs={4}>
                <Paper elevation={10} style={{ padding: 15, width: "100%" }}>
                    <img src={"http://120.114.142.24:8000/" + value.img} style={{ width: '100%' }} />
                    <Typography style={{ color: "#333333" }} variant="subtitle2" gutterBottom>
                        {value.sname}
                    </Typography>
                    <Typography style={{ color: "#ee4d2d" }} variant="body2" gutterBottom>
                        $ {value.sprice}
                    </Typography>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        startIcon={<AddShoppingCartIcon />}
                        href="#"
                    >
                        BUY
                    </Button>
                    <Typography style={{ color: "#9c9c9c" }} display="block" align="right" variant="caption" gutterBottom>
                        庫存：{value.snum}
                    </Typography>
                </Paper>
            </Grid>
        </React.Fragment>
    );

    return (
        <>
            <Nav />
            <Container maxWidth="md" style={{ padding: 20 }}>
                <Grid container spacing={3}>
                    {item}
                </Grid>
            </Container>
        </>
    );
}

export default Shop;