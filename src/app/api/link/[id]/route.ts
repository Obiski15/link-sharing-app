import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import mongoose from "mongoose";

import { catchAsync } from "../../_lib/utils/catchAsync";
import { AppError } from "../../_lib/AppError";

import Link from "@/models/linkModel";
import User from "@/models/userModel";

export const GET = catchAsync(
  async (
    request: NextRequest,
    context?: { params: { id: mongoose.ObjectId } }
  ) => {
    const user = await User.findById(context?.params.id);

    if (!user) throw new AppError("Invalid User Id", 400);

    const links = await Link.find({ userId: context?.params.id });

    const payload = cookies().has("jwt")
      ? (jwt.decode(cookies().get("jwt")?.value!) as JwtPayload)
      : null;

    let isLoggedIn: boolean;

    !payload
      ? (isLoggedIn = false)
      : (isLoggedIn =
          payload.id === context?.params.id &&
          +payload?.exp! * 1000 > Date.now());

    return NextResponse.json({
      status: "success",
      data: { user, links, isLoggedIn },
    });
  }
);
