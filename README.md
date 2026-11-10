# Pranjal Gaur — portfolio

Static site for a senior software engineer working in Flutter, Dart, and applied AI.

This branch, `cursor/github-pages-redesign-6188`, is the new design to publish. The previous site remains on `master`.

To make this the only site on GitHub Pages:

1. Open the repository on GitHub.
2. Go to Settings → Pages.
3. Under "Build and deployment", choose "Deploy from a branch".
4. Set the branch to `cursor/github-pages-redesign-6188` and the folder to `/ (root)`.
5. Save.

The public URL stays https://pranjalg.github.io/Portfolio_website/. After the next Pages build, that URL serves this design only. `master` is no longer what visitors see, and it is still in the repository if you need the old files.

## Stack

HTML, CSS, and a few small scripts. Design tokens live in `css/tokens.css`. There is no framework and no backend. The hero motion uses GSAP, ScrollTrigger, and Lenis.

Space Grotesk and Inter are self-hosted Latin subsets (SIL Open Font License, via Google Fonts).

## Resume

The Resume and Download resume buttons serve `public/resume.pdf`. The browser saves it as `Pranjal-Gaur-Resume.pdf`. Replace that file to update the download.

## Local preview

```bash
python3 -m http.server 4173
```

Open http://127.0.0.1:4173/
