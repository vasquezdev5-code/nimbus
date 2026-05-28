# 🌤️ Nimbus Weather

Nimbus Weather es una aplicación meteorológica moderna construida con React, TypeScript y Vite. Ofrece búsqueda de ciudades, geolocalización del navegador, pronóstico diario y horario, temas claros/oscuros y una experiencia totalmente responsive con animaciones suaves.

---

## 🧠 ¿Cómo funciona?

1. El usuario ingresa el nombre de una ciudad en la barra de búsqueda.
2. La app consulta el endpoint de geocodificación de Open-Meteo para obtener coordenadas (latitud/longitud).
3. Con esas coordenadas, se solicita el pronóstico meteorológico a Open-Meteo.
4. Los datos se muestran en la pantalla principal:
   - clima actual
   - pronóstico de 7 días
   - pronóstico de 24 horas
   - detalles adicionales como humedad, viento, visibilidad, índice UV y horas de sol
5. Si el usuario selecciona "Usar mi ubicación", la app solicita permiso de geolocalización del navegador y obtiene el clima para la posición actual.

> No se necesita ninguna clave de API. Open-Meteo es gratuito y no requiere autenticación.

---

## ✨ Características principales

- Búsqueda de ciudad con autocompletado
- Geolocalización con un solo clic
- Clima actual completo
- Pronóstico semanal y horario
- Alternar unidades entre °C y °F
- Tema claro/oscuro y tema del sistema
- Estados de carga, error y pantalla vacía
- Animaciones con Framer Motion
- Diseño mobile-first y responsive

---

## 🚀 Uso rápido

```bash
npm install
npm run dev
```

Luego abre `http://localhost:5173` en tu navegador.

---

## 📌 Flujo de la aplicación

- `App.tsx` es el punto de entrada de la UI.
- `main.tsx` monta React y aplica estilos globales.
- `src/features/search/components/SearchBar.tsx` controla la búsqueda de ciudades.
- `src/hooks/useGeolocation.ts` gestiona el permiso y lectura de ubicación del navegador.
- `src/features/weather/hooks/useWeather.ts` usa TanStack Query para buscar y cachear datos.
- `src/services/weatherApi.ts` encapsula las llamadas a Open-Meteo.
- `src/features/weather/components/WeatherDashboard.tsx` orquesta los estados de carga, error y resultados.
- `src/features/weather/components/*.tsx` muestran tarjetas de clima, pronóstico horario, diario y detalles.
- `src/lib/weatherUtils.ts` convierte códigos de clima, formatea fechas y números.
- `src/hooks/useTheme.ts` mantiene la preferencia de tema en localStorage.

---

## 📁 Estructura del proyecto

```
src/
├── App.tsx
├── main.tsx
├── index.css
├── features/
│   ├── search/
│   │   └── components/SearchBar.tsx
│   └── weather/
│       ├── components/
│       │   ├── CurrentWeatherCard.tsx
│       │   ├── DailyForecast.tsx
│       │   ├── EmptyState.tsx
│       │   ├── ErrorState.tsx
│       │   ├── HourlyForecast.tsx
│       │   ├── WeatherDashboard.tsx
│       │   ├── WeatherDetails.tsx
│       │   ├── WeatherSkeleton.tsx
│       │   └── WeatherSkeleton.tsx
│       └── hooks/useWeather.ts
├── components/
│   ├── layout/Header.tsx
│   └── ui/
│       ├── Badge.tsx
│       ├── Card.tsx
│       └── Skeleton.tsx
├── hooks/
│   ├── useDebounce.ts
│   ├── useGeolocation.ts
│   └── useTheme.ts
├── lib/
│   ├── utils.ts
│   └── weatherUtils.ts
├── services/weatherApi.ts
└── types/index.ts
```

---

## 🛠 Scripts disponibles

- `npm run dev` — Inicia el servidor de desarrollo
- `npm run build` — Compila la app con TypeScript y Vite
- `npm run preview` — Sirve la versión de producción localmente
- `npm run lint` — Ejecuta ESLint
- `npm run test` — Ejecuta Vitest

---

## 🧩 Tecnologías usadas

- React 18
- TypeScript
- Vite
- Tailwind CSS
- TanStack Query
- Framer Motion
- Open-Meteo
- Lucide React

---

## 🔧 Notas técnicas

- Las preferencias de tema y unidades se guardan en `localStorage`.
- La app muestra un estado de carga mientras se obtienen datos.
- Si la búsqueda falla o no hay resultados, se muestra un mensaje de error con opción de reintentar.
- El estado inicial es una pantalla de bienvenida cuando no hay datos cargados.
- El diseño está optimizado para móvil y escritorio.
