import * as server from '../entries/pages/funds/_slug_/_page.server.ts.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/funds/_slug_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/funds/[slug]/+page.server.ts";
export const imports = ["_app/immutable/nodes/7.3pbMjaJ4.js","_app/immutable/chunks/DuV2ahUi.js","_app/immutable/chunks/CHZgNL1i.js","_app/immutable/chunks/BKPCqZLa.js","_app/immutable/chunks/BBgXoWX6.js","_app/immutable/chunks/pm6gYX7-.js","_app/immutable/chunks/CIJZC8G2.js","_app/immutable/chunks/DeH3VbdW.js","_app/immutable/chunks/UdKjM6Ce.js","_app/immutable/chunks/DbAGQcQp.js","_app/immutable/chunks/B1Ydvh53.js","_app/immutable/chunks/aT5hTAzA.js","_app/immutable/chunks/Tp_8ElxR.js","_app/immutable/chunks/tHIqZe7b.js","_app/immutable/chunks/D3QohQNI.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/IsUaad_-.js","_app/immutable/chunks/-iagJrDH.js","_app/immutable/chunks/C5vBIdJv.js"];
export const stylesheets = ["_app/immutable/assets/ChartFrame.CGyVcrQI.css","_app/immutable/assets/7.BFiYJmst.css"];
export const fonts = [];
