# Postiz — self-hosted social media scheduler

Social media scheduler dla motyl.dev. Obsługuje LinkedIn, X (Twitter), Bluesky, Instagram, Threads, TikTok, Reddit i więcej.

## Wymagania

- QNAP NAS z Container Station (Docker)
- 2GB RAM minimum, zalecane 4GB
- ~20GB miejsca na storage

## Pierwsze uruchomienie

### 1. SSH na NAS

```bash
ssh admin@nas-ip
```

### 2. Utwórz katalog

```bash
mkdir -p /share/Container/postiz
cd /share/Container/postiz
```

### 3. Skopiuj pliki

```bash
# Skopiuj docker-compose.yml i .env.example z repo
cp /path/to/motyl-dev/infrastructure/postiz/docker-compose.yml .
cp /path/to/motyl-dev/infrastructure/postiz/.env.example .env
```

### 4. Uzupełnij .env

```bash
vi .env
```

Wygeneruj JWT_SECRET:
```bash
openssl rand -hex 32
```

Wygeneruj hasła do bazy i Redis:
```bash
openssl rand -hex 16
```

Ustaw `MAIN_URL`, `FRONTEND_URL`, `NEXT_PUBLIC_BACKEND_URL` na IP lub hostname NAS.

### 5. Uruchom

```bash
docker compose up -d
```

Pierwsze uruchomienie może potrwać ~5 minut (Elasticsearch i Temporal potrzebują czasu).

### 6. Sprawdź status

```bash
docker compose ps
docker compose logs -f postiz-app
```

### 7. Otwórz w przeglądarce

```
http://nas-ip:4007
```

Zarejestruj pierwsze konto (to będzie admin). Następnie ustaw `DISABLE_REGISTRATION=true` w `.env` i zrestartuj: `docker compose up -d`.

---

## Konfiguracja platform

Po zalogowaniu do Postiz przejdź do **Settings → Social Accounts** i dodaj konta.

### X (Twitter)
1. Wejdź na https://developer.x.com/en/portal/projects-and-apps
2. Utwórz nową aplikację lub użyj istniejącej
3. W **User authentication settings** ustaw:
   - App permissions: **Read and write**
   - Callback URI: `http://nas-ip:4007/integrations/social/x/callback`
   - Type of App: **Web App**
4. Skopiuj Client ID i Client Secret do `.env`

### LinkedIn
1. Wejdź na https://www.linkedin.com/developers/apps
2. Utwórz aplikację
3. W **Auth** dodaj Redirect URL: `http://nas-ip:4007/integrations/social/linkedin/callback`
4. Wymagane permissions: `w_member_social`, `r_liteprofile`
5. Skopiuj Client ID i Client Secret do `.env`

### Bluesky
Bluesky nie wymaga API key — po prostu dodaj konto bezpośrednio w Postiz UI (email + hasło aplikacji z ustawień Bluesky).

### Instagram / Threads
Przez Meta Developer Console — wymaga weryfikacji konta biznesowego.

### TikTok
Wymaga konta TikTok for Business i weryfikacji aplikacji.

---

## Aktualizacja

```bash
cd /share/Container/postiz
docker compose pull
docker compose up -d
```

## Backup

```bash
# Backup bazy danych
docker compose exec postiz-postgres pg_dump -U postiz-user postiz-db > backup-$(date +%Y%m%d).sql
```

## Porty

| Serwis | Port |
|--------|------|
| Postiz UI | 4007 |
| Temporal UI (monitoring) | 8080 |
