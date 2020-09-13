import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class TorrentsTable extends Component {
    constructor(props: any) {
        super(props);
        this.state = {  };
    }

    torrents = [
        //SIZE must be a 'class'. Number and size postfix
        {title: 'Vikings S01E02', seeders: 11, leechers: 15, time: new Date(2020, 5, 10, 11, 20, 20), size: 20, uploader: 'Simon'},
        {title: 'Lucifer S01E02', seeders: 200, leechers: 1520, time: new Date(2020, 5, 10, 11, 20, 20), size: 20, uploader: 'Tim'}
    ];

    render() {
        return (
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="right">Seeders</TableCell>
                            <TableCell align="right">Leechers</TableCell>
                            <TableCell align="right">Time</TableCell>
                            <TableCell align="right">Size</TableCell>
                            <TableCell align="right">Uploader</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.torrents.map((entry) => (
                            <TableRow key={entry.title + entry.time}>
                                <TableCell component="th" scope="row"> {entry.title} </TableCell>
                                <TableCell align="right">{entry.seeders}</TableCell>
                                <TableCell align="right">{entry.leechers}</TableCell>
                                <TableCell align="right">{entry.time.toUTCString()}</TableCell>
                                <TableCell align="right">{entry.size}</TableCell>
                                <TableCell align="right">{entry.uploader}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
        );
    }
}

export default TorrentsTable;