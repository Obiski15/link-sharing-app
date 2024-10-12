"use client";

import { Controller } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { icons } from "@/lib/constants";

function Dropdown({
  index,
  control,
  defaultValue,
}: {
  handleFieldChangeCheck?: () => void;
  defaultValue?: string;
  id?: number | string;
  control: any;
  index: number;
}) {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <Controller
      name={`links.${index}.platform`}
      control={control}
      rules={{ required: true }}
      render={({ field, fieldState: { error } }) => (
        <Select
          {...field}
          defaultValue={defaultValue}
          onValueChange={field.onChange}
          onOpenChange={() => {
            setIsActive((active) => !active);
          }}
        >
          <SelectTrigger
            className={`h-[48px] ${
              isActive
                ? "border-border-active shadow-[0px_0px_32px_0px_#633cff40]"
                : error
                ? "border-error"
                : "border-border"
            } rounded-lg p-3 px-4 text-md leading-2 focus:ring-transparent`}
          >
            <SelectValue placeholder="Platform" className="" />
          </SelectTrigger>
          <SelectContent className="border-border border-[1px] bg-primary rounded-lg py-3 px-4 gap-3">
            {icons.map((icon, index) => (
              <SelectItem
                key={index + 1}
                value={icon.name}
                className="capitalize focus:text-primary-foreground"
              >
                <div className="flex justify-between items-center gap-2 ">
                  <Image
                    width={16}
                    height={16}
                    alt={`${icon.name}-icon`}
                    src={icon.path}
                  />
                  <p>{icon.name}</p>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
}

export default Dropdown;
