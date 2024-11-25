"use client";

import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { toast } from "@/components/hooks/use-toast";
import { useEffect, useRef, useState } from "react";
import { Equal, Link } from "lucide-react";
import Image from "next/image";

import { useUpdateLink } from "../useUpdateLink";
import { useDeleteLink } from "../useDeleteLink";
import { useAddLink } from "../useAddLink";
import { icons } from "@/lib/constants";
import { useLinks } from "../useLinks";

import FormInput from "@/components/FormInput";
import Dropdown from "@/components/Dropdown";
import Heading from "@/components/Heading";
import Button from "@/components/Button";

interface objectValues {
  url: string;
  platform: string;
  _id?: string;
  userId?: string;
}

interface formValues {
  links: objectValues[];
}

export default function Links() {
  const { mutateAsync: addLink, isLoading: isAddingLink } = useAddLink();
  const { mutateAsync: updateLink, isLoading: isUpdatingLinks } =
    useUpdateLink();
  const { mutateAsync: deleteLink, isDeleting } = useDeleteLink();
  const { data: dbLinks = {}, isLoading: isLoadingLinks, error } = useLinks();

  const [isActive, setIsActive] = useState<string>("");
  const submitButton = useRef<HTMLButtonElement>(null);

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formValues>({
    defaultValues: {
      links: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  useEffect(() => {
    if (error) {
      toast({
        duration: 3000,
        title: "An error occured!",
        variant: "destructive",
        description: error.message,
      });
    }

    if (dbLinks?.data?.links) {
      reset({ links: [...dbLinks.data.links] });
    }
  }, [error, dbLinks, reset]);

  async function onSubmit(data: formValues) {
    const toBeUpdated: objectValues[] = [];
    const toBeAdded: objectValues[] = [];
    let toBeRemoved: objectValues[] = [...dbLinks.data.links];

    data.links.forEach((link) => {
      if (link._id) {
        toBeRemoved = toBeRemoved.filter((item) => item._id !== link._id);
        const dbLink = dbLinks.data.links.find(
          (item: objectValues) => item._id === link._id
        );

        if (dbLink.url !== link.url || dbLink.platform !== link.platform) {
          toBeUpdated.push(link);
        }
      } else {
        toBeAdded.push(link);
      }
    });

    try {
      const successful = await Promise.all([
        Promise.all(toBeAdded?.map((link) => addLink(link))) ??
          Promise.resolve(),

        Promise.all(toBeUpdated?.map((link) => updateLink(link))) ??
          Promise.resolve(),

        Promise.all(toBeRemoved?.map((link) => deleteLink(link._id!))) ??
          Promise.resolve(),
      ]);

      if (toBeAdded.length + toBeUpdated.length + toBeRemoved.length > 0) {
        if (successful)
          toast({
            duration: 3000,
            variant: "success",
            title: "Success!",
            description: "Links Updated!",
          });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "An Error Occured!",
        description: error.message,
      });
    }
  }

  const watchedForm = useWatch({
    control,
    name: "links",
  });

  return (
    <div className="bg-primary col-span-3 md:col-span-2 rounded-xl">
      <div className="p-10 flex flex-col gap-10 justify-between items-start">
        <div className="w-full">
          <Heading type="medium">Customize your links</Heading>
          <p className="text-secondary-foreground leading-2 text-md font-normal">
            Add/edits/remove links below and the share all your profiles to the
            world
          </p>
        </div>

        <div className="w-full flex flex-col justify-between items-start gap-6">
          <Button
            variant="secondary"
            type="full"
            disabled={
              isAddingLink ||
              isLoadingLinks ||
              isUpdatingLinks ||
              isDeleting ||
              fields.length === 5
            }
            onClick={() => {
              append({
                url: "https://www.github.com/username",
                platform: "github",
              });
            }}
          >
            + Add new link
          </Button>

          {fields.length + dbLinks?.data?.links.length > 0 ? (
            <form
              onSubmit={handleSubmit(onSubmit)}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.preventDefault();
                return;
              }}
              className="w-full flex flex-col gap-2"
            >
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="w-full bg-secondary rounded-xl p-5 flex flex-col justify-between items-start gap-3"
                >
                  <div className="w-full flex justify-between items-center">
                    <div className="flex justify-between items-center">
                      <Equal width={12} className="text-secondary-foreground" />
                      <p>Link #{index + 1}</p>
                    </div>
                    <button
                      disabled={
                        isAddingLink ||
                        isLoadingLinks ||
                        isUpdatingLinks ||
                        isDeleting
                      }
                      className="text-secondary-foreground font-normal leading-2 text-md cursor-pointer hover:underline"
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                  <FormInput
                    label="Link"
                    name={`link-${index}`}
                    type="text"
                    register={{
                      ...register(`links.${index}.url` as const, {
                        required: {
                          value: true,
                          message: "kindly provide a valid url",
                        },
                        pattern: {
                          value: icons.find(
                            (icon) => icon.name === watchedForm[index]?.platform
                          )?.pattern!,
                          message: "Invalid profile URL",
                        },

                        onBlur: () => {
                          setIsActive("");
                        },
                      }),
                    }}
                    setIsActive={setIsActive}
                    isActive={isActive}
                    placeholder="e.g. www.obiskitv.com"
                    error={errors?.links?.[index]?.url?.message}
                    id={`link-${index}`}
                    Icon={Link}
                  />
                  <Dropdown
                    defaultValue={field.platform}
                    control={control}
                    index={index}
                  />
                </div>
              ))}
              <button ref={submitButton} type="submit"></button>
            </form>
          ) : (
            <div className="w-full bg-secondary rounded-xl p-5">
              <div className="my-10 flex flex-col justify-between items-center gap-10">
                <Image
                  src="/images/get-started.png"
                  alt="get-started"
                  width={250}
                  height={160}
                />

                <div className="text-center flex flex-col justify-between items-center gap-6">
                  <Heading type="medium">Let&apos;s get you started</Heading>
                  <p className="text-md leading-2 font-normal text-secondary-foreground max-w-[490px]">
                    Use &lsquo;Add new link&rsquo; button to get started. One
                    you have more than one link, you can re-order and edit them.
                    We&apos;re here to here you share your profile with
                    everyone!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="px-10 py-6 flex justify-end items-center border-t-[1px] border-border">
        <Button
          variant="primary"
          disabled={
            fields.length + dbLinks?.data?.links.length === 0 ||
            isAddingLink ||
            isLoadingLinks ||
            isUpdatingLinks ||
            isDeleting
          }
          onClick={async () => {
            submitButton.current?.click();
          }}
        >
          Save
        </Button>
      </div>{" "}
    </div>
  );
}
