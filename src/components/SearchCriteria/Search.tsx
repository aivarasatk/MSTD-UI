import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import './Search.css';

class Search extends Component<{}, { searchCategory: string, searchOrderBy: number, searchValue: string }> {

    constructor(props: any) {//TODO: realtype
        super(props);
        this.state = {
            searchCategory: 'All',
            searchOrderBy: 1,
             searchValue: ""
        };
    }

    handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let radioOption:string = (event.target as HTMLInputElement).value;
        this.setState({ searchCategory: radioOption });
      };

    onHandleOrderByChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        this.setState({ searchOrderBy: event.target.value as number});
    };

    onHandleSearchInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        this.setState({ searchValue: event.target.value});
    };

    executeSeach = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        
    };

    render() {
        return (
            <div>
                <fieldset >
                    <legend>Search criteria</legend>
                    <Grid container spacing={3}>
                        <Grid container item direction="row" justify="flex-start" spacing={5}>
                            <Grid item xs={4}>{/*fill space*/}
                                <Input fullWidth placeholder="Search for torrents..." onChange={this.onHandleSearchInputChange}/> {/*Add EndAdornment with "search" icon for search, Enter key for search*/}
                            </Grid>
                            <Grid item >{/*temporary. Later on will be part of seach*/}
                                <Button variant="contained" color="primary" onClick={this.executeSeach}>Search</Button>
                            </Grid>
                            <Grid item >
                                <FormControl>
                                    <Select value={this.state.searchOrderBy} onChange={this.onHandleOrderByChange}>
                                        {/* have a json(?) with categories and use map to yield a list like current */}
                                        <MenuItem value={1}>{"Seeders Desc. (recommended)"}</MenuItem>
                                        <MenuItem value={2}>{"Seeders Asc."}</MenuItem>
                                        <MenuItem value={3}>{"Time Asc."}</MenuItem>
                                        <MenuItem value={4}>{"Time Desc."}</MenuItem>
                                        <MenuItem value={5}>{"Size Asc."}</MenuItem>
                                        <MenuItem value={6}>{"Size Desc."}</MenuItem>
                                        <MenuItem value={7}>{"Leechers Asc."}</MenuItem>
                                        <MenuItem value={8}>{"Leechers Desc."}</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid container item xs={12}>
                            <FormControl component="fieldset">
                                <RadioGroup row aria-label="categories" value={this.state.searchCategory} onChange={this.handleCategoryChange}>
                                    {/* have a json(?) with categories and use map to yield a list like current */}
                                    <FormControlLabel value="All" control={<Radio />} label="All" />
                                    <FormControlLabel value="Movies" control={<Radio />} label="Movies" />
                                    <FormControlLabel value="TV" control={<Radio />} label="TV" />
                                    <FormControlLabel value="Games" control={<Radio />} label="Games" />
                                    <FormControlLabel value="Music" control={<Radio />} label="Music" />
                                    <FormControlLabel value="Applications" control={<Radio />} label="Applications" />
                                    <FormControlLabel value="XXX" control={<Radio />} label="XXX" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </fieldset>
            </div>
        );
    }
}

export default Search;