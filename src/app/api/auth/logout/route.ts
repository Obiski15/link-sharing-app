import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import { catchAsync } from "../../_lib/utils/catchAsync";

export const POST = catchAsync(async (request: NextRequest) => {
  cookies().delete("jwt");

  return NextResponse.json({
    status: "success",
  });
});
