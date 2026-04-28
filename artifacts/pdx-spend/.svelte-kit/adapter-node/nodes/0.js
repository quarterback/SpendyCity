import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.C-5eyzXj.js","_app/immutable/chunks/DP0wnPvt.js","_app/immutable/chunks/CnxF20uS.js","_app/immutable/chunks/D5gYpLE-.js","_app/immutable/chunks/CqxbtkIB.js","_app/immutable/chunks/rdwrV-TA.js","_app/immutable/chunks/Bd2mcGN2.js","_app/immutable/chunks/BlTxSgqE.js"];
export const stylesheets = ["_app/immutable/assets/0.D5QJ2Mj2.css"];
export const fonts = [];
