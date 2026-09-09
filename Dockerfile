# Use the official PHP image with FPM
FROM php:8.2-fpm

# Install Nginx, Node.js, and system dependencies
RUN apt-get update && apt-get install -y \
    nginx \
    libpq-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && docker-php-ext-install pdo_pgsql pdo_mysql zip pcntl bcmath

# Copy Composer from the official image
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy the Laravel application files
COPY . .

# Install PHP dependencies
RUN composer install --optimize-autoloader --no-dev

# Install NPM dependencies and build React/Vite assets
RUN npm install
RUN npm run build

# Set strict permissions for Laravel and ensure directories exist
# This solves the "No such file or directory" error seen in image_a31603.png
RUN mkdir -p /var/www/storage /var/www/bootstrap/cache /var/www/public/build \
    && chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache /var/www/public/build \
    && chmod -R 775 /var/www/storage /var/www/bootstrap/cache

# Setup a clean, single-location Nginx configuration
RUN echo 'server {\n\
    listen 80;\n\
    root /var/www/public;\n\
    index index.php;\n\
    location / {\n\
    try_files $uri $uri/ /index.php?$query_string;\n\
    }\n\
    location ~ \\.php$ {\n\
    include fastcgi_params;\n\
    fastcgi_pass 127.0.0.1:9000;\n\
    fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;\n\
    }\n\
    }' > /etc/nginx/sites-available/default

# Expose the standard web port
EXPOSE 80

# Start PHP-FPM in the background and Nginx in the foreground
# This ensures the container stays active and the gateway stays open
CMD php-fpm -D && nginx -g "daemon off;"
