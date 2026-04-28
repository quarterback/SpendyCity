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
		client: {start:"_app/immutable/entry/start.BxoBIaqu.js",app:"_app/immutable/entry/app.v03jSZOx.js",imports:["_app/immutable/entry/start.BxoBIaqu.js","_app/immutable/chunks/Bi1uW37P.js","_app/immutable/chunks/YlniFg-W.js","_app/immutable/chunks/Dagi01YS.js","_app/immutable/entry/app.v03jSZOx.js","_app/immutable/chunks/C1FmrZbK.js","_app/immutable/chunks/YlniFg-W.js","_app/immutable/chunks/DzaUzOeE.js","_app/immutable/chunks/D9OJ8qP2.js","_app/immutable/chunks/CEFP2Mxv.js","_app/immutable/chunks/DzNpXe74.js","_app/immutable/chunks/C9x0zcsv.js","_app/immutable/chunks/BKgr4dmZ.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
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
