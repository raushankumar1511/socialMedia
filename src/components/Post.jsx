import { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { PostList as PostListData } from "../store/post-list-store";

const Post = ({ post }) => {
  const { deletePost, increaseLikes } = useContext(PostListData);
  return (
    <div className="card feature col post-card">
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <span
          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger delete-icon"
          onClick={() => deletePost(post.id)}
        >
          <MdDelete />
        </span>
        <p className="card-text">{post.body}</p>
        {post.tags.map((tag) => (
          <span className=" hashtag" key={tag}>
            {tag}
          </span>
        ))}
        <button
          type="button"
          className="btn text-bg-success reactions"
          onClick={() => increaseLikes(post.id)}
        >
          Likes
          <span className="badge text-bg-secondary no-of-likes">
            {post.reactions.likes}
          </span>
        </button>
      </div>
    </div>
  );
};
export default Post;
