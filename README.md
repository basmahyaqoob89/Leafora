# Leafora

Leafora is a React frontend for exploring plant leaf health. Visitors can browse the planned model coverage, select a leaf image in the Botanical Observatory, and review or export a Herbarium Report. The default inspection is an interactive demonstration.

## Technology stack

| Area | Installed tools |
| --- | --- |
| Application | React, React DOM, TypeScript, React Router |
| Build and styling | Vite, the Vite React plugin, Tailwind CSS and its Vite plugin, custom CSS |
| UI and motion | Ant Design, Lucide React, Motion for React |
| Requests and state | Axios, TanStack React Query |
| PDF export | jsPDF |

## Project structure

    .
    ├── public/images/        # Sample leaf, brand mark, and homepage images
    ├── reference/           # Original standalone HTML prototype for design reference
    ├── src/
    │   ├── api/             # Axios client, endpoint definitions, API and mock services
    │   ├── assets/fonts/    # Local font files
    │   ├── components/      # Shared navigation, layout elements, and illustrations
    │   ├── config/          # Ant Design theme and model coverage data
    │   ├── hooks/           # Diagnosis mutation and report cache key
    │   ├── layouts/         # Shared page shell and route scroll handling
    │   ├── pages/           # Homepage and Herbarium Report
    │   ├── sections/        # Homepage sections, including the Observatory
    │   ├── styles/          # Botanical theme, responsive layouts, and print styles
    │   ├── types/           # TypeScript contracts for diagnosis and reports
    │   ├── utils/           # Shared report formatting and PDF export
    │   ├── App.tsx          # Routes and application providers
    │   └── main.tsx         # React entry point
    ├── .env.example         # Optional API configuration template
    ├── index.html           # Vite HTML entry point
    ├── package.json
    ├── package-lock.json
    ├── tsconfig.json
    └── vite.config.ts

## Getting started

Use Node.js 20.19+ on the Node 20 line, or Node.js 22.12+ and npm. The handoff was checked with Node.js 24.11.1 and npm 11.6.2.

From the project root, install the locked dependencies and start the development server.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. The default experience works with no environment file.

## Implemented features

- Responsive homepage with Our Story, a planned model coverage section, an animated How It Works timeline, and the Botanical Observatory.
- Coverage panel for 38 PlantVillage plant health classes. Expandable plant cards are ready to render verified labels. The current data file is empty and the UI shows a pending state.
- Leaf image selection with a specimen preview, validation feedback, replace and remove controls, and an illustrated sample.
- An inspection progress state and a dedicated report with specimen details, field observations, and care notes. Completed API responses can also display plant, condition, detected class, and confidence when provided.
- Client-side PDF download and a separate print action.

| URL | Behavior |
| --- | --- |
| `/` | Homepage |
| `/#coverage` | Planned model coverage |
| `/#features` | Botanical Observatory |
| `/report` | Herbarium Report for the current session |
| Other paths | Redirect to the homepage once the app loads |

## Diagnosis workflow

1. Open the Observatory and select a JPG, JPEG, PNG, or WebP image up to 10 MiB, or choose **Try a sample leaf**. The browser validates the file type and size and checks that the image decodes before showing its preview.
2. Select **Begin optical inspection**. The diagnosis mutation uses the local mock or sends the selected file to the configured API, depending on the configuration and specimen source.
3. On success, the app stores the result and image preview in the in-memory React Query cache and opens `/report`. Use **Download PDF** for a local file or **Print Report** for the browser print dialog.
4. Opening the report without a cached specimen, such as after a full page reload, offers a link back to the Observatory.

## AI integration status

The default workflow uses a local mock that waits about 4.4 seconds and returns fixed observations and care notes. It performs no image classification and the report labels its output as illustrative. Sample specimens always use this path.

The frontend includes an opt-in HTTP integration for real uploaded files. This repository contains no inference backend or verified connection to EfficientNetB0 or Gemini. Configuring an API URL alone does not supply a trained model. The planned 38-class coverage is based on PlantVillage, and the exact labels used for training are still needed.

## API configuration

Copy [`.env.example`](.env.example) to `.env.local` when a backend is available. Set `VITE_API_BASE_URL` to the backend base URL, such as `http://localhost:8000`, and restart Vite. Leave it blank for the demo. Vite exposes `VITE_*` values to the browser, so keep API keys and credentials on the backend.

The frontend sends `POST /diagnosis` with a multipart file field named `image`. The Axios timeout is 30 seconds. A backend on a separate origin needs to allow requests from the frontend origin. A failed request shows a retry message in the Observatory.

The expected JSON response is defined in [`src/types/plant.types.ts`](src/types/plant.types.ts). It includes:

- `status` set to `complete` for a real result or `illustrative` for demonstration output.
- `specimen` with `name` and `source`.
- `fieldObservations` and `careRecommendations` as string arrays.
- Optional `plantName`, `predictedCondition`, `detectedClass`, and `confidence` as a number from 0 to 1.

## Latest updates

- Removed the Plant Journal homepage section, its navigation link, and its dedicated component, images, and styles.
- Renumbered Our Story, How It Works, and the Botanical Observatory. The model coverage section remains directly after Our Story.
- Added coverage accordion behavior and a downloadable Herbarium Report PDF.

## Next developer tasks

- Obtain the exact 38 training labels or a class-index map, including healthy conditions, and group the verified labels by plant in [`src/config/modelCoverage.ts`](src/config/modelCoverage.ts).
- Implement or connect the diagnosis backend and verify the multipart request, CORS, response contract, timeout handling, and real confidence values. Keep provider credentials server-side.
- Add repeatable automated checks for navigation, upload validation, the mock and backend flows, and PDF export. The package currently has no lint or test script.
- Decide whether reports should persist across reloads and how uploaded images should be retained, if persistence becomes a requirement.

## Build and deployment

```sh
npm run typecheck
npm run build
npm run preview
```

The build runs TypeScript checks and writes the static production bundle to `dist/`. Use the preview command to check that bundle locally.

Publish the contents of `dist/` on a static host configured to serve `index.html` for application routes such as `/report`. The current setup assumes an origin-root deployment. A project-subpath deployment needs corresponding asset and router base-path changes. Set the optional API URL in the build environment when deploying a connected frontend.

Commit source files, `package-lock.json`, and `.env.example`. Keep dependencies, build output, local environment files, and credentials out of Git.
