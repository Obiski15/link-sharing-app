import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

import { uploadImage } from "../../_lib/utils/uploadImage";
import { catchAsync } from "../../_lib/utils/catchAsync";
import { AppError } from "@/app/api/_lib/AppError";
import { ImageFile } from "../../types";

import User from "@/models/userModel";

export const GET = catchAsync(async (request: NextRequest) => {
  const token = request.cookies.get("jwt")?.value;

  if (!token) throw new AppError("Unauthorized", 401);

  // Verify JWT
  const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

  if (!payload) throw new AppError("Invalid Token", 403);

  const user = await User.findOne({ _id: payload.id });

  if (!user) throw new AppError("User not found", 404);

  return NextResponse.json({
    status: "success",
    data: { user },
  });
});

export const PATCH = catchAsync(async (request: NextRequest) => {
  const formData = await request.formData();
  let imageUrl: string = "";

  const firstName = formData.get("firstName") as string | null;
  const lastName = formData.get("lastName") as string | null;
  const image = formData.get("image") as ImageFile | null;

  const token = request.cookies.get("jwt")?.value;

  if (!token) throw new AppError("Unauthorized", 401);

  // Verify JWT
  const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

  if (!payload) throw new AppError("Invalid Token", 403);

  if (image) {
    imageUrl = await uploadImage(image);
  }

  const user = await User.findByIdAndUpdate(
    payload.id,
    {
      firstName,
      lastName,
      image: imageUrl,
    },
    {
      runValidators: true,
      new: true,
    }
  );

  return NextResponse.json({
    status: "success",
    data: user,
  });
});
