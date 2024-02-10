import { deployTemplate } from '../api';
import { ACCESS_TOKEN } from '../config';
import styles from '../styles/Button.module.css';

const Deploy = () => {
  const payload = {
    organizationId: '6594434eebe14900122f637b',
    templateId: '6406fa6db40edfc3b9d5e4ec',
    akashImageId: '6331ecb770dbf4bd413e73ae',
    uniqueTopicId: '4df939e6-3bdb-4775-8ac8-2a68a4aba9f8',
    environmentVariables: [
      {
        name: 'EXT_IP',
        label: 'EXT_IP',
        defaultValue: 'auto',
        required: false,
      },
      {
        name: 'INT_IP',
        label: 'INT_IP',
        defaultValue: 'auto',
        required: false,
      },
      {
        name: 'EXISTING_ARCHIVERS',
        label: 'EXISTING_ARCHIVERS',
        defaultValue:
          '[{"ip":"45.56.68.62","port":4000,"publicKey":"840e7b59a95d3c5f5044f4bc62ab9fa94bc107d391001141410983502e3cde63"},{"ip":"173.255.247.88","port":4000,"publicKey":"2db7c949632d26b87d7e7a5a4ad41c306f63ee972655121a37c5e4f52b00a542"},{"ip":"170.187.154.43","port":4000,"publicKey":"7af699dd711074eb96a8d1103e32b589e511613ebb0c6a789a9e8791b2b05f34"}]',
        required: false,
      },
      {
        name: 'APP_MONITOR',
        label: 'APP_MONITOR',
        defaultValue: '104.200.21.5',
        required: false,
      },
      {
        name: 'DASHPORT',
        label: 'DASHPORT',
        defaultValue: '8080',
        required: false,
      },
      {
        name: 'SERVERIP',
        label: 'SERVERIP',
        defaultValue: '127.0.0.1',
        required: false,
        regionMap: {
          'us-east': '23.154.136.78',
          'us-west': '23.158.200.193',
          'eu-east': '5.199.170.42',
        },
      },
      {
        name: 'LOCALLANIP',
        label: 'LOCALLANIP',
        defaultValue: '127.0.0.1',
        required: false,
        regionMap: {
          'us-east': '23.154.136.78',
          'us-west': '23.158.200.193',
          'eu-east': '5.199.170.42',
        },
      },
      {
        name: 'SHMEXT',
        label: 'SHMEXT',
        defaultValue: '9001',
        required: false,
      },
      {
        name: 'SHMINT',
        label: 'SHMINT',
        defaultValue: '10001',
        required: false,
      },
      {
        name: 'RUNDASHBOARD',
        label: 'RUNDASHBOARD',
        defaultValue: 'y',
        required: false,
      },
      {
        name: 'DASHPASS',
        label: 'PASSWORD',
        defaultValue: '',
        value: 'minor-bug',
        required: true,
      },
    ],
    instanceCount: 1,
    region: 'us-west',
    customInstanceSpecs: {
      storage: '80Gi',
    },
    customConfiguration: {
      command: [
        'sh',
        '-c',
        'apt install sudo -y && cd /home/node && mkdir app && cd app && ln -s /usr/src/app /home/node/app/validator && git clone https://gitlab.com/shardeum/validator/dashboard.git && cp -r dashboard/* . && bash entrypoint.sh',
      ],
    },
    scalable: true,
  };

  const handleDeploy = async (accessToken: string, payload: any) => {
    const deployTemplateRes = await deployTemplate(accessToken, payload);
    console.log(deployTemplateRes);
  };

  return (
    <button
      onClick={() => handleDeploy(ACCESS_TOKEN, payload)}
      className={styles.buttonPrimary}
    >
      Deploy Shardeum
    </button>
  );
};

export default Deploy;
