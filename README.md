# **README.md — Travel Planner API (Pre-parcial + Parcial)**

# 1. Cómo ejecutar el proyecto

## 1.1 Clonar el repositorio
```bash
git clone https://github.com/k-verah/travel-planner-api
cd travel-planner-api
````

## 1.2 Instalar dependencias

```bash
npm install
```

## 1.3 Variables de entorno

Crear un archivo `.env` con:

```
DATABASE_PATH=travel.db
```

## 1.4 Ejecutar el proyecto

```bash
npm run start:dev
```

La API corre en:

[http://localhost:3000](http://localhost:3000)

---

# 2. Arquitectura General

La API está compuesta por dos módulos principales:

---

## 2.1 CountriesModule

Gestiona países mediante:

* Consulta en caché local (base de datos).
* Consulta a RestCountries si no existe localmente.
* Almacenamiento de sólo los campos necesarios.
* Desacoplamiento dominio–infraestructura mediante un provider externo.

### Atributos del modelo `Country`

* code
* name
* region
* subregion
* capital
* population
* flagUrl
* createdAt
* updatedAt

---

## 2.2 TravelPlansModule

Gestiona los planes de viaje y valida:

* Fechas válidas
* Campos obligatorios
* Existencia del país usando CountriesService

### Atributos del modelo `TravelPlan`

* id
* countryCode
* title
* startDate
* endDate
* notes
* createdAt
* updatedAt

---

# 3. Provider externo: RestCountriesApiService

Para evitar depender directamente de la API externa, se implementó:

* Una interfaz `CountriesApi`
* La clase `RestCountriesApiService` que consume la API real
* Inyección del provider en el CountriesService

### Flujo:

```
CountriesService.findOne("COL")
  -> Buscar en BD
       -> Existe -> origin: "local-cache"
       -> No existe -> Consultar API externa
             -> Mapear campos
             -> Guardar en BD
             -> origin: "external-api"
```

---

# 4. Documentación de Endpoints

---

## 4.1 Countries

### GET /countries

Lista todos los países en caché.

### GET /countries/:code

Devuelve un país.
Incluye `origin: "local-cache"` o `"external-api"`.

---

## 4.2 Travel Plans

### POST /travel-plans

Crea un plan.

**Body:**

```json
{
  "countryCode": "COL",
  "title": "Vacaciones en Colombia",
  "startDate": "2025-06-10",
  "endDate": "2025-06-20",
  "notes": "Visitar Medellín, Bogotá y Cartagena"
}
```

### GET /travel-plans

Lista todos los planes.

### GET /travel-plans/:id

Devuelve un plan por ID.

---

# 5. Extensión del Parcial — Nuevas Funcionalidades

La extensión incluye:

* Middleware global de logging
* Guard personalizado
* Endpoint sensible protegido
* Nuevos archivos para providers, interfaces y guards

Estas mejoras permiten simular una API real con seguridad y trazabilidad.

---

# 6. Middleware de Logging

Archivo:

```
src/common/middleware/logging.middleware.ts
```

Registra por cada request:

* Método HTTP
* Ruta
* Timestamp
* Tiempo de ejecución

### Validación:

1. Levantar API
2. Ejecutar:

```bash
GET http://localhost:3000/countries
```

3. Verás algo como:

```
[LoggingMiddleware] GET /countries - 2025-11-21T10:25:14 - 4ms
```

---

# 7. Guard de Eliminación — `DeleteCountryGuard`

Archivo:

```
src/countries/guards/delete-country.guard.ts
```

Este guard valida reglas de negocio antes de permitir borrar un país.

### Endpoint protegido:

```
DELETE /countries/:code
```

### Comportamiento:

* Si el guard **rechaza**, retorna `403 Forbidden`.
* Si el guard **permite**, se elimina el país con `200 OK`.

### Cómo probarlo:

```bash
DELETE http://localhost:3000/countries/COL
```

---

# 8. Pruebas recomendadas

1. **Consultar un país no cacheado**
   -> Debe devolver `origin: "external-api"`

2. **Consultar el mismo país nuevamente**
   -> Debe devolver `origin: "local-cache"`

3. **Crear un plan de viaje**
   -> Valida fechas y existencia del país

4. **Probar el endpoint protegido**

```bash
DELETE http://localhost:3000/countries/COL
```

5. **Ver logging en consola**
   -> Confirma que el middleware funciona

---

# 9. Modelos de Datos

## Country

```ts
code: string;
name: string;
region: string;
subregion: string;
capital: string;
population: number;
flagUrl: string;
createdAt: Date;
updatedAt: Date;
```

## TravelPlan

```ts
id: number;
countryCode: string;
title: string;
startDate: Date;
endDate: Date;
notes?: string;
createdAt: Date;
updatedAt: Date;
```
