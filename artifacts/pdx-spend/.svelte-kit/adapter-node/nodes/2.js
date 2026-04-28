import * as server from '../entries/pages/_page.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/2.BRofpbvZ.js","_app/immutable/chunks/DuV2ahUi.js","_app/immutable/chunks/CHZgNL1i.js","_app/immutable/chunks/BKPCqZLa.js","_app/immutable/chunks/BBgXoWX6.js","_app/immutable/chunks/pm6gYX7-.js","_app/immutable/chunks/CIJZC8G2.js","_app/immutable/chunks/C5vBIdJv.js","_app/immutable/chunks/DeH3VbdW.js","_app/immutable/chunks/DbAGQcQp.js","_app/immutable/chunks/B1Ydvh53.js","_app/immutable/chunks/aT5hTAzA.js","_app/immutable/chunks/Tp_8ElxR.js","_app/immutable/chunks/tHIqZe7b.js","_app/immutable/chunks/IsUaad_-.js","_app/immutable/chunks/-iagJrDH.js","_app/immutable/chunks/C8ujxPd2.js"];
export const stylesheets = ["_app/immutable/assets/ChartFrame.CGyVcrQI.css","_app/immutable/assets/2.CsGPIapn.css"];
export const fonts = [];
