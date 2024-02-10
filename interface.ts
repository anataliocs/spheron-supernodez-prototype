export interface ITemplate {
  organizationId: string;
  templateId: string;
  environmentVariables?: {
    label: string;
    value?: string;
    isSecret?: boolean;
  }[];
  akashImageId: string;
  uniqueTopicId: string;
  instanceCount: number;
  region: string;
  customConfiguration?: {
    command?: string[];
    args?: string[];
    env?: {
      label: string;
      value: string;
      isSecret?: boolean;
    }[];
    ports?: {
      containerPort: string;
      exposedPort: string;
    }[];
  };
  customInstanceSpecs: {
    cpu?: number;
    memory?: string;
    storage: string;
    persistentStorage?: {
      size: number;
      class: string;
      mountPoint: string;
    };
  };
  scalable?: boolean;
}
