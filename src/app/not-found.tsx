import Image from "next/image";

function NotFoundPage() {
  return (
    <div className="w-full min-h-screen overflow-hidden flex justify-center items-center">
      <div className="flex justify-center w-[300px] items-center flex-col gap-4">
        <p className="text-[#253C9D] md:text-7xl text-4xl font-semibold uppercase tracking-widest">
          OOPS!
        </p>
        <Image
          width={200}
          height={200}
          alt="not-found"
          src="/images/not-found.png"
        />
        <p className="text-secondary-foreground md:text-4xl sm:text-2xl font-semibold capitalize tracking-wide">
          page not found
        </p>
      </div>
    </div>
  );
}

export default NotFoundPage;
