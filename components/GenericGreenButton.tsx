import { MouseEventHandler } from 'react';
import InProgress from "../components/InProgressIndicator";
interface Ingredients {
    text: String,
    click: MouseEventHandler<HTMLButtonElement>
    inProgress?: boolean
  }

export default function GenericGreenButton({ text, click, inProgress }:Ingredients) {
  return (
    <div className="relative inline-block">
    <button
      onClick={click}
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 my-2 mr-2 rounded"
    >
      <span className={inProgress ? 'invisible' : ''}>{text}</span>
      {inProgress && <div className="absolute top-3 -left-2 right-0"><InProgress color="green"/></div>}
    </button>
    </div>
  );
}
