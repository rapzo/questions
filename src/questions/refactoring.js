import React from "react";
import PropTypes from "prop-types";

const questionCode = `const items = [
  { id: 1, name: 'Hello', colours: [1, 2, 3] },
  { id: 2, name: 'There', colours: [1, 5, 2] },
];

const MyComponent = () => (
  <Grid>
    {items.map(({ id, name, colours }) => (
      <Grid.Column key={id}>
        <Header>{name}</Header>
        {colours.map(colour => <ColourIcon colour={colour} />)}
      </Grid.Column>
    ))}
  </Grid>
);`;

export const Question1 = () => (
  <>
    <h2>1. Refactoring</h2>
    <p>How would you improve the following code to make it clearer?</p>
    <pre>
      <code>{questionCode}</code>
    </pre>
  </>
);

const items = [
  { id: 1, name: "Hello", colours: [1, 2, 3] },
  { id: 2, name: "There", colours: [1, 5, 2] }
];

// Mocks
const Grid = ({ children }) => <div className="grid">{children}</div>;

Grid.Column = ({ children }) => <div className="column">{children}</div>;

const Header = ({ children }) => <div className="title">{children}</div>;

const ColourIcon = ({ colour }) => <span>{colour}</span>;

// Original
const MyComponent = () => (
  <Grid>
    {items.map(({ id, name, colours }) => (
      <Grid.Column key={id}>
        <Header>{name}</Header>
        {colours.map(colour => (
          <ColourIcon colour={colour} />
        ))}
      </Grid.Column>
    ))}
  </Grid>
);

// Refactored
const RefactoredComponent = () => (
  <Grid>
    {items.map(({ id, name, colours }) => (
      <Grid.Column key={id}>
        <Item {...{ id, name, colours }} />
      </Grid.Column>
    ))}
  </Grid>
);

const Item = ({ id, name, colours }) => (
  <>
    <Header>{name}</Header>
    {colours.map((colour, i) => (
      <ColourIcon key={`${id}-colour-${i}`} colour={colour} />
    ))}
  </>
);

Item.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  colours: PropTypes.arrayOf(PropTypes.number)
};

const answerCode = `Component = () => (
  <Grid>
    {items.map(({ id, name, colours }) => (
      <Grid.Column key={id}>
        <Item {...{ id, name, colours }} />
      </Grid.Column>
    ))}
  </Grid>
);

const Item = ({ id, name, colours }) => (
  <>
    <Header>{name}</Header>
    {colours.map((colour, i) => (
      <ColourIcon key={\`\${id}-colour-\${i}\`} colour={colour} />
    ))}
  </>
);

Item.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  colours: PropTypes.arrayOf(PropTypes.Number)
};`;

export const Answer1 = () => (
  <div className="answer">
    <h3>Answer</h3>

    <pre>
      <code>{answerCode}</code>
    </pre>

    <div className="sandbox">
      <h4>Sandbox</h4>

      <h5>Original Component</h5>
      <MyComponent />

      <h5>Refactored Component</h5>
      <RefactoredComponent />
    </div>

    <div className="explanation">
      <h4>Conclusion</h4>
      <p>
        The strategy used for the refactor is{" "}
        <strong>Divide and Conquer</strong>: The smaller the components the
        easier is to test the unit, testing the original component meant mockig{" "}
        <code>Grid</code>, <code>Grid.Column</code>, <code>Header</code> and{" "}
        <code>ColourIcon</code>.
      </p>
      <p>
        Every change on the deepest level (<code>Grid.Column</code> content)
        implies reworking the whole test suit for the Component.
      </p>
      <p>
        Besides that, we can apply as well{" "}
        <strong>Separation of Concerns</strong>, which, in this case, we can
        have a component that represents the layout grid structure and test
        accordingly and have a component that represents what should be
        presented in the grid.
      </p>
      <p>
        With this technique it is possible to extract the component that wraps
        the grid into a multi-purpose, yet, with reduced responsability
        component. This technique is also known as single responsability, the
        first of the <strong>SOLID Principles</strong> that every developer
        should have in mind.
      </p>
      <p>
        The <code>Item</code> component is unaware of its place on the layout,
        which makes it flexible as a unit without compromising what it is
        responsible for, which is, representing an item.
      </p>
      <p>
        Important to notice that the original component had no input validation.
        While this is the simplest form of input validation in the React
        ecosystem it is still valuable, at least for development purposes,
        enforcing the nature of what it is provided to the component in order to
        work as expected and be predictable.
      </p>
      <p>
        While refactoring may be associated with reducing code, it almost never
        is: in this case, refactoring meant turning the code reusable,
        predictable and easier to read and test as units.
      </p>
    </div>
  </div>
);
