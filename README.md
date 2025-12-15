# Buenas prácticas, organización y ejecución selectiva

## Organización y buenas prácticas
- **Patrón Screenplay:** Todas las interacciones y validaciones están encapsuladas en Tasks y Questions reutilizables, facilitando el mantenimiento y la extensión de los tests.
- **Selectores y mensajes centralizados:** Los selectores y mensajes de error se encuentran en archivos de constantes (`src/screenplay/utilities/Constants.ts` y `src/screenplay/ui/HomePage.ts`), evitando valores hardcodeados.
- **Utilidades compartidas:** Funciones de utilidad para normalización y comparación de arrays están en `src/screenplay/utilities/utils.ts`.
- **Hooks globales:** Los hooks de Cucumber (`features/support/hooks.ts`) gestionan la inicialización, captura de errores de consola y screenshots automáticos en fallos.
- **Timeout global:** El timeout global de steps se configura en `features/support/timeout.js` usando ES Modules.
- **Escenarios claros y separados:** Cada escenario Gherkin valida un objetivo específico, siguiendo los requerimientos del reto y facilitando la trazabilidad.

## Uso de tags para escenarios

- Cada escenario tiene un tag único (`@CP001`, `@CP002`, etc.) para facilitar la ejecución selectiva y el reporte.
- Puedes agregar más tags según tus necesidades, por ejemplo `@smoke`, `@regression`, etc.

### Ejemplo de tags en los features

```feature
@CP001
Scenario: Homepage loads successfully
   Given the user opens the public homepage
   Then the main document should respond with status 200
   And there should be no console errors

@CP002
Scenario: Key elements are present on homepage
   ...
```

## Ejecución selectiva por tags

- Para ejecutar solo un escenario/tag específico:
   ```
   npm test -- --tags "@CP002"
   ```
- Para ejecutar varios tags:
   ```
   npm test -- --tags "@CP001 or @CP003"
   ```
- Para ejecutar escenarios que tengan múltiples tags:
   ```
   npm test -- --tags "@smoke and @CP001"
   ```

## Hooks condicionales por tag

Puedes ejecutar lógica especial en hooks solo para ciertos tags:

```typescript
import { Before } from "@cucumber/cucumber";

Before({ tags: "@CP001" }, async function () {
   // Esto solo corre para escenarios con @CP001
});
```

## Recomendaciones adicionales

- **No modifiques los step definitions para soportar tags:** Los tags se gestionan a nivel de Cucumber y no requieren cambios en los steps.
- **Mantén los steps genéricos y reutilizables:** Así puedes combinarlos en diferentes escenarios y features.
- **Actualiza los tags y la documentación si agregas nuevos escenarios.**
- **Ejecuta siempre los tests con `npm test` y usa los tags para filtrar según lo que necesites validar.**

# Smoke Test Creai (Playwright + Cucumber + Screenplay)

## Herramientas y Lenguajes Usados
- **Lenguaje principal:** TypeScript
- **Framework de automatización:** Playwright
- **BDD:** Cucumber.js
- **Patrón de diseño:** Screenplay Pattern
- **Reportes:** Allure

## Dependencias necesarias
- Node.js 18+ (recomendado 20+)
- npm (incluido con Node.js)
- Google Chrome o Chromium (Playwright lo instala por defecto)
- Allure Commandline (`npm install -g allure-commandline` para abrir reportes localmente)

## Instalación del proyecto
1. Clona el repositorio y entra a la carpeta del proyecto.
2. Instala las dependencias y navegadores:
   ```bash
   npm install
   npx playwright install
   ```

## Ejecución de los tests y generación de reportes


### 1. Ejecutar los tests y limpiar resultados previos
```bash
npm test
```
Esto ejecuta todos los tests, limpia los resultados previos y genera la carpeta `allure-results/`.

### 2. Generar el reporte Allure manualmente
```bash
npm run allure:generate
```
Esto crea o actualiza la carpeta `allure-report/` a partir de los resultados.

### 3. Abrir el reporte en el navegador
```bash
npm run allure:open
```
Esto abre el reporte HTML generado en tu navegador por defecto.

