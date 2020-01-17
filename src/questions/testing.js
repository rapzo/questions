import React from "react";
import PropTypes from "prop-types";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";

const questionCode1 = `class MyComponent extends Component {
  
  ...

  handleClick() {
    const { onClick } = this.props;

    onClick();
  }

  ...
}`;

const questionCode2 = `const onClick = ({ ...args }) => ({
  type: 'click',
  payload: {
    ...args
  },
}),`;

const questionCode3 = `describe('onClick', () => {
  const onClickSpy = jest.fn();
  const wrapper = shallow(<MyComponent onClick={onClickSpy} />);

  it('calls onClick when handleClick is called', () => {
    const instance = wrapper.instance();

    expect(onClickSpy).not.toHaveBeenCalled();

    instance.handleClick();

    expect(onClickSpy).toHaveBeenCalledTimes(1);
  });
});`;

const questionCode4 = `handleClick() {
  const { onClick } = this.props;

  new Promise((resolve, reject) => onClick({ resolve, reject }));
}`;

export const Question3 = () => (
  <>
    <h2>3. Testing</h2>
    <p>Given a React component of the form:</p>
    <pre>
      <code>{questionCode1}</code>
    </pre>

    <p>Where `onClick` is a redux action creator of the form:</p>
    <pre>
      <code>{questionCode2}</code>
    </pre>

    <p>
      A test for the component can check that the action creator has been called
      as follows:
    </p>
    <pre>
      <code>{questionCode3}</code>
    </pre>

    <p>If the handler is instead modified to return a promise, like so:</p>
    <pre>
      <code>{questionCode4}</code>
    </pre>

    <p>How should the test be modified to account for this?</p>
  </>
);

export class MyComponent extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired
  };

  handleClick() {
    const { onClick } = this.props;
    onClick();
  }

  render() {
    const { value } = this.props;

    return (
      <div>
        <button onClick={() => this.handleClick()}>click me</button>
        {value > 0 && (
          <h5>
            Clicked MyComponent {value} time{value > 1 ? "s" : ""}
          </h5>
        )}
      </div>
    );
  }
}

const onClickActionCreator = ({ ...args }) => ({
  type: "click",
  payload: {
    ...args
  }
});

const defaultState = {
  value: 0
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "click":
      return {
        value: state.value + action.payload.value
      };
    default:
      return state;
  }
};

const store1 = createStore(reducer);
const store2 = createStore(reducer);

const mapStateToProps = ({ value }) => ({ value });

export const MyConnectedComponent = connect(
  mapStateToProps,
  dispatch => ({
    onClick: () => dispatch(onClickActionCreator({ value: 1 }))
  })
)(MyComponent);

export class MyPromisedComponent extends React.Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired
  };

  handleClick() {
    const { onClick } = this.props;

    new Promise((resolve, reject) => onClick({ resolve, reject }));
  }

  render() {
    const { value } = this.props;

    return (
      <div>
        <button onClick={() => this.handleClick()}>click me</button>
        {value > 0 && (
          <h5>
            Clicked MyPromisedComponent {value} time{value > 1 ? "s" : ""}
          </h5>
        )}
      </div>
    );
  }
}

export const MyConnectedPromisedComponent = connect(
  mapStateToProps,
  dispatch => ({
    onClick: () => dispatch(onClickActionCreator({ value: 1 }))
  })
)(MyPromisedComponent);

const answerTestCode = `describe("onClick with arguments", () => {
  const onClickSpy = jest.fn();
  const wrapper = shallow(<MyPromisedComponent onClick={onClickSpy} />);

  it("calls onClick when handleClick is called", () => {
    const instance = wrapper.instance();

    expect(onClickSpy).not.toHaveBeenCalled();

    instance.handleClick();

    expect(onClickSpy).toHaveBeenCalledTimes(1);
    expect(onClickSpy.mock.calls.length).toEqual(1);
  });
});`;

export const Answer3 = () => (
  <div className="answer">
    <h3>Answer</h3>

    <Provider store={store1}>
      <h4>MyComponent</h4>
      <MyConnectedComponent />
    </Provider>

    <Provider store={store2}>
      <h4>MyPromisedComponent</h4>
      <MyConnectedPromisedComponent />
    </Provider>

    <h5>MyPromisedComponent test</h5>
    <pre>
      <code>{answerTestCode}</code>
    </pre>

    <h4>Conclusion</h4>
    <p>
      Although everything works and the tests passed, i feel i missed something.
      It is very hard without stubbing globals, such as <code>Promise</code>, in
      order to spy on which arguments are provided via action. So, conclusions
      are shallow.
    </p>
  </div>
);
