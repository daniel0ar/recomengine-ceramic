# Ceramic Recommendation Engine
A recommendation engine with collaborative filtering to give suggestions for items stored in the Ceramic Protocol. The scope this project worked in is for movies.
The project uses a local Inmemory node database and creates dummy data for movies, users and ratings, allowing a new user to receive suggestions based on the feedback for at least three movies.
## Getting Started

Download and install the Ceramic and Compose DB CLIs following: [https://developers.ceramic.network/docs/composedb/set-up-your-environment#2c-installation-using-javascript-package-managers](Installation Guide method 2c)


Then go into the project folder and run:

```bash
npm install --include dev
```

Generate types for the collaborative-filter library with:
``` dts-gen collaborative-filter ``` (if you have not previously installed dts-gen install it with ```npm install -g dts-gen```)

Copy and paste it into the ```node_modules/collaborative/filter/``` folder
Then run:
```bash
npm run compose
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about the tech used, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Ceramic](https://developers.ceramic.network/docs/composedb/getting-started) - learn about ComposeDB and the Ceramic Network


## License
MIT
