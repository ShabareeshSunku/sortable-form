import React, { Component } from 'react'
/**
 * Sortable List module
 * A sortable list component using html5 drag and drop api.
 **/
export default class SortableList extends Component {
  constructor(props) {
    super(props)
    this.state = { dragging: undefined }
  }
  sort = (data, dragging, dataUpdated = false) => {
    const me = this
    if (dataUpdated) {
      me.setState({ dragging }, () => {
        me.props.updateFields(data)
      });
    }
  }
  dragEnd = () => {
    const data = this.data.slice(0)
    this.sort(data, undefined, true);
  }
  dragStart = (e) => {
    this.dragged = Number(e.currentTarget.dataset.id);
    e.dataTransfer.effectAllowed = 'move';
    // Firefox requires calling dataTransfer.setData
    // for the drag to properly work
    e.dataTransfer.setData("text/html", null);
  }
  dragOver = (e) => {
    e.preventDefault();
    var over = e.currentTarget
    var dragging = this.state.dragging;
    var from = isFinite(dragging) ? dragging : this.dragged;
    var to = Number(over.dataset.id);
    // if ((e.clientY - over.offsetTop) > (over.offsetHeight / 2)) to++;
    // if (from < to) to--;
    // Move from 'a' to 'b'
    var items = this.props.data.slice(0);
    items.splice(to, 0, items.splice(from, 1)[0]);
    this.sort(items, to, false);
    this.data = items
  }
  render() {
    const { data = [] } = this.props
    const ListItem = this.props.ListItem
    return (
      <div className="columns is-multiline">
        {
          data.map((item, idx) => {
            let dragging = (idx === this.state.dragging) ? "dragging" : "";
            let draggableProps = {
              "data-id": idx,
              dragging,
              draggable: true,
              onDragEnd: this.dragEnd,
              onDragOver: this.dragOver,
              onDragStart: this.dragStart
            }
            return (
              <ListItem
                draggableProps={draggableProps}
                item={item}
                key={'' + idx}
                idx={idx}
                onDelete = {this.props.deleteField}
              />
            )
          })
        }
      </div>
    )
  }
}