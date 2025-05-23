FROM mcr.microsoft.com/playwright:v1.51.1-noble

# Fonts list from: https://old-releases.ubuntu.com/releases/24.04/ubuntu-24.04-desktop-amd64.manifest
RUN apt-get update && apt-get install -y \
    fonts-noto && \
    apt-get purge -y '?and(?name(^fonts-),?not(?name(^fonts-noto)))' && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*


WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

