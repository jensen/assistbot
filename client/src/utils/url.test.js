import { separateUrls } from "utils/url";

describe("Utilities for URL", () => {
  it("should return an array of one item when it is only a link", () => {
    expect(separateUrls("https://github.com")).toHaveLength(1);
  });

  it("should return an array of one item when there is no link", () => {
    expect(separateUrls("This is a message.")).toHaveLength(1);
  });

  it("should return an array of two items when it ends with a link", () => {
    expect(separateUrls("This is a message https://github.com")).toHaveLength(
      2
    );
  });

  it("should return an array of three items when there are two links", () => {
    const urls = separateUrls("https://github.com https://github.com");

    expect(urls).toHaveLength(3);
    expect(urls[0].value).toBe("https://github.com");
    expect(urls[0].type).toBe("link");
    expect(urls[1].value).toBe(" ");
    expect(urls[1].type).toBe("text");
    expect(urls[2].value).toBe("https://github.com");
    expect(urls[2].type).toBe("link");
  });

  it("should return an array of two items when it starts with a link", () => {
    expect(separateUrls("https://github.com This is a message.")).toHaveLength(
      2
    );
  });

  it("should return an array of three items when there is a link within the text", () => {
    expect(separateUrls("This is a https://github.com message.")).toHaveLength(
      3
    );
  });

  it("should return an array of five items when there are two links within the text", () => {
    const urls = separateUrls(
      "This https://github.com is a https://twitch.tv message."
    );

    expect(urls).toHaveLength(5);
    expect(urls[0].value).toBe("This ");
    expect(urls[0].type).toBe("text");
    expect(urls[1].value).toBe("https://github.com");
    expect(urls[1].type).toBe("link");
    expect(urls[2].value).toBe(" is a ");
    expect(urls[2].type).toBe("text");
    expect(urls[3].value).toBe("https://twitch.tv");
    expect(urls[3].type).toBe("link");
    expect(urls[4].value).toBe(" message.");
    expect(urls[4].type).toBe("text");
  });

  it("should return an array of five items when there are two of the same links within the text", () => {
    const urls = separateUrls(
      "This https://github.com is a https://github.com message."
    );

    expect(urls).toHaveLength(5);
    expect(urls[0].value).toBe("This ");
    expect(urls[0].type).toBe("text");
    expect(urls[1].value).toBe("https://github.com");
    expect(urls[1].type).toBe("link");
    expect(urls[2].value).toBe(" is a ");
    expect(urls[2].type).toBe("text");
    expect(urls[3].value).toBe("https://github.com");
    expect(urls[3].type).toBe("link");
    expect(urls[4].value).toBe(" message.");
    expect(urls[4].type).toBe("text");
  });
});
