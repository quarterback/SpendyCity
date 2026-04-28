import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.Bleded9j.js","_app/immutable/chunks/DuV2ahUi.js","_app/immutable/chunks/CHZgNL1i.js","_app/immutable/chunks/tHIqZe7b.js","_app/immutable/chunks/pm6gYX7-.js","_app/immutable/chunks/DeH3VbdW.js","_app/immutable/chunks/DbAGQcQp.js","_app/immutable/chunks/BKPCqZLa.js","_app/immutable/chunks/UdKjM6Ce.js","_app/immutable/chunks/DNGwfhMP.js"];
export const stylesheets = ["_app/immutable/assets/0.DqfBqax8.css"];
export const fonts = [];
