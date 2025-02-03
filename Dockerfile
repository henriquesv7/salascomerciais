FROM php:8.1-fpm

# Instala o Nginx
RUN apt-get update && apt-get install -y nginx

# Copia a configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos do seu projeto
COPY . /var/www/html

# Expõe a porta 80 (opcional, para testes locais)
EXPOSE 80

# Define o comando para iniciar o Nginx e o PHP-FPM
CMD ["nginx", "-g", "daemon off;"]