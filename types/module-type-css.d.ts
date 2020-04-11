declare module '*.module.css'
{
	const classNames: {
		[className: string]: string;
	};
	
	export = classNames;
}

declare module '*.global.css'
{
	const none: never;
	
	export = none;
}
