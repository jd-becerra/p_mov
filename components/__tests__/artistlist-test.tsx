import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import ArtistList from "../ArtistList"

const mockPush = jest.fn();
jest.mock("expo-router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const mockArtists = [
  { id: 1, name: "Artist One", image: "image1.jpg" },
  { id: 2, name: "Artist Two", image: "image2.jpg" },
  { id: 3, name: "Artist Three", image: "image3.jpg" },
];

describe("ArtistList", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("renders the list of artists", () => {
    render(<ArtistList artists={mockArtists} />);

    // Check if all artist names are rendered
    mockArtists.forEach((artist) => {
      expect(screen.getByTestId(`artist-box-${artist.name}`)).toBeTruthy();
    });
  });

  it("navigates to the artist detail view when an artist is pressed", () => {
    render(<ArtistList artists={mockArtists} />);
    const artistBox = screen.getByTestId(`artist-box-${mockArtists[0].name}`);
    fireEvent.press(artistBox);

    // Check if the push function was called with the correct parameters
    expect(mockPush).toHaveBeenCalledWith({
      pathname: "/ArtistDetailView",
      params: {
        id: mockArtists[0].id,
        name: mockArtists[0].name,
        image: mockArtists[0].image,
      },
    });
  });

  it("does not crash when the artists array is empty", () => {
    render(<ArtistList artists={[]} />);
    expect(screen.queryAllByTestId(/artist-box-/).length).toBe(0);
  });
});
