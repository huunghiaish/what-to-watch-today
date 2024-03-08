# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

# Setup your repository
> Vite requires Node version 14.18+ or 16+ to operate stably.

1. Clone source code

```shell
git clone https://github.com/huunghianguyenish/what-to-watch-today.git
```

2. Install package

```shell
npm install
```
3. Start code

```shell
npm run dev
```
# Building and running in Docker
```shell
docker build -t what-to-watch-today .
docker run -p 80:80 what-to-watch-today
```
# Building and publish image to private Docker Registry
```shell
docker build . -t registry.huunghianguyen.com/what-to-watch-today:1.0.0
docker push registry.huunghianguyen.com/what-to-watch-today:1.0.0
```

> Reference by @ShariqAnsari88 @TMDb API