import Posts from "./components/Posts";
import AddNewPost from "./components/AddNewPost";

export default function Home() {
  return (
    <main className="">
      <AddNewPost />
      <Posts />
    </main>
  );
}
