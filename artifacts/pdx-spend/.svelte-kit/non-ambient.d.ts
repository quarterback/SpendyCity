
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	type MatcherParam<M> = M extends (param : string) => param is (infer U extends string) ? U : string;

	export interface AppTypes {
		RouteId(): "/" | "/about" | "/agent" | "/dashboard" | "/feed" | "/funds" | "/funds/[slug]" | "/implications" | "/methodology";
		RouteParams(): {
			"/funds/[slug]": { slug: string }
		};
		LayoutParams(): {
			"/": { slug?: string };
			"/about": Record<string, never>;
			"/agent": Record<string, never>;
			"/dashboard": Record<string, never>;
			"/feed": Record<string, never>;
			"/funds": { slug?: string };
			"/funds/[slug]": { slug: string };
			"/implications": Record<string, never>;
			"/methodology": Record<string, never>
		};
		Pathname(): "/" | "/about/" | "/agent/" | "/dashboard/" | "/feed/" | `/funds/${string}` & {} | `/funds/${string}/` & {} | "/implications/" | "/methodology/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/favicon.svg" | string & {};
	}
}