import axios from 'axios';

// request header configs
const post_config = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
};

export const deployTemplate = async (
  token: string,
  payload: any
): Promise<any> => {
  try {
    const response = await axios.post(
      'https://api-dev.spheron.network/v1/cluster-instance/template',
      payload,
      post_config(token)
    );

    return { error: false, res: response.data };
  } catch (error) {
    return { error: true, res: error };
  }
};
