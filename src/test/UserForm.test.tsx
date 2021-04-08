import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import UserForm from "../components/User/UserForm";

afterEach(() => cleanup());

describe("Rendering", () => {
  it("Should render all the element collectlly", () => {
    const handleSaveData = jest.fn();
    render(<UserForm handleSaveData={handleSaveData} />);
    expect(screen.getAllByRole("button")[0]).toBeTruthy();
    expect(screen.getAllByRole("button")[1]).toBeTruthy();
    expect(screen.getByPlaceholderText("楽々太郎")).toBeTruthy();
    expect(screen.getByPlaceholderText("rakuraku@abc.com")).toBeTruthy();
    expect(screen.getByPlaceholderText("1234567")).toBeTruthy();
    expect(screen.getByPlaceholderText("東京都")).toBeTruthy();
    expect(screen.getByPlaceholderText("新宿区")).toBeTruthy();
    expect(screen.getByPlaceholderText("新宿")).toBeTruthy();
    expect(screen.getByPlaceholderText("09011112222")).toBeTruthy();
    expect(screen.getAllByPlaceholderText("11111111")[0]).toBeTruthy();
    expect(screen.getAllByPlaceholderText("11111111")[1]).toBeTruthy();
  });
});

describe("Input form onChange event with username", () => {
  //入力した内容が正しく入力フォームにレンダリングされるか（全部フォームは同じコンポーネントを使用しているため一つだけテストして確認）
  it("Should update input value collectly", () => {
    const handleSaveData = jest.fn();
    render(<UserForm handleSaveData={handleSaveData} />);

    const input = screen.getByPlaceholderText("楽々太郎");
    userEvent.type(input, "みゆう");
    expect(input.value).toBe("みゆう");
  });
});

