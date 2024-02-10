import { ITemplate } from './interface';

export function templateDeployPayload(
  organizationId: string,
  templateId: string,
  env: any[],
  defaultPlanId: string,
  command: string[],
  args: string[],
  region: string,
  storage: string
): ITemplate {
  return {
    uniqueTopicId: uuid(),
    organizationId,
    templateId,
    environmentVariables: env ? env : [],
    akashImageId: defaultPlanId,
    instanceCount: 1,
    customConfiguration: {
      command,
      args,
    },
    region,
    customInstanceSpecs: {
      storage,
    },
    scalable: true,
  };
}
