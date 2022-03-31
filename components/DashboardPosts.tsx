import { useState } from "react";
import { Post } from "../lib/interfaces";
import Link from "next/link";
import PublishUnpublish from "../components/PublishUnpublish";
import DeletePost from "../components/DeletePost";
import { saveToDB } from "../lib/fetchHelper";

interface Props {
  post: Post[];
}

export default function DashboardPosts({ post }: Props) {
  const [posts, setPosts] = useState(post);
  const [fetchError, setFetchError] = useState("");
  const [fetchResult, setFetchResult] = useState("");
  const [fetchStatus, setFetchStatus] = useState("");
  const [inProgressDeletionColor, setInProgressDeletionColor] = useState<number|null>()

  const deletePost = async (id: number) => {
    setFetchStatus("PROGRESS");
    setInProgressDeletionColor(id)
    try {
      const result = await saveToDB("DELETE", id);
      setFetchResult(result);
      setFetchStatus("OK");
      const cache = [...posts]
      const postsMinusDeleted = cache.filter(el => el.id !== id)
      setPosts(postsMinusDeleted)
      setInProgressDeletionColor(null)
    } catch(error:any) {
      setFetchResult("Failed");
      setFetchError(error.message)
    }
  };

  return (
    <div>
      {posts.map((el, key: number) => (
        <div
          key={key}
          className={`${inProgressDeletionColor === el.id ?'bg-red-400': 'bg-slate-200'} rounded-lg p-2 mt-3 flex flex-row`}
        >
          <div className="bg-white w-12 text-4xl text-center pt-1 rounded-lg">
            <span>{el.category.categoryEmoji}</span>
          </div>
          <div className="grow px-2 py-3">
            <span className="font-bold text-lg">
              <Link href={`/edit/${el.id}`}>{el.title}</Link>
            </span>
          </div>
          <div className="flex flex-row py-3 px-2">
            <PublishUnpublish status={el.published} id={el.id} />
            <DeletePost id={el.id} deletePost={deletePost} />
          </div>
        </div>
      ))}
    </div>
  );
}
