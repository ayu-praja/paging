
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import '../App.css'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
        table: {
            minWidth: 650,
        },
    },
}));
function Paging() {
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const classes = useStyles();
    const handleChange = (event, value) => {
        setPage(value);
    };
    useEffect(() => {
        axios.get('https://reqres.in/api/users?page=' + page)
            .then((response) => {
                console.log(response.data.data)
                setData(response.data.data)
            })
    }, [page])
    return (
        <div >
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">First name</TableCell>
                            <TableCell align="right">Last name</TableCell>
                            <TableCell align="right">avatar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) =>
                        (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.first_name}</TableCell>
                                <TableCell align="right">{row.last_name}</TableCell>
                                <TableCell align="right"><img src={row.avatar}/></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{display:'flex',justifyContent:'center'}}>
                
            <Pagination count={10} color="primary" onChange={handleChange} />
            </div>
        </div>
    );
}

export default Paging;
