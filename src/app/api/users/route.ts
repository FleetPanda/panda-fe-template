import { NextResponse } from "next/server";

import {
  createUserInStore,
  listUsersFromStore,
} from "@/modules/users/server-store";
import {
  createUserInputSchema,
  userListQuerySchema,
} from "@/modules/users/schema";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query = userListQuerySchema.parse({
    search: searchParams.get("search") ?? "",
  });
  const items = listUsersFromStore(query);

  return NextResponse.json({
    items,
    total: items.length,
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const input = createUserInputSchema.parse(body);
  const item = createUserInStore(input);

  return NextResponse.json(
    {
      item,
      message: "User created successfully.",
    },
    {
      status: 201,
    },
  );
}
