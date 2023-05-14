import { backUrl } from "../config/api";
import { userVisitor } from "../data/user";
import User, { UserPermission, UserSexual } from "../models/User";

export type UserApiType = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  sexual: UserSexual;
  permission: UserPermission;
  college: string;
  department: string;
  signature: string;
  tags: string;
  ban: boolean;
  createTime: string;
  updateTime: string;
};

export const loginApi = async (
  type: string,
  nameOrEmail: string,
  password: string
) => {
  const data = { type: type, nameOrEmail: nameOrEmail, password: password };
  return fetch(`${backUrl}/login`, {
    method: "POST",
    body: JSON.stringify(data),
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const registryApi = async (
  name: string,
  permission: string,
  password: string,
  id: string,
  email?: string,
  avatarUrl?: string
) => {
  const data = {
    name: name,
    permission: permission,
    password: password,
    id: id,
    email: email,
    avatarUrl: avatarUrl,
  };
  return fetch(`${backUrl}/registry`, {
    method: "POST",
    body: JSON.stringify(data),
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getUserByIdApi = async (userId: string | number) => {
  return fetch(`${backUrl}/user?id=${userId}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getUserById = async (userId: string | number): Promise<User> => {
  let user = userVisitor;
  const promise = getUserByIdApi(userId);
  await (await promise).json().then((promise) => {
    if (promise.code === 200) user = User.fromJson(promise.data);
  });
  return user;
};

export const getUserCollectionCountsApi = async (userId: string) => {
  return fetch(`${backUrl}/user/collection/count?id=${userId}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getUserCollectionsApi = async (userId: string) => {
  return fetch(`${backUrl}/user/collection?id=${userId}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getUserFollowerCountsApi = async (userId: string) => {
  return fetch(`${backUrl}/user/follower/count?id=${userId}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getUserFollowersApi = async (userId: string) => {
  return fetch(`${backUrl}/user/follower?id=${userId}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getUserSubscribeCountsApi = async (userId: string) => {
  return fetch(`${backUrl}/user/subscribe/count?id=${userId}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getUserSubscribesApi = async (userId: string) => {
  return fetch(`${backUrl}/user/subscribe?id=${userId}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const isModelCollectedByUserApi = async (
  modelId: string,
  userId: string
) => {
  return fetch(
    `${backUrl}/user/collection/judge?userId=${userId}&modelId=${modelId}`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const addUserCollectionApi = async (
  userId: string | number,
  modelId: string | number
) => {
  return fetch(
    `${backUrl}/model/like/add?userId=${userId}&modelId=${modelId}`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const deleteUserCollectionApi = async (
  userId: string | number,
  modelId: string | number
) => {
  return fetch(
    `${backUrl}/model/like/delete?userId=${userId}&modelId=${modelId}`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const banUserApi = async (userId: string | number) => {
  return fetch(`${backUrl}/user/ban?id=${userId}`, {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const updateSignatureApi = async (
  userId: string | number,
  signature: string
) => {
  return fetch(
    `${backUrl}/user/signature?userId=${userId}&signature=${signature}`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const subscribeUserApi = async (
  userId: string | number,
  followerId: string | number
) => {
  return fetch(
    `${backUrl}/user/follower/subscribe?userId=${userId}&followerId=${followerId}`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const unSubscribeUserApi = async (
  userId: string | number,
  followerId: string | number
) => {
  return fetch(
    `${backUrl}/user/follower/unSubscribe?userId=${userId}&followerId=${followerId}`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const isUserFollowApi = async (
  userId: string | number,
  followerId: string | number
) => {
  return fetch(
    `${backUrl}/user/follower/judge?userId=${userId}&followerId=${followerId}`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
