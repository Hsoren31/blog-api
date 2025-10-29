export const loginUser = async (userData) => {
  const response = await fetch(`http://localhost:3000/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  if (!response.ok) {
    if (response.status === 400) {
      throw new Error(data.message);
    }
    throw new Error(`HTTP error: Status ${response.status}`);
  }
  return data;
};

export const getAllPosts = async () => {
  try {
    const response = await fetch("http://localhost:3000/posts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("token"),
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error: Status ${response.status}`);
    }
    let postsData = await response.json();
    return postsData.posts;
  } catch (err) {
    return err;
  }
};

export const getPost = async (postId) => {
  const response = await fetch(`http://localhost:3000/posts/${postId}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  if (!response.ok) {
    throw new Error("HTTP Error: Status " + response.status);
  }
  let postData = await response.json();
  return postData.post;
};

export const getComments = async (postId) => {
  try {
    const response = await fetch(
      `http://localhost:3000/posts/${postId}/comments`
    );
    if (!response.ok) {
      throw new Error(`HTTP Status: ${response.status}`);
    }
    const { comments } = await response.json();
    return comments;
  } catch (err) {
    console.log(err);
  }
};

export const createComment = async (postId, userId, text, parentId = null) => {
  try {
    await fetch(`http://localhost:3000/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/JSON",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        userId,
        message: text,
        parentId,
      }),
    });
  } catch (err) {
    console.log(err);
  }
};

export const editComment = async (postId, commentId, text) => {
  try {
    await fetch(`http://localhost:3000/posts/${postId}/comments/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/JSON",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        message: text,
      }),
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteComment = async (postId, commentId) => {
  try {
    await fetch(`http://localhost:3000/posts/${postId}/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  } catch (err) {
    console.log(err);
  }
};
