export const host = `http://localhost:3000`;

/* USER api routes */

/* method: POST*/
export const signupRoute = `${host}/api/v1/users/signup`;

/* method: POST */
export const loginRoute = `${host}/api/v1/users/login`;

/* method : POST */
export const forgotPasswordRoute = `${host}/api/v1/users/forgot-password`;

/* method: PUT, params: userid */
export const updateUserRoute = `${host}/api/v1/users/update`;

/* method: GET */
export const allUsersRoute = `${host}/api/v1/users/get-all`;

/* method: POST, params: userid  */
export const uploadAvatarRoute = `${host}/api/v1/users/upload`;

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
