# Bookstore Microservices Project – Etap II (Kubernetes)

Projekt zrealizowany w ramach przedmiotu Technologie Chmurowe – **migracja aplikacji mikroserwisowej do Kubernetes**.

---

## Architektura

Aplikacja składa się z następujących komponentów:

- **Frontend** (React + Vite)
- **API** (Node.js + Express)
- **Logic** (Node.js + Express)
- **PostgreSQL** – baza danych

Każdy z mikroserwisów jest uruchamiany jako osobny Deployment i Service w Kubernetes.

---

## Kluczowe zasoby Kubernetes

- **Deployment** – dla frontend, api, logic, db
- **Service (ClusterIP / NodePort)** – zapewnia komunikację wewnętrzną i zewnętrzną
- **PersistentVolume & PersistentVolumeClaim** – trwałe przechowywanie danych PostgreSQL
- **ConfigMap** – skrypt inicjalizujący bazę danych
- **Ingress + Ingress Controller (NGINX)** – umożliwia dostęp do aplikacji przez `bookstore.local`
- **Horizontal Pod Autoscaler (HPA)** – automatyczne skalowanie API na podstawie użycia CPU

---

## Uruchamianie aplikacji

### 1. Wymagania

- Minikube lub klaster K8s (lokalny)
- kubectl

### 2. Klonowanie repozytorium

```bash
git clone https://github.com/ameliakanabaj/technologie_chmurowe_projekt.git
cd bookstore-project
```

### 3. Aplikacja Kubernetes

Stosuj kolejność:

```bash
kubectl apply -f k8s/db-configmap.yaml
kubectl apply -f k8s/db-pv.yaml
kubectl apply -f k8s/db-pvc.yaml
kubectl apply -f k8s/db-deployment.yaml

kubectl apply -f k8s/api-deployment.yaml
kubectl apply -f k8s/logic-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml

kubectl apply -f k8s/api-service.yaml
kubectl apply -f k8s/logic-service.yaml
kubectl apply -f k8s/frontend-service.yaml

kubectl apply -f k8s/bookstore-ingress.yaml
```

Następnie:

- Dodaj `127.0.0.1 bookstore.local` do `/etc/hosts`
- W przeglądarce otwórz: [http://bookstore.local](http://bookstore.local)

---

## Ingress

Używany jest **NGINX Ingress Controller**. Adresy są skonfigurowane w `bookstore-ingress.yaml`. Ruch do `/` trafia do `frontend`, a `/orders` do `api`.

---

## Skalowanie – HPA

Działa autoskalowanie dla `api`:

```bash
kubectl apply -f k8s/hpa-api.yaml
```

Można sprawdzić działanie:

```bash
kubectl get hpa
kubectl top pods
```

---

## Struktura katalogu

```
bookstore-project/
├── k8s/                      # manifesty YAML dla K8s
│   ├── db-*.yaml
│   ├── api-*.yaml
│   ├── logic-*.yaml
│   ├── frontend-*.yaml
│   └── bookstore-ingress.yaml
├── frontend/                # aplikacja React
├── api/                     # API Express
├── logic/                   # mikroserwis rabatowy
├── db/init.sql              # inicjalizacja bazy
└── README.md
```

---

## Funkcje aplikacji

- Dodawanie książek do koszyka (z localStorage)
- Zamówienia z rabatem (przez mikroserwis logic)
- Historia zamówień (z bazy PostgreSQL)
- Wersja uruchomiona w klastrze Kubernetes

---

## Autor

**Amelia Kanabaj**
_Projekt zaliczeniowy – Technologie Chmurowe, 2025_
