import * as server from '../entries/pages/_page.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.ts";
export const imports = ["_app/immutable/nodes/2.DDfuwMtp.js","_app/immutable/chunks/CPPjl1S6.js","_app/immutable/chunks/nm10F9E0.js","_app/immutable/chunks/BwTVddgs.js","_app/immutable/chunks/B-KVV3-B.js","_app/immutable/chunks/88lw_wvr.js","_app/immutable/chunks/BxcAkY28.js","_app/immutable/chunks/CN_3cnoc.js","_app/immutable/chunks/DMke3XiH.js","_app/immutable/chunks/uHGQu4AQ.js","_app/immutable/chunks/Ct6NTd4r.js","_app/immutable/chunks/DJrDz6sh.js","_app/immutable/chunks/DXZSp2EQ.js","_app/immutable/chunks/CdnMivxm.js","_app/immutable/chunks/DMisprbG.js","_app/immutable/chunks/CfA_0G2n.js","_app/immutable/chunks/D8BHjPbU.js"];
export const stylesheets = ["_app/immutable/assets/2.CNxmdBfs.css"];
export const fonts = [];
