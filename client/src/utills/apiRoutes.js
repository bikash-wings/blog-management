export const host = `http://localhost:3000/api/v1`;

/* USER api routes */

/* method: POST*/
export const signupRoute = `${host}/users/signup`;

/* method: POST */
export const loginRoute = `${host}/users/login`;

/* method: GET */
export const allUsersRoute = `${host}/users/get-all`;

/**
 * Below api routes is for Blogs
 *
 */

/* method: POST */
export const addBlogRoute = `${host}/blogs/add`;

/* params: blogid , method: GET */
export const singleBlogRoute = `${host}/blogs`;

/* method: GET */
export const allBlogsRoute = `${host}/blogs/get-all`;

/* params: blogid , method: PUT */
export const updateBlogRoute = `${host}/blogs`;

/* params: blogid , method: DELETE */
export const deleteBlogRoute = `${host}/blogs`;
