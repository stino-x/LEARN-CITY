# Learn City - Online Learning Platform(PLEASE WATCH THE VIDEO THAT EXPLAINS TEACHER MODE THANKS!!)


**🎥 TeacherMode Showcase**
--------------------------
**Check out our TeacherMode feature in action!**
**[Click here to watch the TeacherMode demo video](https://www.loom.com/share/09a863ce1b8b4126a2deedeee60e9854?sid=ff203731-db05-41ea-ae95-6fb316c39108)**


## Description

**Learn City** is a modern online learning platform designed to provide users with access to a wide range of educational courses. The platform integrates **Stripe** for payment processing, enabling users to purchase courses securely. With a focus on a seamless user experience, the platform includes features such as authentication via Clerk, webhook integration for processing payments, and dynamic course pages   .

## Live Demo

**Experience MEET-UP in action!**
👉 [Click here to try MEET-UP live](https://learn-city.vercel.app/)

## Features

- **User Authentication**: Powered by Clerk, users can sign up, log in, and manage their profiles.
- **Course Management**: Users can browse, view, and purchase courses.
- **Secure Payments**: Integrated with Stripe for secure payment processing.
- **Dynamic Webhooks**: Stripe webhooks handle the completion of transactions and update the database accordingly.
- **Custom Success and Cancel Pages**: Redirect users to appropriate pages after successful or failed transactions.
- **Responsive Design**: Fully responsive and accessible across all devices.


## Technologies Used

- **Frontend**: 
  - Next.js
  - React.js
  - Tailwind CSS

- **Backend**:
  - Node.js
  - Next.js API routes

- **Database**:
  - Prisma ORM
  - PostgreSQL

- **Authentication**:
  - Clerk

- **Payment Processing**:
  - Stripe

- **Hosting**:
  - Vercel

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v14.x or higher)
- npm or Yarn
- PostgreSQL

### Installation

1. **Clone the Repository**:

   git clone https://github.com/stino-x/LEARN-CITY.git
   cd myapp

2. **Install Dependencies**:

   Using npm:
   npm install

   Or using Yarn:
   yarn install

3. **Set Up Environment Variables**:

   Create a .env file in the root of your project and add the following variables:

   # Clerk (Authentication)
   CLERK_FRONTEND_API=<your-clerk-frontend-api>
   CLERK_API_KEY=<your-clerk-api-key>

   # Stripe (Payments)
   STRIPE_SECRET_KEY=<your-stripe-secret-key>
   STRIPE_WEBHOOK_SECRET=<your-stripe-webhook-secret>
   NEXT_PUBLIC_STRIPE_PUBLIC_KEY=<your-stripe-public-key>

   # Database
   DATABASE_URL=postgresql://user:password@localhost:5432/learn_city

   # Next.js URL (for production)
   NEXT_PUBLIC_APP_URL=https://learn-city.vercel.app

4. **Set Up the Database**:

   Run the following Prisma commands to set up your database:

   npx prisma migrate dev --name init
   npx prisma generate

5. **Run the Development Server**:

   Start the development server:

   npm run dev

   Or with Yarn:
   yarn dev

   Your application will be available at http://localhost:3000.

### Webhook Setup

To handle Stripe webhooks locally:

1. Install Stripe CLI: Follow the instructions from the Stripe CLI documentation to install the CLI.

2. Forward Webhooks to Localhost:

   Run the following command to forward Stripe events to your local webhook endpoint:

   stripe listen --forward-to localhost:3000/api/webhook

   Ensure that your STRIPE_WEBHOOK_SECRET in your .env file matches the webhook secret provided by Stripe.

## Deployment

### Deploy to Vercel:

1. Connect your GitHub repository to Vercel.
2. Set up environment variables in Vercel's dashboard.

### Update Environment Variables:

Ensure all environment variables, including your STRIPE_WEBHOOK_SECRET, are correctly configured in your Vercel deployment.

### Deploy:

Vercel will automatically build and deploy your application whenever you push to the main branch.

## Usage

### Purchasing a Course

1. Sign in to your account.
2. Browse available courses.
3. Select a course to view details.
4. Proceed to purchase by clicking the "Buy" button.
5. Complete the payment process via Stripe.
6. Upon successful payment, you will be redirected to the course page with full access.

### Webhook Handling

The /api/webhook endpoint listens for Stripe events, particularly checkout.session.completed. When a payment is successfully completed:

1. The webhook validates the event signature.
2. It updates the database, recording the purchase against the user's account.
3. The user is redirected to the course page with access to the purchased content.

## Troubleshooting

- **400 Webhook Error**: Ensure that the STRIPE_WEBHOOK_SECRET is correct and that the request body is passed in raw format.
- **Database Connection Issues**: Verify that the DATABASE_URL is correct and that the PostgreSQL server is running.
- **Deployment Issues**: Ensure that all environment variables are set correctly in the Vercel dashboard.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.

## Contact

For any questions or inquiries, please reach out to austindev214@gmail.com.
