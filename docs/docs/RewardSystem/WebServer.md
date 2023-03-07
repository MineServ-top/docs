# Пример установки вебсервера nginx для ОС ubuntu 20.04+
```sh
sudo apt update
sudo apt install nginx
sudo apt install php8.1-fpm
```
* Далее выполняем команды, чтобы убедиться, что всё установилось
```sh
sudo systemctl status php8.1-fpm
sudo systemctl status nginx
```
* Если в ответе получаем ` Active: active (php-fpm running)` и  `Active: active (Nginx running)`, то переходим к настройке Nginx вебсервера.
* Выполняем команду
```sh
sudo nano /etc/nginx/sites-available/rewards.conf
```
* Вставляем туда и заменяем значения `listen 30330;` и `root /var/www/html;` на нужные, или оставляем как есть.
* От переменной `listen число от 1 до 65535;` зависит порт, на котором будет работать ваш вебсервер, при использовании предложенных ниже значений адрес твоего скрипта будет `http://айпи_вебсервера:30330/RCON_Method.php`
```conf
server {
    listen 30330;
    root /var/www/html;
    server_name _;
    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php8.1-fpm.sock;
    }
}
```
* Далее выполняем команды
```sh
ln /etc/nginx/sites-available/rewards.conf /etc/nginx/sites-enabled/rewards.conf
sudo systemctl restart php8.1-fpm
sudo systemctl restart nginx
```
* Всё, веб сервер с поддержкой PHP установлен. Далее нужно открть порт, если используешь **UFW**, то это можно сделать с помощью команды `sudo ufw allow in порт/tcp` (тут нужно указать порт как в конфиге Nginx).
* А если используешь IPTables, то порт открть можно командой `sudo iptables -t filter -A INPUT -p tcp --dport порт -j ACCEPT` (тут нужно указать порт как в конфиге Nginx).