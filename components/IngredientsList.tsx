interface Ingredients {
  ingredients: Ingredient[]
}
interface Ingredient {
  amount: string,
  emoji: string,
  ingredient: string,
  unit: string
}

export default function IngredientsList({ ingredients }: Ingredients) { 
  return (
    <div>
      {ingredients.map( (el, key:number) => (
              <div key={key} className="bg-slate-200 rounded-lg p-2 mt-3 flex flex-row">
              <div className="bg-white w-12 text-4xl text-center pt-1 rounded-lg">
                <span>{el.emoji}</span>
              </div>
              <div className="grow px-2 py-3">
                <span className="font-bold text-lg">{el.ingredient}</span>
              </div>
              <div className="py-3 px-2">
                <span className="text-center text-gray-500">{el.amount}</span>
                <span className="text-center text-gray-500"> {el.unit}</span>
              </div>
            </div>
      ))}

    </div>
  );
}
