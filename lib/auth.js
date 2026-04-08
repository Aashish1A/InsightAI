import { auth, clerkClient } from "@clerk/nextjs/server";

export async function requireAuth() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  // Defaulting to premium so all AI features work without throwing "Limit reached" or "premium subscriptions" errors.
  let hasPremiumPlan = true;
  let free_usage = 0;

  return {
    userId,
    plan: hasPremiumPlan ? "premium" : "free",
    free_usage,
  };
}
