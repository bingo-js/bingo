import { z } from "zod";

/**
 * Zod description of the `RequestInit` options object passed to `fetch`.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/RequestInit}
 */
export const fetchInit = z.object({
	/**
	 * Indicates that the request's response should be able to register a
	 * JavaScript-based attribution source or trigger.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/RequestInit#attributionreporting}
	 */
	attributionReporting: z
		.object({
			/**
			 * Whether the response is eligible to register an attribution source.
			 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/RequestInit#eventsourceeligible}
			 */
			eventSourceEligible: z.boolean().optional(),

			/**
			 * Whether the response is eligible to register an attribution trigger.
			 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/RequestInit#triggereligible}
			 */
			triggerEligible: z.boolean().optional(),
		})
		.optional(),

	/**
	 * Body to send with the request.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/RequestInit#body}
	 */
	body: z
		.union([
			z.string(),
			z.instanceof(Blob),
			z.instanceof(FormData),
			z.instanceof(URLSearchParams),
			z.instanceof(ArrayBuffer),
			z.instanceof(ReadableStream),
			z.custom<Extract<BodyInit, ArrayBufferView>>((value) =>
				ArrayBuffer.isView(value),
			),
		])
		.optional(),

	/**
	 * Whether the selected topics for the request's URL should be sent in a
	 * `Sec-Browsing-Topics` header.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/RequestInit#browsingtopics}
	 */
	browsingTopics: z.boolean().optional(),

	/**
	 * How the request will interact with the browser's HTTP cache.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/RequestInit#cache}
	 */
	cache: z
		.enum([
			"default",
			"no-store",
			"reload",
			"no-cache",
			"force-cache",
			"only-if-cached",
		])
		.optional(),

	/**
	 * Whether the user agent should send or receive cookies for the request.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/RequestInit#credentials}
	 */
	credentials: z.enum(["omit", "same-origin", "include"]).optional(),

	/**
	 * Headers to add to the request.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/RequestInit#headers}
	 */
	headers: z
		.union([
			z.instanceof(Headers),
			z.record(z.string()),
			z.array(z.tuple([z.string(), z.string()])),
		])
		.optional(),

	/**
	 * Cryptographic hash used to verify the integrity of the fetched resource.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/RequestInit#integrity}
	 */
	integrity: z.string().optional(),

	/**
	 * Whether to allow the request to outlive the page.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/RequestInit#keepalive}
	 */
	keepalive: z.boolean().optional(),

	/**
	 * Request method.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/RequestInit#method}
	 */
	method: z.string().optional(),

	/**
	 * Mode to use for the request.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/RequestInit#mode}
	 */
	mode: z.enum(["same-origin", "no-cors", "cors", "navigate"]).optional(),

	/**
	 * Priority of the request relative to other requests of the same type.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/RequestInit#priority}
	 */
	priority: z.enum(["high", "low", "auto"]).optional(),

	/**
	 * How to handle a redirect response.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/RequestInit#redirect}
	 */
	redirect: z.enum(["follow", "error", "manual"]).optional(),

	/**
	 * Referrer of the request.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/RequestInit#referrer}
	 */
	referrer: z.string().optional(),

	/**
	 * Referrer policy to use for the request.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/RequestInit#referrerpolicy}
	 */
	referrerPolicy: z
		.enum([
			"",
			"no-referrer",
			"no-referrer-when-downgrade",
			"same-origin",
			"origin",
			"strict-origin",
			"origin-when-cross-origin",
			"strict-origin-when-cross-origin",
			"unsafe-url",
		])
		.optional(),

	/**
	 * Signal that can be used to abort the request.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/RequestInit#signal}
	 */
	signal: z.instanceof(AbortSignal).nullish(),

	/**
	 * Can only be `null`, used to disassociate the request from any window.
	 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/RequestInit#window}
	 */
	window: z.null().optional(),
});
