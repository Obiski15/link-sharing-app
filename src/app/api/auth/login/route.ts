import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { signToken } from "@/app/api/_lib/helpers/signToken";
import { catchAsync } from "../../_lib/utils/catchAsync";
import { AppError } from "../../_lib/AppError";

import User from "@/models/userModel";

export const POST = catchAsync(async (request: NextRequest) => {
  const { email, password } = await request.json();

  if (!email || !password)
    throw new AppError("Email and password are required", 400);

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password, user.password)))
    throw new AppError("Invalid Login credentials", 400);

  const token = signToken({ id: user._id });

  cookies().set("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires:
      Date.now() +
      +process.env.JWT_COOKIE_EXPIRES_IN! * 24 * 60 * 60 * 1000 -
      1000,
    sameSite: "lax",
  });

  user.password = undefined;

  return NextResponse.json({
    status: "success",
    data: {
      user,
    },
  });
});
