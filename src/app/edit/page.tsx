import type { Metadata } from "next";
import { EditPageContent } from "./edit-content";

export const metadata: Metadata = {
	title: "Edit Request",
	description: "Submit a website change request to Polar26.",
	robots: { index: false, follow: false },
};

export default function EditPage() {
	return <EditPageContent />;
}
