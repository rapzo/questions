import React from "react";
import merge from "lodash/merge";
import { expect } from "chai";

const questionCode1 = {
  response: {
    userId: "wd-345-f",
    resourceType: "resource",
    resourceId: "ef-456-h",
    permissions: {
      "as-456-a": {
        id: "as-456-a",
        attributes: {
          tokens: [
            { name: "resource:open_file" },
            { name: "resource:delete_file" },
            { name: "resource:transfer_file" }
          ]
        }
      },
      "as-456-b": {
        id: "as-456-b",
        attributes: {
          tokens: [
            { name: "resource:add_user" },
            { name: "resource:remove_user" },
            { name: "resource:suspend_user" }
          ]
        }
      }
    }
  }
};

const questionCode2 = {
  permissions: {
    "as-456-a": {
      id: "as-456-a",
      attributes: {
        userId: "wd-345-f",
        resourceType: "resource",
        resourceId: "ef-456-h",
        tokens: [
          { name: "open_file" },
          { name: "delete_file" },
          { name: "transfer_file" }
        ]
      }
    },
    "as-456-b": {
      id: "as-456-b",
      attributes: {
        userId: "wd-345-f",
        resourceType: "resource",
        resourceId: "ef-456-h",
        tokens: [
          { name: "add_user" },
          { name: "remove_user" },
          { name: "suspend_user" }
        ]
      }
    }
  }
};

const mergeWithoutLodash = () => {
  const {
    response: { permissions, userId, resourceType, resourceId }
  } = questionCode1;
  const values = Object.values(permissions);

  return {
    permissions: values.reduce(
      (acc, { id, attributes }) => ({
        ...acc,
        [id]: {
          id,
          attributes: {
            userId,
            resourceType,
            resourceId,
            tokens: attributes.tokens.map(({ name }) => ({
              name: name.split(":").pop()
            }))
          }
        }
      }),
      {}
    )
  };
};

const testWithoutLodash = () => {
  try {
    expect(mergeWithoutLodash()).to.deep.equal(questionCode2);
    return "pass";
  } catch (e) {
    return "fail";
  }
};

const codeWithoutLodash = `const mergeWithoutLodash = () => {
  const {
    response: { permissions, userId, resourceType, resourceId }
  } = questionCode1;
  const values = Object.values(permissions);

  return {
    permissions: values.reduce(
      (acc, { id, attributes }) => ({
        ...acc,
        [id]: {
          id,
          attributes: {
            userId,
            resourceType,
            resourceId,
            tokens: attributes.tokens.map(({ name }) => ({
              name: name.split(":").pop()
            }))
          }
        }
      }),
      {}
    )
  };
};`;

const mergeWithLodash = () => {
  const {
    response: { permissions, userId, resourceType, resourceId }
  } = questionCode1;

  const values = Object.values(permissions);

  return {
    permissions: merge(
      ...values.map(({ id, attributes }) => ({
        [id]: {
          id,
          attributes: {
            userId,
            resourceType,
            resourceId,
            tokens: attributes.tokens.map(({ name }) => ({
              name: name.split(":").pop()
            }))
          }
        }
      }))
    )
  };
};

const testWithLodash = () => {
  try {
    expect(mergeWithLodash()).to.deep.equal(questionCode2);
    return "pass";
  } catch (e) {
    return "fail";
  }
};

const codeWithLodash = `const mergeWithLodash = () => {
  const {
    response: { permissions, userId, resourceType, resourceId }
  } = questionCode1;

  const values = Object.values(permissions);

  return {
    permissions: merge(
      ...values.map(({ id, attributes }) => ({
        [id]: {
          id,
          attributes: {
            userId,
            resourceType,
            resourceId,
            tokens: attributes.tokens.map(({ name }) => ({
              name: name.split(":").pop()
            }))
          }
        }
      }))
    )
  };
};`;

export const Question2 = () => (
  <>
    <h2>2. Data Transformation</h2>
    <p>The following data was received in a response:</p>
    <pre>
      <code>{JSON.stringify(questionCode1, null, 2)}</code>
    </pre>

    <p>The data needs to be in the following form:</p>
    <pre>
      <code>{JSON.stringify(questionCode2, null, 2)}</code>
    </pre>

    <p>
      What code would you write to achieve this? Consider using the{" "}
      <code>merge</code> function from <code>lodash</code>.
    </p>
  </>
);

export const Answer2 = () => (
  <div className="answer">
    <h3>Answer</h3>

    <h4>Without lodash</h4>
    <h5>code</h5>
    <pre>
      <code>{codeWithoutLodash}</code>
    </pre>
    <p>
      test: <strong>{testWithoutLodash()}</strong>
    </p>

    <h4>With lodash</h4>
    <h5>code</h5>
    <pre>
      <code>{codeWithLodash}</code>
    </pre>
    <p>
      test: <strong>{testWithLodash()}</strong>
    </p>
  </div>
);
