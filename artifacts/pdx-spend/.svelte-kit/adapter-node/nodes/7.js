import * as server from '../entries/pages/funds/_slug_/_page.server.ts.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/funds/_slug_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/funds/[slug]/+page.server.ts";
export const imports = ["_app/immutable/nodes/7.DFK0wD5P.js","_app/immutable/chunks/D9OJ8qP2.js","_app/immutable/chunks/YlniFg-W.js","_app/immutable/chunks/DzaUzOeE.js","_app/immutable/chunks/CEFP2Mxv.js","_app/immutable/chunks/DzNpXe74.js","_app/immutable/chunks/DCkRlkrS.js","_app/immutable/chunks/DHgP0IHX.js","_app/immutable/chunks/uXNkv49U.js","_app/immutable/chunks/Dagi01YS.js","_app/immutable/chunks/C9x0zcsv.js","_app/immutable/chunks/BKgr4dmZ.js","_app/immutable/chunks/CjkddLpC.js","_app/immutable/chunks/B5tfTu2d.js","_app/immutable/chunks/D5-Sf2SP.js","_app/immutable/chunks/D3QohQNI.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CP3Qz8nn.js","_app/immutable/chunks/BedAidj6.js"];
export const stylesheets = ["_app/immutable/assets/ChartFrame.CGyVcrQI.css","_app/immutable/assets/7.BFiYJmst.css"];
export const fonts = [];
