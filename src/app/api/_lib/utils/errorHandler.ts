import { NextRequest, NextResponse } from "next/server";
import { AppError } from "../AppError";

function handleCastError() {
  return new AppError("Invalid user Id", 400);
}

function handleJsonWebTokenError() {
  return new AppError("Invalid Auth Token", 401);
}

function handleTokenExpiredError() {
  return new AppError("Login session expired. Login Again", 401);
}

function handleDuplicateField(request: NextRequest) {
  if (request.url.endsWith("/auth/signup"))
    return new AppError(
      "Account already exists. Try logging in or resetting your password",
      400
    );
  return new AppError("Unknown Duplicate Error", 400);
}

function handleValidationError(err: any) {
  const validationErrors = Object.values(err.errors).map((e: any) => e.message);
  validationErrors.join(",");

  return new AppError(validationErrors.join(","), 400);
}

function handleDevelopmentError(err: any) {
  const statusCode = err.statusCode || 500;
  const errStatus = err.status || "error";

  return NextResponse.json(
    {
      status: errStatus,
      message: err.message,
      name: err.name,
      stack: err.stack,
    },
    {
      status: statusCode,
    }
  );
}

function handleProductionError(err: any) {
  const statusCode = err.statusCode || 500;
  const errStatus = err.status || "error";

  if (err.isOperational)
    return NextResponse.json(
      {
        status: errStatus,
        message: err.message,
      },
      {
        status: statusCode,
      }
    );

  return NextResponse.json(
    {
      status: errStatus,
      message: "Unknown Error. Please Try again",
    },
    {
      status: statusCode,
    }
  );
}

export function errorHandler(err: any, request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    let error: any = { ...err };

    if (err.name === "CastError") error = handleCastError();

    if (err.name === "JsonWebTokenError") error = handleJsonWebTokenError();

    if (err.name === "TokenExpiredError") error = handleTokenExpiredError();

    if (err.name === "ValidationError") error = handleValidationError(err);

    if (err.code === 11000) error = handleDuplicateField(request);

    return handleProductionError(error);
  }

  if (process.env.NODE_ENV === "development") {
    console.log(err);
    return handleDevelopmentError(err);
  }
}
