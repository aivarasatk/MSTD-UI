import { Divider, FormControlLabel, Radio, RadioGroup, Checkbox } from '@material-ui/core';
import React from 'react';
import { Component } from 'react';
import * as api from "../../api/mstdApi"

class Settings extends Component<
    {sources:api.SourceDto[] | undefined},
    {}> 
{
    constructor(props:any) {//todo real type
        super(props);
        this.state = {  };

    }

    handleSelectedSiteChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
        const source = this.props.sources?.find(v => v.sites?.some(s => s.url === value))?.uniqueId;
    };

    render() {
        return (
            <div style={{padding: 16}}>
                <h3>Settings</h3>

                {this.props.sources?.map(s => 
                    <div key={s.uniqueId}>
                        {s.name}
                        <Divider/>
                        <RadioGroup aria-label={s.uniqueId} onChange={this.handleSelectedSiteChange}>
                            {  
                                s.sites?.map(ss => 
                                    <div key={ss.url}>
                                        <FormControlLabel value={ss.url} control={<Radio />} label={ss.url}/>
                                        <Checkbox disabled checked={ss.state === api.SiteState.Active}/>
                                    </div>)
                            }
                        </RadioGroup>
                        <div style={{paddingTop: 16}}/>
                    </div>
                )}
            </div>
            
        );
    }
}

export default Settings;