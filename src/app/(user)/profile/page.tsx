"use client";

import { toast } from "@/components/hooks/use-toast";
import { useEffect, useRef, useState } from "react";
import { Image, Save } from "lucide-react";
import { useForm } from "react-hook-form";

import { useUpdateUser } from "../useUpdateUser";
import { useUser } from "../useUser";

import OnScreenMessage from "@/components/OnScreenMessage";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import Input from "@/components/Input";

interface Inputs {
  firstName: string;
  lastName: string;
  email?: string;
}

function Profile() {
  const imageUploadButton = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const [displayUpdateMessage, setDisplayUpdateMessage] =
    useState<boolean>(false);
  const [imagePath, setImagePath] = useState<string | undefined>("");
  const [image, setImage] = useState<File | null>(null);
  const [isActive, setIsActive] = useState<string>("");

  const { updateData, isUpdating } = useUpdateUser();
  const { data: user = {}, isLoading, error } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "An error occured!",
        description: error.message,
      });
    }

    if (user?.user?.image) {
      setImagePath(user?.user?.image);
    }
  }, [error, user]);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.currentTarget.files;
    const file: File | undefined = files?.[0];

    if (file) {
      const imagePreview = document.getElementById("upload-image-background");
      const imageURL = URL.createObjectURL(file);
      setImage(file);

      imagePreview!.style.backgroundImage = `url(${imageURL})`;
    }
  }

  async function onSubmit(data: Inputs) {
    if (
      user.user?.firstName === data.firstName &&
      user.user?.lastName === data.lastName &&
      !image
    )
      return;
    updateData(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        image: image || user?.user?.image,
      },
      {
        onSuccess: () => {
          setDisplayUpdateMessage(true);
        },
      }
    );
  }

  return (
    <div className="bg-primary grid col-span-3 md:col-span-2 rounded-xl">
      <div className="p-10 flex flex-col gap-10 justify-between items-start">
        <div className="w-full">
          <Heading type="medium">Profile Details</Heading>
          <p className="text-secondary-foreground leading-2 text-md font-normal">
            Add your details to create a personal touch of your profile
          </p>
        </div>

        <div className="w-full flex flex-col justify-between items-start gap-6">
          <div className="w-full bg-secondary rounded-xl p-5">
            <div className="grid template grid-cols-3 justify-between items-center gap-4">
              <p className="col-span-3 sm:col-span-1 text-secondary-foreground text-md font-normal leading-2">
                Profile picture
              </p>

              <div className="col-span-3 sm:col-span-2 flex flex-col sm:flex-row justify-start items-start sm:items-center gap-6">
                <div
                  style={{ backgroundImage: `url(${imagePath})` }}
                  id="upload-image-background"
                  className="cursor-pointer relative w-[193px] h-[193px] bg-center bg-cover bg-primaryButton/30 active:bg-secondaryButton-active rounded-xl"
                  onClick={() => imageUploadButton.current?.click()}
                >
                  <div
                    className={`flex flex-col justify-between ${
                      image || imagePath
                        ? "text-background"
                        : "text-primary-foreground"
                    } items-center gap-2 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]`}
                  >
                    {/* eslint-disable-next-line */}
                    <Image width={33} height={28} strokeWidth={2.25} />
                    {image || imagePath ? (
                      <span className="text-center font-semibold text-md leading-2">
                        +&nbsp;Change&nbsp;Image
                      </span>
                    ) : (
                      <span className="text-center font-semibold text-md leading-2">
                        +&nbsp;Upload&nbsp;Profile
                      </span>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={imageUploadButton}
                    name="user-image"
                    accept="image/*"
                    hidden
                    onChange={handleFileChange}
                  />
                </div>
                <p className="text-secondary-foreground text-md font-normal leading-2">
                  Image must be below 1024x1024px.
                  <br />
                  Use PNG or JPG format.
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
            className="flex flex-col justify-between items-start p-5 rounded-xl bg-secondary gap-3 w-full"
          >
            <div className="w-full flex justify-between flex-col min-[500px]:flex-row items-start min-[500px]:items-center gap-4">
              <label
                htmlFor="first-name"
                className={`text-secondary-foreground font-normal text-md leading-2 relative after:content-['*'] after:absolute after:top-[-5px] after:right-[-10px] after:font-bold ${
                  errors?.firstName?.message
                    ? "after:text-error after:text-md"
                    : "after:text-secondary-foreground"
                }`}
              >
                First name
              </label>
              <Input
                disabled={isLoading}
                defaultValue={user.user?.firstName}
                id="first-name"
                type="text"
                name="first-name"
                placeholder="Emmanuel"
                error={errors?.firstName?.message}
                isActive={isActive}
                setIsActive={setIsActive}
                register={{
                  ...register("firstName", {
                    required: "First name is required",
                    onBlur: () => setIsActive(""),
                  }),
                }}
              />
            </div>

            <div className="w-full flex flex-col min-[500px]:flex-row items-start min-[500px]:items-center justify-between gap-4">
              <label
                htmlFor="last-name"
                className={`text-secondary-foreground font-normal text-md leading-2 relative after:content-['*'] after:absolute after:top-[-5px] after:right-[-10px] after:font-bold ${
                  errors?.lastName?.message
                    ? "after:text-error after:text-md"
                    : "after:text-secondary-foreground"
                }`}
              >
                Last name
              </label>
              <Input
                disabled={isLoading}
                defaultValue={user.user?.lastName}
                id="last-name"
                type="text"
                name="last-name"
                placeholder="Obi"
                error={errors?.lastName?.message}
                isActive={isActive}
                setIsActive={setIsActive}
                register={{
                  ...register("lastName", {
                    required: "Last name is required",
                    onBlur: () => setIsActive(""),
                  }),
                }}
              />
            </div>

            <div className="w-full flex justify-between flex-col min-[500px]:flex-row items-start min-[500px]:items-center gap-4">
              <label
                htmlFor="email"
                className="text-secondary-foreground font-normal text-md leading-2"
              >
                Email
              </label>
              <Input
                disabled={true}
                defaultValue={user.user?.email}
                id="email"
                type="email"
                name="email"
                placeholder="Obiski15@gmail.com"
                error={errors?.email?.message}
                isActive={isActive}
                setIsActive={setIsActive}
                register={{
                  ...register("email", {
                    onBlur: () => setIsActive(""),
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid Email address",
                    },
                  }),
                }}
              />
            </div>
            <button hidden ref={submitButtonRef} type="submit"></button>
          </form>
        </div>
      </div>
      {displayUpdateMessage && (
        <OnScreenMessage
          Icon={Save}
          message="Your changes have been made successfully"
          timeout={3000}
          setDisplayUpdateMessage={setDisplayUpdateMessage}
        />
      )}
      <div className="px-10 py-6 flex justify-end items-center border-t-[1px] border-border">
        <Button
          variant="primary"
          disabled={isUpdating || isLoading}
          onClick={() => {
            submitButtonRef.current?.click();
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
}

export default Profile;
