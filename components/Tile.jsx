import Image from "next/image";
import Link from "next/link";

export default function Tab({feed}){
return (feed.map((el) => {
    const link = `/post/${el.id}`;
    return (
      <div
        className="h-64 sm:h-80 relative rounded-2xl overflow-hidden mx-auto my-6"
        key={el.id}
      >
        <Image
          src={el.coverimg}
          alt="{el.title}"
          layout="fill"
          objectFit="cover"
        ></Image>
        <Link href={link} passHref>
          <div className="relative text-white bg-black bg-opacity-30 h-full">
            <div className="absolute bottom-6 mx-4">
            <p className="font-bold text-2xl">
              {el.title}
            </p>
            <p>{el.ingredients.length} Ingredients | {el.category.name}</p>
            </div>
          </div>
        </Link>
      </div>
    );
  }))
}