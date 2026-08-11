# Step 1: Build Stage
FROM elixir:1.15-alpine AS builder

RUN apk add --no-cache build-base npm git

ENV MIX_ENV=prod

WORKDIR /app

RUN mix local.hex --force && \
    mix local.rebar --force

COPY resort_project/mix.exs resort_project/mix.lock ./
RUN mix deps.get --only prod
RUN mix deps.compile

copy assets assets
copy priv priv
copy lib lib
copy config config
RUN mix assets.deploy

RUN mix compile

# ตัดบรรทัด COPY rel ออก แล้วรัน release ได้เลย
RUN mix release

# Step 2: Release Stage
FROM alpine:3.18
RUN apk add --no-cache libstdc++ openssl ncurses-libs

ENV MIX_ENV=prod
WORKDIR /app

COPY --from=builder /app/_build/prod/rel/resort_project ./

CMD ["bin/resort_project", "start"]
