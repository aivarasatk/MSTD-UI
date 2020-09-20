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
import * as api from "../../api/mstdApi"
import * as mapping from "../../json/mapping"

class Search extends Component<{}, { searchCategory: api.TorrentCategory, searchOrderBy: api.Sorting, searchValue: string }> {

    constructor(props: any) {//TODO: realtype
        super(props);
        this.state = {
            searchCategory: api.TorrentCategory.All,
            searchOrderBy: api.Sorting.SeedersDesc,
             searchValue: ""
        };
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

    executeSeach = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        
    };

    render() {
        return (
            <div style={{padding: 16}}>
                <Grid container spacing={3}>
                    <Grid container item direction="row" justify="flex-start" spacing={5}>
                        <Grid item xs={4}>
                            <Input fullWidth placeholder="Search for torrents..." onChange={this.onHandleSearchInputChange}/> {/*Add EndAdornment with "search" icon for search, Enter key for search*/}
                        </Grid>
                        <Grid item >{/*temporary. Later on will be part of seach*/}
                            <Button variant="contained" color="primary" onClick={this.executeSeach}>Search</Button>
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
        );
    }
}

export default Search;