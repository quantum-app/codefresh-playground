ARG RUNTIME_IMAGE=node:12.18.3-alpine3.11

#
# Stage 1: Base
#
FROM node:12.18.3-alpine3.11 AS install

# Install yarn and native dependencies to be able to pull secrets repo
RUN apk add --no-cache \
    openssh-client \
    git \
    bash \
    g++ \
    ca-certificates \
    lz4-dev \
    musl-dev \
    cyrus-sasl-dev \
    openssl-dev \
    make \
    python && \
    npm install --global --force yarn@latest

RUN apk add --no-cache --virtual .build-deps gcc zlib-dev libc-dev bsd-compat-headers py-setuptools bash

# Create user and app directory
ARG USER=node
ARG APPDIR=/home/${USER}/app
WORKDIR ${APPDIR}
RUN chown -R ${USER}:${USER} .
USER ${USER}

# ARGS
ARG PROJECT_PATH
ARG GITHUB_TOKEN
ARG SSH_PRIVATE_KEY
ARG FONTAWESOME_TOKEN
ENV BONSAI_GITHUB_TOKEN=${GITHUB_TOKEN}
ENV BONSAI_FONTAWESOME_TOKEN=${FONTAWESOME_TOKEN}

# SSH Key
RUN mkdir /home/${USER}/.ssh/ && \
    echo "${SSH_PRIVATE_KEY}" > /home/${USER}/.ssh/id_rsa && \
    chmod 400 /home/${USER}/.ssh/id_rsa && \
    ssh-keyscan -t rsa github.com > /home/${USER}/.ssh/known_hosts

# Copy from repo to dockerfile
COPY --chown=${USER}:${USER} ["./package.json", "./.eslintrc.js", "./tsconfig.json", "./yarn.lock", "./.yarnrc.yml", "./"]
COPY --chown=${USER}:${USER} ./packages ./packages
COPY --chown=${USER}:${USER} ./.yarn ./.yarn
COPY --chown=${USER}:${USER} ./apps/"${PROJECT_PATH}" ./apps/"${PROJECT_PATH}"

# Install and build deps
RUN yarn && yarn workspaces foreach -ptv run prepare

WORKDIR ${APPDIR}/apps/${PROJECT_PATH}

# Build project
RUN yarn build:ts

#
# Stage 2: Runtime
#
FROM ${RUNTIME_IMAGE} AS runtime

# Install yarn
RUN npm install --global --force yarn@latest

# Create user and app directory
ARG USER=node
ARG APPDIR=/home/${USER}/app
WORKDIR ${APPDIR}
RUN chown -R ${USER}:${USER} .
USER ${USER}

# ARGS
ARG PORT
ARG PROJECT_PATH
ARG GITHUB_TOKEN
ARG FONTAWESOME_TOKEN
ENV BONSAI_GITHUB_TOKEN=${GITHUB_TOKEN}
ENV BONSAI_FONTAWESOME_TOKEN=${FONTAWESOME_TOKEN}

# Copy from base stage to current stage
COPY --chown=${USER}:${USER} --from=install ${APPDIR} .

WORKDIR ${APPDIR}/apps/${PROJECT_PATH}

# Run app
ENV PORT=${PORT}
ENV APPDIR=${APPDIR}
EXPOSE ${PORT}
CMD ["yarn", "api"]
