import { Post } from "../lib/interfaces";

interface Props {
  post: Post[]
}
  
  export default function DashboardPosts({ post }: Props) { 
    return (
      <div>
        {post.map( (el, key:number) => (
                <div key={key} className="bg-slate-200 rounded-lg p-2 mt-3 flex flex-row">
                <div className="bg-white w-12 text-4xl text-center pt-1 rounded-lg">
                  <span>{el.category.categoryEmoji}</span>
                </div>
                <div className="grow px-2 py-3">
                  <span className="font-bold text-lg">{el.title}</span>
                </div>
                <div className="py-3 px-2">
                  <span className="text-center text-gray-500">Publish/Pause</span>
                  <span className="text-center text-gray-500"> Delete</span>
                </div>
              </div>
        ))}
  
      </div>
    );
  }
  