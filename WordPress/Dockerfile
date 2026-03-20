# 1. Use the official PHP-FPM or Apache variant
FROM wordpress:latest

# 2. Install system dependencies for common WP features
# We need these for image manipulation (GD) and ZIP archives.
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libzip-dev \
    libmagickwand-dev --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# 3. Install and configure PHP extensions
# These are standard requirements for many modern themes and plugins.
RUN docker-php-ext-configure gd --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
    gd \
    mysqli \
    opcache \
    zip \
    exif

# 4. Enable Apache Rewrite Module
# Crucial for WordPress "Pretty Permalinks" to work.
RUN a2enmod rewrite

# 5. Set recommended PHP.ini settings for WordPress
# We use a custom file to increase upload limits and memory.
COPY ./config/php.conf.ini /usr/local/etc/php/conf.d/conf.ini

# 6. Set the working directory
WORKDIR /var/www/html

# 7. (Optional) Fix Permissions
# Ensure the webserver (www-data) owns the files it needs to write to.
RUN chown -R www-data:www-data /var/www/html