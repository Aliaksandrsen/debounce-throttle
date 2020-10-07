import React from "react";
import { debounce } from "lodash";

let debounceCounter = 0;
let realCounter = 0;
let start = new Date();
console.log("TIME START !!!");

const timer = (firstDate, secondDate) => {
  return (firstDate - secondDate) / 1000;
};

class Searchbox extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.emitChangeDebounced = debounce(this.emitChange, 5000);
  }

  componentWillUnmount() {
    this.emitChangeDebounced.cancel();
  }

  render() {
    return (
      <input
        type="text"
        onChange={(e) => {
          realCounter += 1;
          console.log(
            `real onchange ${realCounter} => ${timer(new Date(), start)}`
          );
          this.handleChange(e);
        }}
        placeholder="debounce инпут..."
        defaultValue={this.props.value}
      />
    );
  }

  handleChange(e) {
    // React помещает события в пул, поэтому значение считывается перед debounce.
    // В качестве альтернативы мы могли бы вызвать `event.persist()` и передать событие целиком.
    // Более подробно тема рассматривается здесь: reactjs.org/docs/events.html#event-pooling
    this.emitChangeDebounced(e.target.value);
  }

  emitChange(value) {
    this.props.onChange(value);
  }
}

function Debounce() {
  return (
    <Searchbox
      onChange={() => {
        debounceCounter += 1;
        console.log(
          `debounce onchange ${debounceCounter} => ${timer(new Date(), start)}`
        );
      }}
    />
  );
}

export default Debounce;
