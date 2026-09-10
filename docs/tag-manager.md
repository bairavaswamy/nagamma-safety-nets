# Google Tag Manager setup

The website is ready for a Google Tag Manager **Web** container. Tracking is
disabled while `NEXT_PUBLIC_GTM_ID` is blank or has an invalid container-ID
format. No container has been created, connected or published for you.

## Activate later

1. Create or open the website's Web container in
   [Google Tag Manager](https://tagmanager.google.com/), then copy its `GTM-…`
   container ID. A `G-…` Google Analytics measurement ID does not go here.
2. For local development, copy `.env.example` to `.env.local` and set
   `NEXT_PUBLIC_GTM_ID` to the real container ID. On your hosting provider, add
   the same environment variable to the website project.
3. Restart the development server or rebuild and redeploy the production site.
   Next.js embeds `NEXT_PUBLIC_` variables at build time, so changing only the
   production environment after a build will not update the browser bundle.
4. Add your desired tags in the container. For GA4, configure the Google tag in
   GTM using your GA4 measurement ID. The website already loads GTM globally;
   do not paste another GTM snippet into a page or add a second GA component.
5. Use GTM **Preview** and connect your website in Tag Assistant. Verify the
   intended tags and events, then publish the container when ready.

To disable tracking, remove or blank the variable and rebuild/redeploy.

## Contact events available

When GTM is enabled, links automatically send the `contact_click` data layer
event. This works on the first page and after navigation between website pages.

| Parameter | Values / meaning |
| --- | --- |
| `event` | `contact_click` |
| `contact_method` | `phone`, `whatsapp`, `email`, or `enquiry` |
| `page_path` | Current page path, such as `/bangalore/balcony-safety-nets/` |

`enquiry` means someone clicked a link to the contact page. These are click
intent events, not confirmation of a completed call, sent WhatsApp message or
received enquiry. Form submission is not counted as a conversion.

The custom events contain no form contents, customer names, mobile numbers,
email addresses, destination link text, query strings or prefilled messages.
Any additional tags and their data collection are configured separately in GTM.

To report these events in GA4:

1. Create a **Custom Event** trigger matching `contact_click`.
2. Create Data Layer Variables named `contact_method` and `page_path`.
3. Create a GA4 Event tag with event name `contact_click`, attach the trigger,
   and map the two parameters to their Data Layer Variables.
4. In Preview, click each contact link type and confirm one `contact_click`
   event per click and the correct method and current page path.

For page views, configure GA4 Enhanced Measurement to track browser-history
page changes. This site does not also send manual `page_view` events. Verify a
single page view on the initial load and on an internal navigation to avoid
duplicate reporting.

## Implementation

- `app/components/GoogleTagManager.tsx` loads the existing
  `@next/third-parties/google` integration only with a configured container ID.
- The root layout mounts that component once. Its contact listener uses event
  delegation and removes itself on unmount, including React development remounts.
- `app/lib/analytics.ts` validates the ID format and builds the limited contact
  event payload. An ID with a valid format still needs to exist in your account.
- The no-JavaScript iframe is also conditional on a configured container ID.

## References

- [Next.js Google Tag Manager integration](https://nextjs.org/docs/app/guides/third-party-libraries#google-tag-manager)
- [Next.js public environment variables](https://nextjs.org/docs/app/guides/environment-variables#bundling-environment-variables-for-the-browser)
- [Google Tag Manager data layer](https://developers.google.com/tag-platform/tag-manager/datalayer)
- [Verify and publish tags](https://support.google.com/tagmanager/answer/14842769)
