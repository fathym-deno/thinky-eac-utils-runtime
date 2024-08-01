import {
  buildEaCTestIoC,
  DefaultEaCConfig,
  EaCRuntimePlugin,
  EverythingAsCode,
  EverythingAsCodeSynaptic,
  FathymDFSFileHandlerPlugin,
  FathymEaCServicesPlugin,
} from './tests.deps.ts';
import ThinkyEaCUtilsRuntimePlugin from '../src/plugins/ThinkyEaCUtilsRuntimePlugin.ts';

export const AI_LOOKUP = 'core';

const testEaC = {} as EverythingAsCodeSynaptic;

export async function buildTestIoC(
  eac: EverythingAsCode,
  plugins: EaCRuntimePlugin[] = [
    new FathymDFSFileHandlerPlugin(),
    new FathymEaCServicesPlugin(),
    new ThinkyEaCUtilsRuntimePlugin(),
  ],
  useDefault = true,
  useDefaultPlugins = false
) {
  return await buildEaCTestIoC(
    useDefault ? testEaC : {},
    eac,
    plugins,
    useDefaultPlugins
  );
}
