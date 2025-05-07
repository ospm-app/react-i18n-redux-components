# Step-by-Step: React Router v7 + Cloudflare Workers

This guide summarizes the latest, official Cloudflare approach for deploying a React Router v7 app to Cloudflare Workers, based on [Cloudflare documentation](https://developers.cloudflare.com/workers/frameworks/framework-guides/react-router/).

> **Cloudflare now provides an official template for React Router v7 apps with SSR on Workers.**

> - If you want SSR, use the official template (recommended for most users).
> - If you want a pure SPA, use the regular Vite+React template and use React Router as a library (see "SPA Mode" below).

---

## 1. Official SSR Template (Recommended)

Create a new project with the official template:

```bash
pnpm create cloudflare@latest my-react-router-app --framework=react-router
```

- This sets up SSR with React Router v7 and Cloudflare Workers.
- Includes: `app/`, `routes/`, `workers/app.ts`, `react-router.config.ts`, `vite.config.ts`, `wrangler.jsonc`.
- `react-router.config.ts` sets `ssr: true` and enables Vite environment API.
- `main` in `wrangler.jsonc` points to `./workers/app.ts` (the Worker entry).
- The Worker’s default export is a fetch handler that delegates to React Router.

### Local Development

```bash
pnpm run dev
```

This runs your app in the Workers runtime, just like in production.

### Deployment

```bash
pnpm run deploy
```

---

## 2. SPA Mode (Client-side Only)

> **Note:** SPA mode and prerendering are NOT currently supported with the Cloudflare Vite plugin SSR template.
> For a pure SPA, use the React template and add React Router as a library:

```bash
pnpm create vite@latest my-spa-app -- --template react
cd my-spa-app
pnpm add react-router-dom
```

- Use your existing Vite+React setup.
- Use the Vite dev server for local development.
- Deploy static assets to Cloudflare Pages or use Wrangler for Workers Sites.
- See the "Local HTTPS & Custom Domain" section below for local dev tips.

---

## 3. Vite and Cloudflare Plugin (SSR Template)

In `vite.config.ts`, include both plugins:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cloudflare from '@cloudflare/vite-plugin-cloudflare-workers';

export default defineConfig({
  plugins: [react(), cloudflare()],
});
```

---

## 4. Local HTTPS & Custom Domain (SPA or SSR)

To run the Vite dev server with HTTPS and a custom domain (e.g., local.ospm.app):

1. **Install mkcert** (trusted local certs)
   - macOS: `brew install mkcert`
   - Windows/Linux: see [mkcert releases](https://github.com/FiloSottile/mkcert/releases)

2. **Generate certs**

   ```bash
   mkcert -install
   mkcert local.ospm.app
   ```

   This creates `local.ospm.app.pem` and `local.ospm.app-key.pem`.

3. **Update `/etc/hosts`**

   ```sh
   127.0.0.1 local.ospm.app
   ```

4. **Configure Vite**
   Create `vite.config.ts` if needed:

   ```ts
   import { defineConfig } from 'vite';
   import react from '@vitejs/plugin-react';
   import fs from 'fs';

   export default defineConfig({
     plugins: [react()],
     server: {
       host: 'local.ospm.app',
       https: {
         key: fs.readFileSync('local.ospm.app-key.pem'),
         cert: fs.readFileSync('local.ospm.app.pem'),
       },
     },
   });
   ```

5. **Add script to `package.json`**

   ```json
   "dev:local": "vite --host local.ospm.app --https"
   ```

6. **Run local dev server**

   ```bash
   pnpm run dev:local
   ```

   Now open <https://local.ospm.app:5173> in your browser.

---

## 5. References & Further Reading

- [React Router on Cloudflare Workers (Official)](https://developers.cloudflare.com/workers/frameworks/framework-guides/react-router/)
- [Vite plugin · Cloudflare Workers docs](https://developers.cloudflare.com/workers/vite-plugin/)
- [Cloudflare create-cloudflare CLI](https://developers.cloudflare.com/workers/cli-wrangler/create-cloudflare/)
- [React Router v7 Cloudflare Template (GitHub)](https://github.com/AdiRishi/react-router-cloudflare-template)

---

**Summary:**

- For SSR, use the official Cloudflare React Router template.
- For SPA, use Vite+React+React Router as a library.
- Local HTTPS and custom domain workflows are supported for both.
- See official docs for advanced configuration and deployment.

## 1. Scaffold Your Vite + React Project

From the `packages/web-client/` directory:

> **Note:** This project uses [pnpm](https://pnpm.io/) as the package manager. Replace all `npm` commands with `pnpm`.

```bash
pnpm create vite@latest . -- --template react
```

Install dependencies:

```bash
pnpm install
```

Install React Router v7:

```bash
pnpm add react-router-dom
```

---

## 2. Install Cloudflare Tools

Install Wrangler (Cloudflare's CLI) globally if you haven't:

```bash
pnpm add -g wrangler
```

Add the Cloudflare Vite plugin:

```bash
pnpm add -D @cloudflare/vite-plugin-cloudflare-workers
```

---

## 3. Configure Vite for Cloudflare Workers

In your `vite.config.ts` or `vite.config.js`, add the Cloudflare plugin:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cloudflare from '@cloudflare/vite-plugin-cloudflare-workers';

export default defineConfig({
  plugins: [react(), cloudflare()],
});
```

---

## 4. Add `wrangler.toml`

Create a `wrangler.toml` in the project root:

```toml
name = "web-client"
type = "javascript"
main = "dist/worker/worker.js"
compatibility_date = "2025-04-26"

[site]
bucket = "dist/client"
entry-point = "."
```

- Adjust `compatibility_date` as needed.
- The `main` entry points to the Worker script generated by the Vite plugin.

---

## 5. Update Scripts in `package.json`

Add or update scripts:

```json
"scripts": {
  "dev": "wrangler dev",
  "build": "vite build",
  "deploy": "wrangler publish"
}
```

---

## 6. SPA Routing with React Router v7

- React Router v7 works out of the box with Vite and Cloudflare Workers.
- Ensure the Worker serves `index.html` for all SPA routes (the Cloudflare Vite plugin handles this).

---

## 7. Local Development

### Option A: Cloudflare Worker Emulation

Run:

```bash
pnpm run dev
```

This starts a local Cloudflare Worker with your Vite app.

### Option B: Vite Dev Server with HTTPS and Custom Domain

For fast frontend development, use Vite’s dev server with HTTPS and your custom domain (`local.ospm.app`).

#### 1. Install mkcert (for trusted local HTTPS certificates)

- macOS: `brew install mkcert`
- Windows: [mkcert releases](https://github.com/FiloSottile/mkcert/releases)
- Linux: See mkcert docs

Then run:

```bash
mkcert -install
mkcert local.ospm.app
```

This will generate `local.ospm.app.pem` and `local.ospm.app-key.pem` in your project folder.

#### 2. Update /etc/hosts

Add this line to your `/etc/hosts` file:

```sh
127.0.0.1 local.ospm.app
```

#### 3. Create vite.config.ts

If you don’t have one, create `vite.config.ts` in the project root:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'local.ospm.app',
    https: {
      key: fs.readFileSync('local.ospm.app-key.pem'),
      cert: fs.readFileSync('local.ospm.app.pem'),
    },
  },
});
```

#### 4. Add a dev:local script to package.json

```json
"scripts": {
  "dev:local": "vite --host local.ospm.app --https"
}
```

#### 5. Start the Vite dev server

```bash
pnpm run dev:local
```

Now open <https://local.ospm.app:5173> (or the port shown) in your browser.

---

## 8. Deploy to Cloudflare

Run:

```bash
pnpm run deploy
```

---

## References

- [Vite plugin · Cloudflare Workers docs](https://developers.cloudflare.com/workers/vite-plugin/)
- [React Router on Cloudflare Workers](https://developers.cloudflare.com/workers/frameworks/framework-guides/react-router/)
- [Tutorial: React SPA with an API](https://developers.cloudflare.com/workers/vite-plugin/tutorial/)
- [React Router v7 Cloudflare Template (GitHub)](https://github.com/AdiRishi/react-router-cloudflare-template)

---

This setup gives you a modern, production-ready workflow for deploying Vite-powered React SPAs to Cloudflare Workers, with full support for react-router v7.
