# Blog API

A full-stack blogging platform built as a monorepo: one REST API powering two separate React apps, a reader siter and an author dashboard.

**Live demos:** [Blog](https://blog-ten-tan-16.vercel.app) &#183; [Blog Author](https://blog-author-two.vercel.app)

<p>
  <img width="49%" alt="blog-home" src="https://github.com/user-attachments/assets/5dd091f1-24fa-4173-be8f-8ff4157b746d" />
<img width="49%" alt="blog-author-home" src="https://github.com/user-attachments/assets/b62018ee-0a20-4e18-a2a7-12df2bcb447a" />
</p>

## Features

**Blog site**
- Browse and read published posts
- Comment on posts, with threaded replies
- Account sign up / log in

**Author dashboard**
- Write, edit, and manage posts
- Manage account and profile details
- Publish/Unpublish posts
- Add tags

**API**
- REST API built with Express and Prisma
- JWT authentication protecting author routes
- Validation middleware for creating and updating users and profiles
- Data models for users, profiles, posts, comments, and tags

## Tech Stack
  - **Back end:** Node.js, Express, Prisma ORM, PostgreSQL
  - **Front end:** React, React Router, CSS
  - **Auth:** JSON Web Tokens (JWT)

## What I learned
This was my first time managing a project this size in a single monorepo. I stepped away from it for a while, then came back, reassessed, and finished by taking one required feature at a time and breaking it into smaller tasks. It taught me to stay focused on the step in front of me while still stepping back to check that the pieces fit together.

## Future Improvements
- Pagination for the post list
- A search bar for finding posts
- Continue squashing bugs and polishing the UI
