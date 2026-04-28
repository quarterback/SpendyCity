import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.C5GC1nPN.js","_app/immutable/chunks/B-trCKv8.js","_app/immutable/chunks/B_nMbjcE.js","_app/immutable/chunks/DvtG4s1C.js","_app/immutable/chunks/B3JkAlhM.js","_app/immutable/chunks/xEA5s2bK.js","_app/immutable/chunks/Dt0Lj5-L.js","_app/immutable/chunks/DCURwwDZ.js"];
export const stylesheets = ["_app/immutable/assets/0.D5QJ2Mj2.css"];
export const fonts = [];
