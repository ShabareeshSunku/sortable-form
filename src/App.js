import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import SortableList from './components/SortableList'
import ListItem from './components/ListItem'
//import fields from './mocks/fields'
import {
  getFields,
  updateFields,
  deleteField,
  restoreField,
  resetFields,
  saveFields
} from './actions'

class App extends PureComponent {
  componentDidMount = () => {
    this.props.getFields()
  };
  _saveFields = () => {
    const { fields = [] } = this.props
    this.props.saveFields(fields)
  }
  render() {
    const {
      //loading = false,
      fields = [],
      bin = [],
      saving = false
    } = this.props
    return (
      <div className="section has-background-white-bis">
        <div className="container">
          <article className="panel is-primary">
            <p className="panel-heading">
              Fields and Allowed Values
          </p>
            <div className="panel-body">
              <div className="level">
                <div className="level-left">
                  <div className="level-item">
                    <h2 className="subtitle">Standard Fields</h2>
                  </div>
                </div>
                <div className="level-right">
                  <div className="level-item">
                    <button className="button is-link" onClick={this.props.resetFields}>Reset</button>
                    &nbsp;
                    <button className={`button is-success ${saving ? 'is-loading' : ''}`} onClick={this._saveFields}>Save</button>
                  </div>
                </div>
              </div>
              <SortableList
                data={fields}
                ListItem={ListItem}
                updateFields={this.props.updateFields}
                deleteField={this.props.deleteField}
              />
              <h2 className="subtitle">Deleted Fields</h2>
              {bin.length ? (
                <div className="columns is-multiline">
                  {
                    bin.map((item, idx) => (
                      <ListItem
                        item={item} key={idx} isBin={true}
                        restoreField={this.props.restoreField}
                        idx={idx}
                      />))
                  }
                </div>
              ) : <div className="notification">No Items</div>}
            </div>
          </article>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => state
const mapDispatchToProps = (dispatch) => ({
  getFields: () => dispatch(getFields()),
  updateFields: fields => dispatch(updateFields(fields)),
  deleteField: position => dispatch(deleteField(position)),
  restoreField: position => dispatch(restoreField(position)),
  resetFields: () => dispatch(resetFields()),
  saveFields: (fields) => dispatch(saveFields(fields))
})
export default connect(mapStateToProps, mapDispatchToProps)(App)
