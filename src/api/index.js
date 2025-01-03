import axios from 'axios';


const geoAPIToken = process.env.REACT_APP_GEO_API_TOKEN

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
});


export const signUp = (formData) => instance.post(`/accounts/signup`, formData);
export const logIn = (formData) => instance.post(`/accounts/login`, formData);
export const updateAvatar = (formData) => instance.post(`/accounts/avatar`, formData)
export const updateInSettings = (formData) => instance.post(`/accounts/update`, formData)
export const checkUserName = (userName) => instance.get(`/accounts/validate/username/${userName}`)
export const checkEmail = (email) => instance.get(`/accounts/validate/email/${email}`)

export const getUserByName = (userName) => instance.get(`/users/username/${userName}`)
export const getUserById = (userId) => instance.get(`/users/userid/${userId}`)
export const queryUser = (query) => instance.get(`/users/query/${query}`)
export const getLoginTime = (userId) => instance.get(`/users/login/${userId}`)
export const getRandomUsers = (num) => instance.get(`/users/random/${num}`)


export const getPostsById = (userId) => instance.get(`/posts/user/${userId}`)
export const getPostByIdentifier = (identifier) => instance.get(`/posts/identifier/${identifier}`)
export const getPostByPostId = (postId) => instance.get(`/posts/postid/${postId}`)
export const getPostsByName = (userName) => instance.get(`/posts/username/${userName}`)
export const deletePost = (postId) => instance.delete(`/posts/delete/${postId}`)
export const createPost = (formData) => instance.post("/posts/new", formData);
export const getSamplePosts = (limit) => instance.get(`/posts/random/${limit}`);
export const getSamplePostsExcludingSelf = (limit, userId) => instance.get(`/posts/random/others?limit=${limit}&userId=${userId}`);
export const getFriendPostsPaging = (userId, startIndex, limit) => instance.get(`/posts/friends?userId=${userId}&startIndex=${startIndex}&limit=${limit}`);
export const getFavoritePostsPaging = (userId, startIndex, limit) => instance.get(`/posts/favorites?userId=${userId}&startIndex=${startIndex}&limit=${limit}`);
export const updatePost = (formData) => instance.patch(`/posts/update`, formData);
export const getSavedPostsByUserId = (userId) => instance.get(`/posts/saved/userid/${userId}`)


export const followUser = (formData) => instance.post(`/follows/follow`, formData)
export const unfollowUser = (formData) => instance.post(`/follows/unfollow`, formData)
export const getFollowersById = (userId) => instance.get(`/follows/followers/${userId}`)
export const getFolloweesById = (userId) => instance.get(`/follows/followees/${userId}`)
export const checkIsFollowing = (formData) => instance.post(`/follows/check`, formData)
export const getMutualFollowsByUserId = (userId) => instance.get(`/follows/mutual/${userId}`)
export const getRecentFollows = (userId, limit) => instance.get(`/follows/recent?userId=${userId}&limit=${limit}`)


export const likePost = (formData) => instance.post(`/likes/like`, formData)
export const unlikePost = (formData) => instance.post(`/likes/unlike`, formData)
export const checkIsLiked = (formData) => instance.post(`/likes/check`, formData)
export const getLikesByPostId = (postId) => instance.get(`/likes/postid/${postId}`)


export const tagPost = (formData) => instance.post(`/tags/tag`, formData)
export const unTagPost = (formData) => instance.post(`/tags/untag`, formData)
export const checkIsTagged = (formData) => instance.post(`/tags/check`, formData)

export const savePost = (formData) => instance.post(`/saves/save`, formData)
export const unSavePost = (formData) => instance.post(`/saves/unsave`, formData)
export const checkIsSaved = (formData) => instance.post(`/saves/check`, formData)

export const createSession = (formData) => instance.post(`/sessions/new`, formData);
export const fetchSessionsById = (userId) => instance.get(`/sessions/userid/${userId}`);
export const getSessionsBySessionId = (sessionId) => instance.get(`/sessions/sessionid/${sessionId}`);

export const getChatsBySessionId = (sessionId) => instance.get(`/chats/allchats/${sessionId}`);
export const createChat = (formData) => instance.post(`/chats/new`, formData);


export const comment = (formData) => instance.post(`/comments/new`, formData)
export const fetchCommentsByPostId = (postId) => instance.get(`/comments/postid/${postId}`)

export const navigation = (query) => axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?limit=10&proximity=ip&types=place%2Cpostcode%2Caddress&access_token=${geoAPIToken}`)

