import Color from "color";
import colors from "../styles/colors";

const aliases = {
	fade: ["clearer"],
	grayscale: ["greyscale"],
};

const colorMethods = [
	"negate", // rgb(0, 100, 255) -> rgb(255, 155, 0)
	"lighten", // hsl(100, 50%, 50%) -> hsl(100, 50%, 75%)
	"darken", // hsl(100, 50%, 50%) -> hsl(100, 50%, 25%)
	"saturate", // hsl(100, 50%, 50%) -> hsl(100, 75%, 50%)
	"desaturate", // hsl(100, 50%, 50%) -> hsl(100, 25%, 50%)
	"grayscale", // #5CBF54 -> #969696
	"whiten", // hwb(100, 50%, 50%) -> hwb(100, 75%, 50%)
	"blacken", // hwb(100, 50%, 50%) -> hwb(100, 50%, 75%)
	"fade", // rgba(10, 10, 10, 0.8) -> rgba(10, 10, 10, 0.4)
	"opaquer", // rgba(10, 10, 10, 0.8) -> rgba(10, 10, 10, 1.0)
	"rotate", // hsl(60, 20%, 20%) -> hsl(330, 20%, 20%)
	"mix", // rgb(0, 0, 255) * 0.8 + rgb(0, 255, 0) * 0.2 -> rgb(0, 51, 204)
];

const addModifier =
	(fn, method, ...modifierArgs) =>
	(...args) => {
		if (method === "mix") {
			modifierArgs = [].concat(modifierArgs);
			modifierArgs[0] = new Color(modifierArgs[0](...args));
		}
		return new Color(fn(...args))[method](...modifierArgs).toString();
	};

const decorateSelector = selector => {
	colorMethods.forEach(method => {
		selector[method] = (...args) =>
			decorateSelector(addModifier(selector, method, ...args));
	});
	Object.keys(aliases).forEach(method =>
		aliases[method].forEach(
			alias =>
				(selector[alias] = (...args) => {
					if (
						process.env.NODE_ENV !== "production" &&
						typeof console !== "undefined"
					) {
						console.warn(
							`${alias}() is deprecated. Use ${method}() instead.`
						);
					}
					return selector[method](...args);
				})
		)
	);
	return selector;
};

const makeThemeColor = key => decorateSelector(props => props.theme[key]);

const makeTheme = (...colors) =>
	colors.reduce((result, color) => {
		result[color] = makeThemeColor(color);
		return result;
	}, {});

const theme = makeTheme(...Object.keys(colors));

export default theme;
