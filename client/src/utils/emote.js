export const splitMessage = (message, emotes) => {
  const split = [];

  emotes = [...emotes].sort((a, b) => a.start - b.start);

  for (let index = 0; index < emotes.length; index++) {
    const emote = emotes[index];
    const image = {
      type: "image",
      value: emote.src,
    };

    if (
      (index === 0 && emote.start === 0) ||
      (index === emotes.length - 1 && emote.end === emotes.length - 1)
    ) {
      split.push(image);
    } else {
      if (index === 0) {
        split.push({
          type: "text",
          value: message.substring(0, emote.start),
        });
        split.push(image);
      } else {
        split.push(image);
        split.push({
          type: "text",
          value: message.substring(
            emote.end + 1,
            index === emotes.length - 1
              ? message.length
              : emotes[index + 1].start
          ),
        });
      }
    }
  }

  return split.filter((emote) => emote.value && emote.value !== " ");
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
