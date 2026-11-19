import type { CreatedRequest } from 'bingo-requests';

import type { SystemContext } from '../types/system.ts';
import { getRequestSender } from './getRequestSender.ts';

export async function applyRequestsToSystem(requests: CreatedRequest[], system: SystemContext) {
  await Promise.all(
    requests.map(async (request) => {
      const sender = getRequestSender(system.fetchers, request);
      if (!sender) {
        return;
      }

      const { id, send } = sender;

      system.display.item('request', id, { start: Date.now() });

      try {
        await send();
      } catch (error) {
        if (!request.silent) {
          system.display.item('request', id, { error });
        }
      }

      system.display.item('request', id, { end: Date.now() });
    }),
  );
}
