interface Props {
  id: number;
  deletePost: any
}

export default function DeletePost({ id, deletePost }: Props) {
  return (
    <div>
      <div onClick={() => {deletePost(id)}} className="ml-2 text-center text-red-500 font-extrabold">X</div>
    </div>
  );
}
