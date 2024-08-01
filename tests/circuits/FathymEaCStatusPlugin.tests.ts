import { FathymEaCStatus2Plugin } from '../../src/plugins/utils/FathymEaCStatusPlugin.ts';
import {
  assert,
  assertStringIncludes,
  buildTestIoC,
  EverythingAsCodeSynaptic,
  Runnable,
} from '../tests.deps.ts';

Deno.test('FathymEaCStatusPlugin Tests', async (t) => {
  const eac = {} as EverythingAsCodeSynaptic;

  const { ioc } = await buildTestIoC(eac);

  // await t.step('Invoke', async () => {
  //   const circuit = await ioc.Resolve<Runnable>(
  //     ioc.Symbol('Circuit'),
  //     `${FathymEaCStatus2Plugin.name}|wait-for-status`
  //   );

  //   const response = await circuit.invoke({});

  //   assert(response?.Messages, JSON.stringify(response));
  //   assert(response?.Messages.slice(-1)[0].content);

  //   console.log(response?.Messages.slice(-1)[0].content);
  // });

  await t.step('Stream Events', async () => {
    const circuit = await ioc.Resolve<Runnable>(
      ioc.Symbol('Circuit'),
      `${FathymEaCStatus2Plugin.name}|wait-for-status`
    );

    const events = await circuit.streamEvents({}, { version: 'v2' });

    assert(events);
    // console.log(chunks);

    for await (const event of events) {
      // console.log(chunk);
      // assert(chunk.content, JSON.stringify(chunk));

      // console.log(event.event);

      if (event.event === 'on_chat_model_stream') {
        console.log(event.data.chunk.content);
      }
    }
  });
});
