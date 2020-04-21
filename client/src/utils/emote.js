export const splitMessage = (message, emotes) => {
  return emotes
    .sort((a, b) => a.start - b.start)
    .reduce((split, emote, index) => {
      const image = {
        type: "image",
        value: emote.src,
      };

      if (
        (index === 0 && emote.start === 0) ||
        (index === emotes.length - 1 && emote.end === emotes.length - 1)
      ) {
        return [...split, image];
      }

      if (index === 0) {
        return [
          ...split,
          {
            type: "text",
            value: message.substring(0, emote.start),
          },
          image,
        ];
      }

      if (index === emotes.length - 1) {
        return [
          ...split,
          image,
          {
            type: "text",
            value: message.substring(emote.end + 1),
          },
        ];
      }

      return [
        ...split,
        image,
        {
          type: "text",
          value: message.substring(emote.end + 1, emotes[index + 1].start),
        },
      ];
    }, [])
    .filter((item) => item.value && item.value !== " ");
};

export const convertTwitchEmotes = (emotes) => {
  if (!emotes) return [];

  return emotes.split("/").reduce((ranges, emote) => {
    const [id, position] = emote.split(":");
    const instances = position.split(",");

    return [
      ...ranges,
      ...instances.map((instance) => {
        const [start, end] = instance.split("-");

        return {
          src: `https://static-cdn.jtvnw.net/emoticons/v1/${id}/1.0`,
          start: Number(start),
          end: Number(end),
        };
      }),
    ];
  }, []);
};
