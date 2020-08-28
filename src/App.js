import React from 'react';
import SortableList from './components/SortableList'
import ListItem from './components/ListItem'
import fields from './mocks/fields'
import './styles/main.scss';
function App() {
  return (
    <div className="section has-background-white-bis">
      <div className="container">
        <SortableList data={fields} ListItem={ListItem} />
      </div>
    </div>
  );
}

export default App;
