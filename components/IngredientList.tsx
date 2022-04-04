import { useState } from "react";

interface Ingredients {
  amount: number;
  emoji: string;
  ingredient: string;
  unit: string;
}

export default function IngredientList({
  emoji,
  ingredient,
  amount,
  unit,
}: Ingredients) {
  const [gathered, setGathered] = useState(false);
  return (
    <div>
      <div
      key={ingredient}
        onClick={() => setGathered(!gathered)}
        className={`bg-slate-200 rounded-lg p-2 mt-3 flex flex-row border-2 border-slate-200 ${gathered ? 'border-green-600':''}`}
      >
        <div className="bg-white w-12 text-4xl text-center pt-1 rounded-lg">
          <span>{emoji}</span>
        </div>
        <div className="grow px-2 py-3">
          <span className="font-bold text-lg">{ingredient}</span>
        </div>
        <div className="py-3 px-2">
          <span className="text-center text-gray-500">
            {amount}
          </span>
          <span className="text-center text-gray-500"> {unit}</span>
        </div>
      </div>
    </div>
  );
}
