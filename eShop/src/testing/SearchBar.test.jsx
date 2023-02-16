import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi} from "vitest";
import SearchBar from "../components/SearchBar/SearchBar.jsx";
import { MockedFunction } from "vitest";

describe("SearchBar tests", ()=> {
  it("clear input when submitted", async () => {
    const user = userEvent.setup();
    render(<SearchBar onSubmit={() => true}/>)
    // get the input
    const inputElement = screen.getByTestId('Search_Bar');
    const buttonElement = screen.getByRole('button');

    // write to it
    await user.type(inputElement, 'hello') // the user types the input string provided

     // submit form
    await user.click(buttonElement)
    // expecat a cleared input
    expect(inputElement.value).toBe('')
    
   
    
  });

  it("Should call onSubmit props when button clicked", async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn((value) => true) // keeps  the value - can be used a s a function and as an object that tracks everything that has happened to the function

    //check its been called
    //check its been called with the right value argument
    render(<SearchBar onSubmit={mockSubmit}/>)

    const inputElement = screen.getByTestId('Search_Bar');
    const buttonElement = screen.getByRole('button');

    await user.type(inputElement, 'hello')
    await user.click(buttonElement)

    expect(mockSubmit).toBeCalledTimes(1)
    // .calls acesses the array of arrays that mockSubmit, the first array in the array is 
    expect(mockSubmit.calls[0][0]).toBe('hello')

    await user.type(inputElement, 'goodbye')
    await user.click(buttonElement)

    expect(mockSubmit).toBeCalledTimes(2)
    expect(mockSubmit.calls[1][0]).toBe('goodbye')
  })

  it("should call onSubmit on enter", async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn((value) => true)

    render(<SearchBar onSubmit={mockSubmit}/>)

    const inputElement = screen.getByTestId('Search_Bar');

    await user.type(inputElement, 'hello')
    await user.type(inputElement, "hello{enter}") //{enter} means pressing the enter key
    expect(mockSubmit).toBeCalledTimes(1)

    expect(inputElement.value).toBe('')
  })

  it("should pass the current input value into onSubmit", async () => {

  })

  it("Should not call onSubmit when input is empty", async () => {
    const user = userEvent.setup();
    const mockSubmit = vi.fn((value) => true)

    render(<SearchBar onSubmit={mockSubmit}/>)

    const buttonElement = screen.getByRole('button');

    await user.click(buttonElement)

    expect(mockSubmit).toBeCalledTimes(0);
  })
})