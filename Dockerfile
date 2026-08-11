# Step 1: Build Stage
FROM elixir:1.15-alpine AS builder

RUN apk add --no-cache build-base npm git

ENV MIX_ENV=prod

WORKDIR /app

RUN mix local.hex --force && \
    mix local.rebar --force

# ดึงไฟล์คอนฟิกจากโฟลเดอร์ resort_project
COPY resort_project/mix.exs resort_project/mix.lock ./
RUN mix deps.get --only prod
RUN mix deps.compile

COPY resort_project/assets assets
COPY resort_project/priv priv
RUN mix assets.deploy

COPY resort_project/lib lib
COPY resort_project/config config
RUN mix compile

COPY resort_project/rel rel
RUN mix release

# Step 2: Release Stage
FROM alpine:3.18
RUN apk add --no-cache libstdc++ openssl ncurses-libs

ENV MIX_ENV=prod
WORKDIR /app

COPY --from=builder /app/_build/prod/rel/resort_project ./

CMD ["bin/resort_project", "start"]


EXPOSE 4000

CMD ["bin/resort_project", "start"]
