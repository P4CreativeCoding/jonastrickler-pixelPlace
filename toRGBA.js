function toRGBA(data) {
	const rgbaValues = [
		[0, 0, 0, 255],
		[137, 141, 144, 255],
		[255, 255, 255, 255],
		[212, 215, 217, 255],
		[156, 105, 38, 255],
		[255, 153, 170, 255],
		[180, 74, 192, 255],
		[129, 30, 159, 255],
		[81, 233, 244, 255],
		[54, 144, 234, 255],
		[36, 80, 164, 255],
		[126, 237, 86, 255],
		[0, 163, 104, 255],
		[255, 214, 53, 255],
		[255, 168, 0, 255],
		[255, 69, 0, 255],
	];
	let rgbaArr = [];
	data.forEach((color) => {
		const rgba = rgbaValues[color];
		rgbaArr = rgbaArr.concat(rgba);
	});
	return rgbaArr;
}
module.exports = toRGBA;
