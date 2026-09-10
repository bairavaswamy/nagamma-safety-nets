# Nagamma Safety Nets

Next.js website for Nagamma Safety Nets in Bangalore.

## Core Routes

- `/`
- `/bangalore/`
- `/bangalore/[service]/`
- `/bangalore/[service]/[area]/`

## Services

- Pigeon Safety Nets
- Invisible Grills
- Monkey Safety Nets
- Children Safety Nets
- Sports Nets
- Cloth Hangers
- Balcony Safety Nets

## Development

```bash
npm run dev
npm run build
npm run lint
```

## Google Tag Manager

GTM is prepared but disabled by default. When ready, copy `.env.example` to
`.env.local`, add your real container ID as `NEXT_PUBLIC_GTM_ID`, and restart or
rebuild the website. For production, set the variable in your hosting project
and redeploy. See [the setup guide](docs/tag-manager.md) for activation, contact
click events, GA4 configuration and verification.
