import { createPortal } from "react-dom";
import { useEffect } from "react";

function OnScreenMessage({
  Icon,
  message,
  timeout,
  setDisplayUpdateMessage,
}: {
  setDisplayUpdateMessage: React.Dispatch<React.SetStateAction<boolean>>;
  Icon: any;
  message: string;
  timeout: number;
}) {
  useEffect(() => {
    const id = setTimeout(() => {
      setDisplayUpdateMessage(false);
    }, timeout);

    return () => clearTimeout(id);
  }, [setDisplayUpdateMessage, timeout]);

  return createPortal(
    <div
      className="transition ease-in-out duration-75 fixed top-[90%] py-4 px-6 text-background left-[50%] translate-x-[-50%] translate-y-[-50%] tr flex justify-between items-center gap-2 bg-[#333333] shadow-[0px 0px 32px 0px #0000001A rounded-lg leading-2 text-md;
]"
    >
      <Icon />
      <span>{message}</span>
    </div>,
    document.body
  );
}

export default OnScreenMessage;
