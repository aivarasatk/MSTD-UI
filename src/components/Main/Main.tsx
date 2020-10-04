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
import { Card, Drawer } from '@material-ui/core';
import Settings from '../Settings/Settings';

const startingPage:number = 1;

class SourceSearchState
{
    source:api.TorrentSource;
    isLastPage:boolean;

    constructor(source:api.TorrentSource, isLastPage:boolean) {
        this.source = source;
        this.isLastPage = isLastPage;
    }
}

class Main extends Component
    <{config: Configuration}, 

    {   searchCategory: api.TorrentCategory, 
        searchOrderBy: api.Sorting, 
        searchValue: string,
        torrentEntries: api.TorrentEntry[],
        currentPage:number
        sourceSearchStates: SourceSearchState[],
        settingsOpen: boolean
    }> 
    {
    
    apiClient: api.Client;
    sources: api.SourceDto[] | undefined;

    constructor(props: any) {//TODO: realtype
        super(props);
        this.apiClient = new api.Client(this.props.config.apiUrl);

        this.state = {
            searchCategory: api.TorrentCategory.All,
            searchOrderBy: api.Sorting.SeedersDesc,
            searchValue: "",
            torrentEntries: new Array<api.TorrentEntry>(),
            sourceSearchStates: new Array<SourceSearchState>(),
            currentPage: startingPage,
            settingsOpen: false
        };
        
        this.apiClient.sources()
            .then(
                resp => this.sources = resp,
                rejected => console.log(rejected) /* visual feeback */);
    }

    handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let radioOption:api.TorrentCategory = ((event.target as HTMLInputElement).value as api.TorrentCategory);
        this.setState({ searchCategory: radioOption });
    };

    onHandleOrderByChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        this.setState({ searchOrderBy: event.target.value as api.Sorting});
        //todo: redo search with new orderby
    };

    onHandleSearchInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        this.setState({ searchValue: event.target.value});
        //todo: validation - don't allow search empty
    };

    executeSearch = (page?:number) => {
        if(page === undefined)
        {
            page = startingPage
            //reset
            this.setState({
                currentPage: startingPage, 
                torrentEntries: new Array<api.TorrentEntry>()
            });
        }

        var urls:string[] = ['https://1337x.to/'];//todo: source filter based on searchStates
        this.apiClient
            .torrents(urls, this.state.searchOrderBy, this.state.searchCategory, this.state.searchValue, page)
            .then(res => 
            {
                const arr = res.torrents?.flatMap(f => f.torrentEntries ?? new Array<api.TorrentEntry>()) ?? new Array<api.TorrentEntry>();
                const searchStates = res.torrents.map(s => new SourceSearchState(s.source, s.isLastPage));
                this.setState(
                {
                    torrentEntries: this.state.torrentEntries.concat(arr),
                    sourceSearchStates: searchStates
                });
            },
            rejected => console.log(rejected) /*todo: visual feedback */);
    };

    executeLoadMore = () =>{
        if(this.state.sourceSearchStates.every(e => e.isLastPage))
        {
            //TODO: handle visual feedback in search, prevent load more. 
            return;
        }

        this.executeSearch(this.state.currentPage + 1);
        //todo: validation that it succeeded, checks for "last page"
        this.setState({currentPage: this.state.currentPage + 1});
    }

    openSettingsDrawer = () =>{
        this.setState({settingsOpen: true});
    }

    closeSettingsDrawer = () =>{
        this.setState({settingsOpen: false});
    }

    render() {
        return (
            <div>
                <Drawer 
                    anchor="left" 
                    variant="temporary"
                    open={this.state.settingsOpen} 
                    onClose={this.closeSettingsDrawer}>
                    <Settings sources={this.sources}/>
                </Drawer>

                <Card>
                    <div style={{padding: 16}}>
                        <Grid container spacing={3}>
                            <Grid container item direction="row" justify="flex-start" spacing={5}>
                                <Grid item xs={4}>
                                    <Input fullWidth placeholder="Search for torrents..." onChange={this.onHandleSearchInputChange}/> {/*Add EndAdornment with "search" icon for search, Enter key for search*/}
                                </Grid>
                                <Grid item >{/*temporary. Later on will be part of seach*/}
                                    <Button variant="contained" color="primary" onClick={() => this.executeSearch()}>Search</Button>
                                </Grid>
                                <Grid item >
                                    <Select value={this.state.searchOrderBy} onChange={this.onHandleOrderByChange}>
                                        {
                                            mapping.SortOrderMapping.map(a => 
                                                <MenuItem key={a.key} value={a.key}>{a.value}</MenuItem>
                                            )
                                        }
                                    </Select>
                                </Grid>
                            </Grid>

                            <Grid container item xs={12}>
                                <RadioGroup row aria-label="categories" value={this.state.searchCategory} onChange={this.handleCategoryChange}>
                                    {
                                        mapping.TorrentCategoryMapping.map(c =>
                                            <FormControlLabel key={c} value={c} control={<Radio />} label={c} />
                                        )
                                    }
                                </RadioGroup>
                            </Grid>

                            <Grid container item>
                                <Button variant="contained" color="primary" onClick={this.openSettingsDrawer}>Settings</Button>
                            </Grid>
                        </Grid>
                    </div>
                </Card>
                
                <div style={{paddingTop: 32}}>
                    <TableContainer component={Paper} style={{height: '70vh'}}>
                        <Table stickyHeader aria-label="simple table">
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
                                        <TableCell align="right">{entry?.date?.toDateString()}</TableCell>
                                        <TableCell align="right">{`${entry.size.value} ${entry.size.postfix}`}</TableCell>
                                        <TableCell align="right">{entry.uploader}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <Button variant="contained" color="primary" onClick={this.executeLoadMore}>Load more</Button>{/* TODO: later on load more will be autoscroll*/}
            </div>
            
        );
    }
}

export default Main;