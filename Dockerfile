FROM php:8.1-cli

RUN docker-php-ext-install pdo pdo_mysql # Exemplo

COPY . /var/www/html

CMD ["php", "/var/www/html/api/processa_formulario.php"]