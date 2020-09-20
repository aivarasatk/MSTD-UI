import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SearchCriteria from './components/SearchCriteria/Search';
import TorrentsTable from './components/TorrentsTable/TorrentsTable';
import { Configuration } from './configuration/Configuration';
import  AppConfig from './configuration/AppConfig';
import { Card } from '@material-ui/core';

var isDev:boolean = process.env.NODE_ENV === 'development';

var config = new Configuration(isDev ? AppConfig.LocalApiUrl : AppConfig.ReleaseApiUrl);

ReactDOM.render(
  <React.StrictMode>
    <div style={{padding: 16}}>
      <Card>
        <SearchCriteria/>
      </Card>
      
      <div style={{paddingTop: 32}}>
        <Card>
          <TorrentsTable/>
        </Card>
      </div>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
