"use client";

import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  message: string;
}

function Popup({ message }: Props) {
  const [displayMessage, setDisplayMessage] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setDisplayMessage(false), 5000);
  }, []);

  if (displayMessage)
    return createPortal(
      <div className="border-border border-2 flex justify-between items-center absolute top-[90%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <Save />
        {message}
        <p>print</p>
      </div>,
      document.body
    );
  return;
}

export default Popup;
