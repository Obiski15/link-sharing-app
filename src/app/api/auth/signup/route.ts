import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { signToken } from "../../_lib/helpers/signToken";
import { catchAsync } from "../../_lib/utils/catchAsync";

import User from "@/models/userModel";

export const POST = catchAsync(async (request: NextRequest) => {
  const user = await User.create(await request.json());

  const token = signToken({ id: user._id });

  user.password = undefined;

  cookies().set("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires:
      Date.now() +
      +process.env.JWT_COOKIE_EXPIRES_IN! * 24 * 60 * 60 * 1000 -
      1000,
    sameSite: "lax",
  });

  return NextResponse.json(
    {
      status: "success",
      data: {
        user,
      },
    },
    {
      status: 201,
    }
  );
});
