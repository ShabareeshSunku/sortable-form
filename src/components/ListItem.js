import React from 'react';

const ListItem = props => {
  const { item = {}, draggableProps = {}, idx = '' } = props
  const dragging = draggableProps.dragging ? 'dragging' : ''
  const isMandatory = item.mandatory === 'Y' ? true : false
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
              <span className="delete icon-delete"></span>
            </div>
            <div className="level-item">
              <span className={`icon ${isMandatory ? 'has-text-success' : 'has-text-grey-light'}`}>
                <i className={isMandatory ? 'fas fa-lg fa-toggle-on' : 'fas fa-lg fa-toggle-off'}></i>
              </span>
              {/* <br />
              <span className="icon has-text-grey-light">
                <i className="fas fa-list"></i>
              </span> */}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
export default ListItem