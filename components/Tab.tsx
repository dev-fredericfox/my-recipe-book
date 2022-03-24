import { useEffect, useState } from "react";

interface TabProps {
  categories: Categories[];
  filterFunction: React.Dispatch<React.SetStateAction<string>>;
  selected: string;
}

interface Categories {
  category: Category;
}

interface Category {
  name: string;
}

export default function Tab({
  categories,
  filterFunction,
  selected,
}: TabProps) {
  const [localSelected, setLocalSelected] = useState("All");
  const all = "All";
  const cat = categories.map((el) => el.category.name);
  const [tabs, setTabs] = useState(["All"]);
  useEffect(() => {
    const tabsCopy = [all, ...cat];
    setTabs(tabsCopy);
  }, []);

  useEffect(() => {
    if (selected) {
      setLocalSelected(selected);
    }
  }, [selected]);

  return (
    <ul className="flex pb-3 text-sm font-medium text-center text-gray-500 dark:text-gray-400 overflow-y-auto">
      {tabs.map((el, idx) => (
        <li className="mr-2" key={idx}>
          <a
            onClick={() => filterFunction(el)}
            className={`inline-block py-3 px-2 rounded-lg min-w-[60px] ${
              localSelected === el
                ? "text-white bg-blue-600"
                : "hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white"
            }`}
            aria-current="page"
          >
            {el}
          </a>
        </li>
      ))}
    </ul>
  );
}
