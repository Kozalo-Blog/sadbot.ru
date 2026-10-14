# sadbot.ru

Static websites of `sadbot.ru` and its subdomains. There is no build step and no backend: the files in this
repository are served as is.

| Directory | Host | Notes |
|-----------|------|-------|
| `sites/cbt/` | `cbt.sadbot.ru` | |
| `sites/comics/` | `comics.sadbot.ru` | |
| `sites/nekochan/` | `nekochan.sadbot.ru` | |
| `sites/kozmul/` | `kozmul.sadbot.ru` | `/` redirects to `/ru/` or `/en/` by the `Accept-Language` header |
| `sites/files/` | `files.sadbot.ru` | plain file storage with a directory listing (`autoindex`) |

`sadbot.ru`, `www.sadbot.ru`, `lib.sadbot.ru`, `libs.sadbot.ru` and the `nekochan.ru` names have no content here,
they are only redirects (see below).

## Hosting

The sites are served by a plain nginx container behind [nginx-proxy](https://github.com/nginx-proxy/nginx-proxy)
and acme-companion (they route the hostnames and issue the TLS certificates), with Cloudflare in front.
The production setup is managed in a separate server configuration repository. A minimal working copy of it
is in [`deployment-example/`](deployment-example):

- `docker-compose.yml` — the `sadbot-ru-static` container with the virtual hosts for all the names above;
- `nginx.conf` — the nginx config: one `server` per host, the redirects, gzip.

The container mounts the `sites/` directory of this repository read-only at `/srv`, and every site's `root` is its
subdirectory (`/srv/cbt`, `/srv/kozmul`, ...). Only the contents of `sites/` are reachable from the web: `.git`,
`README.md` and `deployment-example/` are not served.

## Deploy

```bash
git clone git@github.com:Kozalo-Blog/sadbot.ru.git
cd sadbot.ru/deployment-example
docker compose up -d
```

To publish a change, push it and run `git pull` on the server. nginx reads the files from disk, so neither a
restart nor a container update is needed. After editing `nginx.conf`, run
`docker compose restart sadbot-ru-static`.

## Redirects

The server answers the following names without any content:

| Host | Behaviour |
|------|-----------|
| `sadbot.ru`, `www.sadbot.ru` | `/` → `https://kozalo.ru`, `/linux…` → `files.sadbot.ru`, anything else is a 404 |
| `lib.sadbot.ru`, `libs.sadbot.ru` | → `files.sadbot.ru` |
| `nekochan.ru`, `www.nekochan.ru` | `/` → `nekochan.sadbot.ru`, `/linux…` → `files.sadbot.ru`, `/KozMUL…` → `kozmul.sadbot.ru`, anything else is a 404 |
| `lib.nekochan.ru`, `libs.nekochan.ru` | → `files.sadbot.ru` |
