import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const publicRoutes = [
  '/api/webhook',
  '/api/uploadthing',
  "/sign-in(.*)", "/sign-up(.*)",
  // Add any other public routes here
];

const isPublicRoute = createRouteMatcher(publicRoutes);

export default clerkMiddleware((auth, request) => {
  console.log(`Handling request to: ${request.url}`);
  if (!isPublicRoute(request)) {
    console.log("Protected route. Checking authentication...");
    auth().protect();
  } else {
    console.log("Public route. No authentication needed.");
  }
});


export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
