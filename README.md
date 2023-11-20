# [Nerdy Posts]("https://nerdy-posts.vercel.app/") - App for CRUDing anonymous posts

Web application for posting/deleting/updating without authorization to service.

## :pencil: Description

Current CRUD project using MERN stack with [Vite](https://vitejs.dev/):

- MongoDB
- Express JS
- React
- Node JS

## :computer: Configuration and startup

Installing repo and downloading dependencies:

```bash
git clone git@github.com:plxgwalker/wt-lab-3.git

cd wt-lab-3
npm ci

cd client
npm ci

cd server
npm ci
```

Creating `.env` files (both client and root dir of project).

```bash
cd client
touch .env
```

```env
VITE_AXIOS_BASE_URL="http://localhost:3000/api"
```

```bash
cd ~
touch .env
```

```env
SERVER_LOCAL_PORT=3000
DB_CONNECTION="your_mongodb_deployed_server"
```

To run servers/project:

```bash
cd server
npm run server

cd client
npm run dev
```

## :iphone: Contact me

:email: [Email](mailto:olegsuv.dev@gmail.com)

:calling: [Telegram](https://t.me/suph0mi3)
