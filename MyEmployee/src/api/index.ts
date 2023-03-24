import {BASE_URL} from '@env';

export const API = {
  getEmployee: (responsecallback: any) => {
    request(responsecallback, {}, 'GET', BASE_URL + 'employees', buildHeader());
  },
  getEmployeeById: (responsecallback: any, id: string) => {
    request(
      responsecallback,
      {},
      'GET',
      BASE_URL + `employees/${id}`,
      buildHeader(),
    );
  },
  AddEmployee: (responsecallback: any, data: any) => {
    request(responsecallback, data, 'POST', BASE_URL + 'create', buildHeader());
  },
  UpdateEmployee: (responsecallback: any, data: any, id: string) => {
    request(
      responsecallback,
      data,
      'PUT',
      BASE_URL + `update/${id}`,
      buildHeader(),
    );
  },
};

const buildHeader = (headerParams = {}) => {
  let header = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  Object.assign(header, headerParams);
  return header;
};

async function request(
  onResponse: any,
  data: any,
  type: any,
  featureURL: any,
  headers = buildHeader(),
) {
  try {
    let response;
    if (type === 'GET') {
      response = await fetch(featureURL, {
        method: type,
        headers,
      });
    } else {
      response = await fetch(featureURL, {
        method: type,
        body: JSON.stringify(data),
        headers,
      });
    }

    const result = await response.json();
    if (result.status === 'success') {
      onResponse.success(result.data);
    } else {
      onResponse.error(result);
    }
  } catch (error) {
    onResponse.error(error);
  }
}
