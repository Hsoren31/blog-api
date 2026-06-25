const ApiUrl = "http://localhost:3000";

const postSignupRequest = async (data) => {
  const response = await fetch(`${ApiUrl}/api/auth/signup`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const { errors } = await response.json();
    throw errors;
  }

  return response.json();
};

export { postSignupRequest };
