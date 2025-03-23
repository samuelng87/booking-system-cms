# MongoDB Admin Management System

A simple admin management system built with Next.js, Prisma, and MongoDB.

## Features

- MongoDB connection using Prisma ORM
- CRUD operations for admin records
- Clean and responsive UI with Tailwind CSS

## Getting Started

First, set up your MongoDB connection by adding a `.env` file with your MongoDB connection string:

```
DATABASE_URL="mongodb+srv://username:password@cluster0.example.mongodb.net/test?authSource=admin"
```

Then, install the dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment on Vercel

This project is configured for easy deployment on Vercel. The following steps are automatically handled:

1. Prisma client generation happens during build and postinstall
2. ESLint and TypeScript errors are ignored during builds to ensure smooth deployment

To deploy on Vercel:

1. Push your code to a GitHub repository
2. Import the repository on Vercel
3. Add your MongoDB connection string as the `DATABASE_URL` environment variable
4. Deploy

## Database Structure

The project uses a MongoDB database with the following schema:

```prisma
model admin {
  id   String  @id @default(auto()) @map("_id") @db.ObjectId
  name String?
}
```

## Technologies Used

- Next.js 15
- Prisma ORM
- MongoDB
- Tailwind CSS
- TypeScript

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
