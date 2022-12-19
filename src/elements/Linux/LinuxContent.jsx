import React, { useEffect, useRef } from "react";
import { V86Starter } from "v86";
import { v86WASM, seabios, vgabios } from "v86/build/binaries";
import cursorIcon from "@static/cursor.svg";

const Arch = () => {
	let screenRef = useRef();

	useEffect(() => {
		async function main() {
			new V86Starter({
				wasm_fn: async (param: any) =>
					{
						return (await WebAssembly.instantiate(await v86WASM, param))
							.instance.exports;
					},
				memory_size: 32 * 1024 * 1024,
				vga_memory_size: 2 * 1024 * 1024,
				screen_container: screenRef.current,
				bios: { buffer: await seabios },
				vga_bios: { buffer: await vgabios },
				hda: {
					url: "https://unpkg.com/react-95-fiber/binaries/os.img",
				},
				autostart: true,
			});
		}
		main();
	}, []);

	return (
		<div
			ref={screenRef}
			style={{
				maxHeight: "70vh",
				cursor: `url(${cursorIcon}), crosshair`,
			}}
		>
			<div
				style={{
					whiteSpace: "pre",
					font: "14px monospace",
					lineHeight: 14,
				}}
			></div>
			<canvas style={{ display: "none" }}></canvas>
		</div>
	);
};

export default Arch;
