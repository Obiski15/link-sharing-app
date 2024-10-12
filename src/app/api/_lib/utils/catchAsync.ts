import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

import { errorHandler } from "./errorHandler";
import dbConnect from "../dbConnect";

export function catchAsync(
  fn: (
    request: NextRequest,
    context?: { params: { id: mongoose.ObjectId } }
  ) => Promise<NextResponse>
) {
  return async (
    request: NextRequest,
    context?: { params: { id: mongoose.ObjectId } }
  ) => {
    try {
      await dbConnect();
      return await fn(request, context);
    } catch (err) {
      return errorHandler(err, request);
    }
  };
}
