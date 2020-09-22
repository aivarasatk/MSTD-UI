import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import * as api from "../../api/mstdApi"
import * as mapping from "../../json/mapping"
import { Configuration } from '../../configuration/Configuration';
import { Card } from '@material-ui/core';

class Main extends Component
    <{config: Configuration}, 

    {   searchCategory: api.TorrentCategory, 
        searchOrderBy: api.Sorting, 
        searchValue: string,
        torrentEntries: api.TorrentEntry[]
    }> 
    {

    apiClient: api.Client;


    constructor(props: any) {//TODO: realtype
        super(props);
        this.state = {
            searchCategory: api.TorrentCategory.All,
            searchOrderBy: api.Sorting.SeedersDesc,
            searchValue: "",
            torrentEntries: new Array<api.TorrentEntry>()
        };
        this.apiClient = new api.Client(this.props.config.apiUrl);
    }

    handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let radioOption:api.TorrentCategory = ((event.target as HTMLInputElement).value as api.TorrentCategory);
        this.setState({ searchCategory: radioOption });
    };

    onHandleOrderByChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        this.setState({ searchOrderBy: event.target.value as api.Sorting});
    };

    onHandleSearchInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        this.setState({ searchValue: event.target.value});
    };

    executeSearch = () => {
        let arr:api.TorrentEntry[];

        var urls:string[] = ['https://1337x.to/', 'https://tpb.party/', 'https://kickasstorrents.to/'];
        this.apiClient
            .torrents(urls, this.state.searchOrderBy, this.state.searchCategory, this.state.searchValue, 1)
            .then(res => 
                {
                    arr = res.torrents?.flatMap(f => f.torrentEntries ?? new Array<api.TorrentEntry>()) ?? new Array<api.TorrentEntry>();
                    this.setState({torrentEntries: arr})
                },
             rejected => console.log(rejected))
    };

    render() {
        return (
            <div>
                <Card>
                    <div style={{padding: 16}}>
                        <Grid container spacing={3}>
                            <Grid container item direction="row" justify="flex-start" spacing={5}>
                                <Grid item xs={4}>
                                    <Input fullWidth placeholder="Search for torrents..." onChange={this.onHandleSearchInputChange}/> {/*Add EndAdornment with "search" icon for search, Enter key for search*/}
                                </Grid>
                                <Grid item >{/*temporary. Later on will be part of seach*/}
                                    <Button variant="contained" color="primary" onClick={this.executeSearch}>Search</Button>
                                </Grid>
                                <Grid item >
                                    <FormControl>
                                        <Select value={this.state.searchOrderBy} onChange={this.onHandleOrderByChange}>
                                            {
                                                mapping.SortOrderMapping.map(a => 
                                                    <MenuItem value={a.key}>{a.value}</MenuItem>
                                                )
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid container item xs={12}>
                                <FormControl component="fieldset">
                                    <RadioGroup row aria-label="categories" value={this.state.searchCategory} onChange={this.handleCategoryChange}>
                                        {
                                            mapping.TorrentCategoryMapping.map(c =>
                                                <FormControlLabel value={c} control={<Radio />} label={c} />
                                            )
                                        }
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </div>
                </Card>
                
                <div style={{paddingTop: 32}}>
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
                                {this.state.torrentEntries.map((entry) => (
                                    <TableRow key={entry.title + entry.date}>
                                        <TableCell component="th" scope="row"> {entry.title} </TableCell>
                                        <TableCell align="right">{entry.seeders}</TableCell>
                                        <TableCell align="right">{entry.leechers}</TableCell>
                                        <TableCell align="right">{entry?.date?.toUTCString()}</TableCell>
                                        <TableCell align="right">{entry.size.value + entry.size.postfix}</TableCell>
                                        <TableCell align="right">{entry.uploader}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
            
        );
    }
}

export default Main;