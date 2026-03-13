import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
    "/Dashboard(.*)",
    "/dashboard(.*)",
    "/ATS-Checker(.*)",
    "/ats-checker(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) {
        await auth.protect();
    }
});

export const config = {
    matcher: ["/((?!_next|.*\\..*).*)", "/(api|trpc)(.*)"],
};