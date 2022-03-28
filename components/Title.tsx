interface Title {
    title: String
}


export default function Title({title}:Title) {
  return <h1 className="text-2xl font-bold text-center pr-10">{title}</h1>;
}
