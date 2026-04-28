import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.BBKxx8VL.js","_app/immutable/chunks/DTmN85vv.js","_app/immutable/chunks/CXLDUKcu.js","_app/immutable/chunks/B9t0yhpg.js","_app/immutable/chunks/DP51QsYD.js","_app/immutable/chunks/CPhDkl6G.js","_app/immutable/chunks/CYoUI2Kb.js","_app/immutable/chunks/J02zB2Fb.js"];
export const stylesheets = ["_app/immutable/assets/0.D-mTjaha.css"];
export const fonts = [];
