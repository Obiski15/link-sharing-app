import Image from "next/image";

function NotFoundPage() {
  return (
    <div className="w-full h-[100vh] overflow-hidden flex justify-center items-center">
      <div className="flex justify-center w-[300px] items-center flex-col gap-4">
        <p className="text-[#253C9D] text-7xl font-semibold uppercase tracking-widest">
          OOPS!
        </p>
        <Image
          width={200}
          height={200}
          alt="not-found"
          src="/images/not-found.png"
        />
        <p
          style={{
            wordSpacing: "3px",
          }}
          className="text-secondary-foreground text-4xl font-semibold capitalize tracking-widest"
        >
          page not found
        </p>
      </div>
    </div>
  );
}

export default NotFoundPage;
