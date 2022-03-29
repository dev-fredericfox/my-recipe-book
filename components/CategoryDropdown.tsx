import { useEffect, useState } from "react";
import { MouseEventHandler } from "react";
import { Category } from "../lib/interfaces";

interface Props {
  categories: Category[];
  select: (e: string) => void;
  selected: string;
  addNewCategory: MouseEventHandler<HTMLButtonElement>;
}


export default function CategoryDropdown({
  categories,
  select,
  selected,
  addNewCategory,
}: Props) {
  console.log("categories");
  console.log(categories);
  const [dropDownState, setDropDownState] = useState(false);
  return (
    <div className="mt-1">
      <div
        onClick={() => setDropDownState(!dropDownState)}
        className="relative inline-block text-left"
      >
        <div>
          <button
            type="button"
            className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            {selected == "" ? "Category" : selected}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        {dropDownState && (
          <div
            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
          >
            <div className="py-1" role="none">
              {categories.map((el) => (
                <a
                  href="#"
                  className="text-gray-700 block px-4 py-2 text-sm"
                  role="menuitem"
                  id="menu-item-0"
                  key={el.id}
                  onClick={() => select(el.name)}
                >
                  {el.name}
                </a>
              ))}
              <button
                type="submit"
                className="text-gray-700 block w-full text-left px-4 py-2 text-sm"
                role="menuitem"
                id="menu-item-3"
                onClick={addNewCategory}
              >
                Add new category
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
