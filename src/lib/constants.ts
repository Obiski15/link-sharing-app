export const icons: {
  name: string;
  path: string;
  pattern: RegExp;
  color: {
    secondary: string;
    primary: string;
    border?: string;
  };
}[] = [
  {
    name: "linkedin",
    path: "/icons/linkedin.svg",
    color: { secondary: "#2D68FF", primary: "" },
    pattern: /^(https:\/\/)(www\.)linkedin\.com\/([a-zA-Z0-9-_\.\/\?\=\&]+)$/,
  },
  {
    name: "github",
    path: "/icons/github.svg",
    color: { secondary: "#1A1A1A", primary: "" },
    pattern: /^(https:\/\/)(www\.)github\.com\/([a-zA-Z0-9-_\.\/\?\=\&]+)$/,
  },

  {
    name: "x",
    path: "/icons/x.svg",
    color: { secondary: "#1A1A1A", primary: "" },
    pattern: /^(https:\/\/)(www\.)x\.com\/([a-zA-Z0-9-_\.\/\?\=\&]+)$/,
  },
  {
    name: "codewars",
    path: "/icons/codewars.svg",
    color: { secondary: "#8A1A50", primary: "" },
    pattern: /^(https:\/\/)(www\.)codewars\.com\/([a-zA-Z0-9-_\.\/\?\=\&]+)$/,
  },
  {
    name: "facebook",
    path: "/icons/facebook.svg",
    color: { secondary: "#2442AC", primary: "" },
    pattern: /^(https:\/\/)(www\.)facebook\.com\/([a-zA-Z0-9-_\.\/\?\=\&]+)$/,
  },
  {
    name: "hashnode",
    path: "/icons/hashnode.svg",
    color: { secondary: "#0330D1", primary: "" },
    pattern: /^(https:\/\/)(www\.)hashnode\.com\/([a-zA-Z0-9-_\.\/\?\=\&]+)$/,
  },
  {
    name: "frontend mentor",
    path: "/icons/frontendmentor.svg",
    color: { secondary: "#FFFFFF", primary: "#333333", border: "#d9d9d9" },
    pattern:
      /^(https:\/\/)(www\.)frontendmentor\.io\/([a-zA-Z0-9-_\.\/\?\=\&]+)$/,
  },
  {
    name: "dev.to",
    path: "/icons/devdotto.svg",
    color: { secondary: "#333333", primary: "" },
    pattern: /^(https:\/\/)(www\.)dev\.to\/([a-zA-Z0-9-_\.\/\?\=\&]+)$/,
  },
  {
    name: "twitch",
    path: "/icons/twitch.svg",
    color: { secondary: "#EE3FC8", primary: "" },
    pattern: /^(https:\/\/)(www\.)twitch\.com\/([a-zA-Z0-9-_\.\/\?\=\&]+)$/,
  },
  {
    name: "gitlab",
    path: "/icons/gitlab.svg",
    color: { secondary: "#EB4925", primary: "" },
    pattern: /^(https:\/\/)(www\.)gitlab\.com\/([a-zA-Z0-9-_\.\/\?\=\&]+)$/,
  },
  {
    name: "youtube",
    path: "/icons/youtube.svg",
    color: { secondary: "#EE3939", primary: "" },
    pattern: /^(https:\/\/)(www\.)youtube\.com\/([a-zA-Z0-9-_\.\/\?\=\&]+)$/,
  },
  {
    name: "stack overflow",
    path: "/icons/stackoverflow.svg",
    color: { secondary: "#EC7100", primary: "" },
    pattern:
      /^(https:\/\/)(www\.)stackoverflow\.com\/([a-zA-Z0-9-_\.\/\?\=\&]+)$/,
  },
];
