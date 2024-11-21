import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import ArtistDetailView from "../../app/ArtistDetailView"

const mockPush = jest.fn();
jest.mock("expo-router", () => ({
    useLocalSearchParams: jest.fn(),
}));

const mockUseLocalSearchParams = require("expo-router").useLocalSearchParams;

describe("ArtistDetailView", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("renders the ArtistDetailView", () => {

    mockUseLocalSearchParams.mockReturnValue({
        id: "1",
        name: "Artist Test",
        image: "peru.jpg",
    });

    render(<ArtistDetailView/>);
    const image = screen.getByTestId("artist-image");
    expect(image).toBeTruthy();
    expect(image.props.source).toEqual({ uri: "peru.jpg" });
    expect(screen.getByText("Artist Test")).toBeTruthy();
    expect(screen.getByText("mbid: 1")).toBeTruthy();
  });
});
