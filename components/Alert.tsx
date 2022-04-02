import { useState, useEffect } from "react";
interface Props {
  message: string;
  hideAlert: () => void;
}

export default function Alert({ message, hideAlert }: Props) {
  const [widthStyle, setWidthStyle] = useState("100%");
  useEffect(() => {
    let localtimer = 100;
    const interval = setInterval(() => {
      localtimer = localtimer - 0.1;
      width(localtimer);
      if (localtimer < 0) {
        hideAlert();
        localtimer = 100;
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval);
  }, []);

  const width = (timer: number) => {
    setWidthStyle(`${timer}%`);
  };

  return (
    <div className="absolute w-4/12 top-0 left-0 right-0 mx-auto">
      <div className="w-full bg-gray-200 h-2 dark:bg-gray-700 shadow-md">
        <div
          className={`bg-orange-600 h-2 shadow-md}`}
          style={{ width: widthStyle }}
        ></div>
      </div>
      <div
        className="bg-orange-100 rounded-b text-orange-900 px-4 py-3 shadow-md"
        role="alert"
      >
        <div className="flex">
          <div className="py-1">
            <svg
              className="fill-current h-6 w-6 text-teal-500 mr-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
            </svg>
          </div>
          <div>
            <p className="font-bold mt-1">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
