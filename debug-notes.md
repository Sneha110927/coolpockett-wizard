# debug-notes.md

## Bug
Vercel production build failed with:

`Could not resolve "../components/FileUpload.jsx" from "src/steps/Step3Details.jsx"`

## Root cause
Vercel builds on Linux, where the filesystem is **case-sensitive**.  
The code imported:

```js
import FileUpload from "../components/FileUpload.jsx";