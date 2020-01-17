import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { MyComponent, MyPromisedComponent } from "./testing";

Enzyme.configure({ adapter: new Adapter() });

describe("testing", () => {
  describe("onClick", () => {
    const onClickSpy = jest.fn();
    const wrapper = shallow(<MyComponent onClick={onClickSpy} />);

    it("calls onClick when handleClick is called", () => {
      const instance = wrapper.instance();

      expect(onClickSpy).not.toHaveBeenCalled();

      instance.handleClick();

      expect(onClickSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("onClick with arguments", () => {
    const onClickSpy = jest.fn();
    const wrapper = shallow(<MyPromisedComponent onClick={onClickSpy} />);

    it("calls onClick when handleClick is called", () => {
      const instance = wrapper.instance();

      expect(onClickSpy).not.toHaveBeenCalled();

      instance.handleClick();

      expect(onClickSpy).toHaveBeenCalledTimes(1);
      expect(onClickSpy.mock.calls.length).toEqual(1);
    });
  });
});
