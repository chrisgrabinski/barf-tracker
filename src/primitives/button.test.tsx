import { render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";

import { Button } from "./button";

const mockOnClick = jest.fn();

const renderComponent = ({
  children = "Click me",
  onClick = mockOnClick,
  ...props
}: ComponentProps<typeof Button> = {}) => {
  return render(
    <Button onClick={onClick} {...props}>
      {children}
    </Button>,
  );
};

describe("Button", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders as button with type and props passed down by default", () => {
    renderComponent({ id: "button-id" });

    const buttonElement = screen.getByRole("button", { name: "Click me" });

    expect(buttonElement).toHaveAttribute("type", "button");

    expect(buttonElement).toHaveAttribute("id", "button-id");

    expect(buttonElement).not.toHaveAttribute("disabled");
    expect(buttonElement).not.toHaveAttribute("aria-busy");

    buttonElement.click();

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("renders as child component without type and with props passed down", () => {
    render(
      <Button asChild id="button-id" onClick={mockOnClick}>
        <a href="/">I'm a link</a>
      </Button>,
    );

    const buttonElement = screen.getByRole("link", { name: "I'm a link" });

    expect(buttonElement).not.toHaveAttribute("type");

    expect(buttonElement).toHaveAttribute("id", "button-id");

    expect(buttonElement).toHaveAttribute("href", "/");

    buttonElement.click();

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("renders disabled state", () => {
    renderComponent({ disabled: true });

    const buttonElement = screen.getByRole("button");

    expect(buttonElement).not.toHaveAttribute("disabled");
    expect(buttonElement).toHaveAttribute("aria-disabled", "true");

    buttonElement.focus();

    expect(buttonElement).toHaveFocus();

    buttonElement.click();

    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it("renders loading state", () => {
    renderComponent({ loading: true });

    const buttonElement = screen.getByRole("button");

    expect(buttonElement).toHaveAttribute("aria-busy", "true");

    buttonElement.focus();

    expect(buttonElement).toHaveFocus();

    buttonElement.click();

    expect(mockOnClick).not.toHaveBeenCalled();
  });

  it("renders both disabled and loading state", () => {
    renderComponent({ disabled: true, loading: true });

    const buttonElement = screen.getByRole("button");

    expect(buttonElement).toHaveAttribute("aria-disabled", "true");
    expect(buttonElement).toHaveAttribute("aria-busy", "true");
  });

  it("overwrites aria attributes for disabled and loading state", () => {
    renderComponent({
      "aria-busy": "false",
      "aria-disabled": "false",
      disabled: true,
      loading: true,
    });

    const buttonElement = screen.getByRole("button");

    expect(buttonElement).toHaveAttribute("aria-disabled", "false");
    expect(buttonElement).toHaveAttribute("aria-busy", "false");
  });
});
