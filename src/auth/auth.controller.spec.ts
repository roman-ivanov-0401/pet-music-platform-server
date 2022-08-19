import { Test } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { LoginDto, RegisterDto } from "./auth.dto";
import { AuthService } from "./auth.service";

describe("AuthController", () => {
  let authController: AuthController;
  let authService: AuthService;

  const args = {
    "should register": {
      email: "test@test.ru",
      name: "test name",
      password: "testtest",
    },
    "should login": {
      email: "test@test.ru",
      password: "testtest",
    },
  };

  const returnValues = {
    "should register": {
      user: {
        _id: "62f8a6e27a17aa3b6f6235e2",
        email: args["should register"].email,
        name: args["should register"].name,
        roles: ["USER"],
        library: "62f8a6e27a17aa3b6f6235e0",
        createdAt: "2022-08-14T07:40:18.880Z",
        updatedAt: "2022-08-14T07:40:18.880Z",
        __v: 0,
      },
      refreshToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmY4YTZlMjdhMTdhYTNiNmY2MjM1ZTIiLCJpYXQiOjE2NjA0NjI4MTgsImV4cCI6MTY2MTY3MjQxOH0.VsEGIy8iQlj9z0rgdjvhYc8JCWOMdOYHH7uZhC7KfhE",
      accessToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmY4YTZlMjdhMTdhYTNiNmY2MjM1ZTIiLCJpYXQiOjE2NjA0NjI4MTgsImV4cCI6MTY2MDQ2NjQxOH0.YREUcIzNi9Gn3zGWHAwPZf8RK5Yj-K96os8pNkJCKgU",
    },
    "should login": {
      user: {
        _id: "62f8a6e27a17aa3b6f6235e2",
        email: args["should login"].email,
        name: "test name",
        roles: ["USER"],
        library: "62f8a6e27a17aa3b6f6235e0",
        createdAt: "2022-08-14T07:40:18.880Z",
        updatedAt: "2022-08-14T07:40:18.880Z",
        __v: 0,
      },
      refreshToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmY4YTZlMjdhMTdhYTNiNmY2MjM1ZTIiLCJpYXQiOjE2NjA0NjI4MTgsImV4cCI6MTY2MTY3MjQxOH0.VsEGIy8iQlj9z0rgdjvhYc8JCWOMdOYHH7uZhC7KfhE",
      accessToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmY4YTZlMjdhMTdhYTNiNmY2MjM1ZTIiLCJpYXQiOjE2NjA0NjI4MTgsImV4cCI6MTY2MDQ2NjQxOH0.YREUcIzNi9Gn3zGWHAwPZf8RK5Yj-K96os8pNkJCKgU",
    },
  };

  const mockAuthService = {
    register: jest.fn((dto: RegisterDto) => {
      const defaultReturn = returnValues["should register"];
      defaultReturn.user.email = dto.email;
      defaultReturn.user.name = dto.name;
      return defaultReturn;
    }),
    login: jest.fn((dto: LoginDto) => {
      const defaultReturn = returnValues["should login"];
      defaultReturn.user.email = dto.email;
      return defaultReturn;
    }),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    authController = moduleRef.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(authController).toBeDefined();
  });

  it("should register", () => {
    jest.spyOn(authService, "register");
    expect(authController.register(args["should register"])).toEqual(
      returnValues["should register"]
    );
    expect(authService.register).toHaveBeenCalledTimes(1);
  });

  it("should login", () => {
    jest.spyOn(authService, "login");
    expect(authController.login(args["should login"])).toEqual(
      returnValues["should login"]
    );
    expect(authService.login).toHaveBeenCalledTimes(1);
  });
});
