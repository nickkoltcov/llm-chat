import { IMessageContentBlock } from "../type";

const filterText = (text: string | IMessageContentBlock[]): string => {
  const blocks = Array.isArray(text) ? text : [{ type: "text", text }];
  return blocks
    .filter((block) => block?.type === "text")
    .map((block) => block.text)
    .join("\n");
};

export const copyText = async (text: string | IMessageContentBlock[]) => {
  const copyText = filterText(text);

  if (copyText === "") return;

  try {
    await navigator.clipboard.writeText(copyText);
  } catch (error) {
    const textarea = document.createElement("textarea");
    textarea.value = copyText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }
};
