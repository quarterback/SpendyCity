export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.svg","og-default.png","og-default.svg","voice.md"]),
	mimeTypes: {".svg":"image/svg+xml",".png":"image/png",".md":"text/markdown"},
	_: {
		client: {start:"_app/immutable/entry/start.DNBiuAMF.js",app:"_app/immutable/entry/app.BK_QUmYa.js",imports:["_app/immutable/entry/start.DNBiuAMF.js","_app/immutable/chunks/W2eTT4MZ.js","_app/immutable/chunks/CHZgNL1i.js","_app/immutable/chunks/DbAGQcQp.js","_app/immutable/entry/app.BK_QUmYa.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/CHZgNL1i.js","_app/immutable/chunks/BKPCqZLa.js","_app/immutable/chunks/DuV2ahUi.js","_app/immutable/chunks/BBgXoWX6.js","_app/immutable/chunks/pm6gYX7-.js","_app/immutable/chunks/B1Ydvh53.js","_app/immutable/chunks/aT5hTAzA.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
		prerendered_routes: new Set(["/","/__data.json","/feed.xml","/dashboard/","/agent/","/methodology/","/implications/","/about/","/funds/rental-services/","/funds/rental-services/__data.json","/funds/pcef/","/funds/pcef/__data.json","/funds/arts-tax/","/funds/arts-tax/__data.json","/funds/housing-investment/","/funds/housing-investment/__data.json","/funds/affordable-housing-dev/","/funds/affordable-housing-dev/__data.json","/funds/preschool-for-all/","/funds/preschool-for-all/__data.json","/funds/supportive-housing/","/funds/supportive-housing/__data.json","/feed/"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
