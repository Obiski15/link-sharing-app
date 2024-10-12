import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

import { catchAsync } from "@/app/api/_lib/utils/catchAsync";

import User from "@/models/userModel";

export const GET = catchAsync(
  async (
    request: NextRequest,
    context?: { params: { id: mongoose.ObjectId } }
  ) => {
    const user = await User.findById(context?.params.id);

    if (!user) throw new Error("User not found");

    return NextResponse.json({
      status: "success",
      data: { user },
    });
  }
);
