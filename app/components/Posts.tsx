import { query } from "@/lib/db";

const Posts = async () => {
  const posts = await query({
    query: "SELECT title, long_text FROM posts",
    values: [],
  });

  // const formattedPosts = posts[0];

  let result = Object.values(JSON.parse(JSON.stringify(posts[0])));
  // console.log(result[1])

  return (
    <>
      {result.map((post) => (
        <div>
          <p>{post.title}</p>
          <div dangerouslySetInnerHTML={{ __html: post.long_text }} />
          <hr />
        </div>
      ))}
    </>
  );
};

export default Posts;
