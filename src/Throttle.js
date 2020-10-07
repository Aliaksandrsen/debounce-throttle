import React from "react";
import { throttle } from "lodash";

let throttleCounter = 0;
let realCounter = 0;
let start = new Date();

const timer = (firstDate, secondDate) => {
  return (firstDate - secondDate) / 1000;
};

class LoadMoreButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickThrottled = throttle(this.handleClick, 5000);
  }

  componentWillUnmount() {
    this.handleClickThrottled.cancel();
  }

  render() {
    return (
      <button
        onClick={() => {
          realCounter += 1;
          console.log(
            `real click ${realCounter} => ${timer(new Date(), start)}`
          );
          this.handleClickThrottled();
        }}
      >
        throttle кнопка
      </button>
    );
  }

  handleClick() {
    this.props.loadMore();
  }
}

function Throttle() {
  return (
    <LoadMoreButton
      loadMore={() => {
        throttleCounter += 1;
        console.log(
          `throttle click ${throttleCounter} => ${timer(new Date(), start)}`
        );
      }}
    />
  );
}

export default Throttle;