describe("Button event", () => {
  //何も入力されていない場合はボタンが押せないこと
  it("Should not push button until all input form have text", () => {
    const handleSaveData = jest.fn();
    render(<UserForm handleSaveData={handleSaveData} />);

    const button = screen.getAllByRole("button")[1];
    expect(button).toHaveAttribute("disabled");
  });
  it("Should not push button when only input the username", () => {
    const handleSaveData = jest.fn();
    render(<UserForm handleSaveData={handleSaveData} />);

    const inputName = screen.getByPlaceholderText("楽々太郎");
    userEvent.type(inputName, "みゆう");

    const button = screen.getAllByRole("button")[1];
    expect(button).toHaveAttribute("disabled");
  });
  //一個一個フォームn入力して行った場合に全部のフォームが入力されるまではボタンが押せないかどうかのテスト
  it("Should not push button when only input the username and email", () => {
    const handleSaveData = jest.fn();
    render(<UserForm handleSaveData={handleSaveData} />);

    const inputName = screen.getByPlaceholderText("楽々太郎");
    userEvent.type(inputName, "みゆう");
    const inputEmail = screen.getByPlaceholderText("rakuraku@abc.com");
    userEvent.type(inputEmail, "miyu@gmail.com");

    const button = screen.getAllByRole("button")[1];
    expect(button).toHaveAttribute("disabled");
  });

  it("Should not push button when only input the username, email and zipcode", () => {
    const handleSaveData = jest.fn();
    render(<UserForm handleSaveData={handleSaveData} />);

    const inputName = screen.getByPlaceholderText("楽々太郎");
    userEvent.type(inputName, "みゆう");
    const inputEmail = screen.getByPlaceholderText("rakuraku@abc.com");
    userEvent.type(inputEmail, "miyu@gmail.com");
    const inputZip = screen.getByPlaceholderText("1234567");
    userEvent.type(inputZip, "1420041");

    const button = screen.getAllByRole("button")[1];
    expect(button).toHaveAttribute("disabled");
  });

  it("Should not push button when only input the username, email,zipcode and prefecture", () => {
    const handleSaveData = jest.fn();
    render(<UserForm handleSaveData={handleSaveData} />);

    const inputName = screen.getByPlaceholderText("楽々太郎");
    userEvent.type(inputName, "みゆう");
    const inputEmail = screen.getByPlaceholderText("rakuraku@abc.com");
    userEvent.type(inputEmail, "miyu@gmail.com");
    const inputZip = screen.getByPlaceholderText("1234567");
    userEvent.type(inputZip, "1420041");
    const inputPre = screen.getByPlaceholderText("東京都");
    userEvent.type(inputPre, "東京都");

    const button = screen.getAllByRole("button")[1];
    expect(button).toHaveAttribute("disabled");
  });

  it("Should not push button when only input the username, email,zipcode, prefecture and city", () => {
    const handleSaveData = jest.fn();
    render(<UserForm handleSaveData={handleSaveData} />);

    const inputName = screen.getByPlaceholderText("楽々太郎");
    userEvent.type(inputName, "みゆう");
    const inputEmail = screen.getByPlaceholderText("rakuraku@abc.com");
    userEvent.type(inputEmail, "miyu@gmail.com");
    const inputZip = screen.getByPlaceholderText("1234567");
    userEvent.type(inputZip, "1420041");
    const inputPre = screen.getByPlaceholderText("東京都");
    userEvent.type(inputPre, "東京都");
    const inputCity = screen.getByPlaceholderText("新宿区");
    userEvent.type(inputCity, "品川区");

    const button = screen.getAllByRole("button")[1];
    expect(button).toHaveAttribute("disabled");
  });

  it("Should not push button when only input the username, email,zipcode, prefecture, city and restAddress", () => {
    const handleSaveData = jest.fn();
    render(<UserForm handleSaveData={handleSaveData} />);

    const inputName = screen.getByPlaceholderText("楽々太郎");
    userEvent.type(inputName, "みゆう");
    const inputEmail = screen.getByPlaceholderText("rakuraku@abc.com");
    userEvent.type(inputEmail, "miyu@gmail.com");
    const inputZip = screen.getByPlaceholderText("1234567");
    userEvent.type(inputZip, "1420041");
    const inputPre = screen.getByPlaceholderText("東京都");
    userEvent.type(inputPre, "東京都");
    const inputCity = screen.getByPlaceholderText("新宿区");
    userEvent.type(inputCity, "品川区");
    const inputRest = screen.getByPlaceholderText("新宿");
    userEvent.type(inputRest, "戸越");

    const button = screen.getAllByRole("button")[1];
    expect(button).toHaveAttribute("disabled");
  });

  it("Should not push button when only input the username, email,zipcode, prefecture, city, restAddress and telephone", () => {
    const handleSaveData = jest.fn();
    render(<UserForm handleSaveData={handleSaveData} />);

    const inputName = screen.getByPlaceholderText("楽々太郎");
    userEvent.type(inputName, "みゆう");
    const inputEmail = screen.getByPlaceholderText("rakuraku@abc.com");
    userEvent.type(inputEmail, "miyu@gmail.com");
    const inputZip = screen.getByPlaceholderText("1234567");
    userEvent.type(inputZip, "1420041");
    const inputPre = screen.getByPlaceholderText("東京都");
    userEvent.type(inputPre, "東京都");
    const inputCity = screen.getByPlaceholderText("新宿区");
    userEvent.type(inputCity, "品川区");
    const inputRest = screen.getByPlaceholderText("新宿");
    userEvent.type(inputRest, "戸越");
    const inputTel = screen.getByPlaceholderText("09011112222");
    userEvent.type(inputTel, "09011112222");

    const button = screen.getAllByRole("button")[1];
    expect(button).toHaveAttribute("disabled");
  });

  it("Should not push button when only input the username, email,zipcode, prefecture, city, restAddress, telephone and password", () => {
    const handleSaveData = jest.fn();
    render(<UserForm handleSaveData={handleSaveData} />);

    const inputName = screen.getByPlaceholderText("楽々太郎");
    userEvent.type(inputName, "みゆう");
    const inputEmail = screen.getByPlaceholderText("rakuraku@abc.com");
    userEvent.type(inputEmail, "miyu@gmail.com");
    const inputZip = screen.getByPlaceholderText("1234567");
    userEvent.type(inputZip, "1420041");
    const inputPre = screen.getByPlaceholderText("東京都");
    userEvent.type(inputPre, "東京都");
    const inputCity = screen.getByPlaceholderText("新宿区");
    userEvent.type(inputCity, "品川区");
    const inputRest = screen.getByPlaceholderText("新宿");
    userEvent.type(inputRest, "戸越");
    const inputTel = screen.getByPlaceholderText("09011112222");
    userEvent.type(inputTel, "09011112222");
    const inputPass = screen.getAllByPlaceholderText("11111111")[0];
    userEvent.type(inputPass, "12345678");

    const button = screen.getAllByRole("button")[1];
    expect(button).toHaveAttribute("disabled");
  });

  //全部入力した場合はボタンがおせるようになっていること
  it("Should push button after all input have text", () => {
    const handleSaveData = jest.fn();
    render(<UserForm handleSaveData={handleSaveData} />);

    const inputName = screen.getByPlaceholderText("楽々太郎");
    userEvent.type(inputName, "みゆう");
    const inputEmail = screen.getByPlaceholderText("rakuraku@abc.com");
    userEvent.type(inputEmail, "miyu@gmail.com");
    const inputZip = screen.getByPlaceholderText("1234567");
    userEvent.type(inputZip, "1420041");
    const inputPre = screen.getByPlaceholderText("東京都");
    userEvent.type(inputPre, "東京都");
    const inputCity = screen.getByPlaceholderText("新宿区");
    userEvent.type(inputCity, "品川区");
    const inputRest = screen.getByPlaceholderText("新宿");
    userEvent.type(inputRest, "戸越");
    const inputTel = screen.getByPlaceholderText("09011112222");
    userEvent.type(inputTel, "09011112222");
    const inputPass = screen.getAllByPlaceholderText("11111111")[0];
    userEvent.type(inputPass, "12345678");
    const inputConfirm = screen.getAllByPlaceholderText("11111111")[1];
    userEvent.type(inputConfirm, "12345678");

    expect(screen.getAllByRole("button")[1]).not.toHaveAttribute("disabled");
  });
});
