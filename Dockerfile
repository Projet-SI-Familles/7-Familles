FROM php:8.2-fpm-alpine

ARG USERNAME
ARG UID
ARG EMAIL
ARG NAME
ARG BACKEND_URL
ARG BAAS_API_URL
ARG BAAS_AUTH
ARG IS_PRODUCTION

# Définir les variables d’environnement pour qu'elles soient visibles par Node
ENV BACKEND_URL=${BACKEND_URL}
ENV BAAS_API_URL=${BAAS_API_URL}
ENV BAAS_AUTH=${BAAS_AUTH}
ENV IS_PRODUCTION=${IS_PRODUCTION}

# Ajout de Node, npm et dépendances
RUN apk upgrade && apk --no-cache add \
    bash \
    git \
    shadow \
    jq \
    npm \
    nodejs=~22 \
    php82-pdo_pgsql \
    php82-pgsql \
    postgresql-dev

RUN docker-php-ext-install pdo pdo_pgsql

# Composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" \
 && php composer-setup.php --install-dir=/usr/local/bin --filename=composer \
 && php -r "unlink('composer-setup.php');"

# Symfony CLI
RUN wget https://get.symfony.com/cli/installer -O - | bash \
 && mv /root/.symfony5/bin/symfony /usr/local/bin/symfony

# Angular CLI
RUN npm install -g typescript @angular/cli@^19

# Création user
RUN echo "UID_MAX 9223372036854775807" > /etc/login.defs
RUN /usr/sbin/useradd -m -s /bin/sh -u "$UID" $USERNAME

# Switch root pour copies
USER root
WORKDIR /var/www/html
COPY . .

# ✅ Copie du script dans un chemin fiable
COPY ./start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

# Revenir sur l’utilisateur normal
USER $USERNAME

# Git config
RUN git config --global user.email "$MAIL"
RUN git config --global user.name "$NAME"

# Angular Build avec injection des variables
WORKDIR /var/www/html/7-Familles-Front
RUN npm install && \
    node ./src/environments/replace_environment_variables.js && \
    npm run build
