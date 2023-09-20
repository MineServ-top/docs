#!/bin/bash

if ! command -v node &> /dev/null; then
  echo "Node.js не установлена. Установка версии 18..."
  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt-get install -y nodejs
else
  echo "Node.js уже установлена."
fi

echo "Установка Certbot..."
sudo snap install --classic certbot

sudo certbot register --agree-tos --email alphabaqpla@outlook.com

sudo certbot certonly --standalone -d docs.mineserv.top

cd /home/docs

echo "Запуск сервера..."
node server.js