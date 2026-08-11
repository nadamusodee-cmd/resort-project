# Step 1: Build Stage
FROM elixir:1.15-alpine AS builder

# Install build dependencies
RUN apk add --no- Whitelist build-base npm git

ENV MIX_ENV=prod

WORKDIR /app

# Install Hex + Rebar
RUN mix local.hex --force && \
    mix local.rebar --force

# Copy config and dependencies
COPY mix.exs mix.lock ./
RUN mix deps.get --only prod
RUN mix deps.compile

# Copy assets and compile static assets
COPY assets assets
COPY priv priv
RUN mix assets.deploy

# Copy application code and compile release
COPY lib lib
COPY config config
RUN mix compile
RUN mix release

# Step 2: Runner Stage
FROM alpine:3.18 AS app

RUN apk add --no-cache libstdc++ openssl ncurses-libs

ENV MIX_ENV=prod
ENV PORT=4000

WORKDIR /app

COPY --from=builder /app/_build/prod/rel/resort_project ./

EXPOSE 4000

CMD ["bin/resort_project", "start"]
