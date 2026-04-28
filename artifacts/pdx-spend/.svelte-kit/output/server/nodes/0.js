import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.CP-C8gvb.js","_app/immutable/chunks/D9OJ8qP2.js","_app/immutable/chunks/YlniFg-W.js","_app/immutable/chunks/B5tfTu2d.js","_app/immutable/chunks/DzNpXe74.js","_app/immutable/chunks/DHgP0IHX.js","_app/immutable/chunks/Dagi01YS.js","_app/immutable/chunks/DzaUzOeE.js","_app/immutable/chunks/uXNkv49U.js","_app/immutable/chunks/B7ej9Xh0.js"];
export const stylesheets = ["_app/immutable/assets/0.Dxet93Sz.css"];
export const fonts = [];
