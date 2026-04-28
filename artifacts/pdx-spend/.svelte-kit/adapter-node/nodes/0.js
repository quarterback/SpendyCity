import * as universal from '../entries/pages/_layout.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.ts";
export const imports = ["_app/immutable/nodes/0.Bc5AFVQG.js","_app/immutable/chunks/CPPjl1S6.js","_app/immutable/chunks/nm10F9E0.js","_app/immutable/chunks/CdnMivxm.js","_app/immutable/chunks/88lw_wvr.js","_app/immutable/chunks/DMke3XiH.js","_app/immutable/chunks/uHGQu4AQ.js","_app/immutable/chunks/DsP3QkV-.js"];
export const stylesheets = ["_app/immutable/assets/0.D5QJ2Mj2.css"];
export const fonts = [];
