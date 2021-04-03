declare module '*.module.css'
{
	const classNames: {
		[className: string]: string;
	};
	
	export = classNames;
}

declare module '*.css'
{
	const none: never;
	
	export = none;
}
