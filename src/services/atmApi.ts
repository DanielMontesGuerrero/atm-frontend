import User from "../types/User";
import rawUsers from "./users.json";

interface ApiResult<T> {
  status: number;
  data: T;
}

function loadUsers() {
  const users = new Map<string, User>();
  rawUsers.forEach((user) => {
    users.set(user.username, user);
  });
  return users;
}

export function getUser(username: string): ApiResult<{ user: User | null }> {
  let rawUser = localStorage.getItem(username);
  if (rawUser === null) {
    const defaultUsers = loadUsers();
    if (!defaultUsers.has(username)) {
      return {
        status: 404,
        data: {
          user: null,
        },
      };
    }
    rawUser = JSON.stringify(defaultUsers.get(username));
  }
  return {
    status: 200,
    data: {
      user: JSON.parse(rawUser),
    },
  };
}

export function validatePin(
  username: string,
  pin: string | undefined,
): ApiResult<{ isValidPin: boolean }> {
  if (pin === undefined) {
    return {
      status: 200,
      data: {
        isValidPin: true,
      },
    };
  }
  const userResult = getUser(username);
  if (userResult.status !== 200 || userResult.data.user === null) {
    return {
      status: 404,
      data: {
        isValidPin: false,
      },
    };
  }
  return {
    status: 200,
    data: {
      isValidPin: userResult.data.user.pin === pin,
    },
  };
}

export function withdraw(
  user: User | undefined | null,
  amount: number,
): ApiResult<{ resultMessage: string }> {
  if (user === undefined || user === null) {
    return {
      status: 400,
      data: {
        resultMessage: "Invalid user, try again",
      },
    };
  }
  const { status, data } = getUser(user.username);
  if (status !== 200 || data.user === null) {
    return {
      status: 404,
      data: {
        resultMessage: "User doesn't exist",
      },
    };
  }
  if (data.user.balance < amount) {
    return {
      status: 200,
      data: {
        resultMessage: "You don't have sufficient funds",
      },
    };
  }
  data.user.balance -= amount;
  localStorage.setItem(data.user.username, JSON.stringify(data.user));
  return {
    status: 200,
    data: {
      resultMessage: "Take your cash, thank you!",
    },
  };
}

export function deposit(
  user: User | undefined | null,
  amount: number,
): ApiResult<{ resultMessage: string }> {
  if (user === undefined || user === null) {
    return {
      status: 400,
      data: {
        resultMessage: "Invalid user, try again",
      },
    };
  }
  const { status, data } = getUser(user.username);
  if (status !== 200 || data.user === null) {
    return {
      status: 400,
      data: {
        resultMessage: "Users doesn't exist",
      },
    };
  }
  data.user.balance += amount;
  localStorage.setItem(data.user.username, JSON.stringify(data.user));
  return {
    status: 200,
    data: {
      resultMessage: "Thank you, your balance will reflect shortly",
    },
  };
}

export function updatePin(
  user: User | undefined | null,
  newPin: string | undefined,
) {
  if (user === undefined || user === null) {
    return {
      status: 400,
      data: {
        resultMessage: "Invalid user, try again",
      },
    };
  }
  if (newPin === undefined || newPin.length !== 4) {
    return {
      status: 400,
      data: {
        resultMessage: "Invalid PIN, try again",
      },
    };
  }
  const { status, data } = getUser(user.username);
  if (status !== 200 || data.user === null) {
    return {
      status: 400,
      data: {
        resultMessage: "Users doesn't exist",
      },
    };
  }
  data.user.pin = newPin;
  localStorage.setItem(data.user.username, JSON.stringify(data.user));
  return {
    status: 200,
    data: {
      resultMessage: "Your PIN was updated, thank you!",
    },
  };
}
