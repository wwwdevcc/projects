import { ReactElement } from "react"

export type Feature = {
	icon: ReactElement;
	title: string;
	text: string;
	link?: string;
	linkText?: string;
}