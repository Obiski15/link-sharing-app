import Image from "next/image";

function Loading() {
  return (
    <div className="bg-primary col-span-3 md:col-span-2 flex justify-center items-center h-[579px]">
      <div className="flex flex-col justify-between items-center gap-4">
        <Image
          src="/images/links.png"
          alt="loading-links"
          width={100}
          height={100}
        />
        <p className="text-6xl text-secondary-foreground tracking-wide font-bold">
          Getting things ready
        </p>
        <p className="font-medium text-md text-secondary-foreground tracking-wide">
          Please Wait...
        </p>
      </div>
    </div>
  );
}

export default Loading;
