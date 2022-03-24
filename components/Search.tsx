import { SearchIcon } from '@heroicons/react/solid'

interface Search {
  searchFunction: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function Search({ searchFunction }: Search) {
  const handleChange = (event: any) => {
    searchFunction(event.target.value);
  };

  return (
    <div className="mb-4">
        <SearchIcon className="absolute mt-3 ml-2 h-6 w-6 text-slate-400"/>
      <input
        className="rounded-lg pl-10 w-full h-12 px-2"
        type="text"
        placeholder="Curry, Udon, Pizza..."
        onChange={handleChange}
      />
    </div>
  );
}