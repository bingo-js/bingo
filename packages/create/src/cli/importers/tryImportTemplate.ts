import { isTemplate } from "../../predicates/isTemplate.js";
import { tryImportWithPredicate } from "../../predicates/tryImportWithPredicate.js";
import { tryImportAndInstallIfNecessary } from "./tryImportAndInstallIfNecessary.js";

export async function tryImportTemplate(from: string) {
	return await tryImportWithPredicate(
		tryImportAndInstallIfNecessary,
		from,
		isTemplate,
		"Template",
	);
}
