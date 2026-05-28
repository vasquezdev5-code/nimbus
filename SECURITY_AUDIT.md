# Auditoría de Seguridad — Nimbus Weather App

Resumen rápido:
- Dependencias: no se usan claves privadas en el repo; la app consume la API pública Open-Meteo.
- Riesgos principales: falta de límites de tiempo/timeout en `fetch`, dependencia de `fetch` global, ausencia de validaciones estrictas sobre respuestas externas y errores poco detallados.

Hallazgos y recomendaciones:

- Uso de `fetch` sin timeout:
  - Riesgo: peticiones colgadas pueden degradar la app.
  - Recomendación: emplear un wrapper con timeout o AbortController y exponer cancelación en hooks.

- Validación de respuestas:
  - Riesgo: la función `normalizeWeatherData` asume la presencia de campos; respuestas malformadas pueden lanzar errores no manejados.
  - Recomendación: validar shapes (por ejemplo con `zod`) antes de normalizar.

- Manejo de errores y retry:
  - Riesgo: errores de red no distinguen tipos (rate-limit, 5xx, 4xx).
  - Recomendación: distinguir errores y aplicar retries/exponential backoff en la capa de datos o usar `react-query` options `retry` y `retryDelay`.

- Exposición de claves y configuración:
  - Observación: no hay API keys en el repo.
  - Recomendación: documentar variables de entorno esperadas y añadir `dotenv` + validación si se añaden claves.

- Dependencias y actualización:
  - Recomendación: ejecutar auditoría (`npm audit`) y programar actualizaciones regulares.

- Tests y mocks:
  - Recomendación: usar `msw` en tests de integración para simular la API y evitar llamadas reales.

Acciones implementadas en este commit:
- Añadido `SECURITY_AUDIT.md` con hallazgos y recomendaciones.
- Añadidas dependencias y configuración de tests (vitest, testing-library) y tests unitarios que mockean `fetch`.
