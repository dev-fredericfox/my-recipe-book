import { useState } from "react";
import { MouseEventHandler } from "react";

interface Props {
  closeModal: MouseEventHandler<HTMLButtonElement> | any;
  addNewCategoryToDropdown: any;
}

const spinner = (
  <div className="flex flex-row">
  <svg
    role="status"
    className="mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
    viewBox="0 0 100 101"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
      fill="currentColor"
    />
    <path
      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
      fill="currentFill"
    />
  </svg>
  <span>Saving...</span>
  </div>
);

export default function AddCategoryModal({
  closeModal,
  addNewCategoryToDropdown,
}: Props) {
  const [category, setCategory] = useState("");
  const [fetchError, setFetchError] = useState("");
  const [fetchResult, setFetchResult] = useState("");
  const [fetchStatus, setFetchStatus] = useState("");

  const submitData = async () => {
    console.log("clicked submitted");
    const body = {
      name: category,
    };
    console.log(body);
    setFetchStatus("pending");
    try {
      let response = await fetch(`/api/post/addCategory`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      let result = await response.json();
      if (response.status === 403) {
        throw Error("You need to be logged in to add a new Category.");
      }
      if (response.status === 500) {
        throw Error("Database Error");
      }
      if (response.status === 510) {
        throw Error("Duplicate category");
      }
      if (response.status === 200) {
        setFetchResult(result);
        setFetchStatus("OK");
        closeModal();
        addNewCategoryToDropdown(result);
      } else {
        throw Error("Something went wrong");
      }
    } catch (error: any) {
      setFetchError(error.message);
      setFetchStatus("Error");
      console.error(error);
      console.error(error.message);
    }
  };

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="relative inline-block align-bottom bg-slate-50 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-slate-50 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg
                  className="h-6 w-6 text-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Add Category
                </h3>
                <div className="mt-2">
                  <div className="mt-6">
                    <input
                      onChange={(e) => setCategory(e.target.value)}
                      className="rounded-lg pl-5 w-full h-12 px-2"
                      type="text"
                      placeholder="New Category"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={submitData}
            >
              {fetchStatus && spinner} {!fetchStatus && <span>Add</span>}
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
          {fetchError && (
            <div className="bg-gray-50 px-4 pb-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <p>{fetchError}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
