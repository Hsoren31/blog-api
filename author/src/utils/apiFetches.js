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
    `${ApiUrl}/api/users/${JSON.parse(localStorage.getItem("user")).username}`,
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

const writePostRequest = async (postData) => {
  const response = await fetch(`${ApiUrl}/api/posts`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "content-type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw error;
  }

  return response.json();
};

const putPostRequest = async (postId, postData) => {
  const response = await fetch(`${ApiUrl}/api/posts/${postId}`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "content-type": "application/json",
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    const { error } = await response.json();
    throw error;
  }

  return response.json();
};

const deletePostRequest = async (postId) => {
  const response = await fetch(`${ApiUrl}/api/posts/${postId}`, {
    method: "DELETE",
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

const getAccountRequest = async () => {
  const response = await fetch(
    `${ApiUrl}/api/users/${JSON.parse(localStorage.getItem("user")).username}`,
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

const putAccountRequest = async (accountData) => {
  const response = await fetch(
    `${ApiUrl}/api/users/${JSON.parse(localStorage.getItem("user")).username}`,
    {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "content-type": "application/json",
      },
      body: JSON.stringify(accountData),
    }
  );

  if (!response.ok) {
    const { errors } = await response.json();
    throw errors;
  }

  return response.json();
};

const deleteAccountRequest = async () => {
  const response = await fetch(
    `${ApiUrl}/api/users/${JSON.parse(localStorage.getItem("user")).username}`,
    {
      method: "DELETE",
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

export {
  postSignupRequest,
  postLoginRequest,
  getUserDashboardRequest,
  getSinglePost,
  writePostRequest,
  putPostRequest,
  deletePostRequest,
  getAccountRequest,
  putAccountRequest,
  deleteAccountRequest,
};
