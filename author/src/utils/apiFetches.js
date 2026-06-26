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

const postLoginRequest = async (data) => {
  const response = await fetch(`${ApiUrl}/api/auth/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw error.message;
  }

  return response.json();
};

const getUserDashboardRequest = async () => {
  const response = await fetch(
    `${ApiUrl}/api/users/${localStorage.getItem("username")}`,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }
  );

  if (!response.ok) {
    const { error } = await response.json();
    throw error;
  }

  return response.json();
};

const getSinglePost = async (postId) => {
  const response = await fetch(`${ApiUrl}/api/posts/${postId}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw error;
  }

  return response.json();
};

export {
  postSignupRequest,
  postLoginRequest,
  getUserDashboardRequest,
  getSinglePost,
};
