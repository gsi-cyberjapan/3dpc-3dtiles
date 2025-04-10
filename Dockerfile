FROM mcr.microsoft.com/playwright:v1.51.1-noble

# Fonts list from: https://old-releases.ubuntu.com/releases/24.04/ubuntu-24.04-desktop-amd64.manifest
RUN apt-get update && apt-get install -y \
    fonts-noto && \
    apt-get purge -y '?and(?name(^fonts-),?not(?name(^fonts-noto)))' && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*


WORKDIR /app

COPY package.json package-lock.json ./
# ファイルの内容を確認
RUN echo "Package.json content:" && cat package.json
RUN echo "Package-lock.json content:" && head -n 50 package-lock.json
# npmのバージョン確認
RUN npm --version
# デバッグ用にインストールを試みる
RUN npm ci || (echo "npm ci failed, trying npm install" && npm install)

COPY . .

