interface Color {
  color: string;
}

const colors = (col: string) => {
  if (col === "orange") {
    return (
      <span className="flex mx-auto h-3 w-3 mr-4 mt-3 cursor-wait">
        <span
          className={`animate-ping relative inline-flex rounded-full h-3 w-3 bg-orange-500`}
        ></span>
      </span>
    );
  }
  if (col === "green") {
    return (
      <span className="flex mx-auto h-3 w-3 mt-3 cursor-wait">
        <span
          className={`animate-ping relative inline-flex rounded-full h-3 w-3 bg-green-200`}
        ></span>
      </span>
    );
  } else {
    return (
      <span className="flex mx-auto h-3 w-3 mr-4 mt-3 cursor-wait">
        <span
          className={`animate-ping relative inline-flex rounded-full h-3 w-3 bg-white-500`}
        ></span>
      </span>
    );
  }
};

export default function InProgress({ color }: Color) {
  return <div>{colors(color)}</div>;
}
