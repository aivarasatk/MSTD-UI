import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SearchCriteria from './components/SearchCriteria/Search';
import TorrentsTable from './components/TorrentsTable/TorrentsTable';


ReactDOM.render(
  <React.StrictMode>
    <div style={{padding: 16}}>
      <SearchCriteria/>
      <div style={{paddingTop: 32}}> <TorrentsTable/> </div>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
