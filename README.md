This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Process, choices and challenges

### I started at 6 PM 

Steps:
- 1 create-next-app
- 2 installed 'react-query' to fetch data
- 3 installed 'graphql-request' (I did not use Apollo till now and this was the most accesible package I could find to query a graphql API - my experience with GraphQL is mostly with Gatsby JS)
- 4 I created a function to query the data from the API (usePosts)
- 5 next, I prepared the data for Visx component - iterated all posts, checked the year and constructed an array of objects with all the months and the count of posts for each month
### at 7:30 PM the steps above were finished

Pit of dispair: 
- after this, until 10 PM I tried to use the simple Bar Chart example from Visx repo and got stuck in the unfriendly docs. I managed to plot the data but without Bottom and Left Axis as no props seem to be enough for them.

### at 9:55 I started to write the readme file

Cheers!! I hope to hear from you as I don't want to work for an evil corporation :P 
