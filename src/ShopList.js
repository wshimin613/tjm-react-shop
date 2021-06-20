import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@material-ui/core';
import NoteIcon from '@material-ui/icons/Note';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function ShopList() {
    const classes = useStyles();
    const [shopinventory, setShopinventory] = useState([])
    const [open, setOpen] = useState(false);
    const [defaultvalue, setDefault] = useState([])
    const [modifysname, setModifySname] = useState("")
    const [modifysprice, setModifySprice] = useState("")
    const [modifysnum, setModifySnum] = useState("")
    const [modifyfile, setModifyFile] = useState("")
    const [force, setForce] = useState(false)

    const handleClickOpen = (props) => {
        setOpen(true);
        setDefault(props)
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        inventory()
    }, [force])

    const inventory = async () => {
        let result = await fetch("http://120.114.142.24:8000/api/shops", {
            method: 'GET',
            headers: {
                "Accept": "application/json"
            },
        })
            .then((response) => response.json())
            .then((data) => {
                const row = data.data
                setShopinventory(row)
            });
        setForce(false);
    }

    const modify = () => {
        const formData = new FormData()
        modifysname && formData.set('sname', modifysname)
        modifysprice && formData.set('sprice', modifysprice)
        modifysnum && formData.set('snum', modifysnum)
        // formData.set('img', modifyfile)
        formData.set('_method', 'PATCH')
        let result = fetch("http://120.114.142.24:8000/api/shops/" + defaultvalue.id, {
            method: 'POST',
            body: formData
        })
        setOpen(false);
        setForce(true);
    }

    const del = async (props) => {
        await fetch("http://120.114.142.24:8000/api/shops/" + props, {
            method: 'DELETE',
            headers: {
                "Accept": "application/json"
            }
        })
        inventory();
    }

    let item = shopinventory.map((value) => (
        <TableRow key={value.id}>
            <TableCell align="center">{value.id}</TableCell>
            <TableCell align="center">{value.sname}</TableCell>
            <TableCell align="center">{value.sprice}</TableCell>
            <TableCell align="center">{value.snum}</TableCell>
            <TableCell align="center"><img style={{ width: 150 }} src={"http://120.114.142.24:8000/" + value.img} /></TableCell>
            <TableCell align="center" >
                <Button onClick={() => handleClickOpen(value)} startIcon={<NoteIcon />} variant="outlined" size="small" color="primary" style={{ margin: 5 }}>
                    modify
                </Button>
                < Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">{"Modify page"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <TextField onChange={(e) => setModifySname(e.target.value)} defaultValue={defaultvalue.sname} label="商品名稱" placeholder="Modify your product name" fullWidth />
                            <TextField onChange={(e) => setModifySprice(e.target.value)} defaultValue={defaultvalue.sprice} label="商品價格" placeholder="Modify your product price" fullWidth />
                            <TextField onChange={(e) => setModifySnum(e.target.value)} defaultValue={defaultvalue.snum} label="庫存" type="number" placeholder="Modify your product inventory" fullWidth />
                            <TextField onChange={(e) => setModifyFile(e.target.files[0])} type="file" placeholder="Modify your product image" fullWidth />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose} color="primary">
                            取消
                        </Button>
                        <Button onClick={() => modify()} color="primary" autoFocus>
                            修改
                        </Button>
                    </DialogActions>
                </Dialog>
                {/* <br /> */}
                <Button onClick={() => del(value.id)} startIcon={<DeleteForeverIcon />} variant="outlined" size="small" color="secondary">
                    DELETE
                </Button>
            </TableCell>
        </TableRow >
    ));

    return (
        <>
            <Nav />
            <Container maxWidth="md" style={{ padding: 20 }}>
                <Typography variant="h5" display="block" align="center" gutterBottom>商品清單</Typography>
                <TableContainer component={Paper}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Id</TableCell>
                                <TableCell align="center">商品名稱</TableCell>
                                <TableCell align="center">商品價格&nbsp;($)</TableCell>
                                <TableCell align="center">庫存&nbsp;(個)</TableCell>
                                <TableCell align="center">商品圖片</TableCell>
                                <TableCell align="center">選項</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {item}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    );
}

export default ShopList;