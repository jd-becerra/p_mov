import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import ArtistBox from "../ArtistBox"

const mockPush = jest.fn();
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const mockArtist = { id: 1, name: "Artist Test", image: "Test.jpg" };

describe("ArtistBox", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("renders the ArtistBox", () => {
    render(<ArtistBox artist={mockArtist}/>);
    const image = screen.getByTestId("artist-image");
    expect(image).toBeTruthy();
    expect(image.props.source).toEqual({ uri: mockArtist.image });
    expect(screen.getByText(mockArtist.name)).toBeTruthy();
  });
});
