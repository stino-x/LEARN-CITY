import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const publicRoutes = [
  '/api/webhook',
  '/api/uploadthing',
  '/sign-in',
  '/sign-up',
  // Add any other public routes here
];

const isPublicRoute = createRouteMatcher(publicRoutes);

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) {
    auth().protect();
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};