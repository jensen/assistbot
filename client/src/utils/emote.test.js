import { splitMessage, convertTwitchEmotes } from "utils/emote";

describe("splitMessage", () => {
  it("should handle multiple emotes without any other text", () => {
    const result = splitMessage(
      "Kappa Kappa NotLikeThis :P",
      convertTwitchEmotes("58765:12-22/12:24-25/25:0-4,6-10")
    );

    expect(result).toHaveLength(4);
    expect(result[0]).toEqual({
      type: "image",
      value: "https://static-cdn.jtvnw.net/emoticons/v1/25/1.0",
    });
    expect(result[1]).toEqual({
      type: "image",
      value: "https://static-cdn.jtvnw.net/emoticons/v1/25/1.0",
    });
    expect(result[2]).toEqual({
      type: "image",
      value: "https://static-cdn.jtvnw.net/emoticons/v1/58765/1.0",
    });
    expect(result[3]).toEqual({
      type: "image",
      value: "https://static-cdn.jtvnw.net/emoticons/v1/12/1.0",
    });
  });

  it("should handle multiple emotes with leading text", () => {
    const result = splitMessage(
      "A Kappa Kappa NotLikeThis :P",
      convertTwitchEmotes("58765:14-24/12:26-27/25:2-6,8-12")
    );

    expect(result).toHaveLength(5);
    expect(result[0]).toEqual({
      type: "text",
      value: "A ",
    });
    expect(result[1]).toEqual({
      type: "image",
      value: "https://static-cdn.jtvnw.net/emoticons/v1/25/1.0",
    });
    expect(result[2]).toEqual({
      type: "image",
      value: "https://static-cdn.jtvnw.net/emoticons/v1/25/1.0",
    });
    expect(result[3]).toEqual({
      type: "image",
      value: "https://static-cdn.jtvnw.net/emoticons/v1/58765/1.0",
    });
    expect(result[4]).toEqual({
      type: "image",
      value: "https://static-cdn.jtvnw.net/emoticons/v1/12/1.0",
    });
  });

  it("should handle multiple emotes with trailing text", () => {
    const result = splitMessage(
      "Kappa Kappa NotLikeThis :P A",
      convertTwitchEmotes("58765:12-22/12:24-25/25:0-4,6-10")
    );

    expect(result).toHaveLength(5);

    expect(result[0]).toEqual({
      type: "image",
      value: "https://static-cdn.jtvnw.net/emoticons/v1/25/1.0",
    });
    expect(result[1]).toEqual({
      type: "image",
      value: "https://static-cdn.jtvnw.net/emoticons/v1/25/1.0",
    });
    expect(result[2]).toEqual({
      type: "image",
      value: "https://static-cdn.jtvnw.net/emoticons/v1/58765/1.0",
    });
    expect(result[3]).toEqual({
      type: "image",
      value: "https://static-cdn.jtvnw.net/emoticons/v1/12/1.0",
    });
    expect(result[4]).toEqual({
      type: "text",
      value: " A",
    });
  });

  it("should handle multiple emotes with interpolated text", () => {
    const result = splitMessage(
      "A Kappa Kappa A NotLikeThis :P A",
      convertTwitchEmotes("25:2-6,8-12/58765:16-26/12:28-29")
    );

    expect(result).toHaveLength(7);

    expect(result[0]).toEqual({
      type: "text",
      value: "A ",
    });
    expect(result[1]).toEqual({
      type: "image",
      value: "https://static-cdn.jtvnw.net/emoticons/v1/25/1.0",
    });
    expect(result[2]).toEqual({
      type: "image",
      value: "https://static-cdn.jtvnw.net/emoticons/v1/25/1.0",
    });
    expect(result[3]).toEqual({
      type: "text",
      value: " A ",
    });
    expect(result[4]).toEqual({
      type: "image",
      value: "https://static-cdn.jtvnw.net/emoticons/v1/58765/1.0",
    });
    expect(result[5]).toEqual({
      type: "image",
      value: "https://static-cdn.jtvnw.net/emoticons/v1/12/1.0",
    });
    expect(result[6]).toEqual({
      type: "text",
      value: " A",
    });
  });
});

describe("convertTwitchEmotes", () => {
  it("should handle a single emote", () => {
    expect(convertTwitchEmotes("58765:12-22")).toHaveLength(1);
  });

  it("should handle two emotes", () => {
    expect(convertTwitchEmotes("58765:12-22/12:24-25")).toHaveLength(2);
  });

  it("should handle multiple emotes including two of the same", () => {
    const result = convertTwitchEmotes("58765:12-22/12:24-25/25:0-4,6-10");

    expect(result).toHaveLength(4);
    expect(result[0]).toEqual({
      end: 22,
      src: "https://static-cdn.jtvnw.net/emoticons/v1/58765/1.0",
      start: 12,
    });
    expect(result[1]).toEqual({
      end: 25,
      src: "https://static-cdn.jtvnw.net/emoticons/v1/12/1.0",
      start: 24,
    });
    expect(result[2]).toEqual({
      end: 4,
      src: "https://static-cdn.jtvnw.net/emoticons/v1/25/1.0",
      start: 0,
    });
    expect(result[3]).toEqual({
      end: 10,
      src: "https://static-cdn.jtvnw.net/emoticons/v1/25/1.0",
      start: 6,
    });
  });
});
