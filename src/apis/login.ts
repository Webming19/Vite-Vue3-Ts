import http from "@/utils/http/axios/index";

interface loginParamsType {
  username: string;
  password: string;
}

interface loginReaType {
  result: {
    accessToken: string;
    username: string;
    realName: string;
  };
}

export default (params: loginParamsType) => {
  return http.post<loginReaType>("/oauth/login", params);
};
