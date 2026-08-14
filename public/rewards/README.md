# Reward gallery images

Drop your real reward screenshots into this folder, then update the
`rewardImages` list in `config/site-config.ts` to point at them.

Tips:
- Recommended size: around 320 × 400 (portrait) or similar. Any ratio works —
  images are never stretched; they keep their natural aspect ratio.
- Supported formats: .jpg, .png, .webp, .svg
- Give each image good `alt` text in the config for accessibility.

Example config entry:

```ts
rewardImages: [
  { src: '/rewards/my-winner-1.jpg', alt: 'RM88 reward winner announcement' },
  { src: '/rewards/my-event-2.png', alt: 'Weekend event giveaway' },
],
```
