import React from 'react';
import ReactDOM from 'react-dom/client';
import DbService from "./api/DbService";
import AppContainer from "./AppContainer";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <DbService>
        <AppContainer />
    </DbService>
);
