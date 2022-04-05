import { useState } from "react";
import DeletionConfirmationModal from "./DeleteConfirmationModal"
interface Props {
  id: number;
  deletePost: any,
  title: String,
}

export default function DeletePost({ id, deletePost, title }: Props) {
  const [deletionModal, setDeletionModal] = useState(false);
  const confirmDeletionAndCloseModal = () => {
    setDeletionModal(false)
    deletePost(id)
  }
  return (
    <div>
      {deletionModal && <DeletionConfirmationModal recipeName={title} confirmDeletionAndCloseModal={confirmDeletionAndCloseModal} cancelAndCloseModal={() => setDeletionModal(false)}/>}
      <div onClick={() => {setDeletionModal(true)}} className="cursor-pointer text-2xl ml-3 my-0 text-center text-red-500 font-extrabold">X</div>
    </div>
  );
}