> **Nota:** El reporte no se genera automáticamente al finalizar los tests. Debes ejecutar `npm run allure:generate` manualmente después de cada corrida.


## Scripts disponibles
- `npm test`: Ejecuta los tests, limpia resultados previos y genera la carpeta `allure-results/`. **No realiza reintentos automáticos** (`--retry 0` forzado en el script).
- `npm run allure:generate`: (Re)genera el reporte HTML de Allure a partir de los resultados (debe ejecutarse manualmente tras cada test).
- `npm run allure:open`: Abre el reporte generado en el navegador.

## Estructura del proyecto
- `features/`: Archivos feature y step definitions de Cucumber.
- `src/screenplay/`: Implementación del patrón Screenplay (Actors, Tasks, Questions, UI, etc).
- `allure-results/`: Resultados de las pruebas para Allure.
- `allure-report/`: Reporte HTML generado por Allure.
- `package.json`: Incluye dependencias clave como:
   - `@cucumber/cucumber` (BDD)
   - `playwright` y `@playwright/test` (automatización)
   - `allure-cucumberjs` y `cucumberjs-allure-reporter` (reportes)
   - `@serenity-js/core` y `@serenity-js/web` (Screenplay Pattern)
   - `typescript`, `ts-node` (transpilación y ejecución TS)

## Notas importantes
- El formatter de Allure está configurado como `allure-cucumberjs/reporter` (compatible con Cucumber.js v8+).
- Si tienes problemas con la instalación de dependencias, asegúrate de usar el registro público de npm y Node.js actualizado.
- **No hay reintentos automáticos:** El script de test fuerza `--retry 0` para evitar duplicidad de escenarios en los reportes y asegurar un solo intento por ejecución.
- **Limitación conocida:** No es posible mostrar el resultado/resumen de los tests en consola y generar el reporte Allure en una sola ejecución debido a una limitación del reporter. Usa `npm run test:console` para desarrollo (ver resultados en consola) y `npm test` para generar el reporte Allure.
- Si necesitas debuggear, puedes agregar logs en los step definitions y usar screenshots automáticos en los hooks.

## Referencias
- [Documentación oficial Allure + CucumberJS](https://allurereport.org/docs/cucumberjs/)
- [Playwright](https://playwright.dev/)
- [Cucumber.js](https://github.com/cucumber/cucumber-js)
- [Serenity/JS Screenplay Pattern](https://serenity-js.org/handbook/design/screenplay-pattern.html)

---

---

## Ejemplos de uso y debug


### 🔹 Ejecutar smoke test y ver reporte Allure
```bash
npm test
npm run allure:generate
npm run allure:open
```
Esto ejecuta todos los tests, luego genera el reporte Allure y finalmente lo abre en el navegador.
> **Importante:** El reporte debe generarse manualmente con `npm run allure:generate` después de cada corrida de tests.


### 🔹 Debuggear un step definition
- Agrega logs en tus steps para inspeccionar valores:
   ```ts
   console.log('Valor de menú extraído:', menuOptions);
   ```
- Usa `debugger;` para pausar la ejecución si corres con Node.js:
   ```ts
   debugger;
   ```

### 🔹 Tomar screenshots automáticos en fallos
Agrega un hook en Cucumber para capturar screenshots al fallar un escenario:
```ts
import { After } from '@cucumber/cucumber';
import { page } from 'playwright';

After(async function (scenario) {
   if (scenario.result?.status === 'failed') {
      await page.screenshot({ path: `screenshots/${scenario.pickle.name}.png` });
   }
});
```

## 🟦 Buenas prácticas y recomendaciones

- Mantén los selectores desacoplados y robustos (usa `data-testid` o clases estables).
- Prefiere aserciones manuales y logs claros para depurar.
- Usa el patrón Screenplay para separar responsabilidades y facilitar el mantenimiento.
- Documenta cualquier workaround o limitación en este README.
- Si agregas nuevas dependencias, actualiza este archivo y los scripts de npm.

---

Creado por Mario Alejandro Benítez Orozco para el equipo Creai · 2025