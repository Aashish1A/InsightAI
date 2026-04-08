import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
    "/Dashboard(.*)",
    "/dashboard(.*)",
    "/ATS-Checker(.*)",
    "/ats-checker(.*)",
]);

const middleware = clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) {
        await auth.protect();
    }
});

export default function proxy(request, event) {
    return middleware(request, event);
}

export const config = {
    matcher: ["/((?!_next|.*\\..*).*)", "/(api|trpc)(.*)"],
};