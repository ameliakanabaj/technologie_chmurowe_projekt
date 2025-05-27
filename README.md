# Bookstore Microservices Project

Projekt stworzony w ramach przedmiotu Technologie Chmurowe – aplikacja mikroserwisowa zbudowana z wykorzystaniem **Docker Compose**.

---

## Architektura

Aplikacja składa się z czterech głównych komponentów:

- **Frontend (React + Vite)** – aplikacja webowa z koszykiem, zamawianiem i historią zamówień.
- **API (Node.js + Express)** – obsługuje logikę zamówień i zapisuje dane do bazy.
- **Logic (Node.js + Express)** – mikroserwis odpowiedzialny za naliczanie rabatu.
- **Baza danych (PostgreSQL)** – trwałe przechowywanie danych o zamówieniach.

---

## Komunikacja

- Frontend ↔ API – przez `fetch` (REST)
- API ↔ Logic – przez `fetch` (REST)
- API ↔ PostgreSQL – przez `pg` (Node.js)

---

## Uruchomienie projektu

### 1. Wymagania

- Docker
- Docker Compose

### 2. Klonowanie repozytorium

```bash
git clone https://github.com/ameliakanabaj/technologie_chmurowe_projekt.git
cd bookstore-project
```

### 3. Uruchomienie aplikacji

```bash
docker compose up --build
```

### 4. Dostęp do serwisów

| Serwis     | Adres                         |
| ---------- | ----------------------------- |
| Frontend   | http://localhost:3000         |
| API        | http://localhost:3001         |
| Logic      | http://localhost:3002         |
| PostgreSQL | port 5432 (dostępny lokalnie) |

---

## Funkcje aplikacji

- Wyświetlanie listy książek
- Dodawanie do koszyka
- Wysyłanie zamówienia z automatycznym rabatem
- Historia zamówień (z datą i listą książek)
- Trwałe przechowywanie danych w PostgreSQL

---

## Struktura katalogów

```
bookstore-project/
├── api/            # mikroserwis API (Express + PostgreSQL)
├── logic/          # mikroserwis rabatowy (Express)
├── frontend/       # aplikacja React (Vite)
├── db/             # plik init.sql do inicjalizacji bazy
├── docker-compose.yml
└── README.md
```

---

## Docker

- Każdy mikroserwis ma własny `Dockerfile`
- Wszystkie usługi są uruchamiane przez `docker-compose.yml`
- Mikroserwisy połączone we wspólnej sieci (`bookstore-net`)
- Baza danych korzysta z wolumenu (`db-data`)
- `init.sql` automatycznie tworzy strukturę tabeli

## Autor

**Amelia Kanabaj**  
_Projekt zaliczeniowy – Technologie Chmurowe, 2025_
