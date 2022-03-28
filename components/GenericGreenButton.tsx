import { MouseEventHandler } from 'react';

interface Ingredients {
    text: String,
    click: MouseEventHandler<HTMLButtonElement>
  }

export default function GenericGreenButton({ text, click }:Ingredients) {
  return (
    <button
      onClick={click}
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 my-2 mr-2 rounded"
    >
      {text}
    </button>
  );
}
