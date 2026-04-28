export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.svg","og-default.svg"]),
	mimeTypes: {".svg":"image/svg+xml"},
	_: {
		client: {start:"_app/immutable/entry/start.DWHpPKiS.js",app:"_app/immutable/entry/app.BPpDiq4M.js",imports:["_app/immutable/entry/start.DWHpPKiS.js","_app/immutable/chunks/BiC9mtLN.js","_app/immutable/chunks/B_nMbjcE.js","_app/immutable/chunks/Dt0Lj5-L.js","_app/immutable/chunks/-UyI9lYi.js","_app/immutable/entry/app.BPpDiq4M.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/B_nMbjcE.js","_app/immutable/chunks/C8HHhShw.js","_app/immutable/chunks/B-trCKv8.js","_app/immutable/chunks/fH2r3EsP.js","_app/immutable/chunks/B3JkAlhM.js","_app/immutable/chunks/DiK14Z-p.js","_app/immutable/chunks/IOeWJQfR.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/api/regenerate-memo",
				pattern: /^\/api\/regenerate-memo\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./entries/endpoints/api/regenerate-memo/_server.ts.js'))
			}
		],
		prerendered_routes: new Set(["/","/feed.xml","/funds/arts-tax/","/funds/pcef/","/funds/housing-investment/","/funds/rental-services/","/funds/affordable-housing-dev/","/funds/preschool-for-all/","/funds/supportive-housing/","/about/","/agent/","/dashboard/","/feed/","/implications/","/methodology/"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

export const prerendered = new Set(["/","/feed.xml","/funds/arts-tax/","/funds/pcef/","/funds/housing-investment/","/funds/rental-services/","/funds/affordable-housing-dev/","/funds/preschool-for-all/","/funds/supportive-housing/","/about/","/agent/","/dashboard/","/feed/","/implications/","/methodology/"]);

export const base = "";