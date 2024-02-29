FROM php:8.2-apache

RUN apt-get update && \
    apt-get install -y libzip-dev zip unzip && \
    docker-php-ext-install pdo_mysql zip && \
    a2enmod rewrite

WORKDIR /var/www/html/

COPY ./api ./api

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer && \
    composer clear-cache

RUN cd /var/www/html/api && \
    composer install && \
    chown -R www-data:www-data bootstrap/cache && \
    chmod -R 777 storage && \
    chmod -R 755 /var/www/html

EXPOSE 80

CMD ["apache2-foreground"]
