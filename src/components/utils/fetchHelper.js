export const sendData = async (formData, token) => {
  console.log(token);
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
  return data;
};
