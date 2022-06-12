import Re from "../text/index.ts";

import { IRewritePlugin, Rewrite } from '../../types.ts';

// -- match YAML frontmatter, capturing the yaml block's contents
const frontmatter = Re.firstCaptureGroup(/^---\n(.+)\n---/sm);

// -- match the first (and hopefully only!) markdown title, capturing the text
const title = Re.firstCaptureGroup(/^#\s+(.+)/m);

// -- match each wikilink, without inner parsing
const wikilinks = Re.eachMatch(/\[{2}[^\]]+\]{2}\S*/gm);

const NoteOptics = {
  parts: {
    frontmatter,
    title,
    wikilinks,
  },
  replacements: {
    multiNewlines: Re.eachMatch(/\n{3,}/gm),
  },
};

export function rules(): Rewrite[] {
  return [
    {
      name: "multiple-newlines-to-single",
      description: "collapse multiple newlines to a single newline",
      rewrite: NoteOptics
        .replacements.multiNewlines.modify.bind(null, (_: string) => "\n"),
    },
  ];
}
