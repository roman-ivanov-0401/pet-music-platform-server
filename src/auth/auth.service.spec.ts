import { BadRequestException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import { UserService } from "../user/user.service";
import { RegisterDto } from "./auth.dto";
import { AuthService } from "./auth.service";

describe("AuthService", () => {
  let authService: AuthService;
  let jwtService: JwtService;

  const args = {
    "should register": {
      email: "test@test.ru",
      name: "test name",
      password: "testtest",
    },
    "should login": {
      email: "toxa2005@inbox.com",
      password: "testtest",
    },
    "shouldn't register (user already exists)": {
      email: "toxa2005@inbox.com",
      name: "test name",
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
      refreshToken: expect.any(String),
      accessToken: expect.any(String),
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
      refreshToken: expect.any(String),
      accessToken: expect.any(String),
    },
    "shouldn't register (user already exists)": new BadRequestException(
      "User with this email is already in the system"
    ),
  };
  const mockUserEmails = ["test2@test.ru", "toxa2005@inbox.com"];

  const mockUserService = {
    getByEmail: jest.fn(async (email: string) => {
      return mockUserEmails.find((e) => e === email)[0];
    }),
    create: jest.fn(async (dto: RegisterDto) => {
      const user = returnValues["should register"].user;
      user.email = dto.email;
      user.name = dto.name;
      return user;
    }),
  };
  const mockJwtService = {
    signAsync: jest.fn(async () => {
      return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmY4YTZlMjdhMTdhYTNiNmY2MjM1ZTIiLCJpYXQiOjE2NjA0NjI4MTgsImV4cCI6MTY2MTY3MjQxOH0.VsEGIy8iQlj9z0rgdjvhYc8JCWOMdOYHH7uZhC7KfhE";
    }),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    jwtService = moduleRef.get<JwtService>(JwtService);
  });

  it("should be defined", () => {
    expect(authService).toBeDefined();
  });

  it("should register", async () => {
    try {
      expect(await authService.register(args["should register"])).toEqual(
        returnValues["should register"]
      );
    } catch (e) {
      expect(e.message).toBe("User with this email is already in the system");
    }
  });

  it("shouldn't register (user already exists)", async () => {
    try {
      expect(
        await authService.register(
          args["shouldn't register (user already exists)"]
        )
      ).toEqual(returnValues["should register"]);
    } catch (e) {
      expect(e.message).toBe("User with this email is already in the system");
    }
  });

  it("should login", async () => {
    expect(await authService.login(args["should login"])).toEqual(
      returnValues["should login"]
    );
  });
});
