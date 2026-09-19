import { Octokit, RequestError } from "octokit";

// Only a definitive 404 proves a lack of access. Other failures, such as a token
// without the read:org scope, defer to repository creation to report the reason.
export async function hasAccessToOwner(octokit: Octokit, owner: string) {
	try {
		const { data: user } = await octokit.request("GET /user");
		if (user.login.toLowerCase() === owner.toLowerCase()) {
			return true;
		}
	} catch {
		return true;
	}

	try {
		const { data: membership } = await octokit.request(
			"GET /user/memberships/orgs/{org}",
			{ org: owner },
		);

		return membership.state === "active";
	} catch (error) {
		return !(error instanceof RequestError && error.status === 404);
	}
}
