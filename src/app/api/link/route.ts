import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

import { catchAsync } from "../_lib/utils/catchAsync";
import { AppError } from "../_lib/AppError";

import Link from "@/models/linkModel";

export const GET = catchAsync(async (request: NextRequest) => {
  const token = request.cookies.get("jwt")?.value;

  if (!token) throw new AppError("Unauthorized", 401);

  // Verify JWT
  const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

  if (!payload) throw new AppError("Invalid Token", 403);

  const links = await Link.find({ userId: payload.id }).select("-__v");

  return NextResponse.json(
    {
      status: "success",
      data: { links },
    },
    { status: 200 }
  );
});

export const POST = catchAsync(async (request: NextRequest) => {
  const data = await request.json();

  const token = request.cookies.get("jwt")?.value;

  if (!token) throw new AppError("Unauthorized", 401);

  // Verify JWT
  const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

  if (!payload) throw new AppError("Invalid Token", 403);

  const updatedData = { ...data, userId: payload.id };

  await Link.create(updatedData);

  return NextResponse.json(updatedData, { status: 201 });
});

export const DELETE = catchAsync(async (request: NextRequest) => {
  const token = request.cookies.get("jwt")?.value;

  if (!token) throw new AppError("Unauthorized", 401);

  // Verify JWT
  const payload = jwt.verify(token, process.env.JWT_SECRET!);
  if (!payload) throw new AppError("Invalid Token", 403);

  const { id } = await request.json();

  if (!id) throw new Error("Invalid link ID");

  await Link.findByIdAndDelete(id);

  return NextResponse.json({ status: "success" });
});

export const PUT = catchAsync(async (request: NextRequest) => {
  const data = await request.json();

  const token = request.cookies.get("jwt")?.value;

  if (!token) throw new AppError("Unauthorized", 401);

  // Verify JWT
  const payload = jwt.verify(token, process.env.JWT_SECRET!);

  if (!payload) throw new AppError("Invalid Token", 403);

  const newData = await Link.findByIdAndUpdate(
    data._id,
    { ...data },
    {
      runValidators: true,
      new: true,
    }
  );

  if (!newData) throw new Error("Link not found");

  return NextResponse.json(
    {
      status: "success",
      data: { link: newData },
    },
    { status: 200 }
  );
});
