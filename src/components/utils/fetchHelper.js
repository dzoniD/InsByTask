const { uuid } = require("uuidv4");

export const sendCredentials = async (formData, token) => {
  try {
    const response = await fetch(
      " https://dev-mrp.insby.tech/api/session/customer-sign-in",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    return error;
  }
};

export const getToken = async () => {
  const uuids = uuid();

  const encodedUsernameAndPassword = Buffer.from(
    `hQtwpolwKTjUkNAkZGeSiOkhp2OP8UA6TAPyA7bOWLFXTPPJOMzQUOOhLg43uXoFIuA5T4yKySJnHZhhVNWBqfNLcaKBfrAx:lolci3wdjsHDhFsQOnubYma5Zl33BPwE4NA5wftU9qxJnmIkP3ju8qw0F6ECjF4kvmp3SwNuLZrEMQezkFHqOMYjCBVJJzxv`,
    "utf8"
  ).toString("base64");

  try {
    const response = await fetch(
      " https://dev-mrp.insby.tech/api/v2/init/app",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${encodedUsernameAndPassword}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uuid: `${uuids}`, uuidOS: "Windows" }),
      }
    );

    const data = await response.json();
    return data.data.token;
  } catch (error) {
    return error;
  }
};
