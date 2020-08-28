import React from 'react';

const ListItem = props => {
  const { item = {}, draggableProps = {}, idx = '', isBin = false } = props
  const dragging = draggableProps.dragging ? 'dragging' : ''
  const isMandatory = item.mandatory === 'Y' ? true : false
  const expectedValues = item.expectedValues || []
  return (
    <div className={`column is-half-desktop ${dragging}`} {...draggableProps}>
      <div className="box drag-box">
        <div className="level is-mobile">
          <div className="level-left">
            <div className="level-item">
              <span className="icon grip">
                <i className="fas fa-lg fa-grip-vertical"></i>
              </span>
            </div>
          </div>
          <div className="level-item">
            <input type="text" autoComplete="nope" placeholder={item.fieldName} className={`input ${isMandatory ? 'is-success' : ''}`} />
          </div>
          <div className="level-right">
            <div className="level-item">
              <span className="tag is-grey-dark is-rounded order">
                {idx + 1}
              </span>
              {
                isBin ? (
                  <span className="icon icon-delete has-text-grey-light" onClick={() => props.restoreField(idx)}>
                    <i className="fas fa-lg fa-plus-circle"></i>
                  </span>
                ) : (
                    <span className="icon icon-delete has-text-grey-light" onClick={() => props.onDelete(idx)}>
                      <i className="fas fa-lg fa-minus-circle"></i>
                    </span>
                  )
              }

            </div>
            <div className="level-item">
              <span className={`icon ${isMandatory ? 'has-text-success' : 'has-text-grey-light'}`}>
                <i className={isMandatory ? 'fas fa-lg fa-toggle-on' : 'fas fa-lg fa-toggle-off'}></i>
              </span>
              &nbsp;
              <div className="dropdown is-hoverable">
                <div className="dropdown-trigger">
                  <span className="icon has-text-grey-light">
                    <i className="fas fa-info-circle"></i>
                  </span>
                </div>
                <div className="dropdown-menu">
                  <div className="dropdown-content">
                    {
                      expectedValues.length ?
                        expectedValues.map((val, indx) => <span key={indx} className="dropdown-item">{val}</span>) : <span className="dropdown-item">No details</span>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
export default ListItem