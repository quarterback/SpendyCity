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
		client: {start:"_app/immutable/entry/start.CNikTITE.js",app:"_app/immutable/entry/app.CjJugR9-.js",imports:["_app/immutable/entry/start.CNikTITE.js","_app/immutable/chunks/9rdjnLtq.js","_app/immutable/chunks/nm10F9E0.js","_app/immutable/chunks/uHGQu4AQ.js","_app/immutable/entry/app.CjJugR9-.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/nm10F9E0.js","_app/immutable/chunks/BwTVddgs.js","_app/immutable/chunks/CPPjl1S6.js","_app/immutable/chunks/B-KVV3-B.js","_app/immutable/chunks/88lw_wvr.js","_app/immutable/chunks/Ct6NTd4r.js","_app/immutable/chunks/DJrDz6sh.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
		prerendered_routes: new Set(["/","/__data.json","/feed.xml","/funds/arts-tax/","/funds/arts-tax/__data.json","/funds/pcef/","/funds/pcef/__data.json","/funds/housing-investment/","/funds/housing-investment/__data.json","/funds/rental-services/","/funds/rental-services/__data.json","/funds/affordable-housing-dev/","/funds/affordable-housing-dev/__data.json","/funds/preschool-for-all/","/funds/preschool-for-all/__data.json","/funds/supportive-housing/","/funds/supportive-housing/__data.json","/about/","/agent/","/dashboard/","/feed/","/implications/","/methodology/"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
