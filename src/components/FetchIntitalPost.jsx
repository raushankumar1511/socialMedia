import { useEffect, useContext } from "react";
import { PostList as PostListData } from "../store/post-list-store";

const FtechInitialPost = ({ setFetching }) => {
  const { postList, addInitialPosts } = useContext(PostListData);

  useEffect(() => {
    setFetching(true);
    const controller = new AbortController();
    const signal = controller.signal;

    fetch("https://dummyjson.com/posts", { signal })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.posts);

        addInitialPosts(data.posts);
        setFetching(false);
      });

    return () => {
      console.log("cleaning up the useEffect");
      controller.abort("it has been aborted");
    };
  }, []);
};
export default FtechInitialPost;
