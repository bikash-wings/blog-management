export const host = `http://localhost:3000`;

/* USER api routes */

/* method: POST*/
export const signupRoute = `${host}/api/v1/users/signup`;

/* method: POST */
export const loginRoute = `${host}/api/v1/users/login`;

/* method: POST */
export const logoutRoute = `${host}/api/v1/users/logout`;

/* method : POST */
export const forgotPasswordRoute = `${host}/api/v1/users/forgot-password`;

/* method: PUT, params: userid */
export const updateUserRoute = `${host}/api/v1/users/update`;

/* method: GET */
export const allUsersRoute = `${host}/api/v1/users/get-all`;

/* method: POST, params: userid  */
export const uploadAvatarRoute = `${host}/api/v1/users/upload`;

/* method: GET */
export const checkAdminUserRoute = `${host}/api/v1/users/is-admin`;

/* method: GET */
export const usersCountRoute = `${host}/api/v1/users/total-count`;

/* method GET */
export const userProfileRoute = `${host}/api/v1/users/profile`;

/**
 * Below api routes is for Blogs
 *
 */

/* method: POST */
export const addBlogRoute = `${host}/api/v1/blogs/add`;

/* params: blogid , method: GET */
export const singleBlogRoute = `${host}/api/v1/blogs`;

/* method: GET */
export const allBlogsRoute = `${host}/api/v1/blogs/get-all`;

/* params: blogid , method: PUT */
export const updateBlogRoute = `${host}/api/v1/blogs`;

/* params: blogid , method: DELETE */
export const deleteBlogRoute = `${host}/api/v1/blogs`;

/* method: GET */
export const blogsCountRoute = `${host}/api/v1/blogs/total-count`;

/* params: blogid , method: POST */
export const postCommentRoute = `${host}/api/v1/blogs/comments`;

/* params: blogid , method: GET */
export const allCommentsRoute = `${host}/api/v1/blogs/comments`;

/* params: commentid, method: DELETE */
export const deleteCommentRoute = `${host}/api/v1/blogs/comments`;

/* params: blogid , method: POST */
export const likeToggleRoute = `${host}/api/v1/blogs/toggle-like`;

/**
 * Below api routes is for messages
 */

/* method: POST */
export const addNewMessageRoute = `${host}/api/v1/messages`;

/* body: room id, method: GET */
export const allMessagesRoute = `${host}/api/v1/messages`;

/* params: messageid , method: DELETE */
export const deleteMessageRoute = `${host}/api/v1/messages`;

/* params: room id , method: GET */
export const roomMessageCountRoute = `${host}/api/v1/messages/total`;
