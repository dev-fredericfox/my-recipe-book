import Image from "next/image";

export default function NoRecpie() {
  return (
    <div>
      <p className="text-center mt-6 mb-10 text-gray-500">No recipe found!</p>
      <div className="h-40 w-40 mx-auto relative">
        <Image
          src={"/Smiling Bowl_slate_300.svg"}
          alt="Cute noodle bowl"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </div>
  );
}
