import { Octokit } from "octokit";

export async function hasAccessToOwner(octokit: Octokit, owner: string) {
	const { data: user } = await octokit.request("GET /user");
	if (user.login.toLowerCase() === owner.toLowerCase()) {
		return true;
	}

	try {
		await octokit.request("GET /user/memberships/orgs/{org}", { org: owner });
		return true;
	} catch {
		return false;
	}
}
